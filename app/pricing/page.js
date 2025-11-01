// app/pricing/page.js
export const metadata = {
  title: "Pricing · SeenByGeo",
  description: "Simple plans for getting visible in AI.",
};

const plans = [
  {
    name: "Starter",
    price: "$29",
    period: "/mo",
    highlight: false,
    features: [
      "3 scans / month",
      "Basic fix suggestions",
      "1 site for GEO pages",
      "Email support",
    ],
    cta: "Get Started",
    href: "/#scan",
    tone: "light",
  },
  {
    name: "Pro",
    price: "$79",
    period: "/mo",
    highlight: true,
    features: [
      "20 scans / month",
      "Full fix suggestions",
      "3 sites for GEO pages",
      "Mentions tracking",
      "Priority support",
    ],
    cta: "Start Pro",
    href: "/#scan",
    tone: "dark",
  },
];

export default function Pricing() {
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
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">Pricing</h1>
        <p className="mt-4 text-gray-600 max-w-2xl">
          Start with Starter, upgrade anytime. No setup fees, cancel anytime.
        </p>

        <div className="mt-10 grid md:grid-cols-2 gap-6">
          {plans.map((p) => (
            <article
              key={p.name}
              className={
                p.tone === "dark"
                  ? "rounded-2xl border border-gray-900 bg-black p-6 text-white"
                  : "rounded-2xl border border-gray-200 bg-white p-6"
              }
            >
              {p.highlight && (
                <div className={p.tone === "dark"
                    ? "inline-block text-xs uppercase tracking-wide px-2 py-1 rounded-full bg-white/10 border border-white/20"
                    : "inline-block text-xs uppercase tracking-wide px-2 py-1 rounded-full bg-gray-100 border border-gray-200"}>
                  Recommended
                </div>
              )}

              <div className="flex items-baseline gap-2 mt-3">
                <div className={p.tone === "dark" ? "text-3xl font-semibold" : "text-3xl font-semibold"}>
                  {p.price}
                </div>
                <div className={p.tone === "dark" ? "text-white/60" : "text-gray-500"}>
                  {p.period}
                </div>
              </div>
              <div className={p.tone === "dark" ? "mt-1 font-medium" : "mt-1 font-medium"}>
                {p.name}
              </div>

              <ul className={p.tone === "dark" ? "mt-4 space-y-2 text-white/90" : "mt-4 space-y-2 text-gray-700"}>
                {p.features.map((f) => (
                  <li key={f}>• {f}</li>
                ))}
              </ul>

              <a
                href={p.href}
                className={
                  p.tone === "dark"
                    ? "mt-6 inline-flex rounded-xl bg-white text-black px-4 py-2 hover:bg-white/90 transition"
                    : "mt-6 inline-flex rounded-xl bg-gray-900 text-white px-4 py-2 hover:bg-gray-800 transition"
                }
              >
                {p.cta}
              </a>
            </article>
          ))}
        </div>

        {/* FAQ mini */}
        <section className="mt-12 rounded-2xl border border-gray-200 bg-gray-50 p-6">
          <h2 className="text-lg font-semibold">FAQ</h2>
          <div className="mt-4 grid md:grid-cols-2 gap-6 text-gray-700">
            <div>
              <div className="font-medium">Can I cancel anytime?</div>
              <p className="text-gray-600">Yes. Plans are month-to-month.</p>
            </div>
            <div>
              <div className="font-medium">Do you store my pages?</div>
              <p className="text-gray-600">We only fetch the URL you provide for scans.</p>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
