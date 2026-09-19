"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";

const COURSE_MODULES = [
  { title: "Module 1 — Python for Data Science", topics: ["Python Basics & OOP", "NumPy & Pandas", "Data Cleaning & Wrangling", "Exploratory Data Analysis (EDA)"] },
  { title: "Module 2 — Statistics & Mathematics", topics: ["Descriptive & Inferential Statistics", "Probability Theory", "Hypothesis Testing", "Linear Algebra for ML"] },
  { title: "Module 3 — Data Visualization", topics: ["Matplotlib & Seaborn", "Plotly & Interactive Dashboards", "Power BI Fundamentals", "Storytelling with Data"] },
  { title: "Module 4 — Machine Learning", topics: ["Supervised & Unsupervised Learning", "Regression & Classification Models", "Decision Trees & Random Forests", "Model Evaluation & Tuning"] },
  { title: "Module 5 — Advanced ML & Deep Learning", topics: ["Neural Networks & Backpropagation", "Keras & TensorFlow Basics", "NLP & Text Analytics", "Time Series Forecasting"] },
  { title: "Module 6 — Capstone Project & Placement Prep", topics: ["End-to-End Data Science Project", "GitHub Portfolio Building", "Resume & LinkedIn Optimisation", "Mock Interviews & Certification"] },
];

const CAREER_ROLES = [
  { title: "Data Analyst", salary: "₹4–14 LPA", icon: "📊" },
  { title: "Data Scientist", salary: "₹8–25 LPA", icon: "🔬" },
  { title: "ML Engineer", salary: "₹10–28 LPA", icon: "🤖" },
  { title: "Business Intelligence Analyst", salary: "₹6–18 LPA", icon: "📈" },
  { title: "Data Engineer", salary: "₹8–22 LPA", icon: "🛠️" },
  { title: "Research Analyst", salary: "₹5–15 LPA", icon: "🧪" },
];

const FAQS = [
  { q: "Do I need a coding background to enroll?", a: "No coding background required. The course starts with Python from scratch and builds up to advanced ML and deep learning concepts step-by-step." },
  { q: "What tools and technologies will I learn?", a: "Python, NumPy, Pandas, Matplotlib, Seaborn, Scikit-learn, TensorFlow, Keras, Power BI, SQL, and more." },
  { q: "How long is the Data Science course?", a: "The complete program spans 5–6 months with live classes 3x per week. All sessions are recorded and available on demand." },
  { q: "Will I work on real projects?", a: "Yes. You'll work on 3 mini-projects and 1 industry capstone project that goes on your GitHub portfolio and resume." },
  { q: "What certification will I receive?", a: "You'll receive an Inxyme-certified Data Science course completion certificate, recognised by our hiring partners." },
];

export default function DataSciencePage({ subdomain = "data-science" }: { subdomain?: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") || "").trim(),
      email: String(form.get("email") || "").trim(),
      phone: String(form.get("phone") || "").trim(),
      timeSlot: String(form.get("timeSlot") || "").trim(),
      time_slot: String(form.get("timeSlot") || "").trim(),
      subdomain, program: "Data Science Certification Course",
      university: "Inxyme E-Learning", source: "data-science-landing-page",
    };
    setStatus("submitting");
    try {
      await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    } catch {}
    setStatus("success");
    e.currentTarget.reset();
  };

  return (
    <div className="font-sans text-[#17233d] bg-white">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[#e3e8f0] shadow-sm">
        <div className="w-[min(1200px,94%)] mx-auto h-[68px] flex items-center justify-between">
          <Link href="/" className="text-2xl font-black text-[#1565c0]">Inx<span className="text-[#ef3e35]">yme</span></Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-700">
            {["Overview","Curriculum","Career","Fees","FAQ"].map(s => <a key={s} href={`#${s.toLowerCase()}`} className="hover:text-[#1565c0] transition-colors">{s}</a>)}
          </nav>
          <a href="#enroll" className="bg-[#1565c0] hover:bg-[#0d47a1] text-white font-black text-sm px-5 py-2.5 rounded-full shadow transition-all">Enroll Now →</a>
        </div>
      </header>

      {/* HERO */}
      <section id="overview" className="relative bg-gradient-to-br from-[#0b1a36] via-[#0f2a5e] to-[#1a0a3d] text-white overflow-hidden pt-14 pb-20 md:pt-18 md:pb-24">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #1565c0 0%, transparent 50%), radial-gradient(circle at 80% 20%, #7c3aed 0%, transparent 50%)" }} />
        <div className="w-[min(1200px,94%)] mx-auto relative z-10 grid lg:grid-cols-[1fr_420px] gap-12 items-center">
          <div className="space-y-6">
            <span className="inline-block bg-violet-500 text-white font-black text-xs px-4 py-1.5 rounded-full uppercase tracking-widest">📊 Enrollments Open — 2026 Batch</span>
            <h1 className="text-4xl sm:text-5xl md:text-[52px] font-black leading-tight tracking-tight">
              Become a <span className="text-[#60a5fa]">Data Scientist</span><br />from Scratch
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
              Master Python, Machine Learning, Deep Learning & Data Visualization. Build a portfolio that gets you hired at top tech companies.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              {[["Live + Recorded","Sessions"],["6 Modules","End-to-End"],["Industry","Certification"],["Placement","Assistance*"],["₹4–25 LPA","Avg. Packages"],["Flexible","Schedule"]].map(([v,l],i) => (
                <div key={i} className="bg-white/8 border border-white/15 rounded-xl p-3 text-center backdrop-blur-sm">
                  <div className="text-[#60a5fa] font-black text-sm">{v}</div>
                  <div className="text-slate-300 text-[11px] mt-0.5">{l}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href="#enroll" className="inline-flex items-center gap-2 bg-[#1565c0] hover:bg-[#0d47a1] text-white font-black text-sm px-7 py-3.5 rounded-full shadow-lg transition-all">Get Free Counselling →</a>
              <a href="#curriculum" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm px-6 py-3.5 rounded-full transition-all">View Curriculum ↓</a>
            </div>
          </div>

          {/* LEAD FORM */}
          <div id="enroll" className="bg-white text-[#17233d] rounded-3xl shadow-2xl p-7 border border-slate-100">
            {status === "success" ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto">✓</div>
                <h3 className="text-xl font-black text-[#102d63]">Thank You!</h3>
                <p className="text-sm text-slate-500">Our Data Science advisor will call you to discuss curriculum, fees & batch schedule.</p>
                <button onClick={() => setStatus("idle")} className="text-xs text-[#1565c0] underline font-bold">Submit another enquiry</button>
              </div>
            ) : (
              <>
                <div className="text-center mb-5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-black rounded-full border border-blue-200 mb-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" /> Limited Seats — Next Batch Starting Soon
                  </span>
                  <h2 className="text-2xl font-black text-[#102d63]">Get Free Data Science Counselling</h2>
                  <p className="text-xs text-slate-400 mt-1">Curriculum · Fees · Certification · Placement Support</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input name="name" placeholder="Full Name *" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1565c0]" />
                  <div className="grid grid-cols-2 gap-3">
                    <input name="phone" placeholder="Mobile Number *" required pattern="[0-9]{10}" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1565c0]" />
                    <input name="email" type="email" placeholder="Email Address *" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1565c0]" />
                  </div>
                  <div>
                    <select name="timeSlot" required defaultValue="9:00 AM - 12:00 PM" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1565c0] text-slate-600">
                      <option value="" disabled>Preferred Free Time Slot *</option>
                      {["9:00 AM - 12:00 PM", "12:00 PM - 2:00 PM", "2:00 PM - 4:00 PM", "4:00 PM - 7:00 PM", "7:00 PM - 9:00 PM", "9:00 PM - 11:00 PM"].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <button type="submit" disabled={status === "submitting"} className="w-full py-3.5 bg-gradient-to-r from-[#1565c0] to-[#7c3aed] text-white font-black text-sm rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-60">
                    {status === "submitting" ? "Submitting…" : "Request Free Call Back →"}
                  </button>
                  <p className="text-[11px] text-slate-400 text-center">🔒 100% Privacy Guaranteed. No Spam Calls.</p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* CURRICULUM */}
      <section id="curriculum" className="py-16 bg-[#f8fafc]">
        <div className="w-[min(1200px,94%)] mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1 bg-blue-50 text-blue-700 text-xs font-black rounded-full uppercase tracking-wider mb-3">Course Curriculum</span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#102d63]">6-Module Data Science Program</h2>
            <p className="text-slate-500 mt-2 max-w-xl mx-auto text-sm">A complete end-to-end curriculum from Python basics to production-ready ML models.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {COURSE_MODULES.map((mod, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1565c0] to-[#7c3aed] text-white flex items-center justify-center font-black text-sm mb-4">0{i+1}</div>
                <h3 className="font-black text-[#102d63] text-sm mb-3">{mod.title}</h3>
                <ul className="space-y-1.5">
                  {mod.topics.map((t, j) => <li key={j} className="flex items-start gap-2 text-xs text-slate-600"><span className="text-[#1565c0] mt-0.5 font-black">▸</span>{t}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAREER */}
      <section id="career" className="py-16 bg-white">
        <div className="w-[min(1200px,94%)] mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1 bg-emerald-50 text-emerald-700 text-xs font-black rounded-full uppercase tracking-wider mb-3">Career Outcomes</span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#102d63]">Data Science Roles You Can Land</h2>
            <p className="text-slate-500 mt-2 text-sm">Data Science is one of the fastest-growing and highest-paying fields globally.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CAREER_ROLES.map((role, i) => (
              <div key={i} className="bg-gradient-to-br from-[#eef4ff] to-white border border-[#dce7ff] rounded-2xl p-5 flex items-center gap-4">
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

      {/* FEES */}
      <section id="fees" className="py-16 bg-gradient-to-br from-[#0f2a5e] to-[#1a0a3d] text-white">
        <div className="w-[min(700px,94%)] mx-auto text-center space-y-6">
          <span className="inline-block px-4 py-1 bg-[#60a5fa] text-slate-900 text-xs font-black rounded-full uppercase tracking-wider">Course Investment</span>
          <h2 className="text-3xl sm:text-4xl font-black">Transparent &amp; Flexible Pricing</h2>
          <p className="text-slate-300 text-sm">EMI options available. Speak to an advisor for the latest pricing and scholarship availability.</p>
          <div className="bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur space-y-4">
            <div className="text-5xl font-black text-[#60a5fa]">Contact Us</div>
            <p className="text-slate-300 text-sm">Get personalised pricing based on your profile &amp; goals.</p>
            <ul className="text-left space-y-2 max-w-xs mx-auto">
              {["0% Interest EMI Available","Merit-Based Scholarships","Group & Corporate Discounts","Placement-Linked Program (T&C Apply)"].map((f,i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-slate-200"><span className="text-emerald-400 font-black">✓</span>{f}</li>
              ))}
            </ul>
            <a href="#enroll" className="inline-block bg-[#60a5fa] text-slate-900 font-black text-sm px-8 py-3.5 rounded-full shadow-lg hover:bg-[#3b82f6] transition-all">Get Fee Details →</a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 bg-[#f8fafc]">
        <div className="w-[min(780px,94%)] mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1 bg-blue-50 text-blue-700 text-xs font-black rounded-full uppercase tracking-wider mb-3">FAQ</span>
            <h2 className="text-3xl font-black text-[#102d63]">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-6 py-4 text-left font-bold text-sm text-[#102d63]">
                  <span>{faq.q}</span>
                  <span className="text-[#1565c0] text-lg ml-4">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && <div className="px-6 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#1565c0] to-[#7c3aed]">
        <div className="w-[min(700px,94%)] mx-auto text-center space-y-5">
          <h2 className="text-3xl sm:text-4xl font-black text-white">Start Your Data Science Journey Today</h2>
          <p className="text-blue-100 text-sm">Join thousands of learners building data-driven careers with Inxyme.</p>
          <a href="#enroll" className="inline-block bg-white text-[#1565c0] font-black text-sm px-10 py-4 rounded-full shadow-xl hover:bg-blue-50 transition-all">Enroll Today — Limited Seats →</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0a1a3a] text-[#8899bb] py-10 text-xs">
        <div className="w-[min(1200px,94%)] mx-auto space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-4 border-b border-white/10">
            <span className="text-white text-xl font-black">Inx<span className="text-[#ef3e35]">yme</span></span>
            <span className="text-[#667085]">Job-Ready Certification Courses</span>
          </div>
          <p className="text-[11px] leading-relaxed text-[#667085]">
            <strong className="text-slate-400">Disclaimer:</strong> Inxyme is an independent e-learning platform offering job-ready certification courses. Salary ranges shown are indicative market data and not guaranteed. Placement support is provided on a best-effort basis. Individual outcomes may vary.
          </p>
          <p className="text-center text-[#4a5568]">© {new Date().getFullYear()} Inxyme. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
