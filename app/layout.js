export const metadata = {
  title: "SeenByGeo — Your website, seen by AI.",
  description:
    "SeenByGeo helps your website become visible to AI models like ChatGPT, Perplexity, and Gemini.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
