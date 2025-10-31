// app/layout.js
import "./globals.css";
export const metadata = {
  title: "SeenByGeo",
  description: "Scan pages for AI-visibility heuristics.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
