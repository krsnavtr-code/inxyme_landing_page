"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";

interface ProgramLandingTemplateProps {
  content: Record<string, any>;
  subdomain: string;
}

export default function ProgramLandingTemplate({
  content,
  subdomain,
}: ProgramLandingTemplateProps) {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      state: String(form.get("state") || ""),
      qualification: String(form.get("qualification") || ""),
      subdomain,
      source: "landing-page",
    };

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Submission failed. Please try again.");
      }

      setStatus("success");
      e.currentTarget.reset();
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong.");
    }
  };

  const programName = content.programName || "Online MBA 2026";
  const universityName = content.universityName || "Manipal University Online";
  const badge = content.badge || "ENROLLMENTS OPEN FOR UPCOMING BATCH";
  const heroTitle =
    content.heroTitle ||
    `${universityName} ${programName} – Fees, Eligibility, Specialisations & Admission Guide`;
  const heroSubtitle =
    content.heroSubtitle ||
    `Explore ${universityName} ${programName} curriculum, fees, certification details, and career outcomes. Get expert guidance from an Inxyme course advisor.`;
  const heroFacts: string[] = content.heroFacts || [
    "Industry-Recognised Certification",
    "100% Online Learning",
    "Live + Recorded Sessions",
    "Hands-On Projects",
    "Placement Assistance*",
    "Flexible Learning Schedule",
  ];
  const navLinks: { label: string; href: string }[] = content.navLinks || [
    { label: "Overview", href: "#overview" },
    { label: "Specialisations", href: "#specialisations" },
    { label: "Fees", href: "#fees" },
    { label: "Curriculum", href: "#curriculum" },
    { label: "FAQ", href: "#faq" },
  ];
  const whyChoose: { title: string; description: string }[] =
    content.whyChoose || [
      {
        title: "Industry-Aligned Curriculum",
        description:
          "Build management, leadership and technology-oriented skills through an industry-oriented curriculum.",
      },
      {
        title: "Flexible Online Learning",
        description:
          "Study online while balancing professional or personal commitments.",
      },
      {
        title: "Hands-On Projects",
        description:
          "Gain practical exposure through industry-driven projects and real-world application-focused learning.",
      },
      {
        title: "Modern Technology Skills",
        description:
          "Explore data analytics, digital marketing, finance, operations and strategy through the curriculum and electives.",
      },
      {
        title: "Career Support",
        description:
          "Access placement assistance, resume building, and mock interview support through the Inxyme career ecosystem.",
      },
      {
        title: "Industry Certification",
        description: `The ${programName} certification is recognised by industry partners. Verify current accreditation details before enrolling.`,
      },
    ];
  const overview: { label: string; value: string }[] = content.overview || [
    { label: "Course", value: programName },
    { label: "Provider", value: universityName },
    { label: "Duration", value: "3–6 Months" },
    { label: "Mode", value: "100% Online (Live + Recorded)" },
    {
      label: "Eligibility",
      value: "10+2 or Graduate — Anyone can apply",
    },
    { label: "Course Fee", value: content.feeAmount || "Contact Us" },
    { label: "Placement Assistance", value: "Yes — Resume & Mock Interviews" },
  ];
  const specialisations: { title: string; description: string }[] =
    content.specialisations || [
      {
        title: "SAP",
        description:
          "Master SAP modules including SAP S/4HANA, SAP FICO, SAP MM, and more with hands-on project work.",
      },
      {
        title: "Data Science",
        description:
          "Learn Python, Machine Learning, Data Visualization, and real-world data analysis pipelines.",
      },
      {
        title: "AI & Machine Learning",
        description:
          "Explore deep learning, NLP, computer vision, and production-grade AI model deployment.",
      },
      {
        title: "Digital Marketing",
        description:
          "Build skills in SEO, SEM, social media marketing, email campaigns, and analytics.",
      },
      {
        title: "Cloud Computing",
        description:
          "Get hands-on with AWS, Azure, and GCP — covering cloud architecture, DevOps, and security.",
      },
      {
        title: "Business Analytics",
        description:
          "Learn Power BI, Tableau, SQL, and Excel for data-driven business decision-making.",
      },
    ];
  const curriculum: { title: string; description: string }[] =
    content.curriculum || [
      {
        title: "Module 1 — Fundamentals",
        description:
          "Core concepts, tools setup, and foundational theory with guided exercises.",
      },
      {
        title: "Module 2 — Core Skills",
        description:
          "Hands-on skill building through industry datasets, case studies, and live projects.",
      },
      {
        title: "Module 3 — Advanced Topics",
        description:
          "Advanced techniques, integrations, and real-world application scenarios.",
      },
      {
        title: "Module 4 — Capstone & Certification",
        description:
          "Capstone project, assessment, and certification awarded upon successful completion.",
      },
    ];
  const feeAmount = content.feeAmount || "Contact Us for Pricing";
  const feeDescription =
    content.feeDescription ||
    "Flexible payment options available including EMI. Contact our course advisor for the latest fee and batch pricing.";
  const eligibility: { title: string; description: string }[] =
    content.eligibility || [
      {
        title: "10+2 or Graduate",
        description:
          "Anyone with a 10+2 or bachelor's degree can enrol. No prior experience required for most courses.",
      },
      {
        title: "Working Professionals",
        description:
          "Ideal for professionals looking to upskill, switch careers, or earn an industry-recognised certification.",
      },
      {
        title: "Students & Freshers",
        description:
          "Final-year students and freshers can join to build job-ready skills before entering the workforce.",
      },
    ];
  const career: { title: string; description: string }[] = content.career || [
    {
      title: "SAP Consultant",
      description: "High-demand ERP implementation and consulting roles.",
    },
    {
      title: "Data Analyst",
      description: "Data interpretation and business intelligence roles.",
    },
    {
      title: "AI/ML Engineer",
      description: "Machine learning model development and deployment roles.",
    },
    {
      title: "Cloud Architect",
      description: "Cloud infrastructure design and DevOps leadership roles.",
    },
    { title: "Digital Marketer", description: "SEO, SEM, and growth marketing roles." },
    {
      title: "Business Analyst",
      description: "Data-driven decision-making and strategy roles.",
    },
  ];
  const admissionSteps: {
    number: string;
    title: string;
    description: string;
  }[] = content.admissionSteps || [
    {
      number: "01",
      title: "Choose Your Course",
      description: "Browse Inxyme's catalog and pick the certification course that matches your career goals.",
    },
    {
      number: "02",
      title: "Register & Enroll",
      description: "Fill out the enrollment form online in minutes — no entrance exam required.",
    },
    {
      number: "03",
      title: "Pay Course Fee",
      description:
        "Pay securely online with EMI options available. Flexible pricing plans to suit every learner.",
    },
    {
      number: "04",
      title: "Start Learning",
      description:
        "Get instant access to live sessions, recorded lectures, projects, and your personal course dashboard.",
    },
  ];
  const faqs: { question: string; answer: string }[] = content.faqs || [
    {
      question: `What is the ${programName} course?`,
      answer: `It is a job-ready certification course offered by ${universityName} through Inxyme's e-learning platform, covering industry-relevant tools and real-world projects.`,
    },
    {
      question: "How long is the course?",
      answer: "Most certification courses range from 3 to 6 months with flexible scheduling options.",
    },
    {
      question: "What is the course fee?",
      answer: `The course fee is ${feeAmount}. EMI options are available. Contact our advisor for the latest pricing.`,
    },
    {
      question: "Who can enroll?",
      answer:
        "Anyone with a 10+2 or bachelor's degree can enroll. No prior experience is needed for most courses.",
    },
    {
      question: "Are the sessions live or recorded?",
      answer:
        "Both! You get live instructor-led sessions plus recorded video lectures you can access anytime.",
    },
    {
      question: "Will I get a certificate after completion?",
      answer:
        "Yes, you will receive an industry-recognised certification upon successfully completing the course and capstone project.",
    },
  ];
  const ctaTitle =
    content.ctaTitle || `Ready to Start Your ${programName} Journey?`;
  const ctaText =
    content.ctaText ||
    "Get expert guidance on course curriculum, fees, certifications, and career opportunities. Enroll today.";
  const footerDisclaimer =
    content.footerDisclaimer ||
    "Inxyme is an independent e-learning platform offering job-ready certification courses in SAP, Data Science, AI/ML, Digital Marketing, Cloud Computing, and more. This page is created for informational purposes and guidance on the listed course. Inxyme does not guarantee employment, salary, or placement outcomes.";

  return (
    <div className="font-sans text-[#17233d]">
      <header className="sticky top-0 z-50 bg-white border-b border-[#e3e8f0]">
        <div className="w-[min(1180px,92%)] mx-auto h-[68px] flex items-center justify-between">
          <Link href="/">
            <img
              src="/images/Inxyme%20png%20logo.png"
              alt="Inxyme"
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </Link>
          <nav className="hidden md:flex gap-6 text-sm font-semibold items-center">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-[#f7a51c]"
              >
                {link.label}
              </a>
            ))}
            <a
              className="bg-[#20c96b] text-white px-4 py-2 rounded-full text-sm font-semibold"
              href="#counselling"
            >
              Talk to Expert
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="bg-[#102d63] text-white py-12 md:py-16">
          <div className="w-[min(1180px,92%)] mx-auto grid md:grid-cols-[1.2fr_0.85fr] gap-10 items-center">
            <div>
              <span className="inline-block bg-[#f7a51c] text-[#111] px-4 py-2 rounded-full text-sm font-extrabold">
                {badge}
              </span>
              <h1 className="text-3xl md:text-[43px] leading-tight font-bold my-4">
                {heroTitle}
              </h1>
              <p className="text-base md:text-lg text-[#edf2ff]">
                {heroSubtitle}
              </p>
              <div className="grid sm:grid-cols-2 gap-3 my-6">
                {heroFacts.map((fact, i) => (
                  <div key={i} className="text-sm md:text-base">
                    <span className="text-[#f7a51c]">&#9679;</span> {fact}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  className="inline-block bg-[#f7a51c] text-[#111] px-5 py-3 rounded-full font-extrabold text-sm"
                  href="#counselling"
                >
                  Get Free Course Counselling
                </a>
                <a
                  className="inline-block border-2 border-white text-white px-5 py-3 rounded-full font-extrabold text-sm"
                  href="#overview"
                >
                  Explore Curriculum
                </a>
              </div>
            </div>

            <div
              id="counselling"
              className="bg-white text-[#17233d] p-6 rounded-2xl shadow-lg"
            >
              <h2 className="text-center text-2xl font-bold mb-1">
                Get Free Course Counselling
              </h2>
              <p className="text-center text-[#667085] text-sm mb-4">
                Get expert guidance on curriculum, fees, certifications & career outcomes.
              </p>

              {status === "success" ? (
                <div className="text-center py-6 text-green-600 font-semibold">
                  Thank you! Our course advisor will reach out to you shortly.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input
                      name="name"
                      placeholder="Full Name*"
                      required
                      className="w-full p-3 border border-[#ccd4e0] rounded-lg"
                    />
                    <input
                      name="phone"
                      placeholder="Mobile Number*"
                      required
                      className="w-full p-3 border border-[#ccd4e0] rounded-lg"
                    />
                  </div>
                  <input
                    name="email"
                    type="email"
                    placeholder="Email Address*"
                    required
                    className="w-full p-3 border border-[#ccd4e0] rounded-lg"
                  />
                  <div className="grid sm:grid-cols-2 gap-3">
                    <select
                      name="state"
                      required
                      className="w-full p-3 border border-[#ccd4e0] rounded-lg bg-white"
                    >
                      <option value="">Select State*</option>
                      {[
                        "Delhi",
                        "Maharashtra",
                        "Karnataka",
                        "Uttar Pradesh",
                        "Rajasthan",
                        "Gujarat",
                        "Other",
                      ].map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <select
                      name="qualification"
                      required
                      className="w-full p-3 border border-[#ccd4e0] rounded-lg bg-white"
                    >
                      <option value="">Highest Qualification*</option>
                      {[
                        "BBA",
                        "BTech / BE",
                        "BSc / Science",
                        "BCom / Commerce",
                        "BA / Arts",
                        "Other Bachelor's Degree",
                      ].map((q) => (
                        <option key={q} value={q}>
                          {q}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full bg-[#f7a51c] text-[#111] py-3 rounded-full font-extrabold disabled:opacity-70"
                  >
                    {status === "submitting"
                      ? "Submitting..."
                      : "Get Free Counselling"}
                  </button>
                  {status === "error" && (
                    <p className="text-red-600 text-sm text-center">
                      {errorMsg}
                    </p>
                  )}
                  <p className="text-xs text-[#687386] text-center">
                    By submitting this form, you agree to be contacted by
                    Inxyme regarding course enrollment, curriculum details, and
                    career support.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>

        <section id="overview" className="py-16">
          <div className="w-[min(1180px,92%)] mx-auto">
            <h2 className="text-center text-[33px] font-bold mb-2">
              Why Choose {universityName} {programName}?
            </h2>
            <p className="text-center text-[#667085] max-w-3xl mx-auto mb-8">
              Explore a flexible, industry-oriented online MBA focused on
              management, leadership and modern technology skills.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {whyChoose.map((item, i) => (
                <div
                  key={i}
                  className="bg-white p-5 rounded-xl border border-[#e3e8f0] shadow-sm"
                >
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-[#667085] text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#f5f7fb]">
          <div className="w-[min(1180px,92%)] mx-auto">
            <h2 className="text-center text-[33px] font-bold mb-2">
              {universityName} {programName} – Quick Overview
            </h2>
            <p className="text-center text-[#667085] max-w-3xl mx-auto mb-8">
              A quick look at the current program details.
            </p>
            <div className="overflow-x-auto rounded-xl border border-[#e3e8f0] bg-white">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#102d63] text-white text-left">
                    <th className="p-4 font-semibold">Particular</th>
                    <th className="p-4 font-semibold">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {overview.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-[#e3e8f0] last:border-0"
                    >
                      <td className="p-4 font-medium">{row.label}</td>
                      <td className="p-4">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-[#667085] mt-3 text-center">
              *Verify the latest fee, eligibility and career-support terms with
              the university before enrolment.
            </p>
          </div>
        </section>

        <section id="specialisations" className="py-16">
          <div className="w-[min(1180px,92%)] mx-auto">
            <h2 className="text-center text-[33px] font-bold mb-2">
              MBA Specialisations
            </h2>
            <p className="text-center text-[#667085] max-w-3xl mx-auto mb-8">
              Explore currently listed specialisation pathways. Exact
              availability may vary by intake.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {specialisations.map((item, i) => (
                <div
                  key={i}
                  className="bg-white p-5 rounded-xl border border-[#e3e8f0] shadow-sm"
                >
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-[#667085] text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-xs text-[#667085] mt-6 text-center">
              Verify exact current specialisation names, fees and intake
              availability against the official university page before
              publishing.
            </p>
          </div>
        </section>

        <section id="curriculum" className="py-16 bg-[#f5f7fb]">
          <div className="w-[min(1180px,92%)] mx-auto">
            <h2 className="text-center text-[33px] font-bold mb-2">
              MBA Curriculum
            </h2>
            <p className="text-center text-[#667085] max-w-3xl mx-auto mb-8">
              Use the latest official semester-wise curriculum on the live page.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {curriculum.map((item, i) => (
                <div
                  key={i}
                  className="bg-white p-5 rounded-xl border border-[#e3e8f0] shadow-sm"
                >
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-[#667085] text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-xs text-[#667085] mt-6 text-center">
              Expand this section with the exact current official Semester 4
              curriculum before publishing.
            </p>
          </div>
        </section>

        <section id="fees" className="py-16">
          <div className="w-[min(1180px,92%)] mx-auto">
            <h2 className="text-center text-[33px] font-bold mb-2">
              {universityName} {programName} Fees
            </h2>
            <p className="text-center text-[#667085] max-w-3xl mx-auto mb-8">
              The currently listed standard MBA program fee is shown for
              guidance.
            </p>
            <div className="max-w-3xl mx-auto text-center bg-white p-8 rounded-2xl border border-[#e3e8f0] shadow-sm">
              <h3 className="text-3xl font-bold mb-3">{feeAmount}</h3>
              <p className="text-[#667085] mb-5">{feeDescription}</p>
              <a
                className="inline-block bg-[#f7a51c] text-[#111] px-5 py-3 rounded-full font-extrabold text-sm"
                href="#counselling"
              >
                Check Latest Fee
              </a>
            </div>
            <p className="text-xs text-[#667085] mt-5 text-center">
              *Fees and applicable offers can change. Verify the latest fee
              directly with the university before payment.
            </p>
          </div>
        </section>

        <section className="py-16 bg-[#f5f7fb]">
          <div className="w-[min(1180px,92%)] mx-auto">
            <h2 className="text-center text-[33px] font-bold mb-2">
              MBA Eligibility
            </h2>
            <p className="text-center text-[#667085] max-w-3xl mx-auto mb-8">
              Eligibility depends on the candidate's academic background and
              current university rules.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {eligibility.map((item, i) => (
                <div
                  key={i}
                  className="bg-white p-5 rounded-xl border border-[#e3e8f0] shadow-sm"
                >
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-[#667085] text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-xs text-[#667085] mt-6 text-center">
              Eligibility is subject to the latest university admission rules.
              Counselling does not guarantee admission.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="w-[min(1180px,92%)] mx-auto">
            <h2 className="text-center text-[33px] font-bold mb-2">
              Potential Career Roles After MBA
            </h2>
            <p className="text-center text-[#667085] max-w-3xl mx-auto mb-8">
              Career outcomes depend on skills, experience, employer
              requirements and individual performance.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {career.map((item, i) => (
                <div
                  key={i}
                  className="bg-white p-5 rounded-xl border border-[#e3e8f0] shadow-sm"
                >
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-[#667085] text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#f5f7fb]">
          <div className="w-[min(1180px,92%)] mx-auto">
            <h2 className="text-center text-[33px] font-bold mb-2">
              Admission Process
            </h2>
            <p className="text-center text-[#667085] max-w-3xl mx-auto mb-8">
              Typical steps should be verified against the current university
              admission process.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {admissionSteps.map((item, i) => (
                <div
                  key={i}
                  className="bg-white p-5 rounded-xl border border-[#e3e8f0] shadow-sm text-center"
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#102d63] text-white flex items-center justify-center font-extrabold">
                    {item.number}
                  </div>
                  <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                  <p className="text-[#667085] text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="py-16">
          <div className="w-[min(1180px,92%)] mx-auto">
            <h2 className="text-center text-[33px] font-bold mb-8">
              Frequently Asked Questions
            </h2>
            <div className="max-w-3xl mx-auto space-y-3">
              {faqs.map((item, i) => (
                <details
                  key={i}
                  className="group bg-white rounded-xl border border-[#e3e8f0] p-4"
                >
                  <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                    {item.question}
                    <span className="text-[#f7a51c] font-bold group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-[#667085] text-sm leading-relaxed">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#102d63] text-white text-center">
          <div className="w-[min(1180px,92%)] mx-auto">
            <h2 className="text-[33px] font-bold mb-3">{ctaTitle}</h2>
            <p className="text-[#edf2ff] mb-6">{ctaText}</p>
            <a
              className="inline-block bg-[#f7a51c] text-[#111] px-6 py-3 rounded-full font-extrabold text-sm"
              href="#counselling"
            >
              Get Free MBA Counselling
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-[#f5f7fb] py-10 border-t border-[#e3e8f0]">
        <div className="w-[min(1180px,92%)] mx-auto space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-[#e2e8f0]">
            <Link href="/">
              <img
                src="/images/Inxyme%20png%20logo.png"
                alt="Inxyme"
                className="h-9 w-auto object-contain"
              />
            </Link>
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#475467]">
              <Link href="/about-us" className="hover:text-[#0066ff]">About Us</Link>
              <span>•</span>
              <Link href="/privacy-policy" className="hover:text-[#0066ff]">Privacy Policy</Link>
              <span>•</span>
              <Link href="/terms-conditions" className="hover:text-[#0066ff]">Terms &amp; Conditions</Link>
              <span>•</span>
              <Link href="/disclaimer" className="hover:text-[#0066ff]">Disclaimer</Link>
              <span>•</span>
              <Link href="/contact-us" className="hover:text-[#0066ff]">Contact Us</Link>
            </div>
          </div>
          <div className="text-xs text-[#667085] leading-relaxed">
            <strong>Disclaimer:</strong> {footerDisclaimer}
          </div>
          <div className="text-xs text-[#667085]">
            Corporate Office: B-127, B Block, Sector 2, Noida, Uttar Pradesh 201301 | Phone: +91 9990999561 | Email: info@inxyme.com
          </div>
          <p className="text-center text-xs text-[#667085]">
            &copy; 2026 Inxyme. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
