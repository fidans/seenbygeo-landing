'use client';
import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [err, setErr] = useState('');

  async function onScan() {
    setErr('');
    setResult(null);
    if (!/^https?:\/\//i.test(url)) { setErr('Please enter a valid URL starting with http(s)://'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Scan failed');
      setResult(data);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900 px-6">
      <header className="w-full max-w-xl mx-auto py-4 text-sm font-medium text-gray-500">SeenByGeo</header>
      <section className="w-full max-w-xl">
        <h1 className="text-5xl font-semibold tracking-tight text-center">
          Your website, <span className="text-gray-800">seen by AI.</span>
        </h1>
        <p className="mt-3 text-gray-500 text-center">Enter a URL to get an AI-visibility heuristic score.</p>

        <div className="mt-8 flex gap-2">
          <input
            className="flex-1 rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-300"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') onScan(); }}
          />
          <button
            onClick={onScan}
            disabled={loading}
            className="px-5 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition disabled:opacity-60"
          >
            {loading ? 'Scanning…' : 'Scan'}
          </button>
        </div>

        {err && <div className="mt-4 text-red-600 text-sm">{err}</div>}

        {result && (
          <div className="mt-6 rounded-xl border border-gray-200 p-5">
            <div className="text-sm text-gray-500">{result.url}</div>
            <div className="mt-1 text-3xl font-semibold">Score: {result.score}/100</div>
            <div className="mt-4 grid gap-2 text-sm text-gray-700">
              <div>Title: {result.heur.title ? '✅' : '⚠️ missing'}</div>
              <div>Description: {result.heur.desc ? '✅' : '⚠️ missing'}</div>
              <div>Robots meta: {/noindex|nofollow/i.test(result.heur.robots) ? '⚠️ check' : '✅ ok'}</div>
              <div>Canonical: {result.heur.canonical ? '✅' : '⚠️ missing'}</div>
              <div>JSON-LD: {result.heur.hasLd ? '✅' : '⚠️ missing'}</div>
              <div>H1 count: {result.heur.h1Count}</div>
              <div>Words: {result.heur.wordCount}</div>
              <div>Internal links: {result.heur.internalLinks}</div>
              <div>Sitemap: {result.heur.hasSitemap ? '✅' : '⚠️ missing'}</div>
              <div>robots.txt: {result.heur.robotsTxtOk ? '✅' : '⚠️ missing'}</div>
            </div>

            {result.suggestions?.length > 0 && (
              <>
                <div className="mt-5 font-medium">Suggestions</div>
                <ul className="mt-2 list-disc pl-5 text-gray-700">
                  {result.suggestions.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </>
            )}
          </div>
        )}
      </section>

      <footer className="mt-10 text-gray-400 text-sm">© 2025 SeenByGeo</footer>
    </main>
  );
}
