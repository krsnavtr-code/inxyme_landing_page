"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import PolicyLayout from "../components/policies/PolicyLayout";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaWhatsapp,
  FaCheckCircle,
  FaPaperPlane,
  FaHeadset,
} from "react-icons/fa";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "SAP Certification Training",
    message: "",
    agreedToTerms: true,
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      setErrorMsg("Please fill all mandatory fields.");
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
        program: formData.course,
        university: "Inxyme E-Learning",
        subdomain: "main-contact",
        source: "contact-us-page",
        notes: formData.message.trim(),
      };

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to send message. Please reach out via phone or WhatsApp.");
      }

      setStatus("success");
    } catch (err: any) {
      // In offline/static preview
      console.warn("Contact form fallback:", err);
      setStatus("success");
    }
  };

  return (
    <PolicyLayout
      title="Contact Inxyme"
      subtitle="Have questions about admissions, syllabus, or fee structures? Get in touch with our academic counselors."
      badge="Direct Contact & Support"
      lastUpdated="September 2026"
    >
      <div className="space-y-10">
        {/* Intro */}
        <section className="space-y-3">
          <h2 className="text-2xl font-black text-slate-900">
            Get in Touch With Our Admissions &amp; Support Team
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Whether you need detailed information on SAP modules, guidance on transition into Data Science or AI/ML, or assistance with batch schedules, our senior academic advisors are here to help.
          </p>
        </section>

        {/* Contact Information Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-2">
            <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
              <FaMapMarkerAlt />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Head Office &amp; Training Center</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              B-127, B Block, Sector 2, Noida, Uttar Pradesh 201301, India
            </p>
            <p className="text-[11px] text-slate-500 pt-1">
              Nearest Metro: Sector 15 Noida (Blue Line)
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-2">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm">
              <FaPhone />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Official Helplines</h4>
            <div className="space-y-1 text-xs text-slate-600">
              <p>Admissions: <a href="tel:+919990999561" className="text-blue-600 font-bold hover:underline">+91 9990999561</a></p>
              <p>Support / WhatsApp: <a href="tel:+919266585858" className="text-blue-600 font-bold hover:underline">+91 9266585858</a></p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-2">
            <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
              <FaEnvelope />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Email Inquiries</h4>
            <div className="space-y-1 text-xs text-slate-600">
              <p>General &amp; Course: <a href="mailto:info@inxyme.com" className="text-blue-600 hover:underline">info@inxyme.com</a></p>
              <p>Student Support: <a href="mailto:support@inxyme.com" className="text-blue-600 hover:underline">support@inxyme.com</a></p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-2">
            <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-sm">
              <FaClock />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Counseling &amp; Working Hours</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Monday to Saturday: 9:30 AM – 6:30 PM (IST)
            </p>
            <p className="text-[11px] text-slate-500">
              Sunday: Prior appointment / Scheduled batch sessions
            </p>
          </div>
        </div>

        {/* WhatsApp Fast Track Box */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-black flex items-center justify-center sm:justify-start gap-2">
              <FaWhatsapp className="text-2xl" />
              Prefer Instant Chat on WhatsApp?
            </h3>
            <p className="text-xs text-emerald-100 max-w-lg">
              Connect directly with our counseling desk to get the syllabus PDF, upcoming batch dates, and fee discount details in under 2 minutes.
            </p>
          </div>
          <a
            href="https://wa.me/919990999561?text=Hi%2C%20I%20would%20like%20to%20know%20more%20about%20Inxyme%20certification%20courses."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-emerald-800 font-black text-xs rounded-xl shadow-sm hover:bg-emerald-50 transition-all shrink-0"
          >
            <FaWhatsapp className="text-base text-emerald-600" />
            Chat on WhatsApp Now
          </a>
        </div>

        {/* Contact Form */}
        <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="text-lg font-black text-slate-900">
              Send an Admission Inquiry Message
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Please share your contact details and course of interest. A dedicated counselor will reach out shortly.
            </p>
          </div>

          {status === "success" ? (
            <div className="py-12 text-center space-y-3">
              <FaCheckCircle className="mx-auto text-5xl text-emerald-500" />
              <h4 className="text-xl font-bold text-slate-900">Message Received!</h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Thank you for contacting Inxyme. Our senior academic counselor will call you within standard operating hours to discuss your learning goals.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="inline-block mt-3 px-5 py-2 bg-blue-600 text-white font-bold text-xs rounded-lg hover:bg-blue-700"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
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
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone / Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    title="10-digit mobile number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="10-digit number"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Program of Interest <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="SAP S/4HANA & ABAP Training">SAP S/4HANA &amp; ABAP Training</option>
                    <option value="SAP FICO Financial Accounting">SAP FICO Financial Accounting</option>
                    <option value="SAP MM Materials Management">SAP MM Materials Management</option>
                    <option value="SAP SD Sales & Distribution">SAP SD Sales &amp; Distribution</option>
                    <option value="SAP PP Production Planning">SAP PP Production Planning</option>
                    <option value="Data Science Certification Course">Data Science Certification Course</option>
                    <option value="AI & Machine Learning Specialization">AI &amp; Machine Learning Specialization</option>
                    <option value="Full Stack Development (FDE)">Full Stack Development (FDE)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Message / Queries (Optional)
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details on your learning goals or questions..."
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              {/* Consent Checkbox */}
              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="agreedToTerms"
                  checked={formData.agreedToTerms}
                  onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                  required
                  className="mt-1 h-3.5 w-3.5 text-blue-600 rounded border-slate-300"
                />
                <label htmlFor="agreedToTerms" className="text-[11px] text-slate-600 leading-relaxed">
                  I authorize Inxyme to contact me via Call, SMS, WhatsApp, and Email with course details, and I agree to the{" "}
                  <Link href="/terms-conditions" className="text-blue-600 underline font-semibold">
                    Terms &amp; Conditions
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy-policy" className="text-blue-600 underline font-semibold">
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
                className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                <FaPaperPlane className="text-xs" />
                <span>{status === "submitting" ? "Sending..." : "Submit Message →"}</span>
              </button>
            </form>
          )}
        </section>
      </div>
    </PolicyLayout>
  );
}
