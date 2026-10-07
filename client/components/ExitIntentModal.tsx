"use client";

import { useState, useEffect, FormEvent } from "react";
import {
  FaTimes,
  FaGift,
  FaWhatsapp,
  FaArrowRight,
  FaBolt,
  FaShieldAlt,
  FaLock,
} from "react-icons/fa";
import { useExitIntent } from "../hooks/useExitIntent";
import { usePartialLead } from "../hooks/usePartialLead";
import { posthogCapture } from "../utils/posthog";
import { useMagicPrefill } from "../hooks/useMagicPrefill";

interface ExitIntentModalProps {
  onPayNow?: (userData: {
    name: string;
    phone: string;
    email: string;
    courseInterest: string;
  }) => void;
}

export default function ExitIntentModal({ onPayNow }: ExitIntentModalProps) {
  const { isOpen, closeModal } = useExitIntent({ minDelay: 4000 });
  const { prefillData } = useMagicPrefill();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    courseInterest: "SAP FICO (Financials)",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (prefillData) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || prefillData.name || "",
        phone: prev.phone || prefillData.phone || "",
        email: prev.email || prefillData.email || "",
        courseInterest:
          prev.courseInterest ||
          prefillData.courseTitle ||
          "SAP FICO (Financials)",
      }));
    }
  }, [prefillData]);

  // Track in PostHog when shown
  useEffect(() => {
    if (isOpen) {
      posthogCapture("exit_intent_modal_shown", {
        source: "sap-webinar",
      });
    }
  }, [isOpen]);

  // Partial lead capture onBlur: captures lead even if user exits before clicking submit!
  const { handlePartialLeadBlur, markConverted } = usePartialLead({
    source: "exit_intent_popup",
    getFormData: () => ({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      courseTitle: formData.courseInterest,
    }),
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    markConverted();
    closeModal();

    if (onPayNow) {
      onPayNow(formData);
    }
  };

  const handleWhatsAppHelp = () => {
    const text = encodeURIComponent(
      `Hi Inxyme, I was looking at the SAP Webinar registration (${formData.name ? `Name: ${formData.name}, ` : ""}${formData.courseInterest}). Please send me full webinar details!`
    );
    window.open(`https://wa.me/919990999561?text=${text}`, "_blank");
    markConverted();
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div className="relative w-full max-w-lg bg-gradient-to-b from-[#0f1f3d] via-[#09152b] to-[#040914] border border-amber-400/50 rounded-2xl shadow-2xl p-5 sm:p-7 my-auto text-left overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer text-sm z-10"
          aria-label="Close modal"
        >
          <FaTimes />
        </button>

        {/* Header Alert */}
        <div className="space-y-2 pr-8 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-red-500/20 text-red-400 border border-red-500/30">
              <FaBolt className="text-red-400 text-[10px] animate-bounce" /> WAIT! BEFORE YOU LEAVE
            </span>
            <span className="text-[10px] font-bold text-amber-300">
              ⚡ Only 18 ₹9 Slots Left
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
            Claim Your ₹9 Masterclass Seat &amp; ₹5,997 Bonus Kit!
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Don&apos;t miss this weekend&apos;s live roadmap session. Get SAP T-Code cheat sheets, 150+ MNC interview Q&amp;A, and salary guides instantly.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3 relative z-10">
          <div>
            <label className="block text-[11px] font-bold text-slate-300 mb-0.5">
              Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Rahul Sharma"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              onBlur={handlePartialLeadBlur}
              className="w-full bg-[#060c18] border border-white/20 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-0.5">
                WhatsApp Number *
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-2.5 rounded-l-lg border border-r-0 border-white/20 bg-[#060c18] text-slate-400 text-xs font-bold">
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
                  onBlur={handlePartialLeadBlur}
                  className="w-full bg-[#060c18] border border-white/20 rounded-r-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-0.5">
                Email Address
              </label>
              <input
                type="email"
                placeholder="rahul@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                onBlur={handlePartialLeadBlur}
                className="w-full bg-[#060c18] border border-white/20 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-300 mb-0.5">
              Module Interest
            </label>
            <select
              value={formData.courseInterest}
              onChange={(e) =>
                setFormData({ ...formData, courseInterest: e.target.value })
              }
              onBlur={handlePartialLeadBlur}
              className="w-full bg-[#060c18] border border-white/20 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
            >
              <option value="SAP FICO (Financials)">SAP FICO (Finance & Controlling)</option>
              <option value="SAP ABAP (Programming)">SAP ABAP on S/4HANA (Coding)</option>
              <option value="SAP MM (Procurement)">SAP MM (Materials Management)</option>
              <option value="SAP SD (Sales)">SAP SD (Sales & Distribution)</option>
              <option value="SAP PP (Production)">SAP PP (Production Planning)</option>
              <option value="Not Sure - Need Guidance in Webinar">Not Sure (Help Me Choose)</option>
            </select>
          </div>

          <div className="pt-1 flex flex-col sm:flex-row gap-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs py-3 rounded-lg shadow-lg transition-transform hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Lock My ₹9 Seat Now</span>
              <FaArrowRight className="text-xs" />
            </button>

            <button
              type="button"
              onClick={handleWhatsAppHelp}
              className="bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 font-black text-xs px-4 py-3 rounded-lg transition-transform hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
            >
              <FaWhatsapp className="text-sm" />
              <span>Ask On WhatsApp</span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-3 text-[10px] text-slate-400 pt-1">
            <span className="flex items-center gap-1">
              <FaLock className="text-emerald-400" /> Razorpay Secured
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <FaGift className="text-amber-400" /> ₹5,997 Bonus Included
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <FaShieldAlt className="text-blue-400" /> 100% Risk Free
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
