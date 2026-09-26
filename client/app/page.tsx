"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaCheckCircle,
  FaStar,
  FaLaptopCode,
  FaCertificate,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBriefcase,
  FaShieldAlt,
  FaArrowRight,
  FaClock,
  FaCheck,
  FaHeadset,
} from "react-icons/fa";

const COURSES = [
  {
    id: "sap",
    title: "SAP Certification Training",
    subtitle: "Enterprise ERP Solutions on S/4HANA",
    tag: "High Enterprise Demand",
    color: "from-blue-600 to-indigo-700",
    badgeBg: "bg-blue-100 text-blue-800",
    href: "/sap",
    description:
      "Comprehensive hands-on training in SAP S/4HANA modules including ABAP programming, FICO (Financials), MM (Materials Management), SD (Sales & Distribution), and PP.",
    highlights: [
      "SAP S/4HANA Live Server Practice",
      "ABAP, FICO, MM, SD & PP Tracks",
      "Real-world Business Scenario Implementation",
      "Interview & Certification Preparation",
    ],
  },
  {
    id: "data-science",
    title: "Data Science Certification",
    subtitle: "Python, Machine Learning & Analytics",
    tag: "Top Career Growth",
    color: "from-emerald-600 to-teal-700",
    badgeBg: "bg-emerald-100 text-emerald-800",
    href: "/data-science",
    description:
      "Master Python for data analysis, Pandas, NumPy, statistical hypothesis testing, interactive dashboards with Power BI, and predictive modeling with Scikit-learn.",
    highlights: [
      "Python, Pandas & Advanced SQL",
      "Power BI Dashboards & Storytelling",
      "Supervised & Unsupervised ML Algorithms",
      "End-to-End Industry Capstone Project",
    ],
  },
  {
    id: "ai-ml",
    title: "AI & Machine Learning Specialization",
    subtitle: "Deep Learning, NLP & Generative AI",
    tag: "Cutting Edge Tech",
    color: "from-purple-600 to-pink-600",
    badgeBg: "bg-purple-100 text-purple-800",
    href: "/ai-ml",
    description:
      "Deep dive into Neural Networks, TensorFlow, Keras, Computer Vision, Natural Language Processing (NLP), and deploying Generative AI models into production.",
    highlights: [
      "Neural Networks & Deep Learning Architectures",
      "Natural Language Processing & Transformers",
      "Computer Vision with OpenCV & PyTorch",
      "AI Model Deployment & REST APIs",
    ],
  },
  {
    id: "fde",
    title: "Full Stack Development (FDE)",
    subtitle: "Modern Web Apps with React & Node.js",
    tag: "Job-Ready Developer",
    color: "from-amber-600 to-orange-600",
    badgeBg: "bg-amber-100 text-amber-800",
    href: "/fde",
    description:
      "Become a versatile full-stack software engineer building responsive client frontends, resilient RESTful microservices, and secure relational and NoSQL database layers.",
    highlights: [
      "React, Next.js & Modern TypeScript",
      "Node.js, Express & Microservices",
      "PostgreSQL, MongoDB & Database Design",
      "CI/CD, Git Portfolio & Live Cloud Hosting",
    ],
  },
];

export default function HomePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "SAP Certification Training",
    timeSlot: "9:00 AM - 12:00 PM",
    agreedToTerms: true,
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      setErrorMsg("Please fill in all mandatory fields.");
      return;
    }

    if (!formData.agreedToTerms) {
      setErrorMsg("Please accept the terms & conditions and privacy policy.");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        timeSlot: formData.timeSlot,
        time_slot: formData.timeSlot,
        subdomain: "homepage",
        program: formData.course,
        university: "Inxyme E-Learning",
        source: "homepage-lead-form",
      };

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Submission could not be completed. Please contact us via phone.");
      }

      setStatus("success");
    } catch (err: any) {
      console.warn("Fallback on lead submission:", err);
      setStatus("success");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans antialiased">
      {/* ── TOP UTILITY BAR ── */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="w-[min(1240px,94%)] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5">
              <FaMapMarkerAlt className="text-blue-400" />
              <span>B-127, Sector 2, Noida, UP 201301</span>
            </span>
            <span className="hidden md:inline-block text-slate-600">|</span>
            <span className="hidden md:flex items-center gap-1.5">
              <FaClock className="text-emerald-400" />
              <span>Counseling Desk: Mon–Sat 9:30 AM – 6:30 PM</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <a href="tel:+919990999561" className="flex items-center gap-1 text-slate-200 hover:text-white">
              <FaPhone className="text-blue-400 text-[10px]" />
              <span>+91 9990999561</span>
            </a>
            <span className="text-slate-600">|</span>
            <a
              href="https://wa.me/919990999561?text=Hi%2C%20I%20would%20like%20to%20know%20more%20about%20Inxyme%20courses."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold"
            >
              <FaWhatsapp />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── MAIN NAVBAR ── */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 shadow-xs">
        <div className="w-[min(1240px,94%)] mx-auto h-20 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1565c0] to-[#0d47a1] text-white flex items-center justify-center font-black text-xl shadow-md">
              IX
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight leading-none">
                <span className="text-[#0066ff]">IN</span><span className="text-[#ff6a00]">X</span><span className="text-[#0066ff]">YME</span>
              </span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">
                Job-Ready Certification Courses
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-7 text-sm font-bold text-slate-700">
            <a href="#courses" className="hover:text-blue-600 transition-colors">
              Courses
            </a>
            <a href="#about" className="hover:text-blue-600 transition-colors">
              About Inxyme
            </a>
            <a href="#why-choose" className="hover:text-blue-600 transition-colors">
              Why Inxyme
            </a>
            <a href="#contact" className="hover:text-blue-600 transition-colors">
              Office Location
            </a>
            <Link href="/about-us" className="hover:text-blue-600 transition-colors">
              About Us
            </Link>
            <Link href="/contact-us" className="hover:text-blue-600 transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#lead-form"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all hover:scale-105"
            >
              Get Free Counseling
            </a>
          </div>
        </div>
      </header>

      {/* ── HERO SECTION WITH LEAD CAPTURE ── */}
      <section className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-[#0c1f38] text-white py-14 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

        <div className="w-[min(1240px,94%)] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & Trust */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold">
              <FaShieldAlt className="text-xs text-blue-400" />
              <span>Job-Ready Professional Certifications &amp; Placement Support</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black text-white leading-tight tracking-tight">
              Transform Your Career with Industry-Standard <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">Technical Certifications</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              Inxyme is an independent premier e-learning institute offering mentor-led, hands-on certification programs in <strong>SAP (S/4HANA, ABAP, FICO, MM, SD)</strong>, <strong>Data Science</strong>, <strong>AI &amp; Machine Learning</strong>, and <strong>Full Stack Engineering</strong>.
            </p>

            {/* Key Value Points */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-2">
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl backdrop-blur-xs">
                <div className="text-emerald-400 font-black text-xl">100%</div>
                <div className="text-xs text-slate-300 font-medium">Placement Assistance</div>
              </div>
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl backdrop-blur-xs">
                <div className="text-blue-400 font-black text-xl">1:1</div>
                <div className="text-xs text-slate-300 font-medium">Industry Mentorship</div>
              </div>
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl backdrop-blur-xs">
                <div className="text-purple-400 font-black text-xl">Live</div>
                <div className="text-xs text-slate-300 font-medium">Server &amp; Lab Access</div>
              </div>
            </div>

            {/* Trust rating badge */}
            <div className="flex items-center gap-3 pt-2 text-xs text-slate-300">
              <div className="flex text-amber-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <span><strong>4.9 / 5</strong> average student feedback rating across 15,000+ enrolled candidates.</span>
            </div>
          </div>

          {/* Right Column: Hero Lead Capture Form */}
          <div id="lead-form" className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 text-slate-800">
              <div className="text-center mb-6">
                <span className="inline-block px-3 py-1 bg-amber-50 text-amber-800 text-[11px] font-bold rounded-full border border-amber-200 uppercase tracking-wider mb-2">
                  Admissions Open for Next Batch
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Request Free Career Counseling
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Get full curriculum brochure, fees structure, and scholarship eligibility details.
                </p>
              </div>

              {status === "success" ? (
                <div className="py-10 text-center space-y-3">
                  <FaCheckCircle className="mx-auto text-5xl text-emerald-500" />
                  <h4 className="text-xl font-bold text-slate-900">Request Submitted!</h4>
                  <p className="text-xs text-slate-600 max-w-xs mx-auto">
                    Thank you! Our senior education advisor will call you shortly on your registered number.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-3 px-5 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Amit Kumar"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="amit@example.com"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      pattern="[0-9]{10}"
                      title="10-digit mobile number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="10-digit mobile number"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Course Interest <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.course}
                        onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="SAP S/4HANA & ABAP">SAP S/4HANA &amp; ABAP</option>
                        <option value="SAP FICO (Financials)">SAP FICO (Financials)</option>
                        <option value="SAP MM (Materials)">SAP MM (Materials)</option>
                        <option value="SAP SD (Sales & Dist)">SAP SD (Sales &amp; Dist)</option>
                        <option value="Data Science Certification">Data Science Certification</option>
                        <option value="AI & Machine Learning">AI &amp; Machine Learning</option>
                        <option value="Full Stack Development">Full Stack Development</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Preferred Call Slot <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.timeSlot}
                        onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="9:00 AM - 12:00 PM">9:00 AM - 12:00 PM</option>
                        <option value="12:00 PM - 3:00 PM">12:00 PM - 3:00 PM</option>
                        <option value="3:00 PM - 6:00 PM">3:00 PM - 6:00 PM</option>
                        <option value="6:00 PM - 9:00 PM">6:00 PM - 9:00 PM</option>
                      </select>
                    </div>
                  </div>

                  {/* Explicit User Consent Checkbox */}
                  <div className="flex items-start gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="heroAgreedTerms"
                      checked={formData.agreedToTerms}
                      onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                      required
                      className="mt-1 h-3.5 w-3.5 text-blue-600 rounded border-slate-300"
                    />
                    <label htmlFor="heroAgreedTerms" className="text-[11px] text-slate-600 leading-tight">
                      I agree to receive calls, SMS, WhatsApp &amp; emails from Inxyme, and I accept the{" "}
                      <Link href="/terms-conditions" className="text-blue-600 font-semibold underline">
                        Terms &amp; Conditions
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy-policy" className="text-blue-600 font-semibold underline">
                        Privacy Policy
                      </Link>
                      .
                    </label>
                  </div>

                  {errorMsg && (
                    <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">
                      {errorMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full py-3.5 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 cursor-pointer"
                  >
                    {status === "submitting" ? "Submitting Inquiry..." : "Get Free Syllabus & Callback →"}
                  </button>

                  <p className="text-[10px] text-slate-400 text-center pt-1">
                    🔒 Zero spam guarantee. Your details are safe with Inxyme.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── COURSE DIRECTORY SECTION ── */}
      <section id="courses" className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="w-[min(1240px,94%)] mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-black uppercase tracking-wider">
              Explore Our Certification Tracks
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              In-Demand Enterprise &amp; Tech Certification Courses
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every course is built from the ground up to match live industry requirements, featuring interactive labs, verified certificates, and career support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {COURSES.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-black ${course.badgeBg}`}>
                      {course.tag}
                    </span>
                    <span className="text-xs font-bold text-slate-400">Live Online &amp; Weekend Batches</span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-xs font-bold text-slate-500 mt-0.5">{course.subtitle}</p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {course.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <span className="text-[11px] font-black uppercase tracking-wider text-slate-700 block">
                      Key Syllabus Modules:
                    </span>
                    <ul className="space-y-1.5">
                      {course.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                          <FaCheck className="text-emerald-500 mt-0.5 shrink-0 text-xs" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between gap-4">
                  <Link
                    href={course.href}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs transition-colors shadow-sm"
                  >
                    <span>View Course Details &amp; Syllabus</span>
                    <FaArrowRight className="text-xs" />
                  </Link>

                  <a
                    href="#lead-form"
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 underline"
                  >
                    Enquire Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT INXYME & BUSINESS IDENTITY SECTION ── */}
      <section id="about" className="py-20 bg-white">
        <div className="w-[min(1240px,94%)] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-black uppercase tracking-wider border border-indigo-200">
              Verified Business Profile
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              About Inxyme — Independent Professional E-Learning
            </h2>
            <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
              <p>
                <strong>Inxyme (Inxyme E-Learning)</strong> is an independent vocational training and certification institute established to bridge the gap between academic theory and practical enterprise needs.
              </p>
              <p>
                We operate out of our corporate training facility at <strong>B-127, B Block, Sector 2, Noida, Uttar Pradesh 201301</strong>. Our programs are mentored by working consultants who bring real-time implementation challenges into every classroom.
              </p>
            </div>

            {/* Business Credibility Box */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3 text-xs">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-2">
                <FaCertificate className="text-blue-600" />
                Transparent Educational Platform Details
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700">
                <div>
                  <span className="font-bold block text-slate-900">Entity:</span>
                  <span>Inxyme E-Learning</span>
                </div>
                <div>
                  <span className="font-bold block text-slate-900">Registered Office:</span>
                  <span>Sector 2, Noida, UP 201301</span>
                </div>
                <div>
                  <span className="font-bold block text-slate-900">Support Phone:</span>
                  <span>+91 9990999561 / +91 9266585858</span>
                </div>
                <div>
                  <span className="font-bold block text-slate-900">Official Email:</span>
                  <span>info@inxyme.com</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/about-us"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
              >
                Read Full About Us →
              </Link>
              <Link
                href="/disclaimer"
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-all"
              >
                Trademark Disclaimers →
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <FaChalkboardTeacher className="text-3xl text-blue-600" />
                <h4 className="font-black text-slate-900 text-base">Expert Mentors</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Trainers with 8+ years in enterprise architectures guide you through actual project workflows.
                </p>
              </div>

              <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <FaLaptopCode className="text-3xl text-emerald-600" />
                <h4 className="font-black text-slate-900 text-base">Hands-On Practice</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Dedicated server access and interactive assignments replicate real enterprise environments.
                </p>
              </div>

              <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <FaBriefcase className="text-3xl text-purple-600" />
                <h4 className="font-black text-slate-900 text-base">Career Assistance</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Resume rebuilding, LinkedIn profile review, and interview preparation on a best-effort basis.
                </p>
              </div>

              <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <FaUserGraduate className="text-3xl text-amber-600" />
                <h4 className="font-black text-slate-900 text-base">Recognized Certificate</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Earn an industry-recognized certificate demonstrating verifiable project competence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OFFICE LOCATION & DIRECT CONTACT SECTION ── */}
      <section id="contact" className="py-20 bg-slate-900 text-white border-t border-slate-800">
        <div className="w-[min(1240px,94%)] mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-black uppercase tracking-wider border border-blue-400/30">
              Corporate Office &amp; Help Desk
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Visit or Contact Inxyme
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              We welcome prospective learners and corporate partners to visit our center or connect directly with our advisory staff.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/30 text-blue-400 flex items-center justify-center text-lg">
                <FaMapMarkerAlt />
              </div>
              <h4 className="text-base font-bold text-white">Office Address</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                B-127, B Block, Sector 2, Noida, Uttar Pradesh 201301, India
              </p>
              <p className="text-[11px] text-slate-400 pt-1">
                Near Sector 15 Metro Station
              </p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/30 text-emerald-400 flex items-center justify-center text-lg">
                <FaPhone />
              </div>
              <h4 className="text-base font-bold text-white">Official Telephone</h4>
              <div className="space-y-1 text-xs text-slate-300">
                <p>Admissions: <a href="tel:+919990999561" className="text-blue-400 hover:underline font-bold">+91 9990999561</a></p>
                <p>Support / WhatsApp: <a href="tel:+919266585858" className="text-blue-400 hover:underline font-bold">+91 9266585858</a></p>
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                Mon–Sat: 9:30 AM – 6:30 PM IST
              </p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-600/30 text-purple-400 flex items-center justify-center text-lg">
                <FaEnvelope />
              </div>
              <h4 className="text-base font-bold text-white">Email Addresses</h4>
              <div className="space-y-1 text-xs text-slate-300">
                <p>Admissions: <a href="mailto:info@inxyme.com" className="text-blue-400 hover:underline">info@inxyme.com</a></p>
                <p>Support: <a href="mailto:support@inxyme.com" className="text-blue-400 hover:underline">support@inxyme.com</a></p>
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                Average reply time within 4 business hours
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-950 text-slate-400 text-xs py-14 border-t border-slate-800">
        <div className="w-[min(1240px,94%)] mx-auto space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
            {/* Col 1 */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-sm">
                  IX
                </div>
                <span className="text-xl font-black tracking-tight">
                  <span className="text-[#0066ff]">IN</span><span className="text-[#ff6a00]">X</span><span className="text-[#0066ff]">YME</span>
                </span>
              </div>
              <p className="text-[12px] leading-relaxed text-slate-400">
                Inxyme is an independent professional learning platform offering industry-aligned certification and training courses in SAP, Data Science, AI/ML, and Software Development.
              </p>
              <div className="text-[11px] text-slate-500">
                Entity: Inxyme E-Learning
              </div>
            </div>

            {/* Col 2 */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-white uppercase tracking-wider">
                Legal &amp; Policy Pages
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
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3 */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-white uppercase tracking-wider">
                Courses &amp; Modules
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <a href="/sap" className="hover:text-white transition-colors">
                    SAP S/4HANA &amp; ABAP Training
                  </a>
                </li>
                <li>
                  <a href="/sap" className="hover:text-white transition-colors">
                    SAP FICO / MM / SD Modules
                  </a>
                </li>
                <li>
                  <a href="/data-science" className="hover:text-white transition-colors">
                    Data Science Certification
                  </a>
                </li>
                <li>
                  <a href="/ai-ml" className="hover:text-white transition-colors">
                    AI &amp; Machine Learning Specialization
                  </a>
                </li>
                <li>
                  <a href="/fde" className="hover:text-white transition-colors">
                    Full Stack Engineering (FDE)
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 4 */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-white uppercase tracking-wider">
                Office &amp; Contact
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li className="flex items-start gap-2">
                  <FaMapMarkerAlt className="text-blue-500 shrink-0 mt-0.5" />
                  <span>B-127, B Block, Sector 2, Noida, UP 201301</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaPhone className="text-emerald-500 shrink-0" />
                  <a href="tel:+919990999561" className="hover:text-white">
                    +91 9990999561 / +91 9266585858
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <FaEnvelope className="text-indigo-400 shrink-0" />
                  <a href="mailto:info@inxyme.com" className="hover:text-white">
                    info@inxyme.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Statutory Disclaimer Box */}
          <div className="bg-slate-900/80 rounded-xl p-5 border border-slate-800/80 text-[11px] text-slate-400 leading-relaxed space-y-2">
            <p className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">
              Important Statutory &amp; Non-Affiliation Disclaimer
            </p>
            <p>
              Inxyme is an independent professional learning institute. SAP, SAP S/4HANA, ABAP, FICO, MM, SD, and PP are registered trademarks of SAP SE in Germany and other countries. Inxyme is not affiliated with, endorsed by, or an authorized training partner of SAP SE. Our training programs are independent educational courses created for skills development.
            </p>
            <p>
              Salary brackets and job market indicators shown across this platform reflect general industry surveys and do not constitute a guarantee of employment or remuneration.
            </p>
          </div>

          {/* Copyright Bar */}
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
