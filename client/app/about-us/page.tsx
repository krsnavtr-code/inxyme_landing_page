import { Metadata } from "next";
import Link from "next/link";
import PolicyLayout from "../components/policies/PolicyLayout";
import {
  FaGraduationCap,
  FaAward,
  FaChalkboardTeacher,
  FaUsers,
  FaLaptopCode,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaCheckCircle,
} from "react-icons/fa";

export const metadata: Metadata = {
  title: "About Us | Inxyme - Job-Ready Certification Courses",
  description:
    "Learn about Inxyme, an independent professional learning platform offering job-oriented certification courses in SAP, Data Science, AI/ML, and Software Engineering.",
};

export default function AboutUsPage() {
  return (
    <PolicyLayout
      title="About Inxyme"
      subtitle="Empowering careers through practical, mentor-led professional education & job-ready skill certifications."
      badge="Business Profile & Mission"
      lastUpdated="September 2026"
    >
      <div className="space-y-8">
        {/* Intro */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900">
            Who We Are
          </h2>
          <p>
            <strong>Inxyme (Inxyme E-Learning)</strong> is a premier, independent professional training and certification platform dedicated to bridging the critical gap between academic knowledge and industry-demanded technical proficiencies.
          </p>
          <p>
            Founded by passionate technology professionals and veteran enterprise consultants, Inxyme provides comprehensive, real-world, hands-on training across high-demand enterprise domains including <strong>SAP Technologies (S/4HANA, ABAP, FICO, MM, SD, PP)</strong>, <strong>Data Science</strong>, <strong>Artificial Intelligence &amp; Machine Learning</strong>, and <strong>Full-Stack Software Engineering</strong>.
          </p>
        </section>

        {/* Business Identity & Physical Presence */}
        <section className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FaAward className="text-blue-600" />
            Verified Business Identity &amp; Corporate Location
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            In compliance with transparent business practices and advertising guidelines (including Google Ads Merchant &amp; Service Provider standards), our verified corporate identity and contact channels are detailed below:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5 p-3.5 bg-white rounded-lg border border-slate-200">
              <span className="font-bold text-slate-800 block">Registered Operational Entity:</span>
              <span className="text-slate-600">Inxyme / Inxyme E-Learning</span>
            </div>
            <div className="space-y-1.5 p-3.5 bg-white rounded-lg border border-slate-200">
              <span className="font-bold text-slate-800 block">Nature of Operations:</span>
              <span className="text-slate-600">Vocational E-Learning &amp; Technical Skills Training</span>
            </div>
            <div className="space-y-1.5 p-3.5 bg-white rounded-lg border border-slate-200">
              <span className="font-bold text-slate-800 block">Corporate Office Address:</span>
              <span className="text-slate-600">
                B-127, B Block, Sector 2, Noida, Uttar Pradesh 201301, India
              </span>
            </div>
            <div className="space-y-1.5 p-3.5 bg-white rounded-lg border border-slate-200">
              <span className="font-bold text-slate-800 block">Official Contact Lines:</span>
              <span className="text-slate-600 block">+91 9990999561</span>
              <span className="text-slate-600 block">info@inxyme.com | support@inxyme.com</span>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900">
            Our Mission &amp; Educational Vision
          </h2>
          <p>
            At Inxyme, our mission is to democratize high-end technical training and make career transformation attainable for students, recent graduates, and experienced working professionals looking to upskill.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/50 space-y-2">
              <h4 className="font-bold text-blue-900 text-sm flex items-center gap-2">
                <FaChalkboardTeacher className="text-blue-600" />
                Industry-Practicing Trainers
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Courses are conducted by certified corporate trainers and domain experts with 8+ years of enterprise experience in live implementations.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/50 space-y-2">
              <h4 className="font-bold text-emerald-900 text-sm flex items-center gap-2">
                <FaLaptopCode className="text-emerald-600" />
                Live Practical Labs &amp; Projects
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Over 70% of learning hours are dedicated to hands-on configuration, system access, and end-to-end capstone client scenarios.
              </p>
            </div>
          </div>
        </section>

        {/* Programs We Offer */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900">
            Our Core Certification Programs
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-2.5">
              <FaCheckCircle className="text-blue-600 mt-1 shrink-0" />
              <div>
                <strong>SAP Technical &amp; Functional Modules:</strong> In-depth training on SAP S/4HANA, SAP ABAP on HANA, SAP FICO (Financial Accounting &amp; Controlling), SAP MM (Materials Management), SAP SD (Sales &amp; Distribution), and SAP PP (Production Planning).
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <FaCheckCircle className="text-blue-600 mt-1 shrink-0" />
              <div>
                <strong>Data Science &amp; Business Analytics:</strong> Comprehensive curriculum covering Python, Pandas, NumPy, statistical modeling, data visualization with Power BI, and machine learning fundamentals.
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <FaCheckCircle className="text-blue-600 mt-1 shrink-0" />
              <div>
                <strong>Artificial Intelligence &amp; Deep Learning:</strong> Advanced neural networks, Natural Language Processing (NLP), Large Language Model integration, and production deployment architectures.
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <FaCheckCircle className="text-blue-600 mt-1 shrink-0" />
              <div>
                <strong>Full-Stack Software Development (FDE):</strong> Modern web applications with React, Next.js, Node.js, relational and NoSQL databases, RESTful microservices, and CI/CD pipelines.
              </div>
            </li>
          </ul>
        </section>

        {/* Educational Disclaimer & Non-Affiliation */}
        <section className="p-5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 space-y-2 leading-relaxed">
          <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
            Affiliation &amp; Trademark Clarification
          </h4>
          <p>
            Inxyme is an independent education and corporate skills development institute. <strong>SAP</strong>, <strong>SAP S/4HANA</strong>, <strong>ABAP</strong>, <strong>FICO</strong>, <strong>MM</strong>, <strong>SD</strong>, and other referenced software modules are registered trademarks of SAP SE in Germany and other countries. Inxyme is neither affiliated with, endorsed by, nor an official reseller of SAP SE. Our training programs are custom-curated, independent vocational courses aimed at preparing candidates for enterprise roles.
          </p>
          <p>
            Similarly, references to Python, TensorFlow, React, or cloud platforms belong to their respective trademark holders.
          </p>
        </section>

        {/* Get in Touch CTA */}
        <section className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-slate-900">Have questions about our courses or batches?</h4>
            <p className="text-xs text-slate-500">Our academic counselors are available Mon–Sat (9:30 AM to 6:30 PM).</p>
          </div>
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
          >
            Contact Inxyme Today →
          </Link>
        </section>
      </div>
    </PolicyLayout>
  );
}
