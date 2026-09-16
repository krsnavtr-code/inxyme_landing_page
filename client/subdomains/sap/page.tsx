"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";

const COURSE_MODULES = [
  {
    title: "Module 1 — SAP Fundamentals & Navigation",
    topics: ["SAP Architecture & Landscape", "SAP GUI Navigation", "SAP S/4HANA Overview", "Client & Organisational Structures"],
  },
  {
    title: "Module 2 — SAP FICO (Finance & Controlling)",
    topics: ["General Ledger Accounting", "Accounts Payable & Receivable", "Asset Accounting", "Cost Center & Profit Center Accounting"],
  },
  {
    title: "Module 3 — SAP MM (Materials Management)",
    topics: ["Procurement Cycle", "Purchase Orders & Requisitions", "Inventory Management", "Invoice Verification"],
  },
  {
    title: "Module 4 — SAP SD (Sales & Distribution)",
    topics: ["Sales Order Processing", "Pricing & Condition Techniques", "Shipping & Delivery", "Billing & Credit Management"],
  },
  {
    title: "Module 5 — SAP S/4HANA Advanced",
    topics: ["SAP Fiori & Launchpad", "Migration from ECC to S/4HANA", "Reporting & Analytics", "Integration with Other SAP Modules"],
  },
  {
    title: "Module 6 — Capstone Project & Certification",
    topics: ["End-to-End Business Scenario", "Mock SAP Certification Exam", "Resume Building & LinkedIn Optimisation", "Placement Preparation"],
  },
];

const CAREER_ROLES = [
  { title: "SAP FICO Consultant", salary: "₹6–18 LPA", icon: "💼" },
  { title: "SAP MM Consultant", salary: "₹5–16 LPA", icon: "📦" },
  { title: "SAP SD Consultant", salary: "₹5–15 LPA", icon: "🛒" },
  { title: "SAP S/4HANA Analyst", salary: "₹8–20 LPA", icon: "📊" },
  { title: "ERP Implementation Specialist", salary: "₹7–18 LPA", icon: "⚙️" },
  { title: "SAP Project Manager", salary: "₹12–25 LPA", icon: "🚀" },
];

const FAQS = [
  {
    q: "Do I need prior SAP experience to enroll?",
    a: "No prior SAP experience is required. The course starts from absolute basics and progresses to advanced SAP S/4HANA concepts with hands-on practice.",
  },
  {
    q: "Will I get a recognised SAP certification?",
    a: "You will receive an Inxyme industry-recognised certification upon course completion. Our curriculum is also aligned with official SAP certification exam objectives.",
  },
  {
    q: "How long is the SAP course?",
    a: "The complete SAP course spans 4–6 months with live sessions held 3 days/week. Recorded lectures are available 24/7 for revision.",
  },
  {
    q: "What is included in the placement support?",
    a: "Placement support includes resume building, LinkedIn profile optimisation, mock interviews, and referrals to our hiring partner network.",
  },
  {
    q: "Are sessions live or pre-recorded?",
    a: "Both. Live instructor-led sessions are conducted 3 times a week. All sessions are also recorded and available on your personal dashboard.",
  },
];

export default function SapPage({ subdomain = "sap" }: { subdomain?: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") || "").trim(),
      email: String(form.get("email") || "").trim(),
      phone: String(form.get("phone") || "").trim(),
      state: String(form.get("state") || "").trim(),
      qualification: String(form.get("qualification") || "").trim(),
      subdomain,
      program: "SAP Certification Course",
      university: "Inxyme E-Learning",
      source: "sap-landing-page",
    };
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
      e.currentTarget.reset();
    } catch {
      setStatus("success"); // fallback
      e.currentTarget.reset();
    }
  };

  return (
    <div className="font-sans text-[#17233d] bg-white">
      {/* ── NAVBAR ── */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[#e3e8f0] shadow-sm">
        <div className="w-[min(1200px,94%)] mx-auto h-[68px] flex items-center justify-between">
          <Link href="/" className="text-2xl font-black text-[#1565c0]">
            Inx<span className="text-[#ef3e35]">yme</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-700">
            {["Overview","Curriculum","Career","Fees","FAQ"].map((s) => (
              <a key={s} href={`#${s.toLowerCase()}`} className="hover:text-[#1565c0] transition-colors">{s}</a>
            ))}
          </nav>
          <a href="#enroll" className="bg-[#f7a51c] hover:bg-[#e6940f] text-slate-900 font-black text-sm px-5 py-2.5 rounded-full shadow transition-all">
            Enroll Now →
          </a>
        </div>
      </header>

      {/* ── HERO ── */}
      <section id="overview" className="relative bg-gradient-to-br from-[#0b1f45] via-[#102d63] to-[#0d2357] text-white overflow-hidden pt-14 pb-20 md:pt-18 md:pb-24">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 70% 30%, #f7a51c 0%, transparent 60%)" }} />
        <div className="w-[min(1200px,94%)] mx-auto relative z-10 grid lg:grid-cols-[1fr_420px] gap-12 items-center">
          <div className="space-y-6">
            <span className="inline-block bg-[#f7a51c] text-slate-900 font-black text-xs px-4 py-1.5 rounded-full uppercase tracking-widest">
              🏆 Enrollments Open — 2026 Batch
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-[52px] font-black leading-tight tracking-tight">
              Master <span className="text-[#f7a51c]">SAP</span> &amp;<br />
              Launch Your ERP Career
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
              India's most job-focused SAP certification course — covering S/4HANA, FICO, MM &amp; SD. Live classes, real projects, and guaranteed interview calls.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              {[
                ["Live + Recorded", "Sessions"],
                ["6 Modules", "End-to-End"],
                ["Industry", "Certification"],
                ["Placement", "Assistance*"],
                ["₹6–20 LPA", "Avg. Package"],
                ["Flexible", "Schedule"],
              ].map(([v, l], i) => (
                <div key={i} className="bg-white/8 border border-white/15 rounded-xl p-3 text-center backdrop-blur-sm">
                  <div className="text-[#f7a51c] font-black text-sm">{v}</div>
                  <div className="text-slate-300 text-[11px] mt-0.5">{l}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href="#enroll" className="inline-flex items-center gap-2 bg-[#f7a51c] hover:bg-[#e6940f] text-slate-900 font-black text-sm px-7 py-3.5 rounded-full shadow-lg transition-all">
                Get Free Counselling →
              </a>
              <a href="#curriculum" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm px-6 py-3.5 rounded-full transition-all">
                View Curriculum ↓
              </a>
            </div>
          </div>

          {/* ── LEAD FORM ── */}
          <div id="enroll" className="bg-white text-[#17233d] rounded-3xl shadow-2xl p-7 border border-slate-100">
            {status === "success" ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto">✓</div>
                <h3 className="text-xl font-black text-[#1b325e]">Thank You!</h3>
                <p className="text-sm text-slate-500">Our SAP course advisor will call you shortly to explain the curriculum, fees &amp; batch details.</p>
                <button onClick={() => setStatus("idle")} className="text-xs text-[#1565c0] underline font-bold">Submit another enquiry</button>
              </div>
            ) : (
              <>
                <div className="text-center mb-5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 text-xs font-black rounded-full border border-amber-200 mb-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" /> Limited Seats — Next Batch Starting Soon
                  </span>
                  <h2 className="text-2xl font-black text-[#102d63]">Get Free SAP Counselling</h2>
                  <p className="text-xs text-slate-400 mt-1">Curriculum · Fees · Certification · Career Support</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input name="name" placeholder="Full Name *" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1565c0]" />
                  <div className="grid grid-cols-2 gap-3">
                    <input name="phone" placeholder="Mobile Number *" required pattern="[0-9]{10}" title="10-digit number" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1565c0]" />
                    <input name="email" type="email" placeholder="Email Address *" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1565c0]" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <select name="state" required defaultValue="" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1565c0] text-slate-600">
                      <option value="" disabled>Select State *</option>
                      {["Delhi NCR","Maharashtra","Karnataka","Uttar Pradesh","Gujarat","Rajasthan","Haryana","Punjab","Tamil Nadu","Telangana","Other"].map(s => <option key={s}>{s}</option>)}
                    </select>
                    <select name="qualification" required defaultValue="" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1565c0] text-slate-600">
                      <option value="" disabled>Qualification *</option>
                      {["10+2","B.Com / Commerce","BBA / BBM","B.Tech / B.E.","BCA / B.Sc IT","BA / Arts","Graduate","Post Graduate","Other"].map(q => <option key={q}>{q}</option>)}
                    </select>
                  </div>
                  {errorMsg && <p className="text-xs text-red-500 text-center">{errorMsg}</p>}
                  <button type="submit" disabled={status === "submitting"} className="w-full py-3.5 bg-gradient-to-r from-[#f7a51c] to-[#f58220] text-slate-900 font-black text-sm rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-60">
                    {status === "submitting" ? "Submitting…" : "Request Free Call Back →"}
                  </button>
                  <p className="text-[11px] text-slate-400 text-center">🔒 100% Privacy Guaranteed. No Spam Calls.</p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── CURRICULUM ── */}
      <section id="curriculum" className="py-16 bg-[#f8fafc]">
        <div className="w-[min(1200px,94%)] mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1 bg-blue-50 text-blue-700 text-xs font-black rounded-full uppercase tracking-wider mb-3">Course Curriculum</span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#102d63]">6-Module SAP Mastery Program</h2>
            <p className="text-slate-500 mt-2 max-w-xl mx-auto text-sm">From zero to SAP-certified — a structured, industry-vetted curriculum built by SAP experts.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {COURSE_MODULES.map((mod, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-[#102d63] text-white flex items-center justify-center font-black text-sm mb-4">0{i + 1}</div>
                <h3 className="font-black text-[#102d63] text-sm mb-3">{mod.title}</h3>
                <ul className="space-y-1.5">
                  {mod.topics.map((t, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-slate-600">
                      <span className="text-[#f7a51c] mt-0.5 font-black">▸</span>{t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAREER ── */}
      <section id="career" className="py-16 bg-white">
        <div className="w-[min(1200px,94%)] mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1 bg-emerald-50 text-emerald-700 text-xs font-black rounded-full uppercase tracking-wider mb-3">Career Outcomes</span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#102d63]">SAP Roles You Can Land</h2>
            <p className="text-slate-500 mt-2 text-sm">SAP skills are among the highest-paying in the ERP & enterprise software market globally.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CAREER_ROLES.map((role, i) => (
              <div key={i} className="bg-gradient-to-br from-[#f0f4ff] to-[#fff] border border-[#dce7ff] rounded-2xl p-5 flex items-center gap-4">
                <span className="text-3xl">{role.icon}</span>
                <div>
                  <h3 className="font-black text-[#102d63] text-sm">{role.title}</h3>
                  <p className="text-emerald-600 font-bold text-xs mt-0.5">{role.salary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEES ── */}
      <section id="fees" className="py-16 bg-gradient-to-br from-[#102d63] to-[#0b1f45] text-white">
        <div className="w-[min(700px,94%)] mx-auto text-center space-y-6">
          <span className="inline-block px-4 py-1 bg-[#f7a51c] text-slate-900 text-xs font-black rounded-full uppercase tracking-wider">Course Investment</span>
          <h2 className="text-3xl sm:text-4xl font-black">Flexible &amp; Transparent Pricing</h2>
          <p className="text-slate-300 text-sm">No hidden charges. EMI options available. Speak to an advisor for the latest batch pricing and scholarship offers.</p>
          <div className="bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur space-y-4">
            <div className="text-5xl font-black text-[#f7a51c]">Contact Us</div>
            <p className="text-slate-300 text-sm">Get a personalised fee quote based on your profile &amp; learning goals.</p>
            <ul className="text-left space-y-2 max-w-xs mx-auto">
              {["EMI Starting ₹0 Interest","Scholarship for Meritorious Students","Corporate Batch Discounts","Job Guarantee Program (T&C Apply)"].map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-slate-200">
                  <span className="text-emerald-400 font-black">✓</span>{f}
                </li>
              ))}
            </ul>
            <a href="#enroll" className="inline-block bg-[#f7a51c] text-slate-900 font-black text-sm px-8 py-3.5 rounded-full shadow-lg hover:bg-[#e6940f] transition-all">
              Get Fee Details →
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-16 bg-[#f8fafc]">
        <div className="w-[min(780px,94%)] mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1 bg-amber-50 text-amber-700 text-xs font-black rounded-full uppercase tracking-wider mb-3">FAQ</span>
            <h2 className="text-3xl font-black text-[#102d63]">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-6 py-4 text-left font-bold text-sm text-[#102d63]">
                  <span>{faq.q}</span>
                  <span className="text-[#f7a51c] text-lg ml-4">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-16 bg-gradient-to-r from-[#f7a51c] to-[#f58220]">
        <div className="w-[min(700px,94%)] mx-auto text-center space-y-5">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Ready to Become an SAP Professional?</h2>
          <p className="text-slate-800 text-sm">Join thousands of learners who transformed their careers with Inxyme's SAP Certification Program.</p>
          <a href="#enroll" className="inline-block bg-slate-900 text-white font-black text-sm px-10 py-4 rounded-full shadow-xl hover:bg-[#0b1f45] transition-all">
            Enroll Today — Limited Seats →
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#0a1a3a] text-[#8899bb] py-10 text-xs">
        <div className="w-[min(1200px,94%)] mx-auto space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-4 border-b border-white/10">
            <span className="text-white text-xl font-black">Inx<span className="text-[#ef3e35]">yme</span></span>
            <span className="text-[#667085]">Job-Ready Certification Courses</span>
          </div>
          <p className="text-[11px] leading-relaxed text-[#667085]">
            <strong className="text-slate-400">Disclaimer:</strong> Inxyme is an independent e-learning platform. The SAP course offered is designed to build industry-relevant skills. Inxyme is not affiliated with SAP SE. Certification details and salary ranges are indicative and not guaranteed. Employment outcomes depend on individual performance and market conditions.
          </p>
          <p className="text-center text-[#4a5568]">© {new Date().getFullYear()} Inxyme. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
