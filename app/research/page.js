export const metadata = {
  title: "Research | SeenByGeo",
  description:
    "SeenByGeo Research publications on Generative Engine Optimization and agentic source-selection behavior.",
};

export default function ResearchPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">Research</h1>
        <p className="mt-3 max-w-3xl text-base text-gray-600">
          Publications and experimental reports from the SeenByGeo research program.
          These pages provide AI-readable summaries plus downloadable PDFs.
        </p>
      </header>

      <section className="grid gap-6">
        <a
          href="/research/phase-1a-agent-preference-momentum"
          className="rounded-2xl border border-gray-200 p-6 shadow-sm transition hover:shadow-md"
        >
          <div className="flex flex-col gap-2">
            <div className="text-xs font-medium text-gray-500">Phase-1A • Whitepaper</div>
            <h2 className="text-xl font-semibold">
              Early Evidence of Agent Preference Momentum in Frontier Language Models
            </h2>
            <p className="text-sm text-gray-600">
              An observational study in U.S. immigration guidance. Introduces APM and reports
              early evidence of directional, time-consistent source-selection patterns.
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
              <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-700">
                Observational
              </span>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-700">
                Stateless daily runs
              </span>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-700">
                Source selection
              </span>
            </div>
          </div>
        </a>
      </section>
    </main>
  );
}
