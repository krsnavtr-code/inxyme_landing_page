"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";

const COURSE_MODULES = [
  { title: "Module 1 — Python for AI/ML", topics: ["Python Fundamentals & OOP", "NumPy, Pandas & Data Wrangling", "Exploratory Data Analysis", "Math & Statistics for ML"] },
  { title: "Module 2 — Machine Learning Core", topics: ["Supervised & Unsupervised Learning", "Regression, Classification & Clustering", "SVM, Decision Trees & Ensembles", "Model Evaluation & Cross-Validation"] },
  { title: "Module 3 — Deep Learning", topics: ["Neural Networks & Backpropagation", "CNNs for Image Recognition", "RNNs & LSTMs for Sequences", "TensorFlow & Keras in Practice"] },
  { title: "Module 4 — NLP & Computer Vision", topics: ["Text Preprocessing & Word Embeddings", "Transformers & BERT", "Object Detection & Image Segmentation", "Hugging Face Ecosystem"] },
  { title: "Module 5 — Generative AI & LLMs", topics: ["Large Language Models (LLMs)", "Prompt Engineering", "RAG — Retrieval-Augmented Generation", "Fine-Tuning & LLM Deployment"] },
  { title: "Module 6 — MLOps & Capstone", topics: ["Model Deployment with FastAPI & Docker", "MLflow & Experiment Tracking", "Cloud ML (AWS SageMaker / GCP Vertex)", "Capstone Project & Certification"] },
];

const CAREER_ROLES = [
  { title: "ML Engineer", salary: "₹10–30 LPA", icon: "🤖" },
  { title: "AI Research Scientist", salary: "₹15–40 LPA", icon: "🔬" },
  { title: "NLP Engineer", salary: "₹12–28 LPA", icon: "🗣️" },
  { title: "Computer Vision Engineer", salary: "₹10–25 LPA", icon: "👁️" },
  { title: "Generative AI Developer", salary: "₹14–35 LPA", icon: "✨" },
  { title: "MLOps Engineer", salary: "₹12–30 LPA", icon: "⚙️" },
];

const FAQS = [
  { q: "Do I need a maths or coding background?", a: "Basic Python knowledge helps but is not mandatory. The course covers all required maths (linear algebra, probability, calculus) and Python from the ground up in the first module." },
  { q: "What AI/ML frameworks will I learn?", a: "You will work hands-on with Python, NumPy, Pandas, Scikit-learn, TensorFlow, Keras, PyTorch, Hugging Face Transformers, LangChain, FastAPI, MLflow, Docker, and cloud platforms like AWS SageMaker." },
  { q: "How long is the AI/ML course?", a: "The complete program spans 6 months with live sessions 3x per week plus weekend deep-dive workshops. All sessions are recorded and available on your personal dashboard." },
  { q: "Will I work with Generative AI and LLMs?", a: "Yes. Module 5 is entirely dedicated to LLMs, prompt engineering, RAG pipelines, and fine-tuning open-source models — the most in-demand AI skills today." },
  { q: "What certification will I receive?", a: "You will receive the Inxyme AI & Machine Learning Certification upon completing all modules and the capstone project. Our certification is recognised by our hiring partners in the tech industry." },
  { q: "What placement support is provided?", a: "You will get resume building, LinkedIn optimisation, mock technical and HR interviews, and referrals to Inxyme's hiring partner network across AI/ML companies." },
];

export default function AiMlPage({ subdomain = "ai-ml" }: { subdomain?: string }) {
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
      subdomain,
      program: "AI & Machine Learning Certification Course",
      university: "Inxyme E-Learning",
      source: "ai-ml-landing-page",
    };
    setStatus("submitting");
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {}
    setStatus("success");
    e.currentTarget.reset();
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
            {["Overview", "Curriculum", "Career", "Fees", "FAQ"].map((s) => (
              <a key={s} href={`#${s.toLowerCase()}`} className="hover:text-[#7c3aed] transition-colors">{s}</a>
            ))}
          </nav>
          <a href="#enroll" className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-black text-sm px-5 py-2.5 rounded-full shadow transition-all">
            Enroll Now →
          </a>
        </div>
      </header>

      {/* ── HERO ── */}
      <section id="overview" className="relative bg-gradient-to-br from-[#0d0421] via-[#1a0a3d] to-[#0c1445] text-white overflow-hidden pt-14 pb-20 md:pt-18 md:pb-24">
        <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 15% 50%, #7c3aed 0%, transparent 50%), radial-gradient(circle at 85% 20%, #2563eb 0%, transparent 45%), radial-gradient(circle at 60% 80%, #ec4899 0%, transparent 40%)" }} />
        <div className="w-[min(1200px,94%)] mx-auto relative z-10 grid lg:grid-cols-[1fr_420px] gap-12 items-center">
          <div className="space-y-6">
            <span className="inline-block bg-gradient-to-r from-[#7c3aed] to-[#ec4899] text-white font-black text-xs px-4 py-1.5 rounded-full uppercase tracking-widest">
              🤖 Enrollments Open — 2026 Batch
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-[52px] font-black leading-tight tracking-tight">
              Master <span className="text-[#a78bfa]">AI</span> &amp; <span className="text-[#60a5fa]">Machine</span><br />
              <span className="text-[#f472b6]">Learning</span> in 6 Months
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
              From ML fundamentals to Generative AI &amp; LLMs — the most comprehensive AI/ML certification program in India. Build real models. Get hired at top AI companies.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              {[
                ["Live + Recorded", "Sessions"],
                ["6 Modules", "End-to-End"],
                ["AI/ML", "Certification"],
                ["LLMs & GenAI", "Included"],
                ["₹10–35 LPA", "AI Packages"],
                ["MLOps &", "Cloud Included"],
              ].map(([v, l], i) => (
                <div key={i} className="bg-white/8 border border-white/15 rounded-xl p-3 text-center backdrop-blur-sm">
                  <div className="text-[#a78bfa] font-black text-sm">{v}</div>
                  <div className="text-slate-300 text-[11px] mt-0.5">{l}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href="#enroll" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#7c3aed] to-[#ec4899] hover:opacity-90 text-white font-black text-sm px-7 py-3.5 rounded-full shadow-lg transition-all">
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
                <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-3xl mx-auto">✓</div>
                <h3 className="text-xl font-black text-[#1a0a3d]">Thank You!</h3>
                <p className="text-sm text-slate-500">Our AI/ML advisor will call you to discuss the curriculum, LLM modules, fees &amp; batch schedule.</p>
                <button onClick={() => setStatus("idle")} className="text-xs text-[#7c3aed] underline font-bold">Submit another enquiry</button>
              </div>
            ) : (
              <>
                <div className="text-center mb-5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 text-purple-700 text-xs font-black rounded-full border border-purple-200 mb-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                    Limited Seats — Next Batch Starting Soon
                  </span>
                  <h2 className="text-2xl font-black text-[#1a0a3d]">Get Free AI/ML Counselling</h2>
                  <p className="text-xs text-slate-400 mt-1">Curriculum · LLMs · Certification · Placement Support</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input name="name" placeholder="Full Name *" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7c3aed]" />
                  <div className="grid grid-cols-2 gap-3">
                    <input name="phone" placeholder="Mobile Number *" required pattern="[0-9]{10}" title="10-digit number" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7c3aed]" />
                    <input name="email" type="email" placeholder="Email Address *" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7c3aed]" />
                  </div>
                  <div>
                    <select name="timeSlot" required defaultValue="9:00 AM - 12:00 PM" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#7c3aed] text-slate-600">
                      <option value="" disabled>Preferred Free Time Slot *</option>
                      {["9:00 AM - 12:00 PM", "12:00 PM - 2:00 PM", "2:00 PM - 4:00 PM", "4:00 PM - 7:00 PM", "7:00 PM - 9:00 PM", "9:00 PM - 11:00 PM"].map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <button type="submit" disabled={status === "submitting"} className="w-full py-3.5 bg-gradient-to-r from-[#7c3aed] to-[#ec4899] text-white font-black text-sm rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-60">
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
            <span className="inline-block px-4 py-1 bg-purple-50 text-purple-700 text-xs font-black rounded-full uppercase tracking-wider mb-3">Course Curriculum</span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1a0a3d]">6-Module AI/ML Mastery Program</h2>
            <p className="text-slate-500 mt-2 max-w-xl mx-auto text-sm">
              From ML fundamentals to production LLMs — a curriculum built for the AI jobs of 2026 and beyond.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {COURSE_MODULES.map((mod, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#ec4899] text-white flex items-center justify-center font-black text-sm mb-4">
                  0{i + 1}
                </div>
                <h3 className="font-black text-[#1a0a3d] text-sm mb-3">{mod.title}</h3>
                <ul className="space-y-1.5">
                  {mod.topics.map((t, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-slate-600">
                      <span className="text-[#7c3aed] mt-0.5 font-black">▸</span>{t}
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
            <span className="inline-block px-4 py-1 bg-pink-50 text-pink-700 text-xs font-black rounded-full uppercase tracking-wider mb-3">Career Outcomes</span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1a0a3d]">AI/ML Roles You Can Land</h2>
            <p className="text-slate-500 mt-2 text-sm">
              AI &amp; ML engineers are among the highest-paid professionals globally — and demand is only accelerating.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CAREER_ROLES.map((role, i) => (
              <div key={i} className="bg-gradient-to-br from-[#f5f0ff] to-white border border-[#e9d5ff] rounded-2xl p-5 flex items-center gap-4">
                <span className="text-3xl">{role.icon}</span>
                <div>
                  <h3 className="font-black text-[#1a0a3d] text-sm">{role.title}</h3>
                  <p className="text-purple-600 font-bold text-xs mt-0.5">{role.salary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEES ── */}
      <section id="fees" className="py-16 bg-gradient-to-br from-[#1a0a3d] to-[#0c1445] text-white">
        <div className="w-[min(700px,94%)] mx-auto text-center space-y-6">
          <span className="inline-block px-4 py-1 bg-[#a78bfa] text-slate-900 text-xs font-black rounded-full uppercase tracking-wider">
            Course Investment
          </span>
          <h2 className="text-3xl sm:text-4xl font-black">Transparent &amp; Flexible Pricing</h2>
          <p className="text-slate-300 text-sm">EMI options available. Speak to an advisor for the latest pricing and scholarship offers.</p>
          <div className="bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur space-y-4">
            <div className="text-5xl font-black text-[#a78bfa]">Contact Us</div>
            <p className="text-slate-300 text-sm">Get a personalised fee quote based on your profile &amp; goals.</p>
            <ul className="text-left space-y-2 max-w-xs mx-auto">
              {["0% Interest EMI Plans","Merit-Based Scholarships","Corporate & Group Discounts","AI Job Guarantee Program (T&C Apply)"].map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-slate-200">
                  <span className="text-[#a78bfa] font-black">✓</span>{f}
                </li>
              ))}
            </ul>
            <a href="#enroll" className="inline-block bg-gradient-to-r from-[#7c3aed] to-[#ec4899] text-white font-black text-sm px-8 py-3.5 rounded-full shadow-lg hover:opacity-90 transition-all">
              Get Fee Details →
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-16 bg-[#f8fafc]">
        <div className="w-[min(780px,94%)] mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1 bg-purple-50 text-purple-700 text-xs font-black rounded-full uppercase tracking-wider mb-3">FAQ</span>
            <h2 className="text-3xl font-black text-[#1a0a3d]">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-6 py-4 text-left font-bold text-sm text-[#1a0a3d]">
                  <span>{faq.q}</span>
                  <span className="text-[#7c3aed] text-lg ml-4">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#ec4899]">
        <div className="w-[min(700px,94%)] mx-auto text-center space-y-5">
          <h2 className="text-3xl sm:text-4xl font-black text-white">Build the Future with AI &amp; ML</h2>
          <p className="text-purple-100 text-sm">Join Inxyme's AI/ML program and become one of India's most in-demand AI engineers.</p>
          <a href="#enroll" className="inline-block bg-white text-[#7c3aed] font-black text-sm px-10 py-4 rounded-full shadow-xl hover:bg-purple-50 transition-all">
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
            <strong className="text-slate-400">Disclaimer:</strong> Inxyme is an independent e-learning platform offering job-ready certification courses in AI, Machine Learning, and related technologies. Salary ranges shown are indicative market data and not guaranteed. Placement support is provided on a best-effort basis. Individual outcomes may vary based on skills, effort, and market conditions.
          </p>
          <p className="text-center text-[#4a5568]">© {new Date().getFullYear()} Inxyme. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
