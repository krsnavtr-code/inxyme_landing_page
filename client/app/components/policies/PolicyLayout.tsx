import React from "react";
import Link from "next/link";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaFileContract,
  FaInfoCircle,
  FaExclamationTriangle,
  FaHeadset,
  FaGraduationCap,
} from "react-icons/fa";

interface PolicyLayoutProps {
  title: string;
  subtitle?: string;
  lastUpdated?: string;
  badge?: string;
  children: React.ReactNode;
}

export default function PolicyLayout({
  title,
  subtitle,
  lastUpdated = "September 2026",
  badge = "Official Policy & Transparency",
  children,
}: PolicyLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased font-sans">
      {/* ── HEADER / TOP NAVBAR ── */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="w-[min(1240px,94%)] mx-auto h-20 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/images/Inxyme%20png%20logo.png"
              alt="Inxyme"
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
            <Link
              href="/"
              className="hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about-us"
              className="hover:text-blue-600 transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/disclaimer"
              className="hover:text-blue-600 transition-colors"
            >
              Disclaimer
            </Link>
            <Link
              href="/privacy-policy"
              className="hover:text-blue-600 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-conditions"
              className="hover:text-blue-600 transition-colors"
            >
              Terms &amp; Conditions
            </Link>
            <Link
              href="/contact-us"
              className="hover:text-blue-600 transition-colors"
            >
              Contact Us
            </Link>
          </nav>

          {/* Quick Contact CTA */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+919990999561"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <FaPhone className="text-blue-600 text-xs" />
              <span>+91 9990999561</span>
            </a>
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all"
            >
              <FaHeadset className="text-xs" />
              <span>Support / Enquire</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ── HERO BANNER ── */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-[#0a192f] text-white py-14 border-b border-slate-800">
        <div className="w-[min(1240px,94%)] mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-slate-200 font-medium">{title}</span>
          </div>

          <div className="max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-bold rounded-full border border-blue-400/30">
              <FaShieldAlt className="text-xs" />
              {badge}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {subtitle}
              </p>
            )}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <span>Last Updated: <strong className="text-slate-200">{lastUpdated}</strong></span>
              <span>•</span>
              <span>Entity: <strong className="text-slate-200">Inxyme E-Learning</strong></span>
              <span>•</span>
              <span>Compliant with Google Ads Policies</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 py-12 md:py-16">
        <div className="w-[min(1240px,94%)] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Main Policy Body */}
            <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm">
              <article className="prose prose-slate max-w-none prose-headings:font-black prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-relaxed prose-li:text-slate-600 prose-strong:text-slate-900 prose-a:text-blue-600 hover:prose-a:underline">
                {children}
              </article>
            </div>

            {/* Sidebar with Company & Transparency Cards */}
            <aside className="lg:col-span-4 space-y-6">
              {/* Business Identity Card */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
                  <FaInfoCircle className="text-blue-600" />
                  Business Identity
                </h3>
                <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
                  <div>
                    <span className="font-bold text-slate-800 block">Platform Name:</span>
                    <span>Inxyme (Inxyme E-Learning)</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 block">Nature of Business:</span>
                    <span>Independent Professional E-Learning &amp; Job-Ready Skills Certification Training Provider</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 block">Head Office / Location:</span>
                    <span className="flex items-start gap-1.5 mt-0.5">
                      <FaMapMarkerAlt className="text-blue-500 shrink-0 mt-0.5" />
                      <span>B-127, B Block, Sector 2, Noida, Uttar Pradesh 201301, India</span>
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 block">Official Support Contact:</span>
                    <div className="space-y-1 mt-1">
                      <a href="tel:+919990999561" className="flex items-center gap-1.5 text-blue-600 hover:underline">
                        <FaPhone className="text-slate-400" />
                        <span>+91 9990999561</span>
                      </a>
                      <a href="mailto:info@inxyme.com" className="flex items-center gap-1.5 text-blue-600 hover:underline">
                        <FaEnvelope className="text-slate-400" />
                        <span>info@inxyme.com</span>
                      </a>
                    </div>
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 block">Operating Hours:</span>
                    <span>Monday to Saturday: 9:30 AM – 6:30 PM (IST)</span>
                  </div>
                </div>
              </div>

              {/* Policy Quick Links */}
              <div className="bg-slate-100/80 rounded-2xl p-6 border border-slate-200/80 space-y-3">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <FaFileContract className="text-indigo-600" />
                  Legal &amp; Policy Pages
                </h3>
                <ul className="space-y-2 text-xs font-semibold">
                  <li>
                    <Link
                      href="/about-us"
                      className="block p-2.5 rounded-lg bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 transition-colors"
                    >
                      About Inxyme &amp; Business Profile →
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy-policy"
                      className="block p-2.5 rounded-lg bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 transition-colors"
                    >
                      Privacy Policy &amp; Data Protection →
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms-conditions"
                      className="block p-2.5 rounded-lg bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 transition-colors"
                    >
                      Terms of Service &amp; Enrollment Terms →
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/disclaimer"
                      className="block p-2.5 rounded-lg bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 transition-colors"
                    >
                      Statutory &amp; Trademark Disclaimer →
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact-us"
                      className="block p-2.5 rounded-lg bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 transition-colors"
                    >
                      Contact Us &amp; Student Grievance →
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Non-Affiliation Callout */}
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 space-y-2 text-xs text-amber-900 leading-relaxed">
                <div className="font-bold flex items-center gap-1.5 text-amber-800">
                  <FaExclamationTriangle className="text-amber-600" />
                  <span>Important Trademark Note</span>
                </div>
                <p>
                  SAP, SAP S/4HANA, ABAP, FICO, MM, SD, and other SAP product names are registered trademarks of SAP SE in Germany and other countries. Inxyme is an independent education provider and is not affiliated with or endorsed by SAP SE.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-950 text-slate-400 text-xs py-14 border-t border-slate-800">
        <div className="w-[min(1240px,94%)] mx-auto space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
            {/* Col 1: Identity */}
            <div className="space-y-4">
              <Link href="/" className="inline-block bg-white/95 px-3 py-1.5 rounded-xl shadow-xs">
                <img
                  src="/images/Inxyme%20png%20logo.png"
                  alt="Inxyme"
                  className="h-10 w-auto object-contain"
                />
              </Link>
              <p className="text-[12px] leading-relaxed text-slate-400">
                Inxyme is an independent premier e-learning platform providing industry-relevant, job-oriented professional certification courses designed for modern careers.
              </p>
              <div className="pt-1 text-[11px] text-slate-500">
                Official Entity: Inxyme E-Learning
              </div>
            </div>

            {/* Col 2: Legal & Policies */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-white uppercase tracking-wider">
                Legal &amp; Transparency
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <Link href="/about-us" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-conditions" className="hover:text-white transition-colors">
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/disclaimer" className="hover:text-white transition-colors">
                    Disclaimer &amp; Trademarks
                  </Link>
                </li>
                <li>
                  <Link href="/contact-us" className="hover:text-white transition-colors">
                    Contact Us &amp; Support
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Certification Programs */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-white uppercase tracking-wider">
                Featured Programs
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <a href="/sap" className="hover:text-white transition-colors">
                    SAP Certification Training (S/4HANA, FICO, MM, ABAP)
                  </a>
                </li>
                <li>
                  <a href="/data-science" className="hover:text-white transition-colors">
                    Data Science Certification Program
                  </a>
                </li>
                <li>
                  <a href="/ai-ml" className="hover:text-white transition-colors">
                    AI &amp; Machine Learning Specialization
                  </a>
                </li>
                <li>
                  <a href="/fde" className="hover:text-white transition-colors">
                    Full Stack Development (FDE)
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 4: Corporate Contact */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-white uppercase tracking-wider">
                Contact &amp; Location
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li className="flex items-start gap-2">
                  <FaMapMarkerAlt className="text-blue-500 shrink-0 mt-0.5" />
                  <span>B-127, B Block, Sector 2, Noida, Uttar Pradesh 201301</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaPhone className="text-emerald-500 shrink-0" />
                  <a href="tel:+919990999561" className="hover:text-white">
                    +91 9990999561
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <FaEnvelope className="text-indigo-400 shrink-0" />
                  <a href="mailto:info@inxyme.com" className="hover:text-white">
                    info@inxyme.com
                  </a>
                </li>
                <li className="pt-1 text-[11px] text-slate-500">
                  Hours: Mon – Sat (9:30 AM – 6:30 PM IST)
                </li>
              </ul>
            </div>
          </div>

          {/* Statutory Disclaimer Box */}
          <div className="bg-slate-900/80 rounded-xl p-5 border border-slate-800/80 text-[11px] text-slate-400 leading-relaxed space-y-2">
            <p className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">
              Statutory Transparency &amp; Non-Affiliation Disclaimer
            </p>
            <p>
              Inxyme is an independent professional learning platform offering industry-aligned certification and training courses. Inxyme is NOT affiliated with, authorized, maintained, sponsored, or in any way officially connected with SAP SE or any of its subsidiaries or its affiliates. The official SAP website can be found at <span className="text-slate-300">www.sap.com</span>. The names SAP, SAP S/4HANA, ABAP, FICO, MM, SD, as well as related names, marks, emblems, and images are registered trademarks of their respective owners.
            </p>
            <p>
              Salary figures and placement projections shown on any landing page represent indicative industry estimates based on independent surveys and do not constitute a guarantee of salary or job placement. All placements and career support are subject to student merit, interview performance, and hiring partner prerequisites.
            </p>
          </div>

          {/* Copyright & Bottom Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 pt-2">
            <p>&copy; {new Date().getFullYear()} Inxyme. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-4 text-slate-400 font-medium">
              <Link href="/about-us" className="hover:text-white transition-colors">
                About Us
              </Link>
              <span>•</span>
              <Link href="/privacy-policy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link href="/terms-conditions" className="hover:text-white transition-colors">
                Terms &amp; Conditions
              </Link>
              <span>•</span>
              <Link href="/disclaimer" className="hover:text-white transition-colors">
                Disclaimer
              </Link>
              <span>•</span>
              <Link href="/contact-us" className="hover:text-white transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
