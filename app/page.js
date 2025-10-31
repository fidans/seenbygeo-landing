'use client';
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <header className="absolute top-6 left-6 text-sm text-gray-500">
        <span className="font-semibold text-gray-700">SeenByGeo</span>
      </header>

      <section className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Your website, <span className="text-blue-600">seen by AI.</span>
        </h1>
        <p className="mt-4 text-gray-600 max-w-xl mx-auto">
          Ship a GEO-ready site. We audit your pages for AI visibility and
          provide clear fixes.
        </p>

        <button
          className="mt-8 px-6 py-3 rounded-full bg-blue-600 text-white text-lg hover:bg-blue-700 transition active:scale-95"
          onClick={() => alert("Coming soon!")}
        >
          Scan my website
        </button>
      </section>

      <footer className="absolute bottom-6 text-gray-500 text-sm">
        © 2025 SeenByGeo
      </footer>
    </main>
  );
}
