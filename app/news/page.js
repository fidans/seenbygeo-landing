// app/news/page.js
export const metadata = {
  title: "News · SeenByGeo",
  description: "Product updates, research notes and announcements.",
};

const items = [
  {
    tag: "Product",
    date: "Nov 2025",
    title: "Introducing SeenByGeo Beta",
    excerpt:
      "Scan your site for AI-readability and publish GEO-friendly pages.",
    href: "/#scan",
  },
  {
    tag: "Research",
    date: "Dec 2025",
    title: "GEO Benchmark 2025 Released",
    excerpt:
      "A first look at model citation patterns across common intents.",
    href: "/playbooks",
  },
  {
    tag: "News",
    date: "Jan 2026",
    title: "Partnerships in Progress",
    excerpt:
      "We’re collaborating with early adopters to shape the roadmap.",
    href: "/company",
  },
];

export default function News() {
  return (
    <main className="relative bg-white">
      {/* soft glow */}
      <div
        className="pointer-events-none absolute -top-44 -left-40 w-[52rem] h-[52rem] rounded-full"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(198,255,77,0.12) 0%, rgba(255,255,255,0) 70%)",
          filter: "blur(34px)",
        }}
      />
      <section className="relative mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">News</h1>
        <p className="mt-4 text-gray-600 max-w-2xl">
          Product updates, research notes and announcements from the team.
        </p>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((n) => (
            <article
              key={n.title}
              className="group rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-md hover:-translate-y-0.5 transition"
            >
              {/* Simple thumbnail */}
              <div className="h-32 rounded-xl bg-gray-100 border border-gray-200 mb-4 overflow-hidden">
                <div
                  className="w-full h-full opacity-70"
                  style={{
                    background:
                      "repeating-linear-gradient(135deg,#eee 0,#eee 10px,#f6f6f6 10px,#f6f6f6 20px)",
                  }}
                />
              </div>

              <div className="text-xs uppercase tracking-wide text-gray-500">
                {n.tag} • {n.date}
              </div>
              <h3 className="mt-1 text-lg font-semibold group-hover:underline underline-offset-4">
                {n.title}
              </h3>
              <p className="mt-2 text-gray-600">{n.excerpt}</p>
              <a
                href={n.href}
                className="mt-4 inline-flex text-sm font-medium text-gray-900 underline underline-offset-4"
              >
                Read more →
              </a>
            </article>
          ))}
        </div>

        {/* CTA band */}
        <div className="mt-12 rounded-2xl border border-gray-200 bg-gray-50 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="text-lg font-semibold">Want the latest updates?</div>
            <p className="text-gray-600">Check back here or follow our Playbooks.</p>
          </div>
          <a href="/playbooks" className="px-4 py-2 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition">
            Explore Playbooks
          </a>
        </div>
      </section>
    </main>
  );
}
