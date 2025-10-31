'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [err, setErr] = useState('');

  async function onScan() {
    setErr('');
    setResult(null);
    if (!/^https?:\/\//i.test(url)) {
      setErr('Please enter a valid URL starting with http(s)://');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
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
    <main className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* header */}
      <div className="mx-auto max-w-6xl px-6">
        <header className="flex items-center justify-between py-6">
          <div className="text-lg font-semibold tracking-tight">SeenByGeo</div>
          <nav className="hidden sm:flex gap-6 text-sm text-gray-600">
            <a href="#features" className="hover:text-gray-900">Features</a>
            <a href="#how" className="hover:text-gray-900">How it works</a>
            <a href="#faq" className="hover:text-gray-900">FAQ</a>
          </nav>
        </header>
      </div>

      {/* hero */}
      <section className="mx-auto max-w-6xl px-6 pt-6 pb-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900"
            >
              Be <span className="text-gray-700">discoverable</span> by AI.
            </motion.h1>
            <p className="mt-4 text-gray-600 text-lg">
              SeenByGeo scores your pages for Generative Engine Optimization (GEO)
              — titles, meta, schema, robots, sitemap and internal links — then
              tells you exactly what to fix.
            </p>

            {/* scan form (hero) */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="https://example.com"
                className="flex-1 rounded-xl border border-gray-300 px-5 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onScan()}
              />
              <button
                onClick={onScan}
                disabled={loading}
                className="rounded-xl border border-gray-900 bg-gray-900 text-white px-6 py-3 font-medium hover:bg-gray-800 transition disabled:opacity-60"
              >
                {loading ? 'Scanning…' : 'Scan my website'}
              </button>
            </div>
            {err && <div className="mt-2 text-red-600 text-sm">{err}</div>}

            <p className="mt-3 text-xs text-gray-500">
              No signup. We fetch only the URL you provide.
            </p>
          </div>

          {/* right visual placeholder */}
          <div className="rounded-2xl border border-gray-200 bg-white/60 backdrop-blur-sm shadow-sm p-6">
            <div className="text-sm text-gray-500">Instant output</div>
            <div className="mt-2 text-3xl font-bold text-gray-900">AI-Visibility Score</div>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-gray-700">
              <li>✅ Title / Description</li>
              <li>✅ Robots / Canonical</li>
              <li>✅ JSON-LD</li>
              <li>✅ Headings</li>
              <li>✅ Words</li>
              <li>✅ Internal Links</li>
              <li>✅ Sitemap</li>
              <li>✅ robots.txt</li>
            </ul>
            <div className="mt-4 text-xs text-gray-500">
              Then fix items with our suggestions.
            </div>
          </div>
        </div>
      </section>

      {/* logos / trust (placeholder) */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="text-center text-gray-500 text-sm">Made for modern marketing teams</div>
      </section>

      {/* features */}
      <section id="features" className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">What you get</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-gray-200 p-6 bg-white">
            <div className="text-lg font-semibold">AI-Visibility Score</div>
            <p className="mt-2 text-gray-600">
              Heuristic scoring across metadata, structure and crawlability.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 p-6 bg-white">
            <div className="text-lg font-semibold">Actionable fixes</div>
            <p className="mt-2 text-gray-600">
              Human-readable suggestions for titles, descriptions, schema and robots.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 p-6 bg-white">
            <div className="text-lg font-semibold">Sitemap & robots</div>
            <p className="mt-2 text-gray-600">
              Checks for <code>/sitemap.xml</code> and <code>/robots.txt</code> presence and validity.
            </p>
          </div>
        </div>
      </section>

      {/* how it works */}
      <section id="how" className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">How it works</h2>
        <ol className="mt-6 grid md:grid-cols-3 gap-6 text-gray-700">
          <li className="rounded-xl border border-gray-200 p-6 bg-white">
            <div className="font-semibold">1) Enter a URL</div>
            <p className="mt-2 text-gray-600">We fetch the page with a lightweight crawler.</p>
          </li>
          <li className="rounded-xl border border-gray-200 p-6 bg-white">
            <div className="font-semibold">2) We analyze</div>
            <p className="mt-2 text-gray-600">Titles, meta, schema, headings, links and files.</p>
          </li>
          <li className="rounded-xl border border-gray-200 p-6 bg-white">
            <div className="font-semibold">3) You fix fast</div>
            <p className="mt-2 text-gray-600">Use the suggestions to improve AI discoverability.</p>
          </li>
        </ol>
      </section>

      {/* dynamic result card (same as önceki) */}
      <div className="mx-auto max-w-6xl px-6">
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.4 }}
              className="mt-4 w-full max-w-2xl rounded-2xl border border-gray-200 bg-white/60 backdrop-blur-sm shadow-sm p-6"
            >
              <div className="text-sm text-gray-500">{result.url}</div>
              <div className="mt-2 text-4xl font-bold text-gray-900">
                {result.score}/100
              </div>

              <div className="mt-3 grid gap-1.5 text-sm text-gray-700">
                <div>Title: {result.heur.title ? '✅' : '⚠️ missing'}</div>
                <div>Description: {result.heur.desc ? '✅' : '⚠️ missing'}</div>
                <div>
                  Robots meta:{' '}
                  {/noindex|nofollow/i.test(result.heur.robots)
                    ? '⚠️ check'
                    : '✅ ok'}
                </div>
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
                  <div className="mt-4 font-semibold text-gray-800">Suggestions</div>
                  <ul className="mt-2 list-disc pl-6 text-gray-700 text-sm">
                    {result.suggestions.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">FAQ</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-gray-200 p-6 bg-white">
            <div className="font-semibold">What is GEO?</div>
            <p className="mt-2 text-gray-600">
              Generative Engine Optimization helps your brand be referenced by AI assistants and LLMs.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 p-6 bg-white">
            <div className="font-semibold">Do you store my data?</div>
            <p className="mt-2 text-gray-600">
              No. We fetch only the URL you scan and don’t persist results on our servers.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 p-6 bg-white">
            <div className="font-semibold">Is this an SEO tool?</div>
            <p className="mt-2 text-gray-600">
              It overlaps with SEO, but specifically targets signals LLMs rely on.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 p-6 bg-white">
            <div className="font-semibold">What’s next?</div>
            <p className="mt-2 text-gray-600">
              LLM-powered rewrites, multi-URL sitemap scans and exports.
            </p>
          </div>
        </div>
      </section>

      {/* footer */}
      <footer className="border-t border-gray-200">
        <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-gray-500 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
          <div>© 2025 SeenByGeo</div>
          <div className="flex gap-4">
            <a href="#features" className="hover:text-gray-800">Features</a>
            <a href="#how" className="hover:text-gray-800">How it works</a>
            <a href="#faq" className="hover:text-gray-800">FAQ</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
