"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";

const COURSE_MODULES = [
  { title: "Module 1 — Web Fundamentals", topics: ["HTML5 & Semantic Web", "CSS3, Flexbox & Grid", "Responsive Design", "JavaScript ES6+"] },
  { title: "Module 2 — React & Frontend Mastery", topics: ["React Components & Hooks", "State Management (Redux / Zustand)", "Next.js SSR & SSG", "TypeScript Fundamentals"] },
  { title: "Module 3 — Backend with Node.js", topics: ["Node.js & Express.js", "RESTful API Design", "Authentication (JWT / OAuth)", "Middleware & Error Handling"] },
  { title: "Module 4 — Databases & DevOps", topics: ["MongoDB & Mongoose", "SQL with PostgreSQL", "Docker & Containerisation", "CI/CD Pipelines with GitHub Actions"] },
  { title: "Module 5 — Cloud & Emerging Tech", topics: ["AWS (EC2, S3, Lambda)", "Microservices Architecture", "GraphQL APIs", "WebSockets & Real-Time Apps"] },
  { title: "Module 6 — Capstone & Placement Prep", topics: ["Full-Stack SaaS Project Build", "GitHub Portfolio Optimisation", "System Design Interviews", "Resume & Mock Interview Sessions"] },
];

const CAREER_ROLES = [
  { title: "Full Stack Developer", salary: "₹5–20 LPA", icon: "💻" },
  { title: "Frontend Developer", salary: "₹4–16 LPA", icon: "🎨" },
  { title: "Backend Developer", salary: "₹5–18 LPA", icon: "⚙️" },
  { title: "DevOps Engineer", salary: "₹7–22 LPA", icon: "🛠️" },
  { title: "Cloud Developer", salary: "₹8–25 LPA", icon: "☁️" },
  { title: "Software Engineer", salary: "₹6–20 LPA", icon: "🚀" },
];

const FAQS = [
  { q: "Is any prior programming knowledge required?", a: "No prior programming knowledge is needed. We start from HTML/CSS basics and progressively move to advanced backend and cloud development." },
  { q: "What does FDE stand for?", a: "FDE stands for Full Stack Development with Emerging Technologies — covering the full spectrum from frontend to backend to cloud and DevOps." },
  { q: "How long is the FDE course?", a: "The course spans 5–6 months with live sessions 3x per week plus weekend workshops. All sessions are recorded for flexible access." },
  { q: "Will I build real projects?", a: "Yes — you'll build 4+ real-world projects including a complete SaaS application that you can showcase in your portfolio and job interviews." },
  { q: "What certification will I receive?", a: "You'll receive the Inxyme FDE (Full Stack Development with Emerging Technologies) certification, recognised by our hiring partners across the tech industry." },
];

export default function FdePage({ subdomain = "fde" }: { subdomain?: string }) {
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
      subdomain, program: "Full Stack Development (FDE) Course",
      university: "Inxyme E-Learning", source: "fde-landing-page",
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
          <Link href="/">
            <img
              src="/images/Inxyme%20png%20logo.png"
              alt="Inxyme"
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-700">
            {["Overview","Curriculum","Career","Fees","FAQ"].map(s => <a key={s} href={`#${s.toLowerCase()}`} className="hover:text-[#059669] transition-colors">{s}</a>)}
          </nav>
          <a href="#enroll" className="bg-[#059669] hover:bg-[#047857] text-white font-black text-sm px-5 py-2.5 rounded-full shadow transition-all">Enroll Now →</a>
        </div>
      </header>

      {/* HERO */}
      <section id="overview" className="relative bg-gradient-to-br from-[#052e16] via-[#064e3b] to-[#0f172a] text-white overflow-hidden pt-14 pb-20 md:pt-18 md:pb-24">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 70% 30%, #059669 0%, transparent 60%)" }} />
        <div className="w-[min(1200px,94%)] mx-auto relative z-10 grid lg:grid-cols-[1fr_420px] gap-12 items-center">
          <div className="space-y-6">
            <span className="inline-block bg-emerald-500 text-white font-black text-xs px-4 py-1.5 rounded-full uppercase tracking-widest">💻 Enrollments Open — 2026 Batch</span>
            <h1 className="text-4xl sm:text-5xl md:text-[52px] font-black leading-tight tracking-tight">
              Master <span className="text-[#34d399]">Full Stack</span><br />Development
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
              From HTML to cloud deployment — learn React, Node.js, MongoDB, Docker & AWS in one comprehensive FDE program. Build real products. Get hired faster.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              {[["Live + Recorded","Sessions"],["6 Modules","End-to-End"],["FDE","Certification"],["Placement","Assistance*"],["₹5–25 LPA","Tech Packages"],["Weekend","Workshops"]].map(([v,l],i) => (
                <div key={i} className="bg-white/8 border border-white/15 rounded-xl p-3 text-center backdrop-blur-sm">
                  <div className="text-[#34d399] font-black text-sm">{v}</div>
                  <div className="text-slate-300 text-[11px] mt-0.5">{l}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href="#enroll" className="inline-flex items-center gap-2 bg-[#059669] hover:bg-[#047857] text-white font-black text-sm px-7 py-3.5 rounded-full shadow-lg transition-all">Get Free Counselling →</a>
              <a href="#curriculum" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm px-6 py-3.5 rounded-full transition-all">View Curriculum ↓</a>
            </div>
          </div>

          {/* LEAD FORM */}
          <div id="enroll" className="bg-white text-[#17233d] rounded-3xl shadow-2xl p-7 border border-slate-100">
            {status === "success" ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto">✓</div>
                <h3 className="text-xl font-black text-[#064e3b]">Thank You!</h3>
                <p className="text-sm text-slate-500">Our Full Stack advisor will call you to discuss the curriculum, tech stack, fees & batch dates.</p>
                <button onClick={() => setStatus("idle")} className="text-xs text-[#059669] underline font-bold">Submit another enquiry</button>
              </div>
            ) : (
              <>
                <div className="text-center mb-5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-black rounded-full border border-emerald-200 mb-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Limited Seats — Next Batch Starting Soon
                  </span>
                  <h2 className="text-2xl font-black text-[#064e3b]">Get Free FDE Counselling</h2>
                  <p className="text-xs text-slate-400 mt-1">Curriculum · Tech Stack · Certification · Placement Support</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input name="name" placeholder="Full Name *" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]" />
                  <div className="grid grid-cols-2 gap-3">
                    <input name="phone" placeholder="Mobile Number *" required pattern="[0-9]{10}" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]" />
                    <input name="email" type="email" placeholder="Email Address *" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]" />
                  </div>
                  <div>
                    <select name="timeSlot" required defaultValue="9:00 AM - 12:00 PM" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#059669] text-slate-600">
                      <option value="" disabled>Preferred Free Time Slot *</option>
                      {["9:00 AM - 12:00 PM", "12:00 PM - 2:00 PM", "2:00 PM - 4:00 PM", "4:00 PM - 7:00 PM", "7:00 PM - 9:00 PM", "9:00 PM - 11:00 PM"].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="flex items-start gap-2 pt-1 text-left">
                    <input type="checkbox" id="fdeConsent" required defaultChecked className="mt-1 h-3.5 w-3.5 rounded border-slate-300 text-[#059669]" />
                    <label htmlFor="fdeConsent" className="text-[11px] text-slate-500 leading-tight">
                      I agree to receive course updates &amp; calls from Inxyme, and I accept the{" "}
                      <Link href="/terms-conditions" className="text-blue-600 underline font-semibold">Terms &amp; Conditions</Link> and{" "}
                      <Link href="/privacy-policy" className="text-blue-600 underline font-semibold">Privacy Policy</Link>.
                    </label>
                  </div>
                  <button type="submit" disabled={status === "submitting"} className="w-full py-3.5 bg-gradient-to-r from-[#059669] to-[#0284c7] text-white font-black text-sm rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-60">
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
            <span className="inline-block px-4 py-1 bg-emerald-50 text-emerald-700 text-xs font-black rounded-full uppercase tracking-wider mb-3">Course Curriculum</span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#064e3b]">6-Module Full Stack Mastery</h2>
            <p className="text-slate-500 mt-2 max-w-xl mx-auto text-sm">Frontend → Backend → Database → Cloud — everything a modern full stack developer needs.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {COURSE_MODULES.map((mod, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#059669] to-[#0284c7] text-white flex items-center justify-center font-black text-sm mb-4">0{i+1}</div>
                <h3 className="font-black text-[#064e3b] text-sm mb-3">{mod.title}</h3>
                <ul className="space-y-1.5">
                  {mod.topics.map((t, j) => <li key={j} className="flex items-start gap-2 text-xs text-slate-600"><span className="text-[#059669] mt-0.5 font-black">▸</span>{t}</li>)}
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
            <h2 className="text-3xl sm:text-4xl font-black text-[#064e3b]">Tech Roles You Can Land</h2>
            <p className="text-slate-500 mt-2 text-sm">Full stack developers are among the most in-demand professionals in the global tech market.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CAREER_ROLES.map((role, i) => (
              <div key={i} className="bg-gradient-to-br from-[#ecfdf5] to-white border border-[#a7f3d0] rounded-2xl p-5 flex items-center gap-4">
                <span className="text-3xl">{role.icon}</span>
                <div>
                  <h3 className="font-black text-[#064e3b] text-sm">{role.title}</h3>
                  <p className="text-emerald-600 font-bold text-xs mt-0.5">{role.salary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEES */}
      <section id="fees" className="py-16 bg-gradient-to-br from-[#052e16] to-[#0f172a] text-white">
        <div className="w-[min(700px,94%)] mx-auto text-center space-y-6">
          <span className="inline-block px-4 py-1 bg-emerald-400 text-slate-900 text-xs font-black rounded-full uppercase tracking-wider">Course Investment</span>
          <h2 className="text-3xl sm:text-4xl font-black">Transparent &amp; Flexible Pricing</h2>
          <p className="text-slate-300 text-sm">EMI options available. Speak to an advisor for the latest pricing and scholarship offers.</p>
          <div className="bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur space-y-4">
            <div className="text-5xl font-black text-[#34d399]">Contact Us</div>
            <p className="text-slate-300 text-sm">Get a personalised fee quote based on your goals.</p>
            <ul className="text-left space-y-2 max-w-xs mx-auto">
              {["0% Interest EMI Available","Merit-Based Scholarships","Weekend Batch Options","Placement-Linked Program (T&C Apply)"].map((f,i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-slate-200"><span className="text-emerald-400 font-black">✓</span>{f}</li>
              ))}
            </ul>
            <a href="#enroll" className="inline-block bg-emerald-400 text-slate-900 font-black text-sm px-8 py-3.5 rounded-full shadow-lg hover:bg-emerald-300 transition-all">Get Fee Details →</a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 bg-[#f8fafc]">
        <div className="w-[min(780px,94%)] mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1 bg-emerald-50 text-emerald-700 text-xs font-black rounded-full uppercase tracking-wider mb-3">FAQ</span>
            <h2 className="text-3xl font-black text-[#064e3b]">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-6 py-4 text-left font-bold text-sm text-[#064e3b]">
                  <span>{faq.q}</span>
                  <span className="text-[#059669] text-lg ml-4">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && <div className="px-6 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#059669] to-[#0284c7]">
        <div className="w-[min(700px,94%)] mx-auto text-center space-y-5">
          <h2 className="text-3xl sm:text-4xl font-black text-white">Start Building Real Products Today</h2>
          <p className="text-emerald-100 text-sm">Join Inxyme's FDE program and become a job-ready full stack developer in 6 months.</p>
          <a href="#enroll" className="inline-block bg-white text-[#059669] font-black text-sm px-10 py-4 rounded-full shadow-xl hover:bg-emerald-50 transition-all">Enroll Today — Limited Seats →</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0a1a3a] text-[#8899bb] py-12 text-xs">
        <div className="w-[min(1200px,94%)] mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <Link href="/" className="inline-block bg-white/95 px-3 py-1.5 rounded-xl shadow-xs">
                <img
                  src="/images/Inxyme%20png%20logo.png"
                  alt="Inxyme"
                  className="h-10 w-auto object-contain"
                />
              </Link>
              <p className="text-xs text-slate-400 mt-1">Full Stack Development (FDE) Certification</p>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-300">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px] text-[#8899bb] leading-relaxed">
            <div>
              <strong className="text-slate-300 block mb-1">Corporate Office &amp; Support:</strong>
              <p>B-127, B Block, Sector 2, Noida, Uttar Pradesh 201301 | Helpline: +91 9990999561 | Email: info@inxyme.com</p>
            </div>
            <div>
              <strong className="text-slate-300 block mb-1">Statutory Educational Disclaimer:</strong>
              <p>Inxyme is an independent vocational e-learning platform offering career-focused skill certifications. Salary ranges are indicative market estimates and do not guarantee specific outcomes. React, Node.js, and other trademarks belong to their respective owners.</p>
            </div>
          </div>

          <p className="text-center text-[#4a5568] pt-2 border-t border-white/5">© {new Date().getFullYear()} Inxyme. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
