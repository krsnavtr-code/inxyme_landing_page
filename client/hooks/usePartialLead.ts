"use client";

import { useCallback, useRef, FocusEvent } from "react";
import { getOrCreateVisitorId } from "../utils/visitorTracker";
import { posthogIdentify, posthogTrackLead } from "../utils/posthog";
import { savePrefillData } from "../utils/magicLink";

function generateFingerprint(source: string): string {
  const rand = Math.random().toString(36).substring(2, 10);
  const ts = Date.now().toString(36);
  return `pl_${source}_${ts}_${rand}`;
}

interface UsePartialLeadOptions {
  source: string;
  getFormData: () => {
    name?: string;
    email?: string;
    phone?: string;
    courseId?: string;
    courseTitle?: string;
    [key: string]: any;
  };
}

export function usePartialLead({ source, getFormData }: UsePartialLeadOptions) {
  const fingerprintRef = useRef<string>(generateFingerprint(source));
  const lastSentRef = useRef<string>("");

  const handlePartialLeadBlur = useCallback(
    (_e?: FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const data = getFormData();
      const { email, phone, name } = data;

      const hasContact =
        (email && email.trim().length > 0) ||
        (phone && phone.trim().length > 0);

      if (!hasContact) return;

      const sig = JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone,
        courseTitle: data.courseTitle,
      });
      if (sig === lastSentRef.current) return;
      lastSentRef.current = sig;

      const visitorId =
        typeof window !== "undefined" ? getOrCreateVisitorId() : "";

      // Store in localStorage for returning user experience
      savePrefillData({
        name: name || undefined,
        email: email || undefined,
        phone: phone || undefined,
        courseTitle: data.courseTitle || undefined,
      });

      // PostHog event
      posthogIdentify(visitorId, {
        name: data.name,
        email: data.email,
        phone: data.phone,
        courseTitle: data.courseTitle,
      });
      posthogTrackLead({
        leadType: "partial",
        courseTitle: data.courseTitle,
        source: `blur_${source}`,
        name: data.name,
        phone: data.phone,
        email: data.email,
      });

      // Send to /api/partial-leads silently
      const payload = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        courseTitle: data.courseTitle || "SAP Webinar",
        source: source || "landing_page",
        pageUrl: typeof window !== "undefined" ? window.location.pathname : "/sap-webinar",
        sessionFingerprint: fingerprintRef.current,
        visitorId,
      };

      fetch("/api/partial-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch((err) => {
        console.warn("Partial lead capture warning:", err);
      });
    },
    [source, getFormData]
  );

  const markConverted = useCallback(() => {
    try {
      sessionStorage.setItem("inxyme_lead_submitted", "true");
      fetch("/api/partial-leads", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionFingerprint: fingerprintRef.current,
          converted: true,
        }),
      }).catch(() => {});
    } catch {}
  }, []);

  return {
    handlePartialLeadBlur,
    markConverted,
    sessionFingerprint: fingerprintRef.current,
  };
}
