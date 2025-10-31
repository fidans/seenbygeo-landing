// app/api/scan/route.js
import { NextResponse } from "next/server";

const UA = "SeenByGeoBot/0.1 (+https://seenbygeo.com)";
const MAX_BYTES = 1_500_000; // ~1.5MB

async function fetchText(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 12000);
  const res = await fetch(url, {
    headers: { "User-Agent": UA },
    signal: ctrl.signal,
    redirect: "follow",
  });
  clearTimeout(t);
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  const ct = res.headers.get("content-type") || "";
  if (!ct.includes("text/html")) throw new Error(`Not HTML: ${ct}`);
  const buf = await res.arrayBuffer();
  if (buf.byteLength > MAX_BYTES) throw new Error("Page too large");
  return new TextDecoder("utf-8").decode(buf);
}

function pick(str, re) {
  const m = str.match(re);
  return m ? (m[1] ?? m[0]) : "";
}

function bool(str) {
  return !!str && str.trim().length > 0;
}

function scoreHeuristics({
  title,
  desc,
  robots,
  canonical,
  hasLd,
  h1Count,
  h2Count,
  wordCount,
  internalLinks,
  hasSitemap,
  robotsTxtOk,
}) {
  let score = 0;
  // basit ağırlıklar (toplam 100)
  if (bool(title)) score += 12;
  if (bool(desc)) score += 8;
  if (!/noindex|nofollow/i.test(robots)) score += 10;
  if (bool(canonical)) score += 8;
  if (hasLd) score += 10;
  if (h1Count === 1) score += 8;
  else if (h1Count > 1) score += 3;
  if (h2Count >= 2) score += 6;
  if (wordCount >= 300) score += 12;
  else if (wordCount >= 150) score += 6;
  if (internalLinks >= 5) score += 8;
  else if (internalLinks >= 2) score += 4;
  if (hasSitemap) score += 6;
  if (robotsTxtOk) score += 6;
  return Math.min(100, score);
}

export async function POST(req) {
  try {
    const { url } = await req.json();
    if (!url || !/^https?:\/\//i.test(url)) {
      return NextResponse.json(
        { error: "Valid http(s) URL required" },
        { status: 400 }
      );
    }

    const html = await fetchText(url);

    const head = pick(html, /<head[^>]*>([\s\S]*?)<\/head>/i) || "";
    const body = pick(html, /<body[^>]*>([\s\S]*?)<\/body>/i) || html;

    const title = pick(head, /<title[^>]*>([\s\S]*?)<\/title>/i).trim();
    const desc = pick(
      head,
      /<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i
    ).trim();
    const robots = pick(
      head,
      /<meta[^>]*name=["']robots["'][^>]*content=["']([^"']+)["'][^>]*>/i
    ).trim();
    const canonical = pick(
      head,
      /<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i
    ).trim();
    const hasLd = /<script[^>]*type=["']application\/ld\+json["'][^>]*>/.test(
      html
    );

    const h1Count = (html.match(/<h1\b[^>]*>/gi) || []).length;
    const h2Count = (html.match(/<h2\b[^>]*>/gi) || []).length;

    const text = body
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    const wordCount = text ? text.split(" ").length : 0;

    const originEsc = new URL(url).origin.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );
    const internalLinks =
      (html.match(
        new RegExp(
          `<a[^>]+href=["'](?:/|${originEsc})`,
          "gi"
        )
      ) || []).length;

    let robotsTxtOk = false,
      hasSitemap = false;
    try {
      const base = new URL(url).origin;
      const r = await fetch(`${base}/robots.txt`, {
        headers: { "User-Agent": UA },
      });
      robotsTxtOk = r.ok;
      const s = await fetch(`${base}/sitemap.xml`, {
        headers: { "User-Agent": UA },
      });
      hasSitemap = s.ok;
    } catch {
      /* ignore */
    }

    const heur = {
      title,
      desc,
      robots,
      canonical,
      hasLd,
      h1Count,
      h2Count,
      wordCount,
      internalLinks,
      hasSitemap,
      robotsTxtOk,
    };
    const score = scoreHeuristics(heur);

    let suggestions = [];
    if (!title) suggestions.push('Add a clear <title> (~60 chars).');
    if (!desc)
      suggestions.push(
        'Provide a concise <meta name="description"> (~150–160 chars).'
      );
    if (/noindex|nofollow/i.test(robots))
      suggestions.push("Check robots meta; remove accidental noindex/nofollow.");
    if (!canonical) suggestions.push("Declare a canonical URL.");
    if (!hasLd) suggestions.push("Add JSON-LD schema (Organization, WebSite).");
    if (h1Count !== 1) suggestions.push("Ensure exactly one <h1>.");
    if (wordCount < 300)
      suggestions.push("Add explanatory copy (>= 300 words).");
    if (!hasSitemap)
      suggestions.push("Add /sitemap.xml and reference it in robots.txt.");
    if (!robotsTxtOk) suggestions.push("Expose /robots.txt at the site root.");

    return NextResponse.json({ url, score, heur, suggestions });
  } catch (e) {
    return NextResponse.json(
      { error: e.message || "Scan failed" },
      { status: 500 }
    );
  }
}
