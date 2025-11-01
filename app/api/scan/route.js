// app/api/scan/route.js
import { NextResponse } from "next/server";

// -------- CONFIG --------
const UA = "SeenByGeoBot/0.2 (+https://seenbygeo.com)";
const TIMEOUT_MS = 12000;
const MAX_BYTES = 1_800_000; // ~1.8MB
const HTML_CT = ["text/html", "application/xhtml+xml"];

// -------- UTILS --------
function withTimeout(ms) {
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), ms);
  return { signal: ctrl.signal, clear: () => clearTimeout(id) };
}

function includesAny(haystack = "", needles = []) {
  return needles.some((n) => haystack.toLowerCase().includes(n.toLowerCase()));
}

function pick(str, re) {
  const m = str.match(re);
  return m ? (m[1] ?? m[0]) : "";
}

function all(str, re) {
  return Array.from(str.matchAll(re)).map((m) => m[1] ?? m[0]);
}

function toAbsoluteMaybe(href, base) {
  try {
    return new URL(href, base).href;
  } catch {
    return "";
  }
}

function parseDirectives(val = "") {
  // e.g. "noindex, nofollow, max-snippet:160"
  const parts = val
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  return new Set(parts);
}

function decodeWithCharset(buf, headerCT, headHtml = "") {
  // 1) HTTP Content-Type charset
  const ct = headerCT || "";
  let charset =
    pick(ct, /charset=([^\s;]+)/i) ||
    pick(headHtml, /<meta\s+charset=["']?([^"'>\s]+)["']?/i) ||
    pick(
      headHtml,
      /<meta[^>]+content=["'][^"']*charset=([^"'>\s;]+)[^"']*["'][^>]*>/i
    ) ||
    "utf-8";
  try {
    return new TextDecoder(charset).decode(buf);
  } catch {
    return new TextDecoder("utf-8").decode(buf);
  }
}

function countWords(text) {
  // Kelime benzeri token sayımı (sayı/uzun noktalama gürültüsünü azalt)
  const tokens = text.toLowerCase().match(/[a-zğüşöçıİı0-9]+/gi) || [];
  return tokens.length;
}

function uniq(arr) {
  return Array.from(new Set(arr));
}

// -------- CORE FETCH --------
async function fetchHtml(url) {
  const { signal, clear } = withTimeout(TIMEOUT_MS);
  const res = await fetch(url, {
    redirect: "follow",
    signal,
    headers: { "User-Agent": UA, Accept: "text/html,*/*" },
  }).catch((e) => {
    clear();
    throw e;
  });
  clear();

  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  const ct = (res.headers.get("content-type") || "").toLowerCase();
  if (!HTML_CT.some((t) => ct.includes(t))) {
    throw new Error(`Not HTML: ${ct || "unknown content-type"}`);
  }

  const buf = await res.arrayBuffer();
  if (buf.byteLength > MAX_BYTES) throw new Error("Page too large");

  // Head'ı charset için çıplakça çekmek istiyoruz → hızlı decode hilesi:
  // Önce utf-8'le head'i kaba çıkar, sonra charset varsa tekrar decode.
  let utf8 = new TextDecoder("utf-8").decode(buf);
  const headProbe = pick(utf8, /<head[^>]*>([\s\S]*?)<\/head>/i) || "";

  const html = decodeWithCharset(buf, ct, headProbe);
  return { html, finalUrl: res.url, headers: res.headers };
}

// -------- PARSE PAGE --------
function parsePage(html, baseUrl) {
  const head = pick(html, /<head[^>]*>([\s\S]*?)<\/head>/i) || "";
  const body = pick(html, /<body[^>]*>([\s\S]*?)<\/body>/i) || html;

  const title = pick(head, /<title[^>]*>([\s\S]*?)<\/title>/i).trim();

  const metaBy = (key, value) =>
    pick(
      head,
      new RegExp(
        `<meta[^>]*(?:${key})=["']${value}["'][^>]*content=["']([^"']+)["'][^>]*>`,
        "i"
      )
    ).trim();

  const desc =
    metaBy("name", "description") ||
    metaBy("property", "og:description") ||
    metaBy("name", "twitter:description") ||
    "";

  const robotsMeta = metaBy("name", "robots");
  const canonicalHref = pick(
    head,
    /<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i
  ).trim();
  const canonical = canonicalHref ? toAbsoluteMaybe(canonicalHref, baseUrl) : "";

  const hasLdAny = /<script[^>]*type=["']application\/ld\+json["'][^>]*>/.test(
    html
  );

  // Organization/WebSite schema sinyali
  const ldBlocks = all(
    html,
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
  );
  let hasLdOrganization = false;
  let hasLdWebSite = false;
  for (const block of ldBlocks) {
    try {
      const json = JSON.parse(block.trim());
      const arr = Array.isArray(json) ? json : [json];
      for (const node of arr) {
        const type = (node["@type"] || node.type || "").toString().toLowerCase();
        if (type.includes("organization")) hasLdOrganization = true;
        if (type.includes("website")) hasLdWebSite = true;
      }
    } catch {
      // ignore invalid JSON-LD
    }
  }

  const h1Count = (html.match(/<h1\b[^>]*>/gi) || []).length;
  const h2Count = (html.match(/<h2\b[^>]*>/gi) || []).length;

  // Görünür metin çıkarımı (script/style/inline svg hariç)
  const visibleText = body
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<svg[\s\S]*?<\/svg>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const wordCount = countWords(visibleText);

  // Dahili link sayısı (unique, same-origin)
  const base = new URL(baseUrl);
  const linkHrefs = all(html, /<a[^>]+href=["']([^"']+)["']/gi).map((h) =>
    toAbsoluteMaybe(h, baseUrl)
  );
  const internalUnique = uniq(
    linkHrefs.filter((h) => {
      try {
        const u = new URL(h);
        return u.origin === base.origin;
      } catch {
        return false;
      }
    })
  );
  const internalLinks = internalUnique.length;

  // Dil sinyalleri
  const htmlLang =
    pick(html, /<html[^>]*lang=["']([^"']+)["'][^>]*>/i).toLowerCase() || "";
  const metaLang =
    metaBy("http-equiv", "content-language") ||
    metaBy("name", "language") ||
    "";

  return {
    title,
    desc,
    robotsMeta,
    canonical,
    hasLdAny,
    hasLdOrganization,
    hasLdWebSite,
    h1Count,
    h2Count,
    wordCount,
    internalLinks,
    htmlLang,
    metaLang,
  };
}

// -------- ROBOTS/SITEMAP --------
async function fetchRobotsAndSitemap(origin) {
  let robotsTxtOk = false;
  let hasSitemapFile = false;
  let hasSitemapRefInRobots = false;
  let xrobotsHeader = ""; // X-Robots-Tag header (site-wide sinyal)

  // robots.txt
  try {
    const r = await fetch(`${origin}/robots.txt`, {
      headers: { "User-Agent": UA, Accept: "text/plain,*/*" },
    });
    robotsTxtOk = r.ok;
    xrobotsHeader = r.headers.get("x-robots-tag") || "";
    const text = r.ok ? await r.text() : "";
    if (/^\s*sitemap\s*:/gim.test(text)) hasSitemapRefInRobots = true;
  } catch {
    /* ignore */
  }

  // sitemap.xml (sadece var mı yok mu?)
  try {
    const s = await fetch(`${origin}/sitemap.xml`, {
      headers: { "User-Agent": UA, Accept: "application/xml,text/xml,*/*" },
    });
    hasSitemapFile = s.ok;
    if (!xrobotsHeader) {
      xrobotsHeader = s.headers.get("x-robots-tag") || "";
    }
  } catch {
    /* ignore */
  }

  return { robotsTxtOk, hasSitemapFile, hasSitemapRefInRobots, xrobotsHeader };
}

// -------- SCORING --------
function buildChecks(data) {
  const {
    title,
    desc,
    robotsMeta,
    xrobotsHeader,
    canonical,
    hasLdAny,
    hasLdOrganization,
    hasLdWebSite,
    h1Count,
    h2Count,
    wordCount,
    internalLinks,
    hasSitemapFile,
    hasSitemapRefInRobots,
    robotsTxtOk,
  } = data;

  // Robots birleşik (meta + header)
  const robotsSet = new Set([
    ...parseDirectives(robotsMeta),
    ...parseDirectives(xrobotsHeader),
  ]);
  const blocked =
    robotsSet.has("noindex") || robotsSet.has("none") || robotsSet.has("nofollow"); // 'none' → noindex,nofollow

  const checks = [
    {
      key: "Title",
      status: title ? "good" : "bad",
      weight: 10,
      note: title
        ? title.length > 70
          ? "Present but long; aim ~60 chars."
          : "Present and concise."
        : "Missing <title>.",
    },
    {
      key: "Description",
      status: desc ? "good" : "warn",
      weight: 7,
      note: desc
        ? desc.length > 180
          ? "Present but long; aim ~150–160 chars."
          : "Present."
        : "Meta description missing (og:/twitter:description used if available).",
    },
    {
      key: "Robots (meta/header)",
      status: blocked ? "bad" : "good",
      weight: 10,
      note: blocked
        ? "noindex/nofollow detected in meta or X-Robots-Tag."
        : "Indexable.",
    },
    {
      key: "Canonical",
      status: canonical ? "good" : "warn",
      weight: 6,
      note: canonical ? "Canonical declared." : "No canonical link.",
    },
    {
      key: "JSON-LD",
      status: hasLdAny ? "good" : "warn",
      weight: 8,
      note: hasLdAny
        ? `JSON-LD present${hasLdOrganization || hasLdWebSite ? " (Organization/WebSite found)" : ""}.`
        : "No JSON-LD schema.",
    },
    {
      key: "Headings",
      status: h1Count === 1 ? "good" : h1Count === 0 ? "bad" : "warn",
      weight: 8,
      note:
        h1Count === 1
          ? "Exactly one <h1>."
          : h1Count === 0
          ? "No <h1>."
          : `Multiple <h1> (${h1Count}).`,
    },
    {
      key: "Subheadings",
      status: h2Count >= 2 ? "good" : "warn",
      weight: 4,
      note: h2Count >= 2 ? "Good structure." : "Add more <h2> sections.",
    },
    {
      key: "Copy length",
      status: wordCount >= 300 ? "good" : wordCount >= 150 ? "warn" : "bad",
      weight: 10,
      note:
        wordCount >= 300
          ? `~${wordCount} words.`
          : `Only ~${wordCount} words; aim ≥300.`,
    },
    {
      key: "Internal links",
      status: internalLinks >= 5 ? "good" : internalLinks >= 2 ? "warn" : "bad",
      weight: 6,
      note:
        internalLinks >= 5
          ? `${internalLinks} same-origin links.`
          : `${internalLinks} same-origin links; add more cross-linking.`,
    },
    {
      key: "robots.txt",
      status: robotsTxtOk ? "good" : "warn",
      weight: 5,
      note: robotsTxtOk ? "robots.txt present." : "robots.txt not reachable.",
    },
    {
      key: "Sitemap file",
      status: hasSitemapFile ? "good" : "warn",
      weight: 5,
      note: hasSitemapFile ? "sitemap.xml present." : "sitemap.xml not reachable.",
    },
    {
      key: "Sitemap reference",
      status: hasSitemapRefInRobots ? "good" : "warn",
      weight: 3,
      note: hasSitemapRefInRobots
        ? "robots.txt references Sitemap."
        : "Add 'Sitemap: …' line to robots.txt.",
    },
  ];

  // Skor
  const totalWeight = checks.reduce((s, c) => s + c.weight, 0); // 72
  let raw = 0;
  for (const c of checks) {
    const factor = c.status === "good" ? 1 : c.status === "warn" ? 0.5 : 0;
    raw += c.weight * factor;
  }
  const score = Math.round((raw / totalWeight) * 100);

  return { score, checks };
}

// -------- HANDLER --------
export async function POST(req) {
  try {
    const { url } = await req.json();
    if (!url || !/^https?:\/\//i.test(url)) {
      return NextResponse.json(
        { ok: false, error: "Valid http(s) URL required" },
        { status: 400 }
      );
    }

    // 1) sayfayı çek
    const { html, finalUrl, headers } = await fetchHtml(url);
    const origin = new URL(finalUrl).origin;

    // 2) sayfayı parse et
    const parsed = parsePage(html, finalUrl);

    // 3) robots/sitemap sinyalleri
    const r = await fetchRobotsAndSitemap(origin);

    // 4) birleşik veri
    const combined = {
      ...parsed,
      xrobotsHeader: r.xrobotsHeader,
      robotsTxtOk: r.robotsTxtOk,
      hasSitemapFile: r.hasSitemapFile,
      hasSitemapRefInRobots: r.hasSitemapRefInRobots,
    };

    // 5) skor + checklist
    const { score, checks } = buildChecks(combined);

    // 6) öneriler
    const suggestions = [];
    const get = (k) => checks.find((c) => c.key === k);

    if (get("Title").status !== "good")
      suggestions.push("Add a clear <title> (~60 chars).");
    if (get("Description").status !== "good")
      suggestions.push(
        "Provide a concise <meta name=\"description\"> (~150–160 chars)."
      );
    if (get("Robots (meta/header)").status !== "good")
      suggestions.push(
        "Check robots meta / X-Robots-Tag; avoid noindex/nofollow for key pages."
      );
    if (get("Canonical").status !== "good")
      suggestions.push("Declare an absolute canonical URL.");
    if (get("JSON-LD").status !== "good")
      suggestions.push(
        "Add JSON-LD schema (Organization, WebSite) with sameAs links."
      );
    if (get("Headings").status !== "good")
      suggestions.push("Ensure exactly one <h1> and clear hierarchy.");
    if (get("Copy length").status !== "good")
      suggestions.push("Add explanatory copy (≥ 300 words).");
    if (get("Internal links").status !== "good")
      suggestions.push("Add more same-origin internal links.");
    if (get("robots.txt").status !== "good")
      suggestions.push("Expose /robots.txt at the site root.");
    if (get("Sitemap file").status !== "good")
      suggestions.push("Expose /sitemap.xml at the site root.");
    if (get("Sitemap reference").status !== "good")
      suggestions.push("Reference your sitemap(s) inside robots.txt.");

    // 7) dil/charset/son url bilgisi
    const resMeta = {
      finalUrl,
      contentType: headers.get("content-type") || "",
      contentLanguage: headers.get("content-language") || "",
      htmlLang: combined.htmlLang,
      metaLang: combined.metaLang,
      canonical: parsed.canonical,
      title: parsed.title,
      description: parsed.desc,
    };

    return NextResponse.json({
      ok: true,
      url,
      finalUrl,
      score,
      checks,
      suggestions,
      heur: {
        wordCount: combined.wordCount,
        internalLinks: combined.internalLinks,
        hasLdAny: combined.hasLdAny,
        hasLdOrganization: combined.hasLdOrganization,
        hasLdWebSite: combined.hasLdWebSite,
        robotsTxtOk: combined.robotsTxtOk,
        hasSitemapFile: combined.hasSitemapFile,
        hasSitemapRefInRobots: combined.hasSitemapRefInRobots,
        xrobotsHeader: combined.xrobotsHeader,
      },
      meta: resMeta,
    });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e.message || "Scan failed" },
      { status: 500 }
    );
  }
}
