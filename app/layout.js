export const metadata = {
  title: "SeenByGeo — Your website, seen by AI.",
  description:
    "Make your website visible to AI models. GEO (Generative Engine Optimization) audits and tools.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
