"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  FaCertificate,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaGoogle,
  FaFacebookF,
  FaGraduationCap,
  FaShieldAlt,
  FaAward,
  FaUniversity,
  FaChalkboardTeacher,
  FaBriefcase,
  FaLaptopCode,
  FaUserTie,
  FaRupeeSign,
  FaCheckCircle,
  FaArrowRight,
  FaCogs,
  FaCode,
  FaChartLine,
  FaBoxes,
  FaFileInvoiceDollar,
  FaChevronDown,
  FaQuestionCircle,
  FaWhatsapp,
  FaTwitter,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaBars,
  FaTimes,
  FaCommentDots,
  FaVideo,
  FaClipboardCheck,
  FaBullseye,
  FaComments,
  FaFileAlt,
  FaBookReader,
  FaQuoteLeft,
} from "react-icons/fa";

const WHATSAPP_URL =
  "https://wa.me/919266585858?text=Hi%2C%20I%20would%20like%20to%20know%20more%20about%20Inxyme%20SAP%20training%20and%20certification%20courses.";

const PHONE_NUMBER = "+919266585858";

const logoImg =
  "https://www.inxyme.com/api/upload/file/Inxyme-png-logo-2232.png";

const sapCourses = [
  {
    name: "SAP ABAP Certification Training",
    description:
      "Learn Advanced Business Application Programming — reports, interfaces, forms, enhancements and real-time project work on S/4HANA.",
    href: "#sap-abap",
    icon: <FaCode />,
    tag: "Technical",
    keyword: "SAP ABAP",
  },
  {
    name: "SAP FICO Financial Accounting",
    description:
      "Master Financial Accounting (FI) and Controlling (CO) — G/L, AP/AR, asset accounting, cost centers and end-to-end configuration.",
    href: "#sap-fico",
    icon: <FaFileInvoiceDollar />,
    tag: "Functional",
    keyword: "SAP FICO",
  },
  {
    name: "SAP MM Materials Management",
    description:
      "Cover procurement, inventory management, purchasing, vendor evaluation and invoice verification with hands-on practice.",
    href: "#sap-mm",
    icon: <FaBoxes />,
    tag: "Functional",
    keyword: "SAP MM",
  },
  {
    name: "SAP SD Sales & Distribution",
    description:
      "Learn order-to-cash — sales orders, pricing, delivery, billing, shipping and integration with MM and FICO.",
    href: "#sap-sd",
    icon: <FaChartLine />,
    tag: "Functional",
    keyword: "SAP SD",
  },
  {
    name: "SAP PP Production Planning",
    description:
      "Master production planning — BOM, work centers, routings, MRP, demand management and shop-floor execution.",
    href: "#sap-pp",
    icon: <FaCogs />,
    tag: "Functional",
    keyword: "SAP PP",
  },
];

const benefits = [
  {
    icon: <FaChalkboardTeacher />,
    title: "Live Instructor-Led Classes",
    text: "Learn directly from SAP-certified industry trainers with years of implementation and support project experience.",
  },
  {
    icon: <FaLaptopCode />,
    title: "Hands-On SAP Server Access",
    text: "Practice on live SAP systems with real-time scenarios, configuration exercises and end-to-end project work.",
  },
  {
    icon: <FaCertificate />,
    title: "Recognized Certification",
    text: "Earn an ISO-certified, verifiable course completion certificate valued by employers and enterprise organizations.",
  },
  {
    icon: <FaBriefcase />,
    title: "Placement Assistance",
    text: "Get resume building, interview preparation and referrals through our hiring partner network across India.",
  },
  {
    icon: <FaUserTie />,
    title: "1:1 Mentorship & Doubt Support",
    text: "Weekly doubt-clearing sessions, mentor guidance and a support forum with responses within 24 hours.",
  },
  {
    icon: <FaRupeeSign />,
    title: "Affordable & Flexible",
    text: "Scholarship options, EMI plans and weekend batches designed for students and working professionals.",
  },
];

const learningPath = [
  {
    step: "01",
    title: "SAP Fundamentals",
    text: "Understand ERP concepts, SAP architecture, navigation, modules and the S/4HANA ecosystem.",
  },
  {
    step: "02",
    title: "Module Deep-Dive",
    text: "Master your chosen module — ABAP, FICO, MM, SD or PP — with configuration and business process training.",
  },
  {
    step: "03",
    title: "Real-Time Projects",
    text: "Work on implementation-style projects, case studies and integration scenarios used in actual SAP projects.",
  },
  {
    step: "04",
    title: "Certification & Interview Prep",
    text: "Clear assessments, earn your certificate, and prepare with mock interviews and resume building.",
  },
  {
    step: "05",
    title: "Placement Support",
    text: "Get referred to hiring partners and apply for SAP consultant, analyst and support roles.",
  },
];

const careerRoles = [
  "SAP Functional Consultant",
  "SAP ABAP Developer",
  "SAP FICO Consultant",
  "SAP MM / SD / PP Analyst",
  "SAP Support Executive",
  "SAP End User / Power User",
  "ERP Business Analyst",
  "SAP Implementation Associate",
];

const trainingSteps = [
  {
    stepNum: "01",
    icon: <FaVideo className="text-xl text-blue-600 dark:text-blue-400" />,
    title: "Learn from Experts",
    desc: "In-depth video lessons and live interactive sessions conducted by veteran SAP consultants with real-world enterprise implementation track records.",
  },
  {
    stepNum: "02",
    icon: <FaClipboardCheck className="text-xl text-blue-600 dark:text-blue-400" />,
    title: "See Where You Stand",
    desc: "Regular quizzes, assignments, and module assessments break down complex SAP topics so you master configuration before job interviews.",
  },
  {
    stepNum: "03",
    icon: <FaBullseye className="text-xl text-blue-600 dark:text-blue-400" />,
    title: "Practical Real-World Projects",
    desc: "Execute end-to-end client business scenarios on live SAP servers using the exact tools, transactions, and methodologies used in top IT consultancies.",
  },
  {
    stepNum: "04",
    icon: <FaComments className="text-xl text-blue-600 dark:text-blue-400" />,
    title: "1:1 Doubt Solving",
    desc: "Personalized mentor sessions and rapid support forum answers within 24 hours ensure you never get stuck during your learning journey.",
  },
  {
    stepNum: "05",
    icon: <FaFileAlt className="text-xl text-blue-600 dark:text-blue-400" />,
    title: "Comprehensive Assessment",
    desc: "Rigorous final capstone evaluation verifies your mastery of SAP configuration, business blueprints, integration, and reporting.",
  },
  {
    stepNum: "06",
    icon: <FaCertificate className="text-xl text-blue-600 dark:text-blue-400" />,
    title: "Get Industry Certified",
    desc: "Receive an industry-recognized, verifiable Inxyme credential that adds genuine value to your LinkedIn profile and corporate job applications.",
  },
];

const googleReviews = [
  {
    id: 1,
    name: "Classes with Karan",
    rating: 5,
    text: "I had a great learning experience with the Inxyme SAP program. The teaching methodology is practical, easy to understand, and focused on real-world business applications. The course content is well-structured, industry-relevant, and suitable for both freshers and working professionals.",
    date: "3 months ago",
  },
  {
    id: 2,
    name: "Gaurav Jha",
    rating: 5,
    text: "Completed the SAP training with Inxyme. The learning experience was excellent, with supportive faculty, live server access, and practical classes. The course helped me gain strong confidence and clear technical interviews.",
    date: "3 months ago",
  },
  {
    id: 3,
    name: "Aryan Verma",
    rating: 5,
    text: "The trainers were very experienced, and the curriculum provided practical knowledge with live enterprise projects. The dedicated placement assistance and mock interview rounds helped me land my first SAP analyst role.",
    date: "2 months ago",
  },
  {
    id: 4,
    name: "Nitesh Singh",
    rating: 5,
    text: "A truly transformative learning experience. The mentors explained every SAP configuration clearly, from organizational units to integration across FICO and MM. They also provide comprehensive career guidance and interview preparation.",
    date: "3 months ago",
  },
  {
    id: 5,
    name: "Neha Kashyap",
    rating: 5,
    text: "I completed the SAP Materials Management course with Inxyme, and my experience was very positive. Concepts were explained clearly with real-time enterprise scenarios, which helped me build a strong foundational understanding.",
    date: "2 months ago",
  },
  {
    id: 6,
    name: "Vivek Thakur",
    rating: 5,
    text: "One of the best programs for SAP certification. The faculty is supportive, and live server practice with real-time projects made learning smooth. I successfully cleared my SAP interview after completing the course.",
    date: "3 months ago",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Pooja Verma",
    role: "SAP FICO Consultant",
    company: "Placed at Deloitte Partner",
    content:
      "The SAP FICO training gave me a clear understanding of financial accounting and controlling concepts and their practical configuration in SAP S/4HANA.",
    rating: 5,
  },
  {
    id: 2,
    name: "Vivek Thakur",
    role: "SAP MM Consultant",
    company: "Placed at Wipro",
    content:
      "One of the best institutes for SAP certification. The faculty is supportive, and live classes with real-time projects made learning very intuitive.",
    rating: 5,
  },
  {
    id: 3,
    name: "Neha Kashyap",
    role: "SAP MM Specialist",
    company: "Placed at Tech Mahindra",
    content:
      "The trainer explained procurement cycles and invoice verification clearly with practical enterprise examples. Highly recommended!",
    rating: 5,
  },
  {
    id: 4,
    name: "Rahul Sharma",
    role: "SAP ABAP Developer",
    company: "Placed at Infosys",
    content:
      "Starting from procedural ABAP to OO-ABAP and CDS views on HANA, the step-by-step guidance and project work gave me the edge in corporate interviews.",
    rating: 5,
  },
  {
    id: 5,
    name: "Anjali Sharma",
    role: "SAP SD Associate",
    company: "Placed at HCLTech",
    content:
      "Order-to-cash workflows, pricing conditions, and integration with FICO were taught thoroughly with hands-on practice on live servers.",
    rating: 5,
  },
  {
    id: 6,
    name: "Rohit Kumar",
    role: "ERP Business Analyst",
    company: "Placed at Capgemini",
    content:
      "The structured curriculum, resume review sessions, and dedicated mock interviews prepared me thoroughly for enterprise ERP opportunities.",
    rating: 5,
  },
];

const sapFaqs = [
  {
    question: "Which SAP module should I choose — ABAP, FICO, MM, SD or PP?",
    answer:
      "It depends on your background. If you have a programming or IT background, SAP ABAP (technical) is the best fit. If you come from commerce, finance or MBA, SAP FICO is ideal. For supply chain, logistics or mechanical backgrounds, SAP MM, SD or PP work best. Our counsellors can help you pick the right module on a free call.",
  },
  {
    question: "Do I need prior SAP or coding experience to join?",
    answer:
      "No. Our SAP programmes start from ERP and SAP fundamentals, so beginners can join comfortably. Only the ABAP track benefits from basic programming logic, but even that is taught from scratch.",
  },
  {
    question: "Will I get hands-on practice on a live SAP server?",
    answer:
      "Yes. Every learner gets SAP server access for the duration of the course so you can practice configuration, transactions and real-time business scenarios — not just watch recorded videos.",
  },
  {
    question: "Is the training live or recorded?",
    answer:
      "It's a mix of both. You attend live instructor-led classes with trainers who have real SAP implementation experience, and every session is recorded so you can revise anytime at your own pace.",
  },
  {
    question: "Do you provide SAP certification and placement support?",
    answer:
      "Yes. On completion you receive an ISO-certified, verifiable course completion certificate. Our placement team also helps with resume building, mock interviews and referrals to hiring partners for SAP consultant and analyst roles.",
  },
  {
    question: "What is the course duration and fee?",
    answer:
      "Duration is typically 8–12 weeks depending on the module, with weekday and weekend batch options. Fees vary by module — fill the enquiry form or request a callback and our counsellor will share exact fees, syllabus and upcoming batch timings.",
  },
  {
    question: "Can working professionals join? Are there weekend batches?",
    answer:
      "Absolutely. We run evening and weekend batches designed for working professionals, and all live sessions are recorded in case you miss a class.",
  },
];

const techCompanies = [
  {
    name: "TCS",
    logo: "/images/Company%20logos/Tata_Consultancy_Services_old_logo.svg",
  },
  { name: "Infosys", logo: "/images/Company%20logos/Infosys_logo.svg" },
  {
    name: "Wipro",
    logo: "/images/Company%20logos/Wipro_Primary_Logo_Color_RGB.svg",
  },
  { name: "HCL Tech", logo: "/images/Company%20logos/hcltech-1.svg" },
  {
    name: "Mahindra & Mahindra",
    logo: "/images/Company%20logos/mahindra-mahindra-logo.svg",
  },
  { name: "Microsoft", logo: "/images/Company%20logos/Microsoft_logo.svg" },
  { name: "Amazon", logo: "/images/Company%20logos/amazon-icon.svg" },
  { name: "Google", logo: "/images/Company%20logos/Google_2015_logo.svg" },
  {
    name: "Google Cloud",
    logo: "/images/Company%20logos/google_cloud-icon.svg",
  },
  { name: "Meta", logo: "/images/Company%20logos/Meta_Platforms_logo.svg" },
  { name: "Netflix", logo: "/images/Company%20logos/Netflix_icon.svg" },
  { name: "Flipkart", logo: "/images/Company%20logos/flipkart-icon.svg" },
  { name: "Zomato", logo: "/images/Company%20logos/Zomato_Logo.svg" },
];

const TIME_SLOTS = [
  "9:00 AM - 12:00 PM",
  "12:00 PM - 2:00 PM",
  "2:00 PM - 4:00 PM",
  "4:00 PM - 7:00 PM",
  "7:00 PM - 9:00 PM",
  "9:00 PM - 11:00 PM",
];

export default function SapPage({ subdomain = "sap" }: { subdomain?: string }) {
  const router = useRouter();

  // Navigation & Mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCourse, setModalCourse] = useState("SAP Global Certification");

  // Floating Contact Toggle
  const [floatingOpen, setFloatingOpen] = useState(false);

  // Main Lead Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    courseInterest: "SAP S/4HANA & Global Modules",
    timeSlot: "9:00 AM - 12:00 PM",
    agreedToTerms: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Modal Form State
  const [modalFormData, setModalFormData] = useState({
    name: "",
    phone: "",
    email: "",
    courseInterest: "",
    timeSlot: "9:00 AM - 12:00 PM",
    agreedToTerms: true,
  });
  const [modalSubmitting, setModalSubmitting] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState("");

  // Lock scroll when modal is open
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMobileMenuOpen(false);
  };

  const openCourseModal = (courseName: string) => {
    setModalCourse(courseName);
    setModalFormData((prev) => ({ ...prev, courseInterest: courseName }));
    setModalSuccess(false);
    setModalError("");
    setModalOpen(true);
  };

  const handleMainFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.agreedToTerms) {
      setErrorMsg("Please accept the terms and conditions.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      timeSlot: formData.timeSlot,
      time_slot: formData.timeSlot,
      subdomain,
      program: formData.courseInterest || "SAP Certification Course",
      university: "Inxyme E-Learning",
      source: "sap-landing-page",
    };

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setFormSuccess(true);
      router.push("/thank-you");
    } catch {
      // Offline / fallback fallback for static subdomains
      setFormSuccess(true);
      router.push("/thank-you");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!modalFormData.agreedToTerms) {
      setModalError("Please accept the terms and conditions.");
      return;
    }

    setModalSubmitting(true);
    setModalError("");

    const payload = {
      name: modalFormData.name.trim(),
      email: modalFormData.email.trim(),
      phone: modalFormData.phone.trim(),
      timeSlot: modalFormData.timeSlot,
      time_slot: modalFormData.timeSlot,
      subdomain,
      program: modalFormData.courseInterest || modalCourse,
      university: "Inxyme E-Learning",
      source: "sap-course-modal",
    };

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setModalSuccess(true);
      setTimeout(() => {
        setModalOpen(false);
        router.push("/thank-you");
      }, 900);
    } catch {
      setModalSuccess(true);
      setTimeout(() => {
        setModalOpen(false);
        router.push("/thank-you");
      }, 900);
    } finally {
      setModalSubmitting(false);
    }
  };

  const courseListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "SAP Training & Certification Courses",
    url: "https://sap.inxyme.com",
    itemListElement: sapCourses.map((course, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Course",
        name: course.name,
        description: course.description,
        url: "https://sap.inxyme.com",
        provider: {
          "@type": "Organization",
          name: "Inxyme",
          sameAs: "https://inxyme.com",
        },
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://inxyme.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "SAP Training & Certification",
        item: "https://sap.inxyme.com",
      },
    ],
  };

  return (
    <main id="top" className="relative text-slate-900 bg-white min-h-screen overflow-x-hidden font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ── FIXED STANDALONE NAVBAR ── */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 md:h-16 gap-3">
            {/* Logo */}
            <a
              href="#top"
              onClick={(e) => scrollTo(e, "#top")}
              className="text-lg font-bold text-blue-600 dark:text-blue-400"
            >
              <img
                src={logoImg}
                alt="inxyme – Your Online Learning Partner"
                className="h-[68px] rounded"
              />
            </a>  

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {[
                { label: "Courses", href: "#sap-courses" },
                { label: "Why Inxyme", href: "#why-sap" },
                { label: "Learning Path", href: "#learning-path" }, 
                { label: "Careers", href: "#careers" },
                { label: "Reviews", href: "#reviews" },
                { label: "FAQ", href: "#faq" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollTo(e, link.href)}
                  className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 rounded-lg hover:bg-slate-100 transition-all cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* CTA + Mobile menu button */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => openCourseModal("SAP Training & Certification")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md shadow-blue-600/20 active:scale-95 cursor-pointer"
              >
                Enquire Now
              </button>
              <button
                className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {isMobileMenuOpen && (
          <nav className="md:hidden border-t border-slate-200/80 bg-white/95 backdrop-blur-xl px-4 py-3 space-y-1 shadow-lg">
            {[
              { label: "Courses", href: "#sap-courses" },
              { label: "Why Inxyme", href: "#why-sap" },
              { label: "Learning Path", href: "#learning-path" },
              { label: "Careers", href: "#careers" },
              { label: "Reviews", href: "#reviews" },
              { label: "FAQ", href: "#faq" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className="block px-3 py-2.5 text-sm font-semibold text-slate-700 hover:text-blue-600 rounded-lg hover:bg-slate-100 transition-all"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openCourseModal("SAP Training & Certification");
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-bold text-sm shadow-md transition-all text-center cursor-pointer"
              >
                Enquire Now
              </button>
            </div>
          </nav>
        )}
      </header>

      {/* Spacer so content starts below fixed header */}
      <div className="h-14 md:h-16" aria-hidden="true" />

      {/* ── HERO SECTION ── */}
      <section className="relative bg-slate-900 py-12 lg:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden text-white">
        {/* Subtle glowing radial gradient blurs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-[30%] -right-[10%] w-[60%] h-[60%] rounded-full bg-blue-600/20 blur-[120px]" />
          <div className="absolute -bottom-[20%] -left-[10%] w-[40%] h-[40%] rounded-full bg-indigo-600/20 blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headline & Value Propositions */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/30 text-blue-300 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide mb-5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
              </span>
              <FaCertificate /> Job-Oriented SAP Program
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4 leading-tight tracking-tight">
              Fast-Track Your IT Career with{" "}
              <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                SAP Certification
              </span>
            </h1>

            <p className="text-sm md:text-base text-slate-300 mb-6 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Build a high-paying ERP career with Inxyme&apos;s industry-focused
              training. Get live server access, work on real-time projects, and
              secure your future with{" "}
              <strong className="text-white">100% placement support.</strong>
            </p>

            {/* Quick Value Props */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 md:gap-5 mb-8 text-xs sm:text-sm text-slate-300 font-medium">
              <div className="flex items-center gap-1.5">
                <FaCheckCircle className="text-green-400" /> Live Server Access
              </div>
              <div className="flex items-center gap-1.5">
                <FaCheckCircle className="text-green-400" /> Real-time Projects
              </div>
              <div className="flex items-center gap-1.5">
                <FaCheckCircle className="text-green-400" /> Interview Prep
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <a
                href="#sap-courses"
                onClick={(e) => scrollTo(e, "#sap-courses")}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-blue-500 transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)] text-center cursor-pointer"
              >
                Explore Curriculum
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 border border-white/20 text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-white/10 transition-all text-center backdrop-blur-sm flex items-center justify-center gap-2"
              >
                <FaWhatsapp className="text-emerald-400" /> Chat on WhatsApp
              </a>
            </div>

            {/* Ratings Row */}
            <div className="mt-8 flex flex-col items-center lg:items-start gap-3">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-0.5 text-amber-400 text-base">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStarHalfAlt />
                </div>
                <span className="text-sm font-semibold text-slate-200">
                  <span className="text-white font-bold">4.9 out of 5</span> based
                  on 12,123+ learner votes
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                {[
                  { icon: <FaGoogle className="text-xs" />, label: "Google 4.8/5" },
                  {
                    icon: <FaStar className="text-xs text-amber-400" />,
                    label: "Course 4.8/5",
                  },
                  {
                    icon: <FaGraduationCap className="text-xs" />,
                    label: "Students 4.7/5",
                  },
                  {
                    icon: <FaStar className="text-xs text-amber-400" />,
                    label: "Alumni 4.9/5",
                  },
                  {
                    icon: <FaFacebookF className="text-xs" />,
                    label: "Social 4.9/5",
                  },
                ].map((badge, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 bg-white/5 border border-white/15 text-slate-200 text-xs font-semibold px-3 py-1.5 rounded-lg"
                  >
                    {badge.icon} {badge.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Lead Form Card */}
          <div className="lg:col-span-5 relative scroll-mt-24" id="enquire">
            {/* Urgency Badge */}
            <div className="absolute -top-3 -right-2 md:-right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] sm:text-xs font-bold px-4 py-1.5 rounded-full shadow-lg z-20 border border-white/20 animate-bounce">
              🔥 Next Batch Starting Soon!
            </div>

            {/* Form Container */}
            <div className="bg-white rounded-2xl shadow-2xl p-1 relative z-10 border border-gray-100">
              <div className="bg-slate-50 rounded-xl px-4 sm:px-6 py-5 border border-gray-200">
                <div className="text-center max-w-xl mx-auto mb-5">
                  <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-1">
                    Book Your{" "}
                    <span className="text-blue-600">Free Demo Class</span>
                  </h2>
                  <p className="text-xs text-gray-500 font-medium">
                    Unlock exclusive course fees, syllabus, &amp; placement details.
                  </p>
                </div>

                {formSuccess ? (
                  <div className="text-center py-8 space-y-3">
                    <FaCheckCircle className="mx-auto text-5xl text-green-500 mb-3" />
                    <h3 className="text-xl font-bold text-slate-900">
                      Thank You!
                    </h3>
                    <p className="text-sm text-slate-600">
                      Your details have been received. Our senior SAP course advisor
                      will call you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleMainFormSubmit} className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                        placeholder="Your name"
                        className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl shadow-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-slate-900 outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          required
                          pattern="[0-9]{10}"
                          title="Please enter a valid 10-digit phone number"
                          placeholder="10-digit number"
                          className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl shadow-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-slate-900 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          required
                          placeholder="your.email@example.com"
                          className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl shadow-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-slate-900 outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        When will you be free? (Preferred Time) <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="timeSlot"
                        value={formData.timeSlot}
                        onChange={(e) =>
                          setFormData({ ...formData, timeSlot: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl shadow-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-slate-900 outline-none"
                      >
                        {TIME_SLOTS.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-start gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="agreeTerms"
                        checked={formData.agreedToTerms}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            agreedToTerms: e.target.checked,
                          })
                        }
                        className="mt-1 h-3.5 w-3.5 rounded border-slate-300 text-blue-600"
                      />
                      <label htmlFor="agreeTerms" className="text-[11px] text-slate-600">
                        I agree to be contacted by Inxyme regarding courses, fees,
                        and career counselling.
                      </label>
                    </div>

                    {errorMsg && (
                      <p className="text-xs text-red-600 text-center font-semibold">
                        {errorMsg}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-md shadow-blue-600/20 disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Request Call Back →"
                      )}
                    </button>

                    <p className="text-[10px] text-gray-400 flex items-center justify-center gap-1 pt-1">
                      🔒 Your data is 100% secure with us. No spam calls.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Hero Bottom Trust Strip */}
        <div className="relative z-10 max-w-7xl mx-auto mt-6 lg:mt-8 pt-4 border-t border-white/10">
          <div className="flex flex-wrap items-stretch justify-center gap-3 mt-2">
            {[
              {
                icon: <FaShieldAlt className="text-blue-700 text-xl shrink-0" />,
                title: "ISO Certified",
                sub: "International Organization for Standardization",
              },
              {
                icon: <FaAward className="text-blue-700 text-xl shrink-0" />,
                title: "NSDC",
                sub: "National Skill Development Corporation",
              },
              {
                icon: <FaUniversity className="text-blue-700 text-xl shrink-0" />,
                title: "MCA",
                sub: "Ministry of Corporate Affairs",
              },
              {
                icon: <FaGraduationCap className="text-blue-700 text-xl shrink-0" />,
                title: "Skill India",
                sub: "National Skills Development Mission",
              },
            ].map((badge) => (
              <div
                key={badge.title}
                className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 min-w-[200px] shadow-lg text-slate-900"
              >
                {badge.icon}
                <div className="text-left">
                  <p className="text-sm font-extrabold text-slate-900 leading-tight">
                    {badge.title}
                  </p>
                  <p className="text-[10px] text-slate-500 leading-tight">
                    {badge.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HIRING PARTNERS LOGO MARQUEE ── */}
      <div className="relative overflow-hidden px-2 sm:px-4 lg:px-6 py-4 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto text-center mb-3">
          <p className="text-xs uppercase tracking-widest font-bold text-slate-500">
            Our Learners Work At Top Global Enterprises &amp; Consultancies
          </p>
        </div>
        {/* Edge Fade Gradients */}
        <div className="absolute top-0 left-0 bottom-0 w-16 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-16 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

        <div className="flex w-max items-center gap-3 md:gap-4 px-10 py-1 animate-marquee-logos hover:[animation-play-state:paused]">
          {[...techCompanies, ...techCompanies].map((company, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-5 py-2 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center shadow-xs hover:border-blue-500 transition-colors h-14"
            >
              {company.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={company.logo}
                  alt={company.name}
                  className="h-8 w-auto max-w-[130px] object-contain"
                />
              ) : (
                <span className="text-sm md:text-base font-extrabold text-slate-700 tracking-wider">
                  {company.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── SAP COURSES GRID ── */}
      <section id="sap-courses" className="w-full px-4 sm:px-6 lg:px-8 py-12 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-10">
            <span className="inline-block px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider border border-blue-200/80 mb-3">
              Comprehensive Curriculum
            </span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-3 text-slate-900">
              Our SAP Certification Programmes
            </h2>
            <p className="text-slate-600 text-sm md:text-base">
              Choose from technical and functional SAP modules — each designed to
              take you from beginner to job-ready consultant.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sapCourses.map((course) => (
              <div
                key={course.name}
                className="sap-course-card group relative bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/40 p-7 flex flex-col hover:border-blue-500 hover:shadow-blue-500/10 transition-all scroll-mt-24"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl shadow-inner">
                    {course.icon}
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
                    {course.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {course.name}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed flex-1">
                  {course.description}
                </p>

                <button
                  type="button"
                  onClick={() => openCourseModal(course.name)}
                  className="inline-flex items-center gap-2 text-blue-600 text-sm font-bold mt-5 group-hover:underline cursor-pointer text-left"
                >
                  Enquire About This Course
                  <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}

            {/* Custom Guidance CTA Card */}
            <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-7 flex flex-col justify-center text-white shadow-xl shadow-blue-600/20">
              <h3 className="text-xl font-bold mb-3">
                Not sure which SAP module fits you?
              </h3>
              <p className="text-sm text-blue-100 leading-relaxed mb-6">
                Get free career counselling from our experts and pick the module
                that matches your academic background and aspirations.
              </p>
              <button
                type="button"
                onClick={() => openCourseModal("General SAP Counselling")}
                className="inline-flex items-center gap-2 bg-white text-blue-700 px-5 py-2.5 rounded-xl font-bold text-sm w-fit hover:bg-blue-50 transition-all cursor-pointer shadow-md"
              >
                Get Free Counselling <FaArrowRight className="text-xs" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY LEARN SAP WITH INXYME ── */}
      <section id="why-sap" className="w-full px-4 sm:px-6 lg:px-8 py-12 bg-slate-50 border-y border-slate-200/80 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-10">
            <span className="inline-block px-3.5 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
              The Inxyme Advantage
            </span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-3 text-slate-900">
              Why Learn SAP with Inxyme?
            </h2>
            <p className="text-slate-600 text-sm md:text-base">
              Everything you need to go from learner to certified SAP consultant
              — in one structured program.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 hover:shadow-lg transition-all"
              >
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl mb-3 shadow-xs">
                  {benefit.icon}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1.5">
                  {benefit.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {benefit.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEARNING PATH ROADMAP ── */}
      <section id="learning-path" className="w-full px-4 sm:px-6 lg:px-8 py-12 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-10">
            <span className="inline-block px-3.5 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-wider border border-amber-200 mb-3">
              Structured Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-3 text-slate-900">
              Your Path to Becoming an SAP Professional
            </h2>
            <p className="text-slate-600 text-sm md:text-base">
              A proven 5-step journey from fundamentals to a certified, placed
              SAP professional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {learningPath.map((item) => (
              <div
                key={item.step}
                className="relative bg-white rounded-3xl border border-slate-200 shadow-md p-6 flex flex-col justify-between hover:border-blue-400 transition-colors"
              >
                <div>
                  <div className="text-3xl font-black text-blue-600/40 mb-3">
                    {item.step}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.text}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-blue-600">
                  <span>Phase {item.step}</span>
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAREER OPPORTUNITIES ── */}
      <section id="careers" className="w-full px-4 sm:px-6 lg:px-8 py-12 scroll-mt-20">
        <div className="max-w-7xl mx-auto bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center max-w-4xl mx-auto mb-10 relative z-10">
            <span className="inline-block px-3.5 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider mb-3 border border-blue-400/30">
              High-Demand ERP Profiles
            </span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
              Career Opportunities After SAP Certification
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              SAP professionals are among the highest-paid in the ERP industry.
              Our alumni work at top consultancies including TCS, Infosys, Wipro,
              HCL, Capgemini, IBM, and more.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
            {careerRoles.map((role) => (
              <div
                key={role}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-2xl px-5 py-4 border border-white/10 hover:border-blue-400 transition-colors"
              >
                <FaCheckCircle className="text-emerald-400 shrink-0" />
                <span className="text-sm font-semibold text-slate-100">
                  {role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW YOUR TRAINING WORKS ── */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto bg-slate-50 border border-slate-200/80 rounded-3xl p-6 sm:p-8 md:p-10 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider border border-blue-200">
              <FaBookReader className="text-xs" /> Training Workflow
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              How Your Training Works - With Inxyme
            </h2>
            <p className="text-sm text-slate-600">
              From enrollment to certification, every step of the Inxyme learning
              journey is structured, transparent, and built around real outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {trainingSteps.map((step) => (
              <div
                key={step.stepNum}
                className="relative bg-white rounded-2xl p-5 shadow-sm border border-slate-200 hover:shadow-xl hover:border-blue-400 transition-all flex flex-col justify-between group overflow-hidden"
              >
                <span className="absolute top-2 right-4 text-5xl font-black text-slate-200 group-hover:text-blue-100 select-none pointer-events-none transition-colors">
                  {step.stepNum}
                </span>
                <div className="relative z-10 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100 shadow-inner group-hover:scale-105 transition-transform">
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-blue-600 tracking-wider uppercase">
                    Step {step.stepNum} of 06
                  </span>
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GOOGLE REVIEWS MARQUEE ── */}
      <section className="w-full px-2 sm:px-4 lg:px-6 py-6">
        <div className="relative max-w-7xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl py-8 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-xs font-bold uppercase tracking-widest mb-3 border border-amber-200">
              <FaQuoteLeft className="w-3.5 h-3.5" /> Google Reviews
            </div>
            <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">
              Loved on Google
            </h2>
            <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
              Real feedback from our learners who transformed their careers.
            </p>
          </div>

          <div className="relative overflow-hidden">
            <div className="absolute top-0 left-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div className="flex w-max gap-6 py-4 animate-marquee-google hover:[animation-play-state:paused]">
              {[...googleReviews, ...googleReviews, ...googleReviews].map(
                (review, index) => (
                  <div
                    key={`${review.id}-${index}`}
                    className="w-[340px] md:w-[400px] shrink-0 relative rounded-2xl bg-white border border-slate-200 shadow-md p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl border-t-4 border-amber-400 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-1 mb-3">
                        {Array.from({ length: 5 }, (_, i) => (
                          <FaStar key={i} className="w-3.5 h-3.5 text-amber-400" />
                        ))}
                        <span className="ml-auto text-xs text-slate-400">
                          {review.date}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4 italic">
                        &ldquo;{review.text}&rdquo;
                      </p>
                    </div>
                    <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-xs">
                        {review.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">
                          {review.name}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          Verified Google Review
                        </p>
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS MARQUEE ── */}
      <section id="reviews" className="w-full px-2 sm:px-4 lg:px-6 py-6 scroll-mt-20">
        <div className="relative max-w-7xl mx-auto bg-slate-50 rounded-3xl border border-slate-200 shadow-md py-8 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 mb-6 text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-700 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-200">
              Learner Stories
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              What Our SAP Learners Say
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Real career outcomes from real candidates across India.
            </p>
          </div>

          <div className="relative w-full overflow-hidden py-2">
            <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

            <div className="flex w-max animate-marquee-testimonials hover:[animation-play-state:paused]">
              {[...testimonials, ...testimonials].map((t, idx) => (
                <div
                  key={`${t.id}-${idx}`}
                  className="w-[300px] sm:w-[360px] mx-3 p-6 rounded-3xl bg-white border border-slate-200 shadow-md flex flex-col justify-between shrink-0 hover:shadow-xl transition-shadow"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex gap-1 text-amber-400 text-sm">
                        {Array.from({ length: 5 }, (_, i) => (
                          <FaStar key={i} />
                        ))}
                      </div>
                      <FaQuoteLeft className="text-blue-500/20 text-xl" />
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-5">
                      &ldquo;{t.content}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                      {t.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                        {t.name}
                      </h3>
                      <p className="text-[11px] font-semibold text-blue-600">
                        {t.role}
                      </p>
                      <p className="text-[10px] text-slate-400">{t.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQS SECTION ── */}
      <section id="faq" className="w-full px-4 sm:px-6 lg:px-8 py-12 scroll-mt-20">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200 px-3.5 py-1 rounded-full text-blue-600 text-xs font-bold uppercase tracking-wider">
              <FaQuestionCircle className="text-xs" /> Got Questions?
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              SAP Training FAQs
            </h2>
            <p className="text-sm text-slate-600">
              Common questions about our SAP modules, certifications, and
              placements.
            </p>
          </div>

          <div className="space-y-3">
            {sapFaqs.map((faq, index) => (
              <details
                key={index}
                className="group rounded-2xl border border-slate-200 bg-slate-50/50 shadow-xs overflow-hidden open:bg-white open:border-blue-500/40 open:shadow-md transition-all duration-200"
              >
                <summary className="px-5 py-4 flex items-center justify-between gap-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <span className="text-sm sm:text-base font-bold text-slate-900">
                    {faq.question}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-slate-200/80 flex items-center justify-center text-slate-600 shrink-0 transition-transform duration-300 group-open:rotate-180 group-open:bg-blue-50 group-open:text-blue-600">
                    <FaChevronDown className="text-xs" />
                  </div>
                </summary>
                <div className="px-5 pb-4 pt-1 border-t border-slate-100">
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="w-full mt-12 bg-slate-900 text-slate-300 border-t border-slate-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Column 1: About */}
            <div className="space-y-4">
              <div className="text-2xl font-black text-white tracking-tight">
                Inx<span className="text-[#ef3e35]">yme</span>
              </div>
              <h3 className="text-xs font-black text-white tracking-wider uppercase">
                SAP Training &amp; Certification
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Job-oriented SAP training with live classes, hands-on server
                access, real-time projects, ISO certification and dedicated
                placement support across India.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  { icon: FaWhatsapp, href: WHATSAPP_URL },
                  { icon: FaLinkedin, href: "https://www.linkedin.com" },
                  { icon: FaFacebook, href: "https://www.facebook.com" },
                  { icon: FaInstagram, href: "https://www.instagram.com" },
                  { icon: FaTwitter, href: "https://x.com" },
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-blue-600 hover:text-white transition-all"
                  >
                    <social.icon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: On This Page */}
            <div className="space-y-3">
              <h3 className="text-xs font-black text-white tracking-wider uppercase">
                On This Page
              </h3>
              <ul className="space-y-2">
                {[
                  { name: "SAP Courses", to: "#sap-courses" },
                  { name: "Why Inxyme", to: "#why-sap" },
                  { name: "Learning Path", to: "#learning-path" },
                  { name: "Career Opportunities", to: "#careers" },
                  { name: "Reviews", to: "#reviews" },
                  { name: "FAQs", to: "#faq" },
                ].map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.to}
                      onClick={(e) => scrollTo(e, link.to)}
                      className="text-xs sm:text-sm text-slate-400 hover:text-blue-400 transition-colors cursor-pointer"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    onClick={() => openCourseModal("SAP Training & Certification")}
                    className="text-xs sm:text-sm text-slate-400 hover:text-blue-400 transition-colors cursor-pointer"
                  >
                    Enquire Now
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: SAP Programmes */}
            <div className="space-y-3">
              <h3 className="text-xs font-black text-white tracking-wider uppercase">
                SAP Programmes
              </h3>
              <ul className="space-y-2">
                {sapCourses.map((course, idx) => (
                  <li key={idx}>
                    <button
                      type="button"
                      onClick={() => openCourseModal(course.name)}
                      className="text-xs sm:text-sm text-slate-400 hover:text-blue-400 transition-colors text-left cursor-pointer"
                    >
                      {course.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div className="space-y-3">
              <h3 className="text-xs font-black text-white tracking-wider uppercase">
                Contact Us
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-400">
                <li className="flex items-start gap-2.5">
                  <FaMapMarkerAlt className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                  <span>
                    Sector 3, Noida, Uttar Pradesh, India
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <FaPhone className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  <a href={`tel:${PHONE_NUMBER}`} className="hover:text-blue-400">
                    {PHONE_NUMBER}
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <FaEnvelope className="h-3.5 w-3.5 text-purple-500 shrink-0" />
                  <a href="mailto:info@inxyme.com" className="hover:text-blue-400">
                    info@inxyme.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-500">
              &copy; {new Date().getFullYear()} Inxyme. All rights reserved.
            </p>
            <p className="text-xs text-slate-500 text-center sm:text-right">
              SAP&reg; is a registered trademark of SAP SE. Inxyme offers an
              independent industry-oriented training program.
            </p>
          </div>
        </div>
      </footer>

      {/* ── COURSE QUICK ENQUIRY MODAL ── */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
            aria-hidden="true"
          />

          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 max-h-[90vh] overflow-y-auto z-10 animate-in fade-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
            >
              <FaTimes />
            </button>

            <div className="text-center mb-5">
              <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
                Course Enquiry
              </span>
              <h3 className="text-xl font-bold text-slate-900">
                Enquire — {modalCourse}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Fill in your details and our senior SAP counsellor will call you
                with syllabus, fees and batch details.
              </p>
            </div>

            {modalSuccess ? (
              <div className="text-center py-8 space-y-3">
                <FaCheckCircle className="mx-auto text-5xl text-green-500 mb-2" />
                <h4 className="text-lg font-bold text-slate-900">
                  Enquiry Submitted!
                </h4>
                <p className="text-xs text-slate-600">
                  Redirecting to the confirmation page...
                </p>
              </div>
            ) : (
              <form onSubmit={handleModalFormSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={modalFormData.name}
                    onChange={(e) =>
                      setModalFormData({ ...modalFormData, name: e.target.value })
                    }
                    placeholder="Your full name"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={modalFormData.email}
                    onChange={(e) =>
                      setModalFormData({ ...modalFormData, email: e.target.value })
                    }
                    placeholder="your.email@example.com"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    title="10-digit mobile number"
                    value={modalFormData.phone}
                    onChange={(e) =>
                      setModalFormData({ ...modalFormData, phone: e.target.value })
                    }
                    placeholder="10-digit number"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    When will you be free? (Preferred Time) <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={modalFormData.timeSlot}
                    onChange={(e) =>
                      setModalFormData({
                        ...modalFormData,
                        timeSlot: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-start gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="modalTerms"
                    checked={modalFormData.agreedToTerms}
                    onChange={(e) =>
                      setModalFormData({
                        ...modalFormData,
                        agreedToTerms: e.target.checked,
                      })
                    }
                    className="mt-1 h-3.5 w-3.5 rounded border-slate-300 text-blue-600"
                  />
                  <label htmlFor="modalTerms" className="text-[11px] text-slate-600">
                    I agree to be contacted by Inxyme regarding courses &amp; fees.
                  </label>
                </div>

                {modalError && (
                  <p className="text-xs text-red-600 text-center">{modalError}</p>
                )}

                <button
                  type="submit"
                  disabled={modalSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-md transition-all disabled:opacity-60 cursor-pointer text-sm"
                >
                  {modalSubmitting ? "Submitting..." : "Submit Enquiry →"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ── FLOATING CONTACT WIDGET ── */}
      <div
        className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3"
        onMouseLeave={() => setFloatingOpen(false)}
      >
        <div
          className={`flex flex-col items-end gap-2.5 transition-all duration-200 ${floatingOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-2 pointer-events-none"
            }`}
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white border border-slate-200 rounded-full pl-4 pr-2 py-2 shadow-xl hover:scale-105 transition-all"
          >
            <span className="text-xs font-bold text-slate-700">
              Chat on WhatsApp
            </span>
            <span className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center text-white shrink-0">
              <FaWhatsapp className="text-lg" />
            </span>
          </a>
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="flex items-center gap-3 bg-white border border-slate-200 rounded-full pl-4 pr-2 py-2 shadow-xl hover:scale-105 transition-all"
          >
            <span className="text-xs font-bold text-slate-700">Call Now</span>
            <span className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0">
              <FaPhone className="text-sm" />
            </span>
          </a>
        </div>

        <button
          type="button"
          onMouseEnter={() => setFloatingOpen(true)}
          onClick={() => setFloatingOpen(!floatingOpen)}
          aria-label={floatingOpen ? "Close contact options" : "Contact us"}
          className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl transition-all hover:scale-105 cursor-pointer ${floatingOpen ? "bg-slate-700" : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
          {floatingOpen ? (
            <FaTimes className="text-xl" />
          ) : (
            <FaCommentDots className="text-2xl" />
          )}
        </button>
      </div>

      {/* ── CSS KEYFRAMES FOR LOGOS & MARQUEES ── */}
      <style jsx global>{`
        @keyframes marquee-logos {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee-logos {
          animation: marquee-logos 38s linear infinite;
        }

        @keyframes marquee-google {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee-google {
          animation: marquee-google 60s linear infinite;
        }

        @keyframes marquee-testimonials {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee-testimonials {
          animation: marquee-testimonials 45s linear infinite;
        }

        .sap-course-card:target {
          border-color: rgb(37 99 235) !important;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.35),
            0 20px 40px -12px rgba(37, 99, 235, 0.35) !important;
          transform: translateY(-4px);
        }
      `}</style>
    </main>
  );
}
