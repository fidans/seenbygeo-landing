// app/page.js
import Image from "next/image";
import ScanBox from "./components/ScanBox";

export default function Home() {
  return (
    <main className="relative bg-white">
      {/* --- Global background glows (Runway-style) --- */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        {/* soft cyan pool */}
        <div
          className="absolute -top-40 -right-40 w-[60rem] h-[60rem] rounded-full"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(57,225,231,0.20) 0%, rgba(255,255,255,0) 70%)",
            filter: "blur(36px)",
          }}
        />
        {/* lime tint */}
        <div
          className="absolute -bottom-72 -left-52 w-[56rem] h-[56rem] rounded-full"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(198,255,77,0.14) 0%, rgba(255,255,255,0) 70%)",
            filter: "blur(32px)",
          }}
        />
      </div>

      <section className="relative mx-auto max-w-6xl px-6 pt-24 pb-12 text-center">
        {/* --- Logo + Heading on the same line --- */}
        <div className="relative inline-flex items-center gap-3">
          {/* logo glow just behind the logo */}
          <div
            className="absolute -z-10 left-1/2 top-1/2 w-40 h-40 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle at center, rgba(99,102,241,0.25) 0%, rgba(56,189,248,0.18) 40%, rgba(255,255,255,0) 70%)",
            }}
            aria-hidden="true"
          />
          <Image
            src="/logo.svg"
            alt="SeenByGeo"
            width={110}
            height={110}
            className="select-none"
            priority
          />
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
            Be discoverable by AI.
          </h1>
        </div>

        <p className="text-gray-600 mt-5 max-w-2xl mx-auto">
          SeenByGeo scores your pages for Generative Engine Optimization (GEO) — then tells you exactly what to fix.
        </p>

        {/* Scan box */}
        <div className="max-w-3xl mx-auto">
          <ScanBox />
          <div className="mt-3 text-sm text-gray-500 text-left">
            No signup. We fetch only the URL you provide.
          </div>
        </div>

        {/* Example chips */}
        <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm">
          {[
            "Analyze my pricing page for AI readability",
            "See how ChatGPT describes seenbygeo.com",
            "Generate GEO-friendly summary for my docs",
          ].map((t) => (
            <span
              key={t}
              className="px-3 py-1.5 rounded-full bg-gray-100 border border-gray-200 text-gray-600"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Feature grid with neutral checks */}
        <div className="mt-12 grid md:grid-cols-2 gap-6 text-left">
          <FeatureCard
            title="Instant output"
            subtitle="AI-Visibility Score"
            items={["Title / Description", "JSON-LD", "Words", "Sitemap"]}
          />
          <FeatureCard
            title="Made for modern marketing teams"
            items={["Robots / Canonical", "Headings", "Internal Links", "robots.txt"]}
          />
        </div>
      </section>

      {/* What you get */}
      <section id="features" className="mx-auto max-w-6xl px-6 pb-12">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">What you get</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {[
            ["AI-Visibility Score","Heuristic scoring across metadata, structure and crawlability."],
            ["Actionable fixes","Human-readable suggestions for titles, descriptions, schema and robots."],
            ["Sitemap & robots","Checks for /sitemap.xml and /robots.txt presence and validity."]
          ].map(([title,desc]) => (
            <div key={title} className="rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-md transition">
              <div className="font-semibold">{title}</div>
              <p className="text-gray-600 mt-2">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing band (home içi kısa) */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Pricing</h2>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <PricingCard
            tone="light"
            price="$29"
            period="/mo"
            name="Starter"
            features={["3 scans / month","Basic fixes","GEO pages (1 site)"]}
            href="#scan"
            cta="Get Started"
          />
          <PricingCard
            tone="dark"
            price="$79"
            period="/mo"
            name="Pro"
            badge="Recommended"
            features={["20 scans / month","Full fix suggestions","GEO pages (3 sites)","Mentions tracking"]}
            href="#scan"
            cta="Start Pro"
          />
        </div>
      </section>
    </main>
  );
}

/* --- small presentational helpers --- */

function CheckIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={"w-4 h-4 " + className} aria-hidden="true">
      <path d="M5 12l4 4 10-10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function FeatureCard({ title, subtitle, items = [] }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-md transition">
      <h3 className="text-lg font-semibold">{title}</h3>
      {subtitle && <p className="text-gray-600 mt-2">{subtitle}</p>}
      <ul className="mt-4 space-y-2 text-gray-700">
        {items.map((x) => (
          <li key={x} className="flex items-center gap-2">
            <CheckIcon className="text-gray-900" />
            <span>{x}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PricingCard({ tone = "light", price, period, name, features, href, cta, badge }) {
  const dark = tone === "dark";
  return (
    <div className={dark ? "rounded-2xl border border-gray-900 bg-black p-6 text-white"
                         : "rounded-2xl border border-gray-200 bg-white p-6"}>
      {badge && (
        <div className={dark
            ? "inline-block text-xs uppercase tracking-wide px-2 py-1 rounded-full bg-white/10 border border-white/20"
            : "inline-block text-xs uppercase tracking-wide px-2 py-1 rounded-full bg-gray-100 border border-gray-200"}>
          {badge}
        </div>
      )}
      <div className="flex items-baseline gap-2 mt-3">
        <div className="text-3xl font-semibold">{price}</div>
        <div className={dark ? "text-white/60" : "text-gray-500"}>{period}</div>
      </div>
      <div className="mt-1 font-medium">{name}</div>
      <ul className={dark ? "mt-4 space-y-2 text-white/90" : "mt-4 space-y-2 text-gray-700"}>
        {features.map((f) => <li key={f}>• {f}</li>)}
      </ul>
      <a
        href={href}
        className={dark
          ? "mt-6 inline-flex rounded-xl bg-white text-black px-4 py-2 hover:bg-white/90 transition"
          : "mt-6 inline-flex rounded-xl bg-gray-900 text-white px-4 py-2 hover:bg-gray-800 transition"}
      >
        {cta}
      </a>
    </div>
  );
}
