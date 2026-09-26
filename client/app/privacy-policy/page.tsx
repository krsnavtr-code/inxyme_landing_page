import { Metadata } from "next";
import Link from "next/link";
import PolicyLayout from "../components/policies/PolicyLayout";

export const metadata: Metadata = {
  title: "Privacy Policy | Inxyme - Job-Ready Certification Courses",
  description:
    "Read Inxyme's Privacy Policy. Understand how we collect, use, store, and protect your personal information in compliance with data privacy standards and Google Ads policies.",
};

export default function PrivacyPolicyPage() {
  return (
    <PolicyLayout
      title="Privacy Policy"
      subtitle="How Inxyme collects, protects, and handles your personal information across our websites and learning platforms."
      badge="Data Protection & Privacy"
      lastUpdated="September 2026"
    >
      <div className="space-y-8 text-sm">
        <section className="space-y-3">
          <p className="lead text-base text-slate-700 font-medium">
            This Privacy Policy applies to all services, websites, landing pages, and educational offerings provided by <strong>Inxyme (&quot;Inxyme E-Learning&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;)</strong>. We take personal data privacy and digital transparency very seriously, adhering strictly to applicable data protection laws and advertising guidelines, including Google Ads User Consent policies.
          </p>
          <p>
            By accessing our website, filling out an enquiry form, or enrolling in any course, you agree to the collection and use of information in accordance with this Privacy Policy.
          </p>
        </section>

        {/* 1. Information We Collect */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-slate-900">
            1. Information We Collect
          </h2>
          <p>
            We collect personal information that you voluntarily provide to us when expressing an interest in obtaining information about our programs, participating in activities on our services, or contacting us directly:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Direct Contact &amp; Identity Details:</strong> Full Name, Email Address, Mobile/Phone Number, State or City of residence.
            </li>
            <li>
              <strong>Educational &amp; Professional Background:</strong> Current education level (Graduate/Post-Graduate/Working Professional), years of experience, and preferred course or technology domain.
            </li>
            <li>
              <strong>Enquiry Preferences:</strong> Preferred time slots for counselling calls, specific queries, and mode of training requested (Online / Weekend / Fast-track).
            </li>
            <li>
              <strong>Technical &amp; Usage Information:</strong> When you navigate our pages, automated systems collect IP addresses, browser types, device specifications, operating systems, and page interaction timestamps via cookies and web tags for security and analytics purposes.
            </li>
          </ul>
        </section>

        {/* 2. How We Use Your Information */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-slate-900">
            2. How We Use Your Information
          </h2>
          <p>
            Inxyme uses the collected data strictly for legitimate educational, operational, and customer support purposes:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>To arrange and deliver personalized course counselling and curriculum brochures.</li>
            <li>To process course registration, verify eligibility, and allocate classroom/batch schedules.</li>
            <li>To communicate updates, batch timing revisions, assignment notices, and academic reminders via Call, SMS, WhatsApp, or Email.</li>
            <li>To manage placement assistance, connect you with potential employers, and conduct mock interview sessions upon course completion.</li>
            <li>To analyze web traffic, evaluate landing page performance, and enhance our user experience.</li>
          </ul>
        </section>

        {/* 3. Consent, Google Ads & Third-Party Cookies */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-slate-900">
            3. Google Ads, Analytics &amp; Cookies Notice
          </h2>
          <p>
            In accordance with <strong>Google Ads Policy</strong> on user consent and digital advertising:
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-2.5 text-xs text-slate-600">
            <p>
              <strong>Conversion Tracking &amp; Remarketing:</strong> We use Google Tag Manager (GTM) and Google Ads Conversion Tracking (e.g. Google Ads tag ID AW-18116334851) to measure the effectiveness of our advertising campaigns and understand student engagement. These third-party services may place cookies or access web identifiers on your device.
            </p>
            <p>
              <strong>No Sale of Personal Data:</strong> Inxyme NEVER sells, rents, or trades your personal information to third-party data brokers, marketers, or unrelated external parties.
            </p>
            <p>
              <strong>Opt-Out Options:</strong> You may at any time adjust your browser settings to reject cookies or use Google&apos;s Ads Settings (<a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">adssettings.google.com</a>) to personalize or turn off interest-based ads.
            </p>
          </div>
        </section>

        {/* 4. Data Security & Retention */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-slate-900">
            4. Data Security &amp; Storage Safeguards
          </h2>
          <p>
            We implement administrative, technical, and physical safeguards designed to protect personal information against unauthorized access, loss, misuse, or alteration. All web transmissions are encrypted via industry-standard Transport Layer Security (TLS/HTTPS).
          </p>
          <p>
            We retain personal data only for as long as necessary to fulfill the educational purposes outlined in this policy or as required by financial, legal, and regulatory retention requirements.
          </p>
        </section>

        {/* 5. User Rights */}
        <section className="space-y-3">
          <h2 className="text-xl font-black text-slate-900">
            5. Your Rights &amp; Opting Out
          </h2>
          <p>
            You have the right to request access to the personal data we hold about you, request corrections to inaccurate records, or request complete removal of your contact details from our active outreach database.
          </p>
          <p>
            To opt out of promotional messages or request data deletion, simply send an email with the subject line <strong>&quot;Data Opt-Out Request&quot;</strong> to <a href="mailto:info@inxyme.com" className="text-blue-600 font-semibold underline">info@inxyme.com</a> or reply &quot;STOP&quot; to any of our official WhatsApp messages.
          </p>
        </section>

        {/* 6. Contact Information & Grievances */}
        <section className="bg-slate-100 rounded-xl p-6 border border-slate-200 space-y-3">
          <h2 className="text-lg font-black text-slate-900">
            6. Privacy Officer &amp; Grievance Redressal
          </h2>
          <p className="text-xs text-slate-600">
            For questions, grievances, or requests concerning this Privacy Policy, please reach out to our designated Privacy Support Team:
          </p>
          <div className="text-xs text-slate-700 space-y-1">
            <p><strong>Entity:</strong> Inxyme E-Learning</p>
            <p><strong>Physical Address:</strong> B-127, B Block, Sector 2, Noida, Uttar Pradesh 201301, India</p>
            <p><strong>Email:</strong> <a href="mailto:info@inxyme.com" className="text-blue-600 underline">info@inxyme.com</a></p>
            <p><strong>Helpline:</strong> +91 9990999561 / +91 9266585858</p>
          </div>
        </section>
      </div>
    </PolicyLayout>
  );
}
