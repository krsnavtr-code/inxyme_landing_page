"use client";

import Link from "next/link";

export default function SapThankYou({ subdomain = "sap" }: { subdomain?: string }) {
  return (
    <div className="min-h-screen bg-[#f5f7fb] text-[#17243a] font-sans flex flex-col justify-between">
      <header className="bg-[#102d63] shadow-md">
        <div className="w-[min(1160px,92%)] mx-auto h-[68px] flex items-center justify-between">
          <Link href="/" className="inline-block bg-white/95 px-3 py-1.5 rounded-xl shadow-xs">
            <img
              src="/images/Inxyme%20png%20logo.png"
              alt="Inxyme"
              className="h-9 w-auto object-contain"
            />
          </Link>
          <Link href="/" className="text-xs sm:text-sm font-bold text-white/80 hover:text-white flex items-center gap-1">
            ← Back to Course
          </Link>
        </div>
      </header>

      <main className="w-[min(860px,92%)] mx-auto py-12 sm:py-16 my-auto">
        <div className="bg-white rounded-[28px] border border-[#e4e8ef] shadow-xl p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#f7a51c] via-[#ffd04a] to-[#f7a51c]" />

          <div className="w-20 h-20 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-5xl font-black mb-6 border border-emerald-200">
            ✓
          </div>

          <span className="inline-block px-3.5 py-1 bg-amber-50 text-amber-800 text-xs font-black rounded-full border border-amber-200 uppercase tracking-wider mb-3">
            Enquiry Received · SAP Course
          </span>

          <h1 className="text-2xl sm:text-4xl font-black text-[#102d63] tracking-tight mb-3">
            Thank You for Your Interest!
          </h1>

          <p className="text-sm sm:text-base text-[#667085] max-w-xl mx-auto leading-relaxed mb-8">
            Your enquiry for the{" "}
            <strong className="text-[#17243a]">Inxyme SAP Certification Course</strong>{" "}
            has been received. Our SAP course advisor will connect with you shortly to explain the curriculum, batch schedule, and fee structure.
          </p>

          <div className="bg-[#f8fafc] rounded-2xl p-6 sm:p-8 border border-[#e2e7ee] text-left max-w-2xl mx-auto mb-8">
            <h2 className="text-xs font-black uppercase tracking-wider text-[#d98b00] mb-4">What Happens Next?</h2>
            <div className="space-y-4">
              {[
                ["Course Advisor Call", "Our SAP expert will call you within 24 hours to walk you through the complete syllabus, batch options, and certification roadmap."],
                ["Fee & EMI Discussion", "Get a personalised fee quote with available scholarship options and 0% EMI payment plans."],
                ["Batch Registration & LMS Access", "Complete enrollment and get immediate access to your Inxyme learning dashboard, course materials, and recorded sessions."],
              ].map(([title, desc], i) => (
                <div key={i} className="flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-full bg-[#102d63] text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#102d63]">{title}</h3>
                    <p className="text-xs text-[#667085] mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <a
              href="https://wa.me/919990999561?text=Hi%2C%20I%20just%20enquired%20about%20the%20Inxyme%20SAP%20Certification%20Course%20and%20need%20more%20details."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#20c76a] hover:bg-[#1bb35e] text-white font-black text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-md transition-all"
            >
              <span>Chat on WhatsApp</span><span>💬</span>
            </a>
            <a
              href="tel:+919990999561"
              className="inline-flex items-center gap-2 bg-[#102d63] hover:bg-[#0b2255] text-white font-black text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-md transition-all"
            >
              <span>Call SAP Advisor</span><span>📞</span>
            </a>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#f1f4f9] hover:bg-[#e4e8f0] text-[#17243a] font-bold text-xs sm:text-sm px-5 py-3.5 rounded-xl transition-all"
            >
              Return Back
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-[#0a1a3a] text-[#8899bb] py-8 text-xs border-t border-white/10">
        <div className="w-[min(1100px,94%)] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Inxyme E-Learning. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400">
            <Link href="/about-us" className="hover:text-white transition-colors">About Us</Link>
            <span>•</span>
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms-conditions" className="hover:text-white transition-colors">Terms &amp; Conditions</Link>
            <span>•</span>
            <Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
            <span>•</span>
            <Link href="/contact-us" className="hover:text-white transition-colors">Contact Us</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
