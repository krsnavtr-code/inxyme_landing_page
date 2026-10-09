"use client";

import Link from "next/link";
import Script from "next/script";
import {
  FaCheckCircle,
  FaWhatsapp,
  FaFileDownload,
  FaPhoneAlt,
  FaClock,
  FaGift,
  FaUsers,
  FaArrowLeft,
} from "react-icons/fa";

export default function SapWebinarThankYou({
  subdomain = "sap-webinar",
}: {
  subdomain?: string;
}) {
  return (
    <div className="min-h-screen bg-[#070e1c] text-slate-100 font-sans flex flex-col justify-center items-center py-8 sm:py-14 px-4 selection:bg-amber-400 selection:text-slate-900">
      {/* Google tag (gtag.js) */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=AW-18473601189"
        strategy="afterInteractive"
      />
      <Script
        id="google-tag-aw-18473601189"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18473601189');
          `,
        }}
      />

      {/* Brand Logo - Centered above main card without navbar */}
      <div className="mb-6 sm:mb-8 text-center">
        <Link
          href="/sap-webinar"
          className="inline-flex items-center gap-2 bg-white/95 px-4 py-2 rounded-2xl shadow-md hover:scale-105 transition-transform"
        >
          <img
            src="/images/Inxyme%20png%20logo.png"
            alt="Inxyme"
            className="h-9 sm:h-10 w-auto object-contain"
          />
        </Link>
      </div>

      {/* MAIN CARD - No navbar, no footer clutter */}
      <main className="w-[min(880px,100%)] mx-auto">
        <div className="bg-gradient-to-b from-[#0f2042] to-[#0a152d] rounded-3xl border border-white/15 shadow-2xl p-6 sm:p-12 text-center relative overflow-hidden">
          {/* Top accent bar */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 via-emerald-400 to-amber-400 animate-pulse" />

          {/* Success Icon */}
          <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-4xl text-emerald-400 mb-6 shadow-lg shadow-emerald-500/20">
            <FaCheckCircle />
          </div>

          <span className="inline-block px-4 py-1.5 bg-amber-400/15 text-amber-300 text-xs font-black rounded-full border border-amber-400/30 uppercase tracking-widest mb-3">
            Registration Confirmed · ₹9 Slot Reserved
          </span>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            Congratulations! Aapka Slot Book Ho Gaya Hai 🎉
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
            Thank you for choosing to invest in your career. Live webinar access
            details, Zoom link aur study materials aapke registered WhatsApp
            aur email par send kar diye gaye hain.
          </p>

          {/* CRITICAL ACTION BOX: JOIN VIP WHATSAPP GROUP */}
          <div className="bg-gradient-to-r from-emerald-950/60 via-[#0e2c24] to-emerald-950/60 border border-emerald-500/40 rounded-2xl p-6 sm:p-8 text-left mb-8 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
                  <FaUsers /> Step 1: Most Important Step
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Join Private Webinar WhatsApp VIP Group
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                  Live meeting link, Q&A reminders, and PDF resources isi WhatsApp
                  group me direct share kiye jaate hain taaki aapka session miss na ho.
                </p>
              </div>
              <a
                href="https://wa.me/919990999561?text=Hi%20Inxyme%2C%20I%20have%20registered%20for%20the%20%E2%82%B99%20SAP%20Career%20Webinar.%20Please%20add%20me%20to%20the%20VIP%20WhatsApp%20group%20and%20share%20the%20session%20link."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 font-black text-sm px-6 py-4 rounded-xl shadow-lg transition-transform hover:scale-[1.02] shrink-0"
              >
                <FaWhatsapp className="text-lg" />
                <span>Join WhatsApp VIP Group</span>
              </a>
            </div>
          </div>

          {/* NEXT STEPS LIST */}
          <div className="bg-[#0b1730]/80 rounded-2xl p-6 sm:p-8 border border-white/10 text-left mb-8">
            <h2 className="text-xs font-black uppercase tracking-wider text-amber-400 mb-5 flex items-center gap-2">
              <FaClock /> Webinar Se Pehle Ye Ensure Karein:
            </h2>
            <div className="space-y-4">
              {[
                {
                  step: "1",
                  title: "WhatsApp & Email Inbox Check Karein",
                  desc: "Aapko meeting joining credentials and calendar invite send kar diya gaya hai. Spam ya Promotions tab bhi check kar lein.",
                },
                {
                  step: "2",
                  title: "Apne Questions & Career Goals Note Kar Lein",
                  desc: "Webinar me Ex-SAP Lead ke sath dedicated live 1-to-1 Q&A round hoga. Apne module doubts (FICO, ABAP, MM, SD, PP) ready rakhein.",
                },
                {
                  step: "3",
                  title: "Laptop / Headset Ke Sath 10 Min Pehle Login Karein",
                  desc: "Interactive screen sharing and real-time S/4HANA live demo dekhne ke liye stable internet connection recommend kiya jata hai.",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FREE BONUS DOWNLOADS UNLOCKED */}
          <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/25 rounded-2xl p-6 text-left mb-8">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <FaGift /> Free ₹4,999 Value Bonuses Unlocked For You
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mb-4">
              Aapke ₹9 commitment ke sath aapko ye exclusive learning kits 100% free di ja rahi hain:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-200">
              <div className="bg-[#0b1730] p-3 rounded-xl border border-white/10 flex items-center gap-3">
                <FaFileDownload className="text-amber-400 text-lg shrink-0" />
                <span>SAP All-Modules T-Codes Master Cheat Sheet (PDF)</span>
              </div>
              <div className="bg-[#0b1730] p-3 rounded-xl border border-white/10 flex items-center gap-3">
                <FaFileDownload className="text-amber-400 text-lg shrink-0" />
                <span>Top 150+ Real SAP Interview Questions & Answers</span>
              </div>
              <div className="bg-[#0b1730] p-3 rounded-xl border border-white/10 flex items-center gap-3">
                <FaFileDownload className="text-amber-400 text-lg shrink-0" />
                <span>2026 SAP Salary & Career Transition Blueprint</span>
              </div>
              <div className="bg-[#0b1730] p-3 rounded-xl border border-white/10 flex items-center gap-3">
                <FaFileDownload className="text-amber-400 text-lg shrink-0" />
                <span>1-on-1 Personalized Profile Evaluation Voucher</span>
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/919990999561?text=Hi%20Inxyme%2C%20I%20have%20registered%20for%20the%20%E2%82%B99%20SAP%20Career%20Webinar%20and%20have%20a%20question."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 font-black text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg transition-transform hover:scale-105"
            >
              <FaWhatsapp className="text-base" />
              <span>Talk to Webinar Team</span>
            </a>
            <a
              href="tel:+919990999561"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-5 py-3.5 rounded-xl border border-white/20 transition-colors"
            >
              <FaPhoneAlt className="text-xs text-amber-400" />
              <span>Call Helpline: +91 99909 99561</span>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
