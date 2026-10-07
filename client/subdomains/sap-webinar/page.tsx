"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import {
  FaCheckCircle,
  FaStar,
  FaClock,
  FaCalendarAlt,
  FaLaptopCode,
  FaUserTie,
  FaChalkboardTeacher,
  FaBriefcase,
  FaShieldAlt,
  FaAward,
  FaCode,
  FaFileInvoiceDollar,
  FaBoxes,
  FaChartLine,
  FaCogs,
  FaWhatsapp,
  FaPhoneAlt,
  FaArrowRight,
  FaGift,
  FaUsers,
  FaVideo,
  FaLock,
  FaBolt,
  FaChevronDown,
  FaDownload,
  FaBookReader,
  FaFileAlt,
  FaGlobe,
  FaRegLightbulb,
} from "react-icons/fa";

const WHATSAPP_URL =
  "https://wa.me/919990999561?text=Hi%20Inxyme%2C%20I%20saw%20your%20%E2%82%B99%20SAP%20Career%20Webinar%20ad%20and%20want%20to%20know%20more%20details.";

const LOGO_SRC = "/images/Inxyme%20png%20logo.png";

const COURSE_DIRECTIONS = [
  {
    id: "sap-fico",
    title: "SAP FICO (Financial & Controlling)",
    tag: "Highest Finance Demand",
    color: "from-blue-600 to-indigo-700",
    border: "border-blue-500/40",
    bgBadge: "bg-blue-500/20 text-blue-300",
    icon: <FaFileInvoiceDollar className="text-blue-400" />,
    bestFor: "Commerce / B.Com / M.Com / CA / MBA Finance / Accountants",
    avgSalary: "₹6.5 LPA - ₹18 LPA",
    overview:
      "Financial Accounting (FI) + Management Controlling (CO). Handles general ledger, accounts payable/receivable, asset accounting, cost center accounting, and financial reporting.",
    whyChoose:
      "Every company running SAP needs FICO consultants to comply with GST, taxation, and corporate audits.",
  },
  {
    id: "sap-abap",
    title: "SAP ABAP on S/4HANA (Cloud / RAP)",
    tag: "Core Coding & Architecture",
    color: "from-purple-600 to-indigo-800",
    border: "border-purple-500/40",
    bgBadge: "bg-purple-500/20 text-purple-300",
    icon: <FaCode className="text-purple-400" />,
    bestFor: "B.Tech / BCA / MCA / Developers / Anyone who likes Programming",
    avgSalary: "₹7 LPA - ₹24 LPA",
    overview:
      "Advanced Business Application Programming. Build custom business logic, reports, interfaces (APIs), enhancements, CDS views, and RESTful Application Programming (RAP).",
    whyChoose:
      "Huge demand for modern S/4HANA developers as legacy SAP systems migrate to cloud.",
  },
  {
    id: "sap-mm",
    title: "SAP MM (Materials Management)",
    tag: "Supply Chain & Procurement",
    color: "from-emerald-600 to-teal-800",
    border: "border-emerald-500/40",
    bgBadge: "bg-emerald-500/20 text-emerald-300",
    icon: <FaBoxes className="text-emerald-400" />,
    bestFor: "Engineers / B.Sc / MBA Ops / Non-IT / Freshers / Supply Chain",
    avgSalary: "₹6 LPA - ₹16 LPA",
    overview:
      "Covers end-to-end procurement process (Procure-to-Pay), inventory management, vendor evaluation, purchasing, and warehouse integration.",
    whyChoose:
      "Extremely intuitive business logic without hardcore coding. Great starting point for non-tech graduates.",
  },
  {
    id: "sap-sd",
    title: "SAP SD (Sales & Distribution)",
    tag: "Business & Revenue Ops",
    color: "from-amber-600 to-orange-700",
    border: "border-amber-500/40",
    bgBadge: "bg-amber-500/20 text-amber-300",
    icon: <FaChartLine className="text-amber-400" />,
    bestFor: "BBA / MBA Marketing / Sales Professionals / Any Graduate",
    avgSalary: "₹6 LPA - ₹16 LPA",
    overview:
      "Master the Order-to-Cash (O2C) cycle — sales quotation, sales order processing, pricing procedures, delivery, billing, and credit management.",
    whyChoose:
      "Directly ties into company revenue generation. High consulting opportunities worldwide.",
  },
  {
    id: "sap-pp",
    title: "SAP PP (Production Planning)",
    tag: "Manufacturing & Industrial",
    color: "from-rose-600 to-pink-800",
    border: "border-rose-500/40",
    bgBadge: "bg-rose-500/20 text-rose-300",
    icon: <FaCogs className="text-rose-400" />,
    bestFor: "Mechanical / Production / Automobile Engineers / Plant Managers",
    avgSalary: "₹6.5 LPA - ₹17 LPA",
    overview:
      "Bill of Materials (BOM), work centers, routing, material requirements planning (MRP), capacity planning, and shop-floor execution.",
    whyChoose:
      "Massive demand across manufacturing plants, automotive giants, and industrial supply hubs.",
  },
  {
    id: "tech-tracks",
    title: "AI, Machine Learning & Data Analytics",
    tag: "Emerging Tech & AI",
    color: "from-cyan-600 to-blue-800",
    border: "border-cyan-500/40",
    bgBadge: "bg-cyan-500/20 text-cyan-300",
    icon: <FaLaptopCode className="text-cyan-400" />,
    bestFor: "Analytical Minds / Tech Enthusiasts / Math / Stats / IT Freshers",
    avgSalary: "₹7 LPA - ₹22 LPA",
    overview:
      "Learn Python, Machine Learning, Power BI, SQL, and enterprise analytics dashboards that integrate with business databases.",
    whyChoose:
      "Ideal if you want to become a Data Scientist, AI Engineer, or Enterprise Business Intelligence Specialist.",
  },
];

const INXYME_ADVANTAGES = [
  {
    icon: <FaAward className="text-amber-400 text-xl" />,
    title: "Proprietary In-House Curriculum",
    highlight: "Best in India",
    description:
      "Crafted by senior enterprise architects based on real-world business blueprints and S/4HANA Cloud standards.",
  },
  {
    icon: <FaFileAlt className="text-blue-400 text-xl" />,
    title: "ATS-Compliant Resume Building",
    highlight: "MNC Shortlist",
    description:
      "Customized corporate resumes engineered to clear ATS filters (Deloitte, Accenture, TCS, IBM) highlighting real ERP projects.",
  },
  {
    icon: <FaBriefcase className="text-emerald-400 text-xl" />,
    title: "Multiple Mock Interviews",
    highlight: "Technical + HR",
    description:
      "Multi-round mock interviews (Technical, Scenario-based, Client-facing) with senior industry professionals and detailed scorecards.",
  },
  {
    icon: <FaGlobe className="text-purple-400 text-xl" />,
    title: "Personal Portfolio Website",
    highlight: "yourname.inxyme.com",
    description:
      "Every student receives a verified live personal web portfolio hosted on Inxyme to showcase live projects and configurations.",
  },
  {
    icon: <FaUserTie className="text-cyan-400 text-xl" />,
    title: "1-on-1 Career Mentorship",
    highlight: "Personal Roadmap",
    description:
      "Custom career strategy aligned with your background to ensure smooth job transition and maximum salary packages.",
  },
  {
    icon: <FaDownload className="text-pink-400 text-xl" />,
    title: "Downloadable Resource Kits",
    highlight: "Lifetime Access",
    description:
      "1,000+ SAP Interview Question Bank, T-Code Cheat Sheets, IMG Configuration Blueprints, and lifetime career E-books.",
  },
  {
    icon: <FaVideo className="text-red-400 text-xl" />,
    title: "100% Live Interactive Classes",
    highlight: "Two-Way Audio/Video",
    description:
      "Zero pre-recorded generic videos. Daily live interactive sessions featuring screen-sharing, instant Q&A, and server implementations.",
  },
  {
    icon: <FaChalkboardTeacher className="text-indigo-400 text-xl" />,
    title: "Dedicated Daily Doubt Resolution",
    highlight: "Never Stuck",
    description:
      "Dedicated 1-on-1 doubt clearing counters where mentors troubleshoot configuration errors directly via screen sharing.",
  },
  {
    icon: <FaLaptopCode className="text-yellow-400 text-xl" />,
    title: "24/7 Live Cloud ERP Access",
    highlight: "S/4HANA Server",
    description:
      "Round-the-clock access to live SAP S/4HANA cloud servers with GUI and Fiori launchpad for hands-on enterprise practice.",
  },
  {
    icon: <FaShieldAlt className="text-emerald-400 text-xl" />,
    title: "Verified Global Certification",
    highlight: "ISO Recognized",
    description:
      "Globally verifiable certification with secure verification code + official SAP Global Certification exam preparation support.",
  },
  {
    icon: <FaUsers className="text-teal-400 text-xl" />,
    title: "Dedicated Placement Cell",
    highlight: "200+ Partners",
    description:
      "Dedicated recruitment team circulating resumes across top consulting firms and tech enterprises with regular interview drives.",
  },
  {
    icon: <FaBookReader className="text-amber-400 text-xl" />,
    title: "LMS & Community Access",
    highlight: "Class Recordings",
    description:
      "High-definition recordings of every live class saved on your portal for lifelong revision and peer networking.",
  },
];

const WEBINAR_AGENDA = [
  {
    time: "00 – 15 Min",
    title: "Industry Reality & Salary Growth",
    desc: "Understand why companies offer ₹8L - ₹25L salaries to certified SAP consultants in India and abroad.",
  },
  {
    time: "15 – 35 Min",
    title: "Right Course Selection: ABAP vs FICO vs MM vs SD vs PP",
    desc: "Determine which learning track perfectly fits your educational background and career objectives.",
  },
  {
    time: "35 – 55 Min",
    title: "Live S/4HANA System Demo & Job Roles",
    desc: "Live demonstration inside an actual SAP S/4HANA system showing day-to-day corporate consultant workflows.",
  },
  {
    time: "55 – 70 Min",
    title: "Placement Blueprint & Portfolio Showcase",
    desc: "Learn how resume optimization and personal Inxyme domain portfolios instantly impress recruiters.",
  },
  {
    time: "70 – 80 Min",
    title: "Course Packages & Batch Schedules",
    desc: "Complete walkthrough of upcoming Inxyme batches, training roadmaps, and annual certification packages.",
  },
  {
    time: "80 – 90 Min",
    title: "Live 1-on-1 Q&A With Mentor",
    desc: "Direct answers to your questions regarding career gaps, qualifications, and transition roadmaps.",
  },
];

const FAQS = [
  {
    q: "Why is the webinar registration priced at ₹9 instead of being free?",
    a: "We charge a nominal token fee of ₹9 to filter out casual sign-ups and attract serious, dedicated learners. Free webinars often result in overcrowded sessions where genuine students miss out on interaction. This small commitment ensures your seat is reserved and guarantees you active participation in the live mentor Q&A session, along with ₹5,997 worth of bonus resource kits.",
  },
  {
    q: "I am from a Non-IT / B.Com / Arts / Fresher background. Can I learn SAP?",
    a: "Yes, absolutely! Over 70% of SAP modules are functional, requiring zero programming skills. SAP FICO is ideal for commerce graduates and accountants, SAP MM for engineers and science graduates, and SAP SD for sales or business backgrounds. Our webinar will guide you step-by-step on making a seamless transition.",
  },
  {
    q: "What benefits do I get by attending this live webinar?",
    a: "1) Complete clarity on choosing the right SAP module for your career, 2) Live SAP S/4HANA system walkthrough, 3) Real salary benchmarks and career roadmaps, 4) Free bonus resource kits worth ₹5,997 (T-code cheat sheets, 150+ interview Q&A), and 5) Exclusive discounts on Inxyme premium training programs.",
  },
  {
    q: "When and where will the webinar take place?",
    a: "The webinar is scheduled for this upcoming weekend. Once registered, you will instantly receive the private Zoom/Google Meet link via WhatsApp and email, along with an invitation to our VIP WhatsApp community group.",
  },
  {
    q: "How is Inxyme's SAP training curriculum different from other institutes?",
    a: "Inxyme utilizes an in-house proprietary curriculum developed by active corporate solution architects. We provide end-to-end training on live S/4HANA servers with cross-module integration, professional ATS resume building, multiple mock interviews, and a personal live web portfolio on 'yourname.inxyme.com'.",
  },
  {
    q: "What is the Personal Portfolio on the Inxyme Domain?",
    a: "When training with Inxyme, we create a dedicated professional portfolio website (e.g., rahul.inxyme.com) displaying your verified SAP case studies, ERP configuration documents, and badges. You can share this link directly with recruiters and hiring managers to fast-track interview shortlists.",
  },
  {
    q: "Will I receive a recording if I miss the live webinar?",
    a: "Yes, registered attendees who complete the ₹9 booking will receive full recording access and downloadable bonus materials directly through their portal and WhatsApp.",
  },
];

export default function SapWebinarPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    background: "B.Tech / BCA / MCA",
    courseInterest: "SAP FICO (Financials)",
    preferredSlot: "Saturday 7:00 PM IST",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 43,
    seconds: 18,
  });

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedCourseTab, setSelectedCourseTab] = useState("sap-fico");

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 2, minutes: 30, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMessage("Please fill all required fields.");
      return;
    }

    if (formData.phone.trim().replace(/\D/g, "").length < 10) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      qualification: formData.background,
      program: `Webinar: ${formData.courseInterest} (Slot: ${formData.preferredSlot})`,
      timeSlot: formData.preferredSlot,
      time_slot: formData.preferredSlot,
      subdomain: "sap-webinar",
      source: "sap-webinar-rs9-landing",
      price: 9,
    };

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      router.push("/thank-you");
    } catch {
      router.push("/thank-you");
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToRegistration = () => {
    const formElement = document.getElementById("register-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#070e1e] text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-900 overflow-x-clip">
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

      {/* ── HEADER WRAPPER ── */}
      <header className="sticky top-0 z-50 w-full shadow-lg">
        {/* Announcement Bar */}
        <div className="bg-gradient-to-r from-red-600 via-amber-500 to-red-600 text-slate-950 text-[11px] sm:text-xs font-extrabold py-1.5 px-3 text-center">
          <div className="w-[min(1200px,94%)] mx-auto flex items-center justify-between sm:justify-center gap-2 sm:gap-4 flex-wrap">
            <span className="flex items-center gap-1 uppercase tracking-wide">
              <FaBolt className="text-slate-950 animate-bounce" />
              ₹999 VALUE — NOW ONLY AT ₹9! 🔥
            </span>
            <span className="hidden md:inline text-slate-900">•</span>
            <span className="text-slate-950 font-bold hidden sm:inline">
              ⚡ LIMITED SLOTS: Only 18 Seats Left For This Weekend
            </span>
            <button
              onClick={scrollToRegistration}
              className="bg-slate-950 hover:bg-slate-900 text-amber-300 px-3 py-0.5 rounded-full text-[11px] font-black shadow-xs transition-transform hover:scale-105 ml-auto sm:ml-0 cursor-pointer"
            >
              Claim Seat Now →
            </button>
          </div>
        </div>

        {/* Navbar */}
        <nav className="bg-[#0b1730]/95 backdrop-blur-md border-b border-white/10">
          <div className="w-[min(1200px,94%)] mx-auto h-[56px] sm:h-[62px] flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 bg-white/95 px-2.5 py-1 rounded-lg shadow-xs">
              <img src={LOGO_SRC} alt="Inxyme" className="h-7 w-auto object-contain" />
            </Link>

            <div className="hidden lg:flex items-center gap-5 text-[11px] uppercase tracking-wider font-bold text-slate-300">
              <a href="#why-inxyme" className="hover:text-amber-400 transition-colors">Why Inxyme?</a>
              <a href="#which-course" className="hover:text-amber-400 transition-colors">Course Finder</a>
              <a href="#advantages" className="hover:text-amber-400 transition-colors">Benefits</a>
              <a href="#why-9" className="hover:text-amber-400 transition-colors">Why ₹9?</a>
              <a href="#faqs" className="hover:text-amber-400 transition-colors">FAQs</a>
            </div>

            <div className="flex items-center gap-2.5">
              <a
                href="tel:+919990999561"
                className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-slate-300 hover:text-white"
              >
                <FaPhoneAlt className="text-amber-400 text-[11px]" /> +91 99909 99561
              </a>
              <button
                onClick={scrollToRegistration}
                className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs px-3.5 py-2 rounded-lg shadow-md transition-transform hover:scale-105 cursor-pointer flex items-center gap-1"
              >
                <span>Book Slot @ ₹9</span>
                <FaArrowRight className="text-[10px]" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* ── HERO SECTION ── */}
      <section className="relative pt-6 pb-12 lg:py-16 overflow-hidden">
        <div className="absolute top-10 left-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-24 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-[min(1200px,94%)] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-black bg-red-500/20 text-red-400 border border-red-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping inline-block" />
                  LIVE CAREER WEBINAR
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-400/15 text-amber-300 border border-amber-400/30">
                  <FaStar className="text-amber-400 text-[10px]" /> ₹999 VALUE — ONLY ₹9
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  <FaShieldAlt className="text-emerald-400 text-[10px]" /> India&apos;s #1 SAP Platform
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                &ldquo;Planning to build a strong career skill...{" "}
                <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 bg-clip-text text-transparent">
                  but confused about exactly what to choose?&rdquo;
                </span>
              </h1>

              <div className="bg-[#0e1d3d]/90 border border-white/10 rounded-xl p-3.5 sm:p-4 relative">
                <div className="text-[11px] uppercase tracking-wider font-extrabold text-amber-400 mb-1.5 flex items-center gap-1">
                  <FaRegLightbulb /> Common Dilemma Faced By Learners:
                </div>
                <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
                  &ldquo;<span className="text-white font-bold">SAP ABAP, SAP FICO, SAP MM, SAP SD, SAP PP, AI, Machine Learning, Power BI, Data Analytics…</span>{" "}
                  There are countless options. How do you choose the right path?&rdquo;
                </p>
                <div className="flex flex-wrap gap-1 mt-2.5">
                  {["SAP FICO", "SAP ABAP", "SAP MM", "SAP SD", "SAP PP", "Data Analytics", "Power BI", "AI / ML"].map((tech, i) => (
                    <span key={i} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2.5 text-xs sm:text-sm text-slate-200 leading-relaxed">
                <p>
                  <strong className="text-amber-400">Join Inxyme&apos;s live webinar to understand:</strong> Which certification track matches your educational background, future growth, realistic corporate salary packages (<strong className="text-emerald-400">₹6 LPA to ₹24 LPA+</strong>), placement frameworks, and live demo sessions.
                </p>
                <p className="text-slate-400">
                  Explore course options, comprehensive learning packages, and end-to-end career roadmaps in one interactive masterclass.
                </p>
              </div>

              {/* Why ₹9 Box */}
              <div id="why-9" className="bg-gradient-to-r from-amber-500/15 via-[#1b2640] to-amber-500/10 border border-amber-400/40 rounded-xl p-4 shadow-lg scroll-mt-24">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center text-base font-black shrink-0 shadow-md">
                    ₹9
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm sm:text-base font-black text-white">Why Do We Charge ₹9 Instead of Making It Free?</h3>
                      <span className="text-[10px] bg-amber-400/20 text-amber-300 font-extrabold px-2 py-0.2 rounded-full border border-amber-400/30">
                        Serious Candidates Only
                      </span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">
                      This nominal token fee ensures that <strong className="text-white">only serious, career-focused learners</strong> register. Free webinars often attract casual audiences, preventing focused interaction. Your ₹9 commitment confirms your seat and guarantees dedicated mentor Q&amp;A participation.
                    </p>
                  </div>
                </div>
              </div>

              {/* Key Quick Bullets */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                <div className="bg-[#0b1730] border border-white/10 rounded-lg p-2.5 flex items-center gap-2">
                  <FaCalendarAlt className="text-amber-400 text-sm shrink-0" />
                  <div className="text-[11px]">
                    <span className="text-slate-400 block text-[9px] uppercase font-bold">Date</span>
                    <strong className="text-white">This Weekend</strong>
                  </div>
                </div>
                <div className="bg-[#0b1730] border border-white/10 rounded-lg p-2.5 flex items-center gap-2">
                  <FaClock className="text-emerald-400 text-sm shrink-0" />
                  <div className="text-[11px]">
                    <span className="text-slate-400 block text-[9px] uppercase font-bold">Duration</span>
                    <strong className="text-white">90 Min Live</strong>
                  </div>
                </div>
                <div className="bg-[#0b1730] border border-white/10 rounded-lg p-2.5 flex items-center gap-2">
                  <FaVideo className="text-red-400 text-sm shrink-0" />
                  <div className="text-[11px]">
                    <span className="text-slate-400 block text-[9px] uppercase font-bold">Platform</span>
                    <strong className="text-white">Zoom / Meet</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Registration Card */}
            <div className="lg:col-span-5" id="register-form">
              <div className="bg-gradient-to-b from-[#0f2042] via-[#0b1730] to-[#070e1e] border-2 border-amber-400/50 rounded-2xl p-4 sm:p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-3 right-3 bg-gradient-to-r from-red-600 to-amber-500 text-white text-[9px] uppercase tracking-widest font-black px-2.5 py-0.5 rounded-full shadow-xs">
                  18 SEATS LEFT
                </div>

                <div className="mb-4 space-y-1">
                  <span className="text-[11px] font-black uppercase tracking-wider text-amber-400 flex items-center gap-1">
                    <FaBolt /> Instant Booking Form
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-white">
                    Reserve Your Live Slot For Just ₹9
                  </h3>
                  <div className="flex items-center gap-2 pt-0.5">
                    <span className="text-slate-400 line-through text-xs font-semibold">₹999</span>
                    <span className="text-xl sm:text-2xl font-black text-amber-400">₹9 ONLY</span>
                    <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold px-1.5 py-0.5 rounded border border-emerald-500/30">
                      99% OFF
                    </span>
                  </div>
                </div>

                {/* Countdown Timer */}
                <div className="bg-[#060b17] border border-white/10 rounded-lg p-2.5 mb-4 flex items-center justify-between text-center">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-left pl-1">
                    Slot Closes In:
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="bg-[#122347] border border-white/15 px-2 py-0.5 rounded">
                      <span className="text-sm font-black text-amber-400">{String(timeLeft.hours).padStart(2, "0")}</span>
                      <span className="text-[8px] block text-slate-400 uppercase">Hrs</span>
                    </div>
                    <span className="text-amber-400 font-bold">:</span>
                    <div className="bg-[#122347] border border-white/15 px-2 py-0.5 rounded">
                      <span className="text-sm font-black text-amber-400">{String(timeLeft.minutes).padStart(2, "0")}</span>
                      <span className="text-[8px] block text-slate-400 uppercase">Min</span>
                    </div>
                    <span className="text-amber-400 font-bold">:</span>
                    <div className="bg-[#122347] border border-white/15 px-2 py-0.5 rounded">
                      <span className="text-sm font-black text-amber-400">{String(timeLeft.seconds).padStart(2, "0")}</span>
                      <span className="text-[8px] block text-slate-400 uppercase">Sec</span>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-3">
                  {errorMessage && (
                    <div className="p-2.5 bg-red-500/20 border border-red-500/40 rounded-lg text-xs text-red-300 font-semibold">
                      {errorMessage}
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-0.5">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#060c18] border border-white/20 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-0.5">WhatsApp Mobile Number *</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-2.5 rounded-l-lg border border-r-0 border-white/20 bg-[#060c18] text-slate-400 text-xs font-bold">+91</span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="10-digit number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "") })}
                        className="w-full bg-[#060c18] border border-white/20 rounded-r-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <span className="text-[9px] text-slate-400 mt-0.5 block">Meeting links and updates will be sent via WhatsApp.</span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-0.5">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="rahul@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#060c18] border border-white/20 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-0.5">Background</label>
                      <select
                        value={formData.background}
                        onChange={(e) => setFormData({ ...formData, background: e.target.value })}
                        className="w-full bg-[#060c18] border border-white/20 rounded-lg px-2 py-2 text-[11px] text-white focus:outline-none focus:border-amber-400"
                      >
                        <option value="B.Com / M.Com / CA / Finance">B.Com / M.Com / CA / Finance</option>
                        <option value="B.Tech / BCA / MCA / IT">B.Tech / BCA / MCA / IT</option>
                        <option value="Non-IT / Arts / B.Sc / Any Degree">Non-IT / Any Graduate</option>
                        <option value="Working Professional (Career Switch)">Working Professional</option>
                        <option value="Fresher Looking For Job">Fresher Job Seeker</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-0.5">Module Interest</label>
                      <select
                        value={formData.courseInterest}
                        onChange={(e) => setFormData({ ...formData, courseInterest: e.target.value })}
                        className="w-full bg-[#060c18] border border-white/20 rounded-lg px-2 py-2 text-[11px] text-white focus:outline-none focus:border-amber-400"
                      >
                        <option value="SAP FICO (Financials)">SAP FICO (Finance)</option>
                        <option value="SAP ABAP (Programming)">SAP ABAP (Coding)</option>
                        <option value="SAP MM (Procurement)">SAP MM (Procurement)</option>
                        <option value="SAP SD (Sales)">SAP SD (Sales)</option>
                        <option value="SAP PP (Production)">SAP PP (Production)</option>
                        <option value="Not Sure - Need Guidance in Webinar">Not Sure (Help Me Choose)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-0.5">Live Batch Slot</label>
                    <select
                      value={formData.preferredSlot}
                      onChange={(e) => setFormData({ ...formData, preferredSlot: e.target.value })}
                      className="w-full bg-[#060c18] border border-white/20 rounded-lg px-2 py-2 text-[11px] text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="Saturday 7:00 PM IST (Evening Masterclass)">Saturday 7:00 PM IST (Evening Live)</option>
                      <option value="Sunday 11:00 AM IST (Morning Masterclass)">Sunday 11:00 AM IST (Morning Live)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm py-3 rounded-lg shadow-lg transition-transform hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-1.5 mt-1"
                  >
                    {isSubmitting ? (
                      <span>Reserving Your Seat...</span>
                    ) : (
                      <>
                        <span>Book My Webinar Slot for ₹9</span>
                        <FaArrowRight className="text-xs" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 pt-0.5">
                    <span className="flex items-center gap-0.5"><FaLock className="text-emerald-400 text-[9px]" /> Secure</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5"><FaCheckCircle className="text-amber-400 text-[9px]" /> Instant Invite</span>
                  </div>
                </form>

                <div className="mt-4 p-2.5 rounded-lg bg-amber-400/10 border border-amber-400/25 flex items-center gap-2.5">
                  <FaGift className="text-amber-400 text-lg shrink-0" />
                  <div className="text-[11px] text-slate-300">
                    <strong className="text-amber-300">Bonus Bundle Worth ₹5,997</strong> included free with your ₹9 ticket.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPANY HIRING PARTNERS TICKER ── */}
      <section className="py-6 bg-[#040814] border-y border-white/10">
        <div className="w-[min(1200px,94%)] mx-auto text-center space-y-3">
          <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">
            Our Consultants Get Placed At Top Global Enterprises
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 opacity-80 grayscale hover:grayscale-0 transition-all text-xs font-black text-slate-300 tracking-wider">
            <span>INFOSYS</span>
            <span>TCS</span>
            <span>WIPRO</span>
            <span>ACCENTURE</span>
            <span>DELOITTE</span>
            <span>IBM</span>
            <span>TECH MAHINDRA</span>
            <span>HCLTECH</span>
          </div>
        </div>
      </section>

      {/* ── WHY INXYME FOR SAP? ── */}
      <section id="why-inxyme" className="py-12 sm:py-16 relative bg-[#091326]">
        <div className="w-[min(1200px,94%)] mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-1 px-3 py-0.5 bg-amber-400/10 text-amber-300 rounded-full text-[11px] font-bold uppercase tracking-wider border border-amber-400/30">
              <FaAward /> India&apos;s Premier SAP Training Center
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Unmatched Enterprise Training Standards
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Inxyme delivers proprietary curriculums designed by senior solution architects, tailored for modern S/4HANA Cloud environments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-[#0b1730] border border-white/10 rounded-xl p-5 space-y-3 hover:border-amber-400/40 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold text-sm">01</div>
              <h3 className="text-base font-bold text-white">In-House Proprietary Curriculum</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Built by experts with 15+ years of enterprise experience, fully updated for S/4HANA Cloud and modern business blueprints.
              </p>
            </div>

            <div className="bg-[#0b1730] border border-white/10 rounded-xl p-5 space-y-3 hover:border-emerald-400/40 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-emerald-400/20 text-emerald-400 flex items-center justify-center font-bold text-sm">02</div>
              <h3 className="text-base font-bold text-white">Live S/4HANA Server Access (24/7)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Practice on real enterprise servers equipped with pre-loaded company codes, purchase orders, and configuration master data.
              </p>
            </div>

            <div className="bg-[#0b1730] border border-white/10 rounded-xl p-5 space-y-3 hover:border-blue-400/40 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-blue-400/20 text-blue-400 flex items-center justify-center font-bold text-sm">03</div>
              <h3 className="text-base font-bold text-white">Cross-Module Integration Mastery</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Learn how FICO connects with MM, SD integrates with FI, and ABAP builds custom reports for high-paying consulting roles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── COURSE DECISION MATRIX ── */}
      <section id="which-course" className="py-12 sm:py-16 bg-[#060d1c] relative">
        <div className="w-[min(1200px,94%)] mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-1 px-3 py-0.5 bg-blue-500/10 text-blue-300 rounded-full text-[11px] font-bold uppercase tracking-wider border border-blue-500/30">
              <FaRegLightbulb /> Career Clarity Guide
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Not Sure Which Track To Choose?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Explore our core learning paths tailored for specific educational backgrounds and career goals:
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {COURSE_DIRECTIONS.map((track) => (
              <button
                key={track.id}
                onClick={() => setSelectedCourseTab(track.id)}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${selectedCourseTab === track.id
                  ? "bg-amber-400 text-slate-950 shadow-md scale-105"
                  : "bg-[#0b1730] text-slate-300 hover:text-white border border-white/10"
                  }`}
              >
                <span>{track.title.split("(")[0]}</span>
              </button>
            ))}
          </div>

          {COURSE_DIRECTIONS.filter((t) => t.id === selectedCourseTab).map((track) => (
            <div
              key={track.id}
              className={`bg-gradient-to-br from-[#0e1c38] to-[#081224] border ${track.border} rounded-2xl p-5 sm:p-8 shadow-xl space-y-5 max-w-3xl mx-auto`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-2xl">
                    {track.icon}
                  </div>
                  <div>
                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${track.bgBadge}`}>
                      {track.tag}
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-white mt-0.5">{track.title}</h3>
                  </div>
                </div>
                <div className="bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-xl">
                  <span className="text-[9px] text-emerald-300 font-bold uppercase tracking-wider block">Average Salary</span>
                  <span className="text-sm sm:text-base font-black text-emerald-400">{track.avgSalary}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-[#070e1c] p-3 rounded-xl border border-white/10">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-0.5">🎯 Ideal Background</span>
                  <p className="text-xs font-semibold text-slate-200">{track.bestFor}</p>
                </div>
                <div className="bg-[#070e1c] p-3 rounded-xl border border-white/10">
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block mb-0.5">🚀 Why Choose This Track?</span>
                  <p className="text-xs font-semibold text-slate-200">{track.whyChoose}</p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{track.overview}</p>

              <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-white/10">
                <span className="text-[11px] text-slate-400">Need personal guidance? Ask our mentor during the live webinar.</span>
                <button
                  onClick={scrollToRegistration}
                  className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs px-4 py-2.5 rounded-lg transition-transform hover:scale-105"
                >
                  Join Webinar &amp; Ask Mentor @ ₹9 →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ALL INXYME ADVANTAGES ── */}
      <section id="advantages" className="py-12 sm:py-16 bg-[#091326] relative">
        <div className="w-[min(1200px,94%)] mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-1 px-3 py-0.5 bg-emerald-400/10 text-emerald-300 rounded-full text-[11px] font-bold uppercase tracking-wider border border-emerald-400/30">
              <FaShieldAlt /> Comprehensive Support
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Everything Included For Your Career Growth
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              From ATS resumes and mock interviews to live server access and personal web portfolios on Inxyme domains.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {INXYME_ADVANTAGES.map((adv, idx) => (
              <div key={idx} className="bg-[#0b1730] border border-white/10 rounded-xl p-5 space-y-2.5 hover:border-amber-400/40 hover:bg-[#0e1d3d] transition-all group">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {adv.icon}
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-wider bg-amber-400/15 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-400/25">
                    {adv.highlight}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors">{adv.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{adv.description}</p>
              </div>
            ))}
          </div>

          {/* Portfolio Highlight Box */}
          <div className="bg-gradient-to-r from-blue-900/40 via-purple-900/40 to-blue-900/40 border border-purple-400/40 rounded-2xl p-5 sm:p-8 relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
              <div className="lg:col-span-8 space-y-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-purple-300 flex items-center gap-1">
                  <FaGlobe /> Exclusive Inxyme Feature
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">Your Personal Web Portfolio on the Inxyme Domain</h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  Stand out to recruiters with your verified subdomain (e.g., <code className="bg-black/50 text-amber-300 px-1.5 py-0.5 rounded font-mono text-xs">yourname.inxyme.com</code>) showcasing live SAP case studies, business process workflows, and verified certification badges.
                </p>
              </div>
              <div className="lg:col-span-4 text-center lg:text-right">
                <button
                  onClick={scrollToRegistration}
                  className="bg-purple-500 hover:bg-purple-400 text-white font-black text-xs px-5 py-3 rounded-xl shadow-md transition-transform hover:scale-105"
                >
                  See Portfolio Demo @ ₹9 →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WEBINAR AGENDA ── */}
      <section className="py-12 sm:py-16 bg-[#060c18] relative">
        <div className="w-[min(1200px,94%)] mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-1 px-3 py-0.5 bg-amber-400/10 text-amber-300 rounded-full text-[11px] font-bold uppercase tracking-wider border border-amber-400/30">
              <FaClock /> 90-Minute Masterclass Breakdown
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">What You Will Learn In The Webinar</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Structured for maximum career value with zero time waste:</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {WEBINAR_AGENDA.map((item, idx) => (
              <div key={idx} className="bg-[#0b1730] border border-white/10 rounded-xl p-5 space-y-2.5 hover:border-amber-400/40 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/30 font-mono">
                    {item.time}
                  </span>
                  <span className="text-slate-600 font-black text-base">0{idx + 1}</span>
                </div>
                <h3 className="text-sm font-bold text-white">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={scrollToRegistration}
              className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg transition-transform hover:scale-105"
            >
              Reserve My ₹9 Seat For This Masterclass →
            </button>
          </div>
        </div>
      </section>

      {/* ── FREE BONUS BUNDLE ── */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-[#091326] to-[#040814] relative">
        <div className="w-[min(1200px,94%)] mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-1 px-3 py-0.5 bg-red-500/10 text-red-300 rounded-full text-[11px] font-bold uppercase tracking-wider border border-red-500/30">
              <FaGift /> Free Gifts With ₹9 Ticket
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">Bonus Resource Kit Worth ₹5,997 Free!</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Register for the webinar and instantly unlock these high-value learning resources at no extra cost:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#0b1730] border border-amber-400/30 rounded-xl p-5 text-left space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center text-base"><FaDownload /></div>
              <span className="text-[9px] uppercase font-bold text-amber-300 bg-amber-400/15 px-2 py-0.5 rounded">Valued at ₹1,499</span>
              <h4 className="text-sm font-bold text-white">SAP T-Code Master Cheat Sheet</h4>
              <p className="text-xs text-slate-400">Complete printable PDF with critical transaction codes across FICO, MM, SD, PP, and ABAP.</p>
            </div>

            <div className="bg-[#0b1730] border border-blue-400/30 rounded-xl p-5 text-left space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-blue-400/20 text-blue-400 flex items-center justify-center text-base"><FaBookReader /></div>
              <span className="text-[9px] uppercase font-bold text-blue-300 bg-blue-400/15 px-2 py-0.5 rounded">Valued at ₹1,999</span>
              <h4 className="text-sm font-bold text-white">Top 150+ SAP Interview Q&amp;A</h4>
              <p className="text-xs text-slate-400">MNC interview questions with exact answers asked at Deloitte, Accenture, and PwC.</p>
            </div>

            <div className="bg-[#0b1730] border border-emerald-400/30 rounded-xl p-5 text-left space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-emerald-400/20 text-emerald-400 flex items-center justify-center text-base"><FaChartLine /></div>
              <span className="text-[9px] uppercase font-bold text-emerald-300 bg-emerald-400/15 px-2 py-0.5 rounded">Valued at ₹999</span>
              <h4 className="text-sm font-bold text-white">2026 SAP Salary &amp; Role Blueprint</h4>
              <p className="text-xs text-slate-400">Module-wise salary benchmarks, entry guides, and salary negotiation strategies.</p>
            </div>

            <div className="bg-[#0b1730] border border-purple-400/30 rounded-xl p-5 text-left space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-purple-400/20 text-purple-400 flex items-center justify-center text-base"><FaUserTie /></div>
              <span className="text-[9px] uppercase font-bold text-purple-300 bg-purple-400/15 px-2 py-0.5 rounded">Valued at ₹1,500</span>
              <h4 className="text-sm font-bold text-white">1-on-1 Profile Review Voucher</h4>
              <p className="text-xs text-slate-400">Personal 15-minute profile review call with a senior career counselor after the webinar.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MENTOR PROFILE ── */}
      <section className="py-12 sm:py-16 bg-[#060c18] relative">
        <div className="w-[min(1200px,94%)] mx-auto max-w-3xl bg-gradient-to-r from-[#0d1d3d] via-[#09152b] to-[#0d1d3d] border border-white/15 rounded-2xl p-5 sm:p-8 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            <div className="sm:col-span-4 text-center">
              <div className="w-28 h-28 mx-auto rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-200 text-slate-950 flex items-center justify-center text-4xl font-black shadow-lg">
                👨‍🏫
              </div>
              <span className="inline-block mt-2.5 text-[11px] bg-amber-400/20 text-amber-300 px-2.5 py-0.5 rounded-full font-bold">
                15+ Years Industry Lead
              </span>
            </div>

            <div className="sm:col-span-8 space-y-3">
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-400">Meet Your Masterclass Instructor</span>
              <h3 className="text-xl sm:text-2xl font-black text-white">Senior SAP Enterprise Solution Architect</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Trained 5,000+ professionals across India and successfully delivered multi-million dollar S/4HANA enterprise implementations for global consulting clients in Germany, the Middle East, and the US.
              </p>
              <div className="grid grid-cols-3 gap-2 pt-1 text-xs">
                <div className="bg-[#050b16] p-2.5 rounded-lg border border-white/10">
                  <strong className="text-amber-400 block text-sm font-black">5,000+</strong>
                  <span className="text-slate-400 text-[10px]">Trained</span>
                </div>
                <div className="bg-[#050b16] p-2.5 rounded-lg border border-white/10">
                  <strong className="text-emerald-400 block text-sm font-black">15+ Yrs</strong>
                  <span className="text-slate-400 text-[10px]">Experience</span>
                </div>
                <div className="bg-[#050b16] p-2.5 rounded-lg border border-white/10">
                  <strong className="text-blue-400 block text-sm font-black">4.9 / 5</strong>
                  <span className="text-slate-400 text-[10px]">Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQS ── */}
      <section id="faqs" className="py-12 sm:py-16 bg-[#091326] relative">
        <div className="w-[min(900px,94%)] mx-auto space-y-8">
          <div className="text-center space-y-3">
            <span className="inline-flex items-center gap-1 px-3 py-0.5 bg-amber-400/10 text-amber-300 rounded-full text-[11px] font-bold uppercase tracking-wider border border-amber-400/30">
              <FaShieldAlt /> Clear Answers
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">Frequently Asked Questions</h2>
            <p className="text-xs sm:text-sm text-slate-300">Everything you need to know about the webinar and ₹9 registration:</p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => (
              <div key={index} className="bg-[#0b1730] border border-white/10 rounded-xl overflow-hidden transition-all">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 font-bold text-white hover:text-amber-300 transition-colors cursor-pointer text-xs sm:text-sm"
                >
                  <span>{faq.q}</span>
                  <FaChevronDown
                    className={`text-xs text-amber-400 shrink-0 transition-transform duration-300 ${openFaq === index ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA BANNER ── */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-[#060c18] via-[#0e1d3d] to-[#040814] text-center relative overflow-hidden">
        <div className="w-[min(800px,94%)] mx-auto space-y-5 relative z-10">
          <span className="inline-block px-3 py-1 bg-red-500/20 text-red-400 text-[11px] font-black rounded-full border border-red-500/40 uppercase tracking-widest animate-pulse">
            🔥 ₹999 VALUE — ONLY AT ₹9!
          </span>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Take Control Of Your Career This Weekend
          </h2>

          <p className="text-xs sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Limited slots available. Only 18 seats remaining for this weekend&apos;s live masterclass batch.
          </p>

          <div className="pt-2">
            <button
              onClick={scrollToRegistration}
              className="w-full sm:w-auto bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm px-8 py-4 rounded-xl shadow-xl transition-transform hover:scale-105 cursor-pointer inline-flex items-center justify-center gap-2"
            >
              <span>👉 BOOK MY SLOT NOW FOR ₹9</span>
            </button>
          </div>

          <p className="text-[11px] text-slate-400">100% Risk-Free · Instant WhatsApp Confirmation · Live Zoom Q&amp;A</p>
        </div>
      </section>

      {/* ── STICKY FLOATING BOTTOM BAR ── */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#09152b]/95 backdrop-blur-md border-t border-amber-400/40 py-2.5 px-3 z-40 shadow-xl">
        <div className="w-[min(1200px,94%)] mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-amber-400 text-slate-950 font-black flex items-center justify-center text-xs shadow-xs shrink-0">
              ₹9
            </div>
            <div className="hidden sm:block">
              <strong className="text-white text-xs block">Inxyme Live SAP Career Webinar</strong>
              <span className="text-[10px] text-amber-300 font-bold">₹999 value for ₹9 · Limited Slots Left</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 px-3 py-2 rounded-lg font-bold text-xs flex items-center gap-1 transition-transform hover:scale-105"
            >
              <FaWhatsapp className="text-sm" />
              <span className="hidden md:inline">WhatsApp Help</span>
            </a>
            <button
              onClick={scrollToRegistration}
              className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs px-4 py-2 rounded-lg shadow-md transition-transform hover:scale-105 cursor-pointer flex items-center gap-1"
            >
              <span>Book Slot @ ₹9</span>
              <FaArrowRight className="text-[10px]" />
            </button>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="bg-[#03060f] text-slate-400 py-10 pb-20 text-xs border-t border-white/10">
        <div className="w-[min(1200px,94%)] mx-auto space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-5 border-b border-white/10">
            <div className="space-y-1.5 text-center md:text-left">
              <img src={LOGO_SRC} alt="Inxyme" className="h-7 w-auto mx-auto md:mx-0 object-contain bg-white/90 p-1 rounded" />
              <p className="text-[11px] text-slate-400 max-w-sm">
                Inxyme E-Learning — India&apos;s leading enterprise ERP and SAP certification training partner.
              </p>
            </div>
            <div className="text-center md:text-right space-y-0.5">
              <span className="text-[11px] text-slate-300 block font-bold">Webinar Helpline:</span>
              <a href="tel:+919990999561" className="text-amber-400 font-bold text-xs hover:underline block">+91 99909 99561</a>
              <span className="text-[10px] text-slate-500 block">Mon - Sun (9:00 AM - 9:00 PM IST)</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-slate-500 text-[11px]">
            <p>© {new Date().getFullYear()} Inxyme E-Learning. All rights reserved.</p>
            <div className="flex flex-wrap items-center justify-center gap-3 text-slate-400">
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
        </div>
      </footer>
    </div>
  );
}