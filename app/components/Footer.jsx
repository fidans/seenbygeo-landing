// app/components/Footer.jsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200">
      <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-gray-500 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        
        <div>© 2026 SeenByGeo</div>

        <div className="flex flex-wrap gap-4">
          <Link href="/product" className="hover:text-gray-800">
            Product
          </Link>
          <Link href="/playbooks" className="hover:text-gray-800">
            Playbooks
          </Link>
          <Link href="/research" className="hover:text-gray-800">
            Research
          </Link>
          <Link href="/research/phase-1a-agent-preference-momentum" className="hover:text-gray-800">
            Phase-1A
          </Link>
          <Link href="/news" className="hover:text-gray-800">
            News
          </Link>
          <Link href="/company" className="hover:text-gray-800">
            Company
          </Link>
        </div>
      </div>
    </footer>
  );
}
