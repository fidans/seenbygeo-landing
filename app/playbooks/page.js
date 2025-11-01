// app/playbooks/page.js
export const metadata = {
  title: "Playbooks · SeenByGeo",
  description: "Short, practical guides to make your site AI-friendly.",
};

const posts = [
  {
    tag: "Foundations",
    title: "How LLMs pick sources",
    excerpt:
      "Trust, structure and clarity—what actually makes models cite a site.",
    href: "/#scan",
  },
  {
    tag: "Strategy",
    title: "GEO vs SEO",
    excerpt:
      "Keywords aren’t enough. Optimize for how models read and reason.",
    href: "/#scan",
  },
  {
    tag: "Content",
    title: "Prompt-first content patterns",
    excerpt:
      "Sections that map to intents and answer frames used by AI.",
    href: "/#scan",
  },
  {
    tag: "Benchmark",
    title: "ChatGPT vs Perplexity visibility",
    excerpt:
      "Compare mentions, answer quality and source selection across models.",
    href: "/#scan",
  },
];

export default function Playbooks() {
  return (
    <main className="relative bg-white">
      {/* soft glow */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 w-[52rem] h-[52rem] rounded-full"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(57,225,231,0.12) 0%, rgba(255,255,255,0) 70%)",
          filter: "blur(34px)",
        }}
      />
      <section className="relative mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
          Playbooks
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl">
          Short, practical guides. Each ends with a suggested scan and
          ready-to-apply checklist.
        </p>

        {/* Grid */}
        <div className="mt-10 grid sm:grid-cols-2 gap-6">
          {posts.map((p) => (
            <article
              key={p.title}
              className="group rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-md hover:-translate-y-0.5 transition"
            >
              {/* Thumb placeholder */}
              <div className="h-36 rounded-xl bg-gray-100 border border-gray-200 mb-4 overflow-hidden">
                {/* basit çizgisel dekor */}
                <div className="w-full h-full opacity-70"
                     style={{
                       background:
                         "repeating-linear-gradient(135deg,#eee 0,#eee 10px,#f6f6f6 10px,#f6f6f6 20px)",
                     }}/>
              </div>

              <div className="text-xs uppercase tracking-wide text-gray-500">
                {p.tag}
              </div>
              <h3 className="mt-1 text-lg font-semibold group-hover:underline underline-offset-4">
                {p.title}
              </h3>
              <p className="mt-2 text-gray-600">{p.excerpt}</p>

              <a
                href={p.href}
                className="mt-4 inline-flex text-sm font-medium text-gray-900 underline underline-offset-4"
              >
                Run a scan →
              </a>
            </article>
          ))}
        </div>

        {/* CTA bandı */}
        <div className="mt-12 rounded-2xl border border-gray-200 bg-gray-50 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="text-lg font-semibold">Turn insights into actions</div>
            <p className="text-gray-600">
              Paste a URL and get a checklist tailored to your page.
            </p>
          </div>
          <a
            href="/#scan"
            className="px-4 py-2 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition"
          >
            Run a scan
          </a>
        </div>
      </section>
    </main>
  );
}
