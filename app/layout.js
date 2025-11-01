import "./globals.css";
import { Inter } from "next/font/google";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Seenby GEO",
  description: "Generative Engine Optimization",
  icons: {
    icon: "/logo-32.png",
  },
  openGraph: {
    images: ["/logo-512.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + " min-h-screen bg-white text-gray-900"}>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
