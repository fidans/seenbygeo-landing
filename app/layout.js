// app/layout.js
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://www.seenbygeo.com"),
  title: {
    default: "SeenByGeo — Generative Engine Optimization",
    template: "%s · SeenByGeo"
  },
  description:
    "SeenByGeo scans your pages for AI-visibility. Get an instant heuristic score and concrete fixes for titles, meta, schema, and robots.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://www.seenbygeo.com/",
    title: "SeenByGeo — Your website, seen by AI",
    description:
      "Quick scan for AI-visibility (GEO): titles, meta, schema, robots, sitemap and more.",
    siteName: "SeenByGeo",
    images: [
      {
        url: "/og.png", // (ileride ekleriz, yoksa yok sayılır)
        width: 1200,
        height: 630,
        alt: "SeenByGeo — Scan your website"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "SeenByGeo — Your website, seen by AI",
    description:
      "Instant AI-visibility score and actionable fixes.",
    images: ["/og.png"]
  },
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({ children }) {
  // JSON-LD: Organization + WebSite
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SeenByGeo",
    url: "https://www.seenbygeo.com",
    logo: "https://www.seenbygeo.com/favicon.ico",
    sameAs: ["https://www.seenbygeo.com"]
  };
  const siteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SeenByGeo",
    url: "https://www.seenbygeo.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.seenbygeo.com/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en">
      <body className="min-h-screen antialiased bg-white text-gray-900 font-sans leading-relaxed">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
