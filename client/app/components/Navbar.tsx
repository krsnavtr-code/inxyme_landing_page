"use client";

import { useState } from "react";

interface NavbarProps {
  universityName: string;
  programName: string;
  subdomain: string;
}

export default function Navbar({
  universityName,
  programName,
  subdomain,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Overview", href: "#overview" },
    { label: "Specialisations", href: "#specialisations" },
    { label: "Curriculum", href: "#curriculum" },
    { label: "Fees", href: "#fees" },
    { label: "Eligibility", href: "#eligibility" },
    { label: "Career", href: "#career" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="w-[min(1240px,94%)] mx-auto h-18 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <a
            href="#top"
            className="flex items-center"
          >
            <img
              src="/images/Inxyme%20png%20logo.png"
              alt="Inxyme"
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </a>
          <span className="hidden sm:inline-block h-6 w-px bg-slate-200"></span>
          <span className="hidden sm:inline-block text-xs font-semibold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
            {universityName}
          </span>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-700">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#1565c0] transition-colors py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="#counselling"
            className="bg-[#20c96b] hover:bg-[#1bb35e] text-white text-xs md:text-sm font-bold px-4 py-2.5 rounded-full shadow-sm hover:shadow transition-all flex items-center gap-1.5"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            Talk to Expert
          </a>
          <a
            href="#counselling"
            className="bg-[#1565c0] hover:bg-[#0d47a1] text-white text-xs md:text-sm font-bold px-4 py-2.5 rounded-full shadow-sm hover:shadow transition-all"
          >
            Apply Now
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 pb-2 border-b border-slate-100">
            {programName}
          </div>
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-700 font-medium hover:text-[#1565c0] py-1 text-sm"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <a
              href="#counselling"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-[#20c96b] text-white text-sm font-bold py-2.5 rounded-lg shadow-xs"
            >
              Talk to Expert
            </a>
            <a
              href="#counselling"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-[#1565c0] text-white text-sm font-bold py-2.5 rounded-lg shadow-xs"
            >
              Apply for Admission
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
