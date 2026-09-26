import { Metadata } from "next";
import Link from "next/link";
import PolicyLayout from "../components/policies/PolicyLayout";

export const metadata: Metadata = {
  title: "Terms & Conditions | Inxyme - Job-Ready Certification Courses",
  description:
    "Read the Terms & Conditions of Inxyme. Details on course enrollment, payment terms, refund policy, student conduct, and placement assistance guidelines.",
};

export default function TermsConditionsPage() {
  return (
    <PolicyLayout
      title="Terms & Conditions"
      subtitle="Governing terms, student enrollment guidelines, fee structures, and course usage policies at Inxyme."
      badge="Terms of Service & Enrollment"
      lastUpdated="September 2026"
    >
      <div className="space-y-8 text-sm">
        <section className="space-y-3">
          <p className="lead text-base text-slate-700 font-medium">
            Welcome to <strong>Inxyme (&quot;Inxyme E-Learning&quot;)</strong>. These Terms &amp; Conditions (&quot;Terms&quot;) govern your access to our website, digital platforms, course registrations, training programs, and educational services.
          </p>
          <p>
            By submitting an inquiry, registering for an information session, or enrolling in any course offered by Inxyme, you agree to be bound by these Terms. If you do not accept these Terms in full, you must not use our educational services.
          </p>
        </section>

        {/* 1. Eligibility & Course Enrollment */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-slate-900">
            1. Eligibility &amp; Course Enrollment
          </h2>
          <p>
            Our training programs in SAP, Data Science, AI/ML, and Full-Stack Engineering are open to graduates, undergraduate students in final semesters, and working professionals looking to transition or upskill in enterprise software domains.
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>You agree to provide accurate, current, and complete personal and academic information during registration.</li>
            <li>Inxyme reserves the right to review eligibility, conduct prerequisite assessments where applicable, and confirm or decline admissions.</li>
            <li>Batch timings, trainer allocations, and start dates are scheduled based on student availability and operational feasibility.</li>
          </ul>
        </section>

        {/* 2. Fees, Installments & Payments */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-slate-900">
            2. Program Fees &amp; Payment Guidelines
          </h2>
          <p>
            All applicable course fees, installment options, and promotional discounts are communicated clearly by our academic counselors prior to registration.
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>All fees must be remitted via authorized payment channels (Bank Transfer, UPI, Credit/Debit Cards, or approved EMI financing partners).</li>
            <li>Taxes (such as applicable GST) will be added where applicable by law.</li>
            <li>Failure to clear scheduled installment dues on time may result in temporary suspension of LMS access and live class links until dues are rectified.</li>
          </ul>
        </section>

        {/* 3. Cancellation & Refund Policy */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-slate-900">
            3. Cancellation &amp; Refund Policy (Transparency Standard)
          </h2>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3 text-xs text-slate-600">
            <p className="font-bold text-slate-800 text-sm">
              We maintain a transparent and student-centric cancellation policy:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Pre-Batch Cancellation:</strong> If a student requests cancellation at least 48 hours prior to the official batch start date, a full refund will be processed after deducting a nominal administrative/gateway fee (up to 5%).
              </li>
              <li>
                <strong>Demo / Trial Sessions:</strong> If a course includes introductory demo sessions and the student expresses dissatisfaction within the first 2 class hours, a full refund or free batch transfer may be requested in writing.
              </li>
              <li>
                <strong>Post-Commencement Requests:</strong> Once 20% or more of the course curriculum has been delivered or server/lab credentials have been activated, fees become non-refundable due to trainer commitments and software provisioning. However, students may request a batch pause or transfer to a future scheduled cohort at zero extra cost.
              </li>
              <li>
                <strong>Refund Processing:</strong> Approved refunds are credited back to the original source account within 7 to 10 business days.
              </li>
            </ul>
          </div>
        </section>

        {/* 4. Placement Assistance & Career Support */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-slate-900">
            4. Placement Support &amp; Career Services Policy
          </h2>
          <p>
            Inxyme is committed to supporting our students in securing rewarding careers. In alignment with advertising transparency regulations and truth-in-advertising standards:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Best-Effort Support:</strong> Inxyme provides 100% placement assistance, including resume enhancement, LinkedIn profile optimization, mock technical interviews, and sharing profiles with hiring partners.
            </li>
            <li>
              <strong>No Unconditional Employment Guarantees:</strong> Inxyme does NOT make deceptive claims of &quot;100% unconditional job guarantee&quot;. Hiring decisions, interview selections, salary packages, and job offers rest entirely with the recruiting organizations based on individual candidate merit and performance.
            </li>
            <li>
              <strong>Student Eligibility for Placement:</strong> To qualify for active interview drives, students must maintain a minimum of 80% attendance in live classes and successfully complete mandatory capstone assignments.
            </li>
          </ul>
        </section>

        {/* 5. Intellectual Property Rights */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-slate-900">
            5. Intellectual Property &amp; Course Materials
          </h2>
          <p>
            All course presentations, curriculum documents, recorded lectures, source code examples, and practice assignments provided by Inxyme are protected by copyright and intellectual property laws.
          </p>
          <p>
            Students receive a limited, personal, non-transferable, and non-commercial license to use materials solely for their own education. Distributing, screen-recording, reselling, or sharing course logins with third parties is strictly prohibited and subject to immediate termination.
          </p>
        </section>

        {/* 6. Limitation of Liability */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-slate-900">
            6. Limitation of Liability &amp; Disclaimers
          </h2>
          <p>
            Inxyme provides training services on an &quot;as is&quot; and &quot;as available&quot; basis. Inxyme will not be liable for any indirect, incidental, special, or consequential damages resulting from inability to access third-party enterprise servers, unforeseen electrical/internet outages, or individual career decisions made by the user.
          </p>
        </section>

        {/* 7. Contact for Legal Matters */}
        <section className="bg-slate-100 rounded-xl p-5 border border-slate-200 space-y-2 text-xs">
          <h3 className="font-bold text-slate-900">7. Jurisdiction &amp; Legal Notices</h3>
          <p className="text-slate-600">
            These Terms shall be governed by and construed in accordance with the laws of India, with exclusive jurisdiction situated in the courts of Noida / Gautam Buddha Nagar, Uttar Pradesh.
          </p>
          <p className="text-slate-600">
            For legal inquiries or enrollment disputes, contact: <a href="mailto:info@inxyme.com" className="text-blue-600 font-semibold underline">info@inxyme.com</a> | Corporate Office: B-127, B Block, Sector 2, Noida, Uttar Pradesh 201301.
          </p>
        </section>
      </div>
    </PolicyLayout>
  );
}
