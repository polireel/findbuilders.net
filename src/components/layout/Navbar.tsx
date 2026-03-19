"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const NAVY = "#0F3D66";

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/submit-project", label: "Submit Project" },
    { href: "/contact", label: "Contact" },
    { href: "/blog", label: "Blog" },
    { href: "/pricing", label: "Pricing" },
    { href: "/register-contractor", label: "Register as Contractor" },
    { href: "/become-advertiser", label: "Become an Advertiser" },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded flex items-center justify-center" style={{ backgroundColor: NAVY }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/>
              <rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>
            </svg>
          </div>
          <span className="font-bold text-base" style={{ color: NAVY }}>FindBuilders.net</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm font-medium rounded transition-colors"
              style={{
                color: isActive(link.href) ? NAVY : "#4a5568",
                backgroundColor: isActive(link.href) ? "#e8f0f8" : "transparent",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/auth"
            className="ml-2 px-5 py-2 rounded text-sm font-semibold text-white transition-colors"
            style={{ backgroundColor: NAVY }}
          >
            Login
          </Link>
        </nav>

        <button
          className="lg:hidden p-2 rounded text-gray-600"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 px-4 py-4 flex flex-col gap-1 shadow-md">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2.5 text-sm font-medium rounded"
              style={{ color: isActive(link.href) ? NAVY : "#4a5568", backgroundColor: isActive(link.href) ? "#e8f0f8" : "transparent" }}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/auth"
            className="mt-2 w-full px-4 py-3 rounded text-sm font-semibold text-white text-center"
            style={{ backgroundColor: NAVY }}
            onClick={() => setMobileOpen(false)}
          >
            Login
          </Link>
        </div>
      )}
    </header>
  );
}
