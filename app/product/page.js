export const metadata = { title: "Product · SeenByGeo" };

const cards = [
  { t:"Scan", d:"Analyze metadata, links and structure to score AI visibility.", c:"Run a scan", h:"/#scan" },
  { t:"Fix", d:"Actionable rewrites for titles, descriptions, schema and robots.", c:"See suggestions", h:"/playbooks" },
  { t:"Publish", d:"Generate AI-friendly summary pages that models can cite.", c:"Generate page", h:"/playbooks" },
  { t:"Track Mentions", d:"Monitor how models mention your brand.", c:"View feed", h:"/news" },
  { t:"Compare", d:"Benchmark your visibility vs competitors.", c:"Try benchmark", h:"/playbooks" },
  { t:"Citations Feed", d:"Live AI responses referencing your domain (soon).", c:"Notify me", h:"/company" },
];

export default function Product() {
  return (
    <main className="bg-white">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">Tools for every step</h1>
        <p className="mt-4 text-gray-600 max-w-2xl">Scan, fix, publish and track your visibility across AI engines.</p>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((c)=>(
            <div key={c.t} className="rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-md transition">
              <div className="text-lg font-semibold">{c.t}</div>
              <p className="mt-2 text-gray-600">{c.d}</p>
              <a href={c.h} className="mt-4 inline-flex text-sm font-medium text-gray-900 underline underline-offset-4">{c.c} →</a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
