// app/company/page.js
export const metadata = {
  title: "Company · SeenByGeo",
  description: "We build visibility for the AI age.",
};

export default function Company() {
  return (
    <main className="relative bg-white">
      {/* soft glow */}
      <div
        className="pointer-events-none absolute -top-44 -right-40 w-[52rem] h-[52rem] rounded-full"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(57,225,231,0.12) 0%, rgba(255,255,255,0) 70%)",
          filter: "blur(34px)",
        }}
      />
      <section className="relative mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
          We build visibility for the AI age.
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl">
          Search engines optimized the web for humans. SeenByGeo optimizes it for
          generative models — ensuring your brand remains visible as discovery shifts to AI.
        </p>

        {/* Two-up cards */}
        <div className="mt-10 grid sm:grid-cols-2 gap-6">
          <article className="rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-md transition">
            <div className="text-lg font-semibold">What we do</div>
            <p className="mt-2 text-gray-600">
              We analyze how models read your pages, suggest concrete fixes, and help you
              publish AI-friendly content that models can cite and understand.
            </p>
            <ul className="mt-4 space-y-2 text-gray-700">
              <li>• GEO scanning & scoring</li>
              <li>• Actionable rewrite suggestions</li>
              <li>• GEO pages & mentions tracking</li>
            </ul>
          </article>

          <article className="rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-md transition">
            <div className="text-lg font-semibold">Contact</div>
            <p className="mt-2 text-gray-600">We’d love to hear from you.</p>
            <div className="mt-4">
              <div className="text-gray-700">hello@seenbygeo.com</div>
              <div className="text-gray-500 text-sm mt-1">Press & Partnerships → press@seenbygeo.com</div>
            </div>
            <div className="mt-6 flex gap-3 text-sm">
              <a href="/news" className="underline underline-offset-4">News</a>
              <a href="/playbooks" className="underline underline-offset-4">Playbooks</a>
              <a href="/product" className="underline underline-offset-4">Product</a>
            </div>
          </article>
        </div>

        {/* Values / Mini manifesto */}
        <section className="mt-12 rounded-2xl border border-gray-200 bg-gray-50 p-6">
          <h2 className="text-lg font-semibold">Principles</h2>
          <div className="mt-4 grid md:grid-cols-3 gap-6">
            {[
              ["Clarity first", "We make outputs human-readable and easy to act on."],
              ["Model-aware", "We test changes against how LLMs actually read and cite."],
              ["Privacy-respecting", "We fetch only the URL you provide for scans."],
            ].map(([t, d]) => (
              <div key={t}>
                <div className="font-medium">{t}</div>
                <div className="text-gray-600 mt-1">{d}</div>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
