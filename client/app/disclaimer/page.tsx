import { Metadata } from "next";
import Link from "next/link";
import PolicyLayout from "../components/policies/PolicyLayout";
import {
  FaExclamationTriangle,
  FaShieldAlt,
  FaFileInvoiceDollar,
  FaTrademark,
  FaInfoCircle,
} from "react-icons/fa";

export const metadata: Metadata = {
  title: "Disclaimer & Trademark Notices | Inxyme",
  description:
    "Statutory disclaimer, trademark notices, and non-affiliation disclosures for Inxyme e-learning programs including SAP, Data Science, and AI/ML courses.",
};

export default function DisclaimerPage() {
  return (
    <PolicyLayout
      title="Statutory Disclaimer & Trademark Notice"
      subtitle="Important legal notices, non-affiliation disclosures, and educational guidelines governing Inxyme."
      badge="Transparency & Disclaimers"
      lastUpdated="September 2026"
    >
      <div className="space-y-8 text-sm">
        {/* Intro Highlight Box */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 space-y-3 text-amber-950">
          <div className="flex items-center gap-2 font-bold text-base text-amber-900">
            <FaExclamationTriangle className="text-amber-600 text-lg" />
            <span>Essential Notice to All Visitors &amp; Prospective Learners</span>
          </div>
          <p className="text-xs leading-relaxed text-amber-900">
            Please read this disclaimer carefully before browsing our websites, enrolling in training modules, or making decisions based on the content displayed across Inxyme web pages and landing pages.
          </p>
        </div>

        {/* 1. Independent Training Platform Disclosure */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <FaInfoCircle className="text-blue-600" />
            1. Independent Training Provider Status
          </h2>
          <p>
            <strong>Inxyme (Inxyme E-Learning)</strong> is an independent vocational and technical e-learning platform headquartered at <strong>B-127, B Block, Sector 2, Noida, Uttar Pradesh 201301, India</strong>.
          </p>
          <p>
            The courses offered by Inxyme are privately developed, industry-oriented professional skill training and certification programs. We do NOT grant university academic degrees (such as B.Tech, M.Tech, or MBA degrees). Our certifications reflect completion of practical, job-oriented curriculum modules evaluated by our instructors.
          </p>
        </section>

        {/* 2. SAP Trademark & Non-Affiliation Notice */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <FaTrademark className="text-indigo-600" />
            2. SAP® Trademark &amp; Non-Affiliation Disclosure
          </h2>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3 text-xs text-slate-700 leading-relaxed">
            <p>
              <strong>SAP</strong>, <strong>SAP S/4HANA</strong>, <strong>ABAP</strong>, <strong>FICO</strong>, <strong>MM</strong>, <strong>SD</strong>, <strong>PP</strong>, <strong>HANA</strong>, and other SAP products and services mentioned herein, as well as their respective logos, are registered trademarks or trademarks of <strong>SAP SE</strong> (or an SAP affiliate company) in Germany and several other countries.
            </p>
            <p>
              <strong>Non-Affiliation:</strong> Inxyme is NOT affiliated with, sponsored by, authorized by, or in any way officially associated with SAP SE or any of its subsidiaries. Inxyme does not represent itself as an official SAP Education Partner or SAP Authorized Training Centre unless expressly stated with valid partner credentials.
            </p>
            <p>
              All training programs referencing SAP modules are independently developed educational tutorials conducted by experienced industry practitioners to help candidates gain conceptual understanding and practical hands-on experience.
            </p>
          </div>
        </section>

        {/* 3. Other Third-Party Trademarks */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-slate-900">
            3. Other Third-Party Trademarks &amp; Technologies
          </h2>
          <p>
            All other product names, logos, brands, and registered trademarks featured or referred to within our website and landing pages belong to their respective holders:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
            <li><strong>Python:</strong> Python is a registered trademark of the Python Software Foundation.</li>
            <li><strong>TensorFlow &amp; Google Cloud:</strong> Trademarks of Google LLC.</li>
            <li><strong>React &amp; Meta:</strong> Trademarks of Meta Platforms, Inc.</li>
            <li><strong>AWS (Amazon Web Services):</strong> Trademark of Amazon.com, Inc.</li>
            <li><strong>Power BI &amp; Azure:</strong> Trademarks of Microsoft Corporation.</li>
          </ul>
          <p className="text-xs text-slate-500">
            Reference to any specific commercial technology, process, or service does not constitute an endorsement, recommendation, or affiliation by the trademark holder.
          </p>
        </section>

        {/* 4. Earnings, Salaries & Placement Outcomes */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <FaFileInvoiceDollar className="text-emerald-600" />
            4. Indicative Salary Ranges &amp; Career Outcomes
          </h2>
          <p>
            Any salary figures, compensation brackets (e.g. ₹4–18 LPA), hiring partner lists, or career growth stats presented on our website or marketing collateral represent indicative market data derived from publicly available hiring surveys and recruitment benchmarks.
          </p>
          <p>
            <strong>No Guarantee of Specific Outcomes:</strong> Inxyme does NOT guarantee any specific salary level, career advancement, or employment outcome. Career progression depends wholly on a candidate&apos;s educational aptitude, portfolio quality, interview performance, and prevailing market dynamics.
          </p>
        </section>

        {/* 5. Content Accuracy & Information Changes */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-slate-900">
            5. Content Accuracy &amp; Timelines
          </h2>
          <p>
            While every reasonable effort is made to maintain accurate and updated information regarding course fees, batch dates, curriculum topics, and syllabus modules, Inxyme reserves the right to make modifications to schedules, trainers, and course structures as required for academic excellence.
          </p>
        </section>

        {/* Contact info box */}
        <section className="bg-slate-100 rounded-xl p-5 border border-slate-200 text-xs space-y-2 text-slate-700">
          <h3 className="font-bold text-slate-900">Questions or Clarifications?</h3>
          <p>
            If you have questions regarding our trademark policies, terms, or disclosures, please contact:
          </p>
          <p>
            <strong>Inxyme Compliance Team:</strong> <a href="mailto:info@inxyme.com" className="text-blue-600 underline">info@inxyme.com</a> | Helpline: +91 9990999561 | B-127, B Block, Sector 2, Noida, Uttar Pradesh 201301.
          </p>
        </section>
      </div>
    </PolicyLayout>
  );
}
