"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import {
  FaCheckCircle,
  FaStar,
  FaRupeeSign,
  FaClock,
  FaCalendarAlt,
  FaLaptopCode,
  FaUserTie,
  FaUserGraduate,
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
  FaTimes,
  FaQuestionCircle,
  FaBolt,
  FaQuoteLeft,
  FaChevronDown,
  FaDownload,
  FaBookReader,
  FaFileAlt,
  FaGlobe,
  FaRegLightbulb,
} from "react-icons/fa";

const WHATSAPP_URL =
  "https://wa.me/919990999561?text=Hi%20Inxyme%2C%20I%20saw%20your%20%E2%82%B99%20SAP%20Career%20Webinar%20ad%20and%20want%20to%20know%20more%20details.";

const PHONE_NUMBER = "+919990999561";
const LOGO_SRC = "/images/Inxyme%20png%20logo.png";

// Course comparison matrix data (Solving the ad script's dilemma)
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

// Everything Inxyme provides (Gold standard Indian EdTech)
const INXYME_ADVANTAGES = [
  {
    icon: <FaAward className="text-amber-400 text-2xl" />,
    title: "Proprietary In-House Curriculum",
    highlight: "Best in India",
    description:
      "Not generic slides! Hamare pass apne senior architects ke banaye huye best real-time curriculums hain based on actual enterprise business blueprints and S/4HANA Cloud.",
  },
  {
    icon: <FaFileAlt className="text-blue-400 text-2xl" />,
    title: "ATS-Compliant Resume Building",
    highlight: "MNC Shortlist Guaranteed",
    description:
      "MNC ATS filters (Deloitte, Accenture, TCS, IBM) ko beat karne ke liye customized corporate resumes draft karte hain jisme real ERP business projects highlight hote hain.",
  },
  {
    icon: <FaBriefcase className="text-emerald-400 text-2xl" />,
    title: "Multiple Mock Interviews",
    highlight: "Technical + HR Rounds",
    description:
      "Real industry managers ke sath multi-round mock interviews (Technical, Scenario-based, Client-facing, HR). Har session ke baad detail feedback scorecard milta hai.",
  },
  {
    icon: <FaGlobe className="text-purple-400 text-2xl" />,
    title: "Personal Portfolio in Inxyme Domain",
    highlight: "yourname.inxyme.com",
    description:
      "Har student ko Inxyme ke verified domain par unka personal live web portfolio milta hai jisme unke banaye projects, ERP configs aur credentials live showcase hote hain.",
  },
  {
    icon: <FaUserTie className="text-cyan-400 text-2xl" />,
    title: "1-on-1 Career Guide & Mentorship",
    highlight: "Personalized Roadmap",
    description:
      "Aapke background (Commerce, Tech, Non-IT, Working Pro) ke according custom career roadmap design hota hai jisse transition smooth aur salary packages maximum hon.",
  },
  {
    icon: <FaDownload className="text-pink-400 text-2xl" />,
    title: "Downloadable Resources & Study Kits",
    highlight: "Lifetime Kits",
    description:
      "1,000+ SAP Interview Question Bank, Complete T-Code Cheat Sheets, Real-time IMG Configuration Blueprints, aur E-Books jo aapke career bhar kaam aayenge.",
  },
  {
    icon: <FaVideo className="text-red-400 text-2xl" />,
    title: "100% Live Interactive Classes",
    highlight: "Two-Way Audio/Video",
    description:
      "Koi purani recorded videos nahi! Daily live interactive classes with screen-sharing, instant Q&A, and practical implementation on live servers.",
  },
  {
    icon: <FaChalkboardTeacher className="text-indigo-400 text-2xl" />,
    title: "1-to-1 Daily Doubt Sessions",
    highlight: "Never Stay Stuck",
    description:
      "Rozana dedicated 1-on-1 doubt clearing counters. Kisi bhi transaction code ya configuration error par aapka mentor screen share karke issue resolve karta hai.",
  },
  {
    icon: <FaLaptopCode className="text-yellow-400 text-2xl" />,
    title: "24/7 Live Cloud ERP Server Access",
    highlight: "S/4HANA Real Server",
    description:
      "Ghar baithe 24/7 live SAP S/4HANA cloud server access GUI aur Fiori launchpad ke sath, taaki aap real enterprise data par practice kar sakein.",
  },
  {
    icon: <FaShieldAlt className="text-emerald-400 text-2xl" />,
    title: "Verified Global Certification",
    highlight: "ISO & Industry Recognized",
    description:
      "Inxyme globally verifiable certification with secure verification code + SAP Global Official Certification exam preparation support.",
  },
  {
    icon: <FaUsers className="text-teal-400 text-2xl" />,
    title: "Dedicated 100% Placement Cell",
    highlight: "200+ Hiring Partners",
    description:
      "Dedicated recruitment team jo aapka resume top consulting firms aur tech companies me circulate karti hai aur regular interview drives conduct karti hai.",
  },
  {
    icon: <FaBookReader className="text-amber-400 text-2xl" />,
    title: "Lifetime LMS & Community Access",
    highlight: "Class Recordings & Notes",
    description:
      "Har live class ki high-definition recording aapke portal par save hoti hai jisse aap kabhi bhi revision kar sakein + exclusive VIP peer network.",
  },
];

// Webinar Agenda Breakdown
const WEBINAR_AGENDA = [
  {
    time: "00 – 15 Min",
    title: "Industry Reality & Salary Growth in 2026",
    desc: "Kyu companies SAP consultants ko ₹8L - ₹25L salary offer kar rahi hain? India aur abroad me ERP demand ka exact scenario.",
  },
  {
    time: "15 – 35 Min",
    title: "Right Course Selection: ABAP vs FICO vs MM vs SD vs PP",
    desc: "Aapke background (Commerce, Tech, Mechanical, Non-IT, Fresher) ke hisab se kaunsa track sabse easy aur high-paying hoga.",
  },
  {
    time: "35 – 55 Min",
    title: "Live S/4HANA System Demo & Real Job Role",
    desc: "Actual SAP S/4HANA system par live demo! Ek real consultant office me kaise kaam karta hai aur configurations kaise hoti hain.",
  },
  {
    time: "55 – 70 Min",
    title: "Placement Blueprint, ATS Resumes & Inxyme Portfolio",
    desc: "Resume shortlist kaise karwaye, mock interviews kaise crack karein, aur aapka personal Inxyme domain portfolio recruiter ko kaise impress karega.",
  },
  {
    time: "70 – 80 Min",
    title: "Course Options, Annual Packages & Batch Schedules",
    desc: "Inxyme ki upcoming batches, demo classes schedule, annual packages aur live training roadmap ka complete walkthrough.",
  },
  {
    time: "80 – 90 Min",
    title: "Open 1-on-1 Live Q&A With Mentor",
    desc: "Aapka direct sawal — mentor ka direct javab! Apni degree, career gap, ya salary doubts directly clear karein.",
  },
];

// FAQs
const FAQS = [
  {
    q: "Aap webinar ka registration sirf ₹9 me kyu kara rahe hain? Free kyu nahi?",
    a: "Hum ₹9 isliye le rahe hain kyoki hame genuine aur SERIOUS LEARNERS chahiye! Free webinars me log aakar seat block kar dete hain aur casually attend karte hain, jisse serious students ka nuksan hota hai. ₹9 is just a token of commitment taaki sirf wahi log judein jo sach me apne career ke liye dedicated hain. Isme aapko milta hai direct mentor access, live Q&A, aur ₹5,997 value ke free downloadable bonus kits!",
  },
  {
    q: "Main Non-IT / B.Com / Arts / Fresher hu, kya SAP mere liye possible hai?",
    a: "Haan, bilkul 100%! SAP me 70% modules Functional hote hain jisme coding ki zaroorat nahi hoti. Jaise B.Com/M.Com/CA ke liye SAP FICO best hai, Engineers/B.Sc ke liye SAP MM best hai, aur Sales/Marketing background ke liye SAP SD best hai. Webinar me hum aapko step-by-step batayenge ki aapka transition kaise hoga.",
  },
  {
    q: "Webinar attend karne se mujhe kya-kya benefits milenge?",
    a: "1) Complete clarity ki aapke liye kaunsa SAP module best hai, 2) Live SAP S/4HANA screen demo, 3) Real career roadmap & salary benchmarks, 4) ₹5,997 value ke free resources (T-Code cheat sheet, 150+ Interview Q&A, Career blueprint), aur 5) Exclusive discount on Inxyme premium training batches.",
  },
  {
    q: "Webinar kab hoga aur link kaise milega?",
    a: "Webinar upcoming weekend par live conduct kiya jayega. Form submit karne ke baad aapko instantly WhatsApp aur Email par Zoom/Google Meet ka private link aur reminder send kar diya jayega. Aapko VIP WhatsApp group me bhi add kiya jayega.",
  },
  {
    q: "Inxyme ka SAP training curriculum dusre institutes se alag kyu hai?",
    a: "Inxyme ke paas apna proprietary, in-house developed curriculum hai jo active corporate architects ne banaya hai. Hum pura training modern SAP S/4HANA live servers par karwate hain with end-to-end integration (FICO + MM + SD), ATS resumes, multiple mock interviews, aur har student ko 'yourname.inxyme.com' par unka live personal portfolio dete hain.",
  },
  {
    q: "Personal Portfolio on Inxyme Domain kya hai?",
    a: "Jab aap Inxyme se training karte hain, toh hum aapke naam ka ek live portfolio website (e.g. rahul.inxyme.com) banate hain. Isme aapke live SAP case studies, ERP configuration documents aur certification badges verified hote hain. Is link ko aap directly LinkedIn ya HR ko bhej kar interview shortlists pa sakte hain.",
  },
  {
    q: "Agar main live webinar miss kar du toh kya recording milegi?",
    a: "Haan, jo students ₹9 pay karke register karte hain unhe session ki exclusive recording aur saare bonus PDFs WhatsApp aur portal par provide kiye jaate hain.",
  },
];

export default function SapWebinarPage({
  subdomain = "sap-webinar",
}: {
  subdomain?: string;
}) {
  const router = useRouter();

  // Form State
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

  // Countdown timer state (hours, minutes, seconds)
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 43,
    seconds: 18,
  });

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Active FAQ Accordion
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Active course tab in the comparison matrix
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

      // Redirect to thank-you page
      router.push("/thank-you");
    } catch {
      // Graceful fallback redirect
      router.push("/thank-you");
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToRegistration = () => {
    const formElement = document.getElementById("register-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#070e1e] text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-900 overflow-x-clip">
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

      {/* ── STICKY TOP HEADER WRAPPER (ANNOUNCEMENT + NAVBAR) ── */}
      <header className="sticky top-0 z-50 w-full shadow-xl">
        {/* ── 1. URGENCY ANNOUNCEMENT BAR ── */}
        <div className="bg-gradient-to-r from-red-600 via-amber-500 to-red-600 text-slate-950 text-xs sm:text-sm font-extrabold py-2 px-4 text-center">
          <div className="w-[min(1240px,94%)] mx-auto flex items-center justify-between sm:justify-center gap-2 sm:gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 tracking-wide uppercase">
              <FaBolt className="text-slate-950 animate-bounce" />
              ₹999 KI VALUE — SIRF ₹9 MEIN! 🔥
            </span>
            <span className="hidden md:inline text-slate-900">•</span>
            <span className="text-slate-950 font-bold hidden sm:inline">
              ⚡ LIMITED SLOTS: Only 18 Seats Left For This Weekend
            </span>
            <span className="hidden md:inline text-slate-900">•</span>
            <button
              onClick={scrollToRegistration}
              className="bg-slate-950 hover:bg-slate-900 text-amber-300 px-3 py-1 rounded-full text-xs font-black shadow-xs transition-transform hover:scale-105 ml-auto sm:ml-0 cursor-pointer"
            >
              Claim ₹9 Seat Now →
            </button>
          </div>
        </div>

        {/* ── 2. NAVBAR ── */}
        <nav className="bg-[#0b1730]/95 backdrop-blur-md border-b border-white/10">
          <div className="w-[min(1240px,94%)] mx-auto h-[62px] sm:h-[68px] flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 bg-white/95 px-3 py-1.5 rounded-xl shadow-xs">
              <img src={LOGO_SRC} alt="Inxyme" className="h-8 w-auto object-contain" />
            </Link>

            <div className="hidden lg:flex items-center gap-6 text-xs uppercase tracking-wider font-bold text-slate-300">
              <a href="#why-inxyme" className="hover:text-amber-400 transition-colors">
                Why Inxyme?
              </a>
              <a href="#which-course" className="hover:text-amber-400 transition-colors">
                Which Course Fits You?
              </a>
              <a href="#advantages" className="hover:text-amber-400 transition-colors">
                Everything We Provide
              </a>
              <a href="#why-9" className="hover:text-amber-400 transition-colors">
                Why ₹9?
              </a>
              <a href="#faqs" className="hover:text-amber-400 transition-colors">
                FAQs
              </a>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="tel:+919990999561"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white"
              >
                <FaPhoneAlt className="text-amber-400 text-xs" /> +91 99909 99561
              </a>
              <button
                onClick={scrollToRegistration}
                className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-xl shadow-lg transition-transform hover:scale-105 cursor-pointer flex items-center gap-1.5"
              >
                <span>Book Slot @ ₹9</span>
                <FaArrowRight className="text-xs" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* ── 3. HERO SECTION (ALIGNED WITH DISPLAY AD SCRIPT) ── */}
      <section className="relative pt-8 pb-16 lg:py-20 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-32 right-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="w-[min(1240px,94%)] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: The Hook, Problem, and Value Offer */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black bg-red-500/20 text-red-400 border border-red-500/30">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
                  🔴 LIVE CAREER WEBINAR
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-400/15 text-amber-300 border border-amber-400/30">
                  <FaStar className="text-amber-400 text-xs" /> ₹999 VALUE — SIRF ₹9 MEIN!
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  <FaShieldAlt className="text-emerald-400 text-xs" /> India&apos;s #1 SAP Training
                </span>
              </div>

              {/* [HOOK] from video ad */}
              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
                &ldquo;Career ke liye skill seekhni hai…{" "}
                <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 bg-clip-text text-transparent">
                  but samajh nahi aa raha ki exactly kya choose karein?&rdquo;
                </span>
              </h1>

              {/* [PROBLEM] from video ad */}
              <div className="bg-[#0e1d3d]/90 border border-white/10 rounded-2xl p-4 sm:p-5 relative overflow-hidden">
                <div className="text-xs uppercase tracking-wider font-extrabold text-amber-400 mb-2 flex items-center gap-1.5">
                  <FaRegLightbulb /> Confusion Har Student Ka Hota Hai:
                </div>
                <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed">
                  &ldquo;<span className="text-white font-bold">SAP ABAP, SAP FICO, SAP MM, SAP SD, SAP PP, AI, Machine Learning, Power BI, Digital Marketing, Data Analytics…</span>{" "}
                  Options bahut hain. Right direction kaise choose karein?&rdquo;
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {[
                    "SAP FICO",
                    "SAP ABAP",
                    "SAP MM",
                    "SAP SD",
                    "SAP PP",
                    "Data Analytics",
                    "Power BI",
                    "AI / ML",
                  ].map((tech, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* [WEBINAR VALUE] from video ad */}
              <div className="space-y-3">
                <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
                  <strong className="text-amber-400 font-bold">Inxyme ke live webinar mein samjho:</strong>{" "}
                  Kaunsa course aapke educational background &amp; career goals ke liye{" "}
                  <span className="underline decoration-amber-400 underline-offset-4 font-semibold text-white">
                    100% right hai
                  </span>
                  , course ke benefits kya hain, realistic corporate salary opportunities (
                  <strong className="text-emerald-400">₹6 LPA se ₹24 LPA+</strong>), placement support
                  aur real demo classes kaise work karti hain.
                </p>
                <p className="text-sm sm:text-base text-slate-400">
                  Saath hi explore karo our course options, annual packages aur complete learning
                  journey — <span className="text-slate-200 font-bold">all in one live interactive session.</span>
                </p>
              </div>

              {/* ── SPOTLIGHT BOX: WHY ₹9 INSTEAD OF ₹999? ── */}
              <div id="why-9" className="bg-gradient-to-r from-amber-500/15 via-[#1b2640] to-amber-500/10 border-2 border-amber-400/50 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden scroll-mt-28">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center text-xl font-black shrink-0 shadow-lg shadow-amber-400/20">
                    ₹9
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base sm:text-lg font-black text-white">
                        Hum ₹9 Kyu Le Rahe Hain? (Why Not Free?)
                      </h3>
                      <span className="text-xs bg-amber-400/20 text-amber-300 font-extrabold px-2.5 py-0.5 rounded-full border border-amber-400/30">
                        Serious Candidates Only
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Hum ye 9 Rupee isliye le rahe hain kyoki{" "}
                      <strong className="text-white">hame SERIOUS &amp; GENUINE STUDENTS chahiye!</strong>{" "}
                      Free webinars me log casual aate hain aur crowd create karte hain jisse real
                      doubt sessions nahi ho pate. ₹9 is just a personal commitment fee taaki aapki
                      seat confirmed rahe aur aapko mentor ke sath guaranteed 1-on-1 Q&amp;A slot mile!
                    </p>
                  </div>
                </div>
              </div>

              {/* Key Quick Bullets */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-[#0b1730] border border-white/10 rounded-xl p-3 flex items-center gap-2.5">
                  <FaCalendarAlt className="text-amber-400 text-base shrink-0" />
                  <div className="text-xs">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Session Date</span>
                    <strong className="text-white">This Weekend</strong>
                  </div>
                </div>
                <div className="bg-[#0b1730] border border-white/10 rounded-xl p-3 flex items-center gap-2.5">
                  <FaClock className="text-emerald-400 text-base shrink-0" />
                  <div className="text-xs">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Duration</span>
                    <strong className="text-white">90 Min Live Masterclass</strong>
                  </div>
                </div>
                <div className="bg-[#0b1730] border border-white/10 rounded-xl p-3 flex items-center gap-2.5 col-span-2 sm:col-span-1">
                  <FaVideo className="text-red-400 text-base shrink-0" />
                  <div className="text-xs">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Platform</span>
                    <strong className="text-white">Zoom / Meet Live Q&amp;A</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Registration Card & Urgency Box */}
            <div className="lg:col-span-5" id="register-form">
              <div className="bg-gradient-to-b from-[#0f2042] via-[#0b1730] to-[#070e1e] border-2 border-amber-400/60 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                {/* Floating Ribbon */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-red-600 to-amber-500 text-white text-[10px] uppercase tracking-widest font-black px-3 py-1 rounded-full shadow-md">
                  HOT SEATS: 18 LEFT
                </div>

                <div className="mb-6 space-y-2">
                  <span className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <FaBolt /> Instant Booking Form
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    Book Your Live Slot For Just ₹9
                  </h3>
                  <div className="flex items-center gap-3 pt-1">
                    <span className="text-slate-400 line-through text-base font-semibold">₹999</span>
                    <span className="text-2xl sm:text-3xl font-black text-amber-400">₹9 ONLY</span>
                    <span className="bg-emerald-500/20 text-emerald-300 text-xs font-extrabold px-2 py-0.5 rounded-md border border-emerald-500/30">
                      99% OFF
                    </span>
                  </div>
                </div>

                {/* Live Countdown Box */}
                <div className="bg-[#060b17] border border-white/10 rounded-xl p-3 mb-6 flex items-center justify-between text-center">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider text-left pl-1">
                    Slot Closes In:
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-[#122347] border border-white/15 px-2.5 py-1 rounded-lg">
                      <span className="text-base font-black text-amber-400">
                        {String(timeLeft.hours).padStart(2, "0")}
                      </span>
                      <span className="text-[9px] block text-slate-400 uppercase">Hrs</span>
                    </div>
                    <span className="text-amber-400 font-bold">:</span>
                    <div className="bg-[#122347] border border-white/15 px-2.5 py-1 rounded-lg">
                      <span className="text-base font-black text-amber-400">
                        {String(timeLeft.minutes).padStart(2, "0")}
                      </span>
                      <span className="text-[9px] block text-slate-400 uppercase">Min</span>
                    </div>
                    <span className="text-amber-400 font-bold">:</span>
                    <div className="bg-[#122347] border border-white/15 px-2.5 py-1 rounded-lg">
                      <span className="text-base font-black text-amber-400">
                        {String(timeLeft.seconds).padStart(2, "0")}
                      </span>
                      <span className="text-[9px] block text-slate-400 uppercase">Sec</span>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3 bg-red-500/20 border border-red-500/40 rounded-xl text-xs text-red-300 font-semibold">
                      {errorMessage}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#060c18] border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      WhatsApp Mobile Number *
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-white/20 bg-[#060c18] text-slate-400 text-xs font-bold">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="10-digit number"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            phone: e.target.value.replace(/\D/g, ""),
                          })
                        }
                        className="w-full bg-[#060c18] border border-white/20 rounded-r-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      Webinar link &amp; VIP group invite will be sent on WhatsApp.
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="rahul@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#060c18] border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Current Background
                      </label>
                      <select
                        value={formData.background}
                        onChange={(e) => setFormData({ ...formData, background: e.target.value })}
                        className="w-full bg-[#060c18] border border-white/20 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                      >
                        <option value="B.Com / M.Com / CA / Finance">B.Com / M.Com / CA / Finance</option>
                        <option value="B.Tech / BCA / MCA / IT">B.Tech / BCA / MCA / IT</option>
                        <option value="Non-IT / Arts / B.Sc / Any Degree">Non-IT / Any Graduate</option>
                        <option value="Working Professional (Career Switch)">Working Professional</option>
                        <option value="Fresher Looking For Job">Fresher Job Seeker</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Module of Interest
                      </label>
                      <select
                        value={formData.courseInterest}
                        onChange={(e) =>
                          setFormData({ ...formData, courseInterest: e.target.value })
                        }
                        className="w-full bg-[#060c18] border border-white/20 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
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
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Choose Your Live Batch Slot
                    </label>
                    <select
                      value={formData.preferredSlot}
                      onChange={(e) =>
                        setFormData({ ...formData, preferredSlot: e.target.value })
                      }
                      className="w-full bg-[#060c18] border border-white/20 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                    >
                      <option value="Saturday 7:00 PM IST (Evening Masterclass)">
                        Saturday 7:00 PM IST (Evening Live)
                      </option>
                      <option value="Sunday 11:00 AM IST (Morning Masterclass)">
                        Sunday 11:00 AM IST (Morning Live)
                      </option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-base py-4 rounded-xl shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 mt-2"
                  >
                    {isSubmitting ? (
                      <span>Reserving Your Seat...</span>
                    ) : (
                      <>
                        <span>Book My Webinar Slot for ₹9</span>
                        <FaArrowRight className="text-sm" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-3 text-[11px] text-slate-400 pt-1">
                    <span className="flex items-center gap-1">
                      <FaLock className="text-emerald-400 text-[10px]" /> 256-Bit Secure
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <FaCheckCircle className="text-amber-400 text-[10px]" /> Instant WhatsApp Invite
                    </span>
                  </div>
                </form>

                {/* Included Free Gift Note */}
                <div className="mt-5 p-3 rounded-xl bg-amber-400/10 border border-amber-400/25 flex items-center gap-3">
                  <FaGift className="text-amber-400 text-xl shrink-0" />
                  <div className="text-xs text-slate-300">
                    <strong className="text-amber-300">Bonus: ₹5,997 Value Learning Kits</strong>{" "}
                    (T-Code cheat sheet, 150+ interview questions) included free with your ₹9 ticket!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. COMPANY HIRING PARTNERS TICKER ── */}
      <section className="py-8 bg-[#040814] border-y border-white/10">
        <div className="w-[min(1240px,94%)] mx-auto text-center space-y-4">
          <p className="text-xs font-black uppercase tracking-widest text-slate-400">
            Our Students &amp; SAP Consultants Get Hired At Top Global Enterprises
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-80 grayscale hover:grayscale-0 transition-all">
            <span className="text-lg font-black text-slate-300 tracking-wider">INFOSYS</span>
            <span className="text-lg font-black text-slate-300 tracking-wider">TCS</span>
            <span className="text-lg font-black text-slate-300 tracking-wider">WIPRO</span>
            <span className="text-lg font-black text-slate-300 tracking-wider">ACCENTURE</span>
            <span className="text-lg font-black text-slate-300 tracking-wider">DELOITTE</span>
            <span className="text-lg font-black text-slate-300 tracking-wider">IBM</span>
            <span className="text-lg font-black text-slate-300 tracking-wider">TECH MAHINDRA</span>
            <span className="text-lg font-black text-slate-300 tracking-wider">HCLTECH</span>
          </div>
        </div>
      </section>

      {/* ── 5. "WHY INXYME FOR SAP?" & PROPRIETARY CURRICULUM HIGHLIGHT ── */}
      <section id="why-inxyme" className="py-16 sm:py-24 relative bg-[#091326]">
        <div className="w-[min(1240px,94%)] mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-amber-400/10 text-amber-300 rounded-full text-xs font-extrabold uppercase tracking-widest border border-amber-400/30">
              <FaAward /> India&apos;s Best SAP Training Center
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Hum SAP Ki India Ki Best Training Dete Hain
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Inxyme koi generic PPT institute nahi hai. Hamare pass apne senior architects ke banaye
              huye{" "}
              <strong className="text-amber-400">proprieatry, custom-crafted curriculums</strong>{" "}
              hain jo real-world MNC project delivery guidelines par based hain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-[#0b1730] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4 hover:border-amber-400/40 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-amber-400/20 text-amber-400 flex items-center justify-center text-2xl font-bold">
                01
              </div>
              <h3 className="text-xl font-bold text-white">
                In-House Proprietary Curriculum
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Dusre institutes purane generic PDF modules copy-paste karte hain. Inxyme ka
                curriculum hamare 15+ years experienced Solution Architects ne banaya hai —
                updated for <strong>S/4HANA 2023/2024 &amp; Cloud ERP</strong>.
              </p>
            </div>

            <div className="bg-[#0b1730] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4 hover:border-emerald-400/40 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-emerald-400/20 text-emerald-400 flex items-center justify-center text-2xl font-bold">
                02
              </div>
              <h3 className="text-xl font-bold text-white">
                Live S/4HANA Server Practice (24/7)
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Har student ko real enterprise SAP server access milta hai jisme standard company
                codes, purchase orders, sales transactions aur master data configuration pre-loaded
                hote hain. Zero simulation — 100% real ERP system!
              </p>
            </div>

            <div className="bg-[#0b1730] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4 hover:border-blue-400/40 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-blue-400/20 text-blue-400 flex items-center justify-center text-2xl font-bold">
                03
              </div>
              <h3 className="text-xl font-bold text-white">
                Cross-Module Integration Mastery
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Real jobs me SAP isolated nahi chalta. Hum sikhate hain FICO kaise MM se interact
                karta hai, SD kaise FICO billing trigger karta hai, aur ABAP kaise inke custom
                reports banata hai. Yehi integration consultants ko high package dilata hai.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. "WHICH COURSE IS BEST FOR YOU?" DECISION MATRIX (ADDRESSING THE AD'S QUESTION) ── */}
      <section id="which-course" className="py-16 sm:py-24 bg-[#060d1c] relative">
        <div className="w-[min(1240px,94%)] mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-blue-500/10 text-blue-300 rounded-full text-xs font-extrabold uppercase tracking-widest border border-blue-500/30">
              <FaRegLightbulb /> Career Clarity Guide
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              &ldquo;Samajh Nahi Aa Raha Ki Exactly Kya Choose Karein?&rdquo;
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Aapke graduation, background aur interest ke according samjho kaunsa domain aapko
              sabse fast growth dega:
            </p>
          </div>

          {/* Module Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {COURSE_DIRECTIONS.map((track) => (
              <button
                key={track.id}
                onClick={() => setSelectedCourseTab(track.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  selectedCourseTab === track.id
                    ? "bg-amber-400 text-slate-950 shadow-lg scale-105"
                    : "bg-[#0b1730] text-slate-300 hover:text-white border border-white/10"
                }`}
              >
                <span>{track.title.split("(")[0]}</span>
              </button>
            ))}
          </div>

          {/* Active Track Highlight Details */}
          {COURSE_DIRECTIONS.filter((t) => t.id === selectedCourseTab).map((track) => (
            <div
              key={track.id}
              className={`bg-gradient-to-br from-[#0e1c38] to-[#081224] border-2 ${track.border} rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 max-w-4xl mx-auto`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-3xl">
                    {track.icon}
                  </div>
                  <div>
                    <span className={`text-xs font-extrabold px-3 py-1 rounded-full ${track.bgBadge}`}>
                      {track.tag}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                      {track.title}
                    </h3>
                  </div>
                </div>
                <div className="text-left sm:text-right bg-emerald-500/10 border border-emerald-500/30 px-4 py-2.5 rounded-2xl">
                  <span className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider block">
                    Average Salary Range
                  </span>
                  <span className="text-lg sm:text-xl font-black text-emerald-400">
                    {track.avgSalary}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="bg-[#070e1c] p-4 rounded-xl border border-white/10">
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                    🎯 Kaunsa Background Best Hai?
                  </span>
                  <p className="text-sm font-semibold text-slate-200">{track.bestFor}</p>
                </div>
                <div className="bg-[#070e1c] p-4 rounded-xl border border-white/10">
                  <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider block mb-1">
                    🚀 Kyu Choose Karein Ye Track?
                  </span>
                  <p className="text-sm font-semibold text-slate-200">{track.whyChoose}</p>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed pt-2">
                {track.overview}
              </p>

              <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10">
                <span className="text-xs text-slate-400">
                  Abhi bhi doubt hai? Is course ka deep roadmap webinar me mentor se samjhein.
                </span>
                <button
                  onClick={scrollToRegistration}
                  className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm px-6 py-3 rounded-xl transition-transform hover:scale-105"
                >
                  Join Webinar &amp; Ask Mentor @ ₹9 →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. "EVERYTHING WE PROVIDE" — ALL INXYME ADVANTAGES ── */}
      <section id="advantages" className="py-16 sm:py-24 bg-[#091326] relative">
        <div className="w-[min(1240px,94%)] mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-emerald-400/10 text-emerald-300 rounded-full text-xs font-extrabold uppercase tracking-widest border border-emerald-400/30">
              <FaShieldAlt /> Everything Inxyme Provides
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              India Ke Har Online Certification Institute Se Kahin Zyada
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Resume building, mock interviews, live classes, daily 1-to-1 doubt sessions aur
              sabse unique — <strong className="text-amber-400">aapka personal portfolio Inxyme domain par</strong>!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {INXYME_ADVANTAGES.map((adv, idx) => (
              <div
                key={idx}
                className="bg-[#0b1730] border border-white/10 rounded-2xl p-6 space-y-3 hover:border-amber-400/40 hover:bg-[#0e1d3d] transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {adv.icon}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-amber-400/15 text-amber-300 px-2.5 py-1 rounded-full border border-amber-400/25">
                    {adv.highlight}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                  {adv.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {adv.description}
                </p>
              </div>
            ))}
          </div>

          {/* Special Feature Highlight: Personal Domain Portfolio */}
          <div className="bg-gradient-to-r from-blue-900/40 via-purple-900/40 to-blue-900/40 border-2 border-purple-400/40 rounded-3xl p-6 sm:p-10 text-left relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-3">
                <span className="text-xs font-black uppercase tracking-widest text-purple-300 flex items-center gap-1.5">
                  <FaGlobe /> Exclusive Inxyme Feature
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  Aapka Personal Web Portfolio Inxyme Domain Par!
                </h3>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                  Recruiters generic PDF resumes dekh kar bore ho chuke hain. Inxyme me enroll karne
                  ke baad hum aapko dete hain live verified subdomain jaise ki{" "}
                  <code className="bg-black/50 text-amber-300 px-2 py-0.5 rounded font-mono font-bold text-xs sm:text-sm">
                    yourname.inxyme.com
                  </code>
                  . Isme aapke live SAP case studies, business process flowcharts, aur credentials live
                  host hote hain jisse HR aapko directly interview ke liye shortlist karta hai!
                </p>
              </div>
              <div className="lg:col-span-4 text-center sm:text-right">
                <button
                  onClick={scrollToRegistration}
                  className="bg-purple-500 hover:bg-purple-400 text-white font-black text-sm px-6 py-3.5 rounded-xl shadow-lg transition-transform hover:scale-105"
                >
                  See Portfolio Demo In Webinar @ ₹9 →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. WEBINAR SCHEDULE & 90-MINUTE AGENDA ── */}
      <section className="py-16 sm:py-24 bg-[#060c18] relative">
        <div className="w-[min(1240px,94%)] mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-amber-400/10 text-amber-300 rounded-full text-xs font-extrabold uppercase tracking-widest border border-amber-400/30">
              <FaClock /> 90-Minute Masterclass Flow
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Webinar Me Kya-Kya Sikhenge?
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Har minute aapke career ke liye designed hai — zero time-waste, 100% actionable knowledge:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {WEBINAR_AGENDA.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#0b1730] border border-white/10 rounded-2xl p-6 space-y-3 relative overflow-hidden hover:border-amber-400/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30 font-mono">
                    {item.time}
                  </span>
                  <span className="text-slate-600 font-black text-lg">0{idx + 1}</span>
                </div>
                <h3 className="text-base font-bold text-white pt-1">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <button
              onClick={scrollToRegistration}
              className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm sm:text-base px-8 py-4 rounded-xl shadow-xl transition-transform hover:scale-105"
            >
              Reserve My ₹9 Seat For This 90-Min Masterclass →
            </button>
          </div>
        </div>
      </section>

      {/* ── 9. FREE BONUS BUNDLE WORTH ₹5,997 (INCLUDED FOR ₹9 ATTENDEES) ── */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-[#091326] to-[#040814] relative">
        <div className="w-[min(1240px,94%)] mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-red-500/10 text-red-300 rounded-full text-xs font-extrabold uppercase tracking-widest border border-red-500/30">
              <FaGift /> Free Gifts With ₹9 Ticket
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Webinar Attend Karne Par ₹5,997 Ka Bonus Kit Free!
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Sirf ₹9 me webinar register karne par aapko ye chaar high-value resources bina kisi
              extra cost ke instantly unlock ho jaayenge:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#0b1730] border border-amber-400/30 rounded-2xl p-6 text-left space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center text-xl">
                <FaDownload />
              </div>
              <span className="text-[10px] uppercase font-bold text-amber-300 bg-amber-400/15 px-2 py-0.5 rounded">
                Valued at ₹1,499
              </span>
              <h4 className="text-base font-bold text-white">
                SAP T-Code Master Cheat Sheet
              </h4>
              <p className="text-xs text-slate-400">
                Complete printable PDF with all critical transaction codes for FICO, MM, SD, PP and ABAP.
              </p>
            </div>

            <div className="bg-[#0b1730] border border-blue-400/30 rounded-2xl p-6 text-left space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-blue-400/20 text-blue-400 flex items-center justify-center text-xl">
                <FaBookReader />
              </div>
              <span className="text-[10px] uppercase font-bold text-blue-300 bg-blue-400/15 px-2 py-0.5 rounded">
                Valued at ₹1,999
              </span>
              <h4 className="text-base font-bold text-white">
                Top 150+ Real SAP Interview Q&amp;A
              </h4>
              <p className="text-xs text-slate-400">
                MNC interview questions with exact answers asked in Deloitte, Accenture, and PwC.
              </p>
            </div>

            <div className="bg-[#0b1730] border border-emerald-400/30 rounded-2xl p-6 text-left space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-emerald-400/20 text-emerald-400 flex items-center justify-center text-xl">
                <FaChartLine />
              </div>
              <span className="text-[10px] uppercase font-bold text-emerald-300 bg-emerald-400/15 px-2 py-0.5 rounded">
                Valued at ₹999
              </span>
              <h4 className="text-base font-bold text-white">
                2026 SAP Salary &amp; Role Blueprint
              </h4>
              <p className="text-xs text-slate-400">
                Module-wise salary benchmarks, fresher entry guides, and negotiation tactics report.
              </p>
            </div>

            <div className="bg-[#0b1730] border border-purple-400/30 rounded-2xl p-6 text-left space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-purple-400/20 text-purple-400 flex items-center justify-center text-xl">
                <FaUserTie />
              </div>
              <span className="text-[10px] uppercase font-bold text-purple-300 bg-purple-400/15 px-2 py-0.5 rounded">
                Valued at ₹1,500
              </span>
              <h4 className="text-base font-bold text-white">
                1-on-1 Profile Review Call Voucher
              </h4>
              <p className="text-xs text-slate-400">
                Webinar ke baad senior career counselor ke sath 15-minute ka personal profile call.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. MENTOR & SPEAKER PROFILE ── */}
      <section className="py-16 sm:py-24 bg-[#060c18] relative">
        <div className="w-[min(1240px,94%)] mx-auto max-w-4xl bg-gradient-to-r from-[#0d1d3d] via-[#09152b] to-[#0d1d3d] border border-white/15 rounded-3xl p-6 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 items-center">
            <div className="sm:col-span-4 text-center">
              <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-amber-200 text-slate-950 flex items-center justify-center text-5xl font-black shadow-xl">
                👨‍🏫
              </div>
              <span className="inline-block mt-3 text-xs bg-amber-400/20 text-amber-300 px-3 py-1 rounded-full font-bold">
                15+ Years Industry Lead
              </span>
            </div>

            <div className="sm:col-span-8 space-y-4">
              <span className="text-xs font-black uppercase tracking-wider text-amber-400">
                Meet Your Masterclass Instructor
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Senior SAP Enterprise Solution Architect
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Trained 5,000+ engineers, finance graduates, and career transitioners across India.
                Has delivered multi-million dollar S/4HANA enterprise implementations across Germany,
                Middle East, and US consulting clients.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="bg-[#050b16] p-3 rounded-xl border border-white/10">
                  <strong className="text-amber-400 block text-base font-black">5,000+</strong>
                  <span className="text-slate-400 text-[11px]">Students Mentored</span>
                </div>
                <div className="bg-[#050b16] p-3 rounded-xl border border-white/10">
                  <strong className="text-emerald-400 block text-base font-black">15+ Yrs</strong>
                  <span className="text-slate-400 text-[11px]">Consulting Exp</span>
                </div>
                <div className="bg-[#050b16] p-3 rounded-xl border border-white/10 col-span-2 sm:col-span-1">
                  <strong className="text-blue-400 block text-base font-black">4.9 / 5</strong>
                  <span className="text-slate-400 text-[11px]">Webinar Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 11. DETAILED FAQS ADDRESSING ₹9 CHARGE & ALL DOUBTS ── */}
      <section id="faqs" className="py-16 sm:py-24 bg-[#091326] relative">
        <div className="w-[min(1000px,94%)] mx-auto space-y-12">
          <div className="text-center space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-amber-400/10 text-amber-300 rounded-full text-xs font-extrabold uppercase tracking-widest border border-amber-400/30">
              <FaQuestionCircle /> Clear Answers
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-slate-300">
              Webinar ya ₹9 fee se related aapke saare doubts ka complete clarification:
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <div
                key={index}
                className="bg-[#0b1730] border border-white/10 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-white hover:text-amber-300 transition-colors cursor-pointer"
                >
                  <span className="text-sm sm:text-base">{faq.q}</span>
                  <FaChevronDown
                    className={`text-xs text-amber-400 shrink-0 transition-transform duration-300 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 12. FINAL HIGH-CONVERTING CTA BANNER ── */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-[#060c18] via-[#0e1d3d] to-[#040814] text-center relative overflow-hidden">
        <div className="w-[min(900px,94%)] mx-auto space-y-6 relative z-10">
          <span className="inline-block px-4 py-1.5 bg-red-500/20 text-red-400 text-xs font-black rounded-full border border-red-500/40 uppercase tracking-widest animate-pulse">
            🔥 ₹999 KI VALUE — SIRF ₹9 MEIN!
          </span>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Agar Aap Apne Career Ko Lekar Genuinely Serious Hain, Toh Ye Webinar Miss Mat Kijiye!
          </h2>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Limited slots available. Only 18 seats remaining for this weekend&apos;s live batch.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={scrollToRegistration}
              className="w-full sm:w-auto bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-base sm:text-lg px-10 py-5 rounded-2xl shadow-2xl transition-all transform hover:scale-105 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>👉 ₹9 Mein Apna Slot BOOK NOW with Inxyme!</span>
            </button>
          </div>

          <p className="text-xs text-slate-400 pt-2">
            100% Risk-Free · Instant WhatsApp Confirmation · Live Zoom Q&amp;A
          </p>
        </div>
      </section>

      {/* ── 13. STICKY FLOATING REGISTRATION BAR (MOBILE & DESKTOP) ── */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#09152b]/95 backdrop-blur-md border-t border-amber-400/40 py-3 px-4 z-40 shadow-2xl">
        <div className="w-[min(1240px,94%)] mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 font-black flex items-center justify-center text-sm shadow-md shrink-0">
              ₹9
            </div>
            <div className="hidden sm:block">
              <strong className="text-white text-xs sm:text-sm block">
                Inxyme Live SAP Career Webinar
              </strong>
              <span className="text-[11px] text-amber-300 font-bold">
                ₹999 ki value sirf ₹9 me · Limited Slots Available
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 p-2.5 sm:px-4 sm:py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-transform hover:scale-105"
            >
              <FaWhatsapp className="text-base" />
              <span className="hidden md:inline">WhatsApp Help</span>
            </a>
            <button
              onClick={scrollToRegistration}
              className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-lg transition-transform hover:scale-105 cursor-pointer flex items-center gap-1.5"
            >
              <span>Book Slot @ ₹9</span>
              <FaArrowRight className="text-xs" />
            </button>
          </div>
        </div>
      </div>

      {/* ── 14. FOOTER ── */}
      <footer className="bg-[#03060f] text-slate-400 py-12 pb-24 text-xs border-t border-white/10">
        <div className="w-[min(1200px,94%)] mx-auto space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div className="space-y-2 text-center md:text-left">
              <img src={LOGO_SRC} alt="Inxyme" className="h-8 w-auto mx-auto md:mx-0 object-contain bg-white/90 p-1 rounded-lg" />
              <p className="text-xs text-slate-400 max-w-sm">
                Inxyme E-Learning — India&apos;s leading enterprise ERP and SAP certification
                training partner.
              </p>
            </div>
            <div className="text-center md:text-right space-y-1">
              <span className="text-xs text-slate-300 block font-bold">Webinar Helpline:</span>
              <a href="tel:+919990999561" className="text-amber-400 font-bold text-sm hover:underline block">
                +91 99909 99561
              </a>
              <span className="text-[11px] text-slate-500 block">Mon - Sun (9:00 AM - 9:00 PM IST)</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-slate-500">
            <p>© {new Date().getFullYear()} Inxyme E-Learning. All rights reserved.</p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400">
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
