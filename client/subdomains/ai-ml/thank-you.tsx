"use client";

import Link from "next/link";

export default function AiMlThankYou({ subdomain = "ai-ml" }: { subdomain?: string }) {
  return (
    <div className="min-h-screen bg-[#f5f7fb] text-[#17243a] font-sans flex flex-col justify-between">
      <header className="bg-gradient-to-r from-[#1a0a3d] to-[#0c1445] shadow-md">
        <div className="w-[min(1160px,92%)] mx-auto h-[68px] flex items-center justify-between">
          <Link href="/" className="text-2xl font-black text-white">
            Inx<span className="text-[#a78bfa]">yme</span>
          </Link>
          <Link href="/" className="text-xs sm:text-sm font-bold text-white/80 hover:text-white flex items-center gap-1">
            ← Back to Course
          </Link>
        </div>
      </header>

      <main className="w-[min(860px,92%)] mx-auto py-12 sm:py-16 my-auto">
        <div className="bg-white rounded-[28px] border border-[#e4e8ef] shadow-xl p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#7c3aed] via-[#ec4899] to-[#2563eb]" />

          <div className="w-20 h-20 mx-auto rounded-full bg-purple-50 text-purple-600 flex items-center justify-center text-5xl font-black mb-6 border border-purple-200">
            ✓
          </div>

          <span className="inline-block px-3.5 py-1 bg-purple-50 text-purple-800 text-xs font-black rounded-full border border-purple-200 uppercase tracking-wider mb-3">
            Enquiry Received · AI/ML Course
          </span>

          <h1 className="text-2xl sm:text-4xl font-black text-[#1a0a3d] tracking-tight mb-3">
            Thank You for Your Interest!
          </h1>

          <p className="text-sm sm:text-base text-[#667085] max-w-xl mx-auto leading-relaxed mb-8">
            Your enquiry for the{" "}
            <strong className="text-[#17243a]">Inxyme AI &amp; Machine Learning Certification Course</strong>{" "}
            has been received. Our AI/ML expert advisor will connect with you shortly to walk you through the curriculum, LLM modules, batch schedule, and placement support.
          </p>

          <div className="bg-[#f8fafc] rounded-2xl p-6 sm:p-8 border border-[#e2e7ee] text-left max-w-2xl mx-auto mb-8">
            <h2 className="text-xs font-black uppercase tracking-wider text-[#7c3aed] mb-4">
              What Happens Next?
            </h2>
            <div className="space-y-4">
              {[
                ["AI Advisor Call Within 24 Hours", "Our AI/ML expert will explain the complete curriculum — from ML fundamentals to Generative AI & LLMs — along with batch options and tools you'll master."],
                ["Fee & Scholarship Discussion", "Get personalised pricing, scholarship eligibility check, and 0% EMI payment options tailored to your profile."],
                ["Batch Registration & Dashboard Access", "Complete your enrollment and instantly access your Inxyme learning dashboard with starter resources, community, and recorded sessions."],
              ].map(([title, desc], i) => (
                <div key={i} className="flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#ec4899] text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#1a0a3d]">{title}</h3>
                    <p className="text-xs text-[#667085] mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <a
              href="https://wa.me/919266585858?text=Hi%2C%20I%20just%20enquired%20about%20the%20Inxyme%20AI%20%26%20ML%20Certification%20Course%20and%20need%20more%20details."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#20c76a] hover:bg-[#1bb35e] text-white font-black text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-md transition-all"
            >
              <span>Chat on WhatsApp</span><span>💬</span>
            </a>
            <a
              href="tel:+919266585858"
              className="inline-flex items-center gap-2 bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-black text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-md transition-all"
            >
              <span>Call AI Advisor</span><span>📞</span>
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

      <footer className="bg-[#0a1a3a] text-[#667085] py-6 text-center text-xs border-t border-white/10">
        <p>© {new Date().getFullYear()} Inxyme E-Learning Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}
