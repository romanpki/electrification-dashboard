"use client";

import { useState } from "react";
import Link from "next/link";

const SECTOR_LINKS = [
  { label: "Résidentiel", href: "/secteur/residentiel" },
  { label: "Tertiaire", href: "/secteur/tertiaire" },
  { label: "Industrie", href: "/secteur/industrie" },
  { label: "Transports", href: "/secteur/transports" },
  { label: "Agriculture", href: "/secteur/agriculture" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sectorsOpen, setSectorsOpen] = useState(false);

  return (
    <header className="bg-wavestone-deep text-white sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"
                fill="#00C853"
                stroke="#00C853"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Électrification France</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link
              href="/"
              className="hover:text-wavestone-green transition-colors"
            >
              Accueil
            </Link>

            {/* Sectors dropdown */}
            <div className="relative">
              <button
                onClick={() => setSectorsOpen(!sectorsOpen)}
                onBlur={() => setTimeout(() => setSectorsOpen(false), 150)}
                className="flex items-center gap-1 hover:text-wavestone-green transition-colors"
              >
                Secteurs
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="currentColor"
                  className={`transition-transform ${sectorsOpen ? "rotate-180" : ""}`}
                >
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
              </button>
              {sectorsOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 rounded-lg bg-white text-wavestone-deep shadow-lg py-2 z-50">
                  {SECTOR_LINKS.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className="block px-4 py-2 hover:bg-wavestone-light transition-colors text-sm"
                      onClick={() => setSectorsOpen(false)}
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/sankey"
              className="hover:text-wavestone-green transition-colors"
            >
              Sankey
            </Link>

            <span className="text-white/50 text-xs ml-4">
              Powered by <span className="font-semibold text-white/70">Wavestone</span>
            </span>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-md hover:bg-white/10 transition-colors"
            aria-label="Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M6 6l12 12M6 18L18 6" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-white/10 px-4 pb-4 pt-2 space-y-1">
          <Link
            href="/"
            className="block py-2 hover:text-wavestone-green transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            Accueil
          </Link>
          <div className="py-2">
            <span className="text-white/60 text-xs uppercase tracking-wider">Secteurs</span>
            <div className="mt-1 ml-3 space-y-1">
              {SECTOR_LINKS.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="block py-1 text-sm hover:text-wavestone-green transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
          <Link
            href="/sankey"
            className="block py-2 hover:text-wavestone-green transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            Sankey
          </Link>
          <div className="pt-3 border-t border-white/10 text-white/50 text-xs">
            Powered by <span className="font-semibold text-white/70">Wavestone</span>
          </div>
        </nav>
      )}
    </header>
  );
}
