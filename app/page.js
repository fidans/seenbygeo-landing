'use client';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900 px-6">
      <header className="absolute top-6 left-6 text-sm font-medium text-gray-500">
        SeenByGeo
      </header>

      <section className="text-center">
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight mb-4">
          Your website, <span className="text-gray-800">seen by AI.</span>
        </h1>
        <p className="text-gray-500 text-lg max-w-lg mx-auto leading-relaxed">
          A minimal GEO audit tool for the AI era. Understand how ChatGPT and Perplexity read your site.
        </p>

        <button
          className="mt-10 px-6 py-3 rounded-lg border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition text-gray-800"
          onClick={() => alert('Coming soon!')}
        >
          Scan my website →
        </button>
      </section>

      <footer className="absolute bottom-6 text-gray-400 text-sm">
        © 2025 SeenByGeo
      </footer>
    </main>
  );
}
