export const metadata = {
  title:
    "Phase-1A: Agent Preference Momentum in Frontier Language Models | SeenByGeo Research",
  description:
    "Phase-1A observational study introducing Agent Preference Momentum (APM) and measuring time-consistent source-selection shifts in U.S. immigration guidance.",
  alternates: {
    canonical: "/research/phase-1a-agent-preference-momentum",
  },
};

const PDF_URL = "/research/phase-1a-agent-preference-momentum.pdf";

export default function Phase1APage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16">
      <header className="mb-10">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
          <span>SeenByGeo Research</span>
          <span className="text-gray-400">•</span>
          <span>Phase-1A Whitepaper</span>
        </div>

        <h1 className="text-3xl font-semibold tracking-tight">
          Early Evidence of Agent Preference Momentum in Frontier Language Models
        </h1>
        <p className="mt-2 text-base text-gray-600">
          Phase-1A: An Observational Study in U.S. Immigration Guidance
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={PDF_URL}
            className="rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-black"
          >
            Download PDF
          </a>
          <a
            href="#how-to-cite"
            className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-50"
          >
            How to cite
          </a>
        </div>
      </header>

      {/* TL;DR */}
      <section className="mb-10 rounded-2xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-lg font-semibold">TL;DR</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-gray-700">
          <li>
            Introduces <span className="font-medium">Agent Preference Momentum (APM)</span>:
            directional, time-consistent shifts in an agent’s source selection under stable context.
          </li>
          <li>
            Phase-1A is strictly <span className="font-medium">observational</span> (no controlled intervention).
          </li>
          <li>
            Uses a fixed prompt set and an external, non-owned domain ecosystem in U.S. immigration guidance.
          </li>
          <li>
            Runs stateless daily measurements across three frontier paradigms:
            conversational-first, safety-first, and search-native systems.
          </li>
          <li>
            Finds early evidence that source selection is not purely static or stochastic, but can show
            persistent directional patterns over days.
          </li>
        </ul>
      </section>

      {/* Key Findings */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold">Key findings</h2>
        <p className="mt-2 text-sm text-gray-600">
          (We can replace these with your exact Phase-1A numbers once we paste the results table.)
        </p>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 p-5 shadow-sm">
            <div className="text-xs font-medium text-gray-500">Finding</div>
            <div className="mt-2 text-sm text-gray-800">
              Directional reference patterns persist across days under stable prompts and stateless runs.
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 p-5 shadow-sm">
            <div className="text-xs font-medium text-gray-500">Finding</div>
            <div className="mt-2 text-sm text-gray-800">
              Preference dynamics appear across different system paradigms (chat, safety, search-native).
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 p-5 shadow-sm">
            <div className="text-xs font-medium text-gray-500">Finding</div>
            <div className="mt-2 text-sm text-gray-800">
              Signals emerge without explicit optimization, suggesting an evolving decision layer.
            </div>
          </div>
        </div>
      </section>

      {/* Abstract */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold">Abstract</h2>
        <div className="mt-4 space-y-4 text-sm leading-6 text-gray-700">
          <p>
            Large language models (LLMs) increasingly function as agentic intermediaries in high-stakes
            informational domains, shaping user decisions not only through generated answers but also
            through implicit source selection and prioritization. Despite growing attention to answer
            accuracy and hallucination mitigation, the temporal dynamics of source selection behavior
            remain largely unexplored.
          </p>
          <p>
            In this study, we introduce Agent Preference Momentum (APM) as a conceptual construct
            describing directional and time-consistent shifts in an agent’s source selection behavior
            under fixed contextual conditions. Rather than treating source references as static or
            purely stochastic events, APM frames source selection as an evolving decision layer within
            agentic systems.
          </p>
          <p>
            We present Phase-1A of a multi-phase research program, designed as a strictly observational
            study with no controlled intervention. Using a fixed prompt set and an external, non-owned
            domain ecosystem in the context of U.S. immigration guidance, we conduct stateless, daily
            measurements across three frontier language model paradigms: conversational-first,
            safety-first, and search-native systems. Source references are tracked over time to identify
            early signals of preference momentum while controlling for personalization and session bias.
          </p>
          <p>
            Our results provide initial evidence that source selection behavior is not purely static,
            but exhibits directional patterns that persist across days and models under stable conditions.
            These findings suggest that agentic language systems may develop emergent preference dynamics
            independent of explicit optimization.
          </p>
          <p>
            We discuss the implications of Agent Preference Momentum for agent-mediated decision systems,
            information reliability, and future optimization frameworks. This phase establishes the
            empirical groundwork for subsequent controlled intervention studies aimed at testing the
            responsiveness and steer-ability of observed preference momentum.
          </p>
        </div>
      </section>

      {/* Method Snapshot */}
      <section className="mb-10 rounded-2xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Method snapshot (Phase-1A)</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-gray-700">
          <li>Study type: observational, no intervention.</li>
          <li>Design: fixed prompt set; stateless daily runs to reduce session/personalization effects.</li>
          <li>Domain context: U.S. immigration guidance using an external, non-owned domain ecosystem.</li>
          <li>Systems compared: conversational-first, safety-first, search-native paradigms.</li>
          <li>Outcome tracked: time-series of cited/source-referenced domains to detect directional shifts (APM).</li>
        </ul>
      </section>

      {/* Download */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold">Download</h2>
        <p className="mt-2 text-sm text-gray-600">
          Full paper PDF for sharing, archiving, and citation.
        </p>
        <div className="mt-4">
          <a
            href={PDF_URL}
            className="inline-flex rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-black"
          >
            Download Phase-1A PDF
          </a>
        </div>
      </section>

      {/* How to cite */}
      <section id="how-to-cite" className="mb-4">
        <h2 className="text-xl font-semibold">How to cite</h2>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 p-5 shadow-sm">
            <div className="text-xs font-medium text-gray-500">APA (suggested)</div>
            <p className="mt-2 text-sm text-gray-800">
              SeenByGeo Research. (2026). <em>Early Evidence of Agent Preference Momentum in Frontier Language Models:
              Phase-1A: An Observational Study in U.S. Immigration Guidance</em>. SeenByGeo.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 p-5 shadow-sm">
            <div className="text-xs font-medium text-gray-500">BibTeX (suggested)</div>
            <pre className="mt-2 overflow-auto rounded-xl bg-gray-50 p-4 text-xs text-gray-800">
{`@techreport{seenbygeo_phase1a_2026,
  title        = {Early Evidence of Agent Preference Momentum in Frontier Language Models: Phase-1A},
  institution  = {SeenByGeo Research},
  year         = {2026},
  url          = {https://www.seenbygeo.com/research/phase-1a-agent-preference-momentum}
}`}
            </pre>
          </div>
        </div>
      </section>
    </main>
  );
}
