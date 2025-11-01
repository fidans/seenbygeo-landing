"use client";
import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  return (
    <header className="bg-white/90 backdrop-blur border-b border-gray-200">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight flex items-center gap-2">
          <Image src="/logo.svg" alt="Seenby GEO" width={28} height={28} />
          <span>SeenByGeo</span>
        </Link>
        <nav className="hidden sm:flex items-center gap-6 text-sm text-gray-600">
          <Link href="/product" className="hover:text-gray-900">Product</Link>
          <Link href="/playbooks" className="hover:text-gray-900">Playbooks</Link>
          <Link href="/pricing" className="hover:text-gray-900">Pricing</Link>          
          <Link href="/news" className="hover:text-gray-900">News</Link>
          <Link href="/company" className="hover:text-gray-900">Company</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/product" className="text-sm px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-50">
            Explore
          </Link>
          <a href="#scan" className="text-sm px-3 py-1.5 rounded-lg bg-gray-900 text-white hover:bg-gray-800">
            Run Scan
          </a>
        </div>
      </div>
    </header>
  );
}
