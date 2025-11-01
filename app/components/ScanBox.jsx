"use client";
import { useMemo, useState } from "react";

export default function ScanBox() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  async function runScan() {
    setError("");
    setResult(null);
    setLoading(true);
    try {
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Scan failed.");
      }
      setResult(data);
    } catch (e) {
      setError(e.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const summary = useMemo(() => {
    if (!result?.checks) return { good: 0, warn: 0, bad: 0 };
    const g = result.checks.filter((c) => c.status === "good").length;
    const w = result.checks.filter((c) => c.status === "warn").length;
    const b = result.checks.filter((c) => c.status === "bad").length;
    return { good: g, warn: w, bad: b };
  }, [result]);

  return (
    <div className="w-full">
      {/* input + button */}
      <div id="scan" className="mt-8 flex flex-col sm:flex-row gap-3">
        <input
          className="flex-1 rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:ring-4 focus:ring-gray-900/10"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          onClick={runScan}
          disabled={loading}
          className="px-5 py-3 rounded-2xl bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed transition"
        >
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <Spinner /> Scanning…
            </span>
          ) : (
            "Scan my website"
          )}
        </button>
      </div>

      {/* hata */}
      {error && (
        <div className="mt-3 rounded-xl border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm">
          {error}
        </div>
      )}

      {/* sonuç */}
      {result && (
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">
          {/* header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="min-w-0">
              <div className="text-xs uppercase tracking-wide text-gray-500">
                Final URL
              </div>
              <div className="font-medium truncate">{result.meta?.finalUrl || result.finalUrl || result.url}</div>
              {result.meta?.canonical && (
                <div className="text-sm text-gray-600 truncate">
                  Canonical: <span className="underline decoration-gray-300">{result.meta.canonical}</span>
                </div>
              )}
            </div>

            <div className="shrink-0 text-right">
              <div className="text-xs uppercase tracking-wide text-gray-500">AI-Visibility Score</div>
              <div className="text-3xl font-semibold">{result.score}</div>
              <div className="mt-1 text-xs text-gray-500">
                <Badge tone="good">{summary.good} good</Badge>{" "}
                <Badge tone="warn">{summary.warn} warn</Badge>{" "}
                <Badge tone="bad">{summary.bad} bad</Badge>
              </div>
            </div>
          </div>

          {/* meta küçük satırlar */}
          <div className="mt-4 grid sm:grid-cols-3 gap-3 text-sm">
            <MetaRow label="Title" value={result.meta?.title || "—"} />
            <MetaRow label="Description" value={result.meta?.description || "—"} />
            <MetaRow label="Lang" value={result.meta?.htmlLang || result.meta?.contentLanguage || "—"} />
          </div>

          {/* detaylı checklist + suggestions */}
          <div className="mt-6 grid lg:grid-cols-2 gap-6">
            {/* checks */}
            <div>
              <div className="text-sm font-medium mb-2">Checks</div>
              <ul className="space-y-2">
                {result.checks.map((c) => (
                  <li key={c.key} className="flex items-start gap-3 rounded-xl border border-gray-200 p-3">
                    <StatusDot status={c.status} />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <div className="font-medium">{c.key}</div>
                        <SmallPill status={c.status} />
                      </div>
                      <div className="text-gray-600 text-sm">{c.note}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* suggestions */}
            <div>
              <div className="text-sm font-medium mb-2">Suggestions</div>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                {result.suggestions.length ? (
                  result.suggestions.map((s) => <li key={s}>{s}</li>)
                ) : (
                  <li>Looks good. Consider refining headings and internal links for better model comprehension.</li>
                )}
              </ul>

              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href="/playbooks"
                  className="inline-flex text-sm font-medium underline underline-offset-4"
                >
                  See related playbooks →
                </a>
                <button
                  onClick={() => copyChecklist(result)}
                  className="inline-flex text-sm px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-50"
                >
                  Copy checklist
                </button>
              </div>
            </div>
          </div>

          {/* heuristics mini */}
          <div className="mt-6 grid sm:grid-cols-3 gap-3 text-sm text-gray-700">
            <MiniStat label="Words" value={result.heur?.wordCount} />
            <MiniStat label="Internal links" value={result.heur?.internalLinks} />
            <MiniStat label="JSON-LD" value={result.heur?.hasLdAny ? "present" : "—"} />
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- UI helpers ---------- */

function Spinner() {
  return (
    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none" className="opacity-20" />
      <path d="M21 12a9 9 0 00-9-9" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  );
}

function StatusDot({ status }) {
  const map = { good: "bg-emerald-500", warn: "bg-amber-500", bad: "bg-red-500" };
  return <span className={`mt-2 inline-block w-2.5 h-2.5 rounded-full ${map[status] || "bg-gray-400"}`} />;
}

function SmallPill({ status }) {
  const map = {
    good: "bg-emerald-50 text-emerald-700 border-emerald-200",
    warn: "bg-amber-50 text-amber-700 border-amber-200",
    bad: "bg-red-50 text-red-700 border-red-200",
  };
  return (
    <span className={`text-[11px] px-2 py-0.5 rounded-full border ${map[status] || "bg-gray-50 text-gray-700 border-gray-200"}`}>
      {status}
    </span>
  );
}

function Badge({ children, tone = "neutral" }) {
  const map = {
    good: "bg-emerald-50 text-emerald-700 border-emerald-200",
    warn: "bg-amber-50 text-amber-700 border-amber-200",
    bad: "bg-red-50 text-red-700 border-red-200",
    neutral: "bg-gray-50 text-gray-700 border-gray-200",
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border ${map[tone]}`}>
      {children}
    </span>
  );
}

function MetaRow({ label, value }) {
  return (
    <div className="min-w-0">
      <div className="text-xs uppercase tracking-wide text-gray-500">{label}</div>
      <div className="text-sm text-gray-800 truncate">{value || "—"}</div>
    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
      <div className="text-xs uppercase tracking-wide text-gray-500">{label}</div>
      <div className="text-sm font-medium">{value ?? "—"}</div>
    </div>
  );
}

async function copyChecklist(result) {
  try {
    const lines = [];
    lines.push(`# SeenByGeo Checklist for ${result.meta?.finalUrl || result.finalUrl || result.url}`);
    lines.push(`Score: ${result.score}`);
    lines.push("");
    lines.push("## Checks");
    for (const c of result.checks) {
      lines.push(`- [${symbol(c.status)}] ${c.key}: ${c.note}`);
    }
    lines.push("");
    lines.push("## Suggestions");
    if (result.suggestions?.length) {
      for (const s of result.suggestions) lines.push(`- ${s}`);
    } else {
      lines.push("- Looks good. Minor refinements only.");
    }
    await navigator.clipboard.writeText(lines.join("\n"));
    alert("Checklist copied!");
  } catch {
    alert("Could not copy.");
  }
}

function symbol(status) {
  return status === "good" ? "x" : status === "warn" ? "!" : " ";
}
