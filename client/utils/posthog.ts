"use client";

import posthog from "posthog-js";

let posthogInitialized = false;

/**
 * Initialize PostHog client-side analytics
 * Configured for Next.js App Router with Autocapture & Session Recording
 */
export function initPostHog() {
  if (typeof window === "undefined" || posthogInitialized) return posthog;

  const posthogKey =
    process.env.NEXT_PUBLIC_POSTHOG_KEY ||
    "phc_penni38yDnuUJvvnUpyZrQAKy6gJ82BvqEhXFy45KzRY";
  const posthogHost =
    process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

  if (!posthogKey) {
    posthogInitialized = true;
    return posthog;
  }

  try {
    posthog.init(posthogKey, {
      api_host: posthogHost,
      person_profiles: "identified_only",
      capture_pageview: false,
      capture_pageleave: true,
      autocapture: true, // Captures all button clicks, link clicks, form interactions automatically!
      session_recording: {
        maskAllInputs: false,
        maskInputOptions: {
          password: true,
        },
      },
      loaded: () => {
        if (process.env.NODE_ENV === "development") {
          console.log("🦔 [PostHog] Live connection established!");
        }
      },
    });

    posthogInitialized = true;
  } catch (err) {
    console.warn("⚠️ [PostHog] Initialization error:", err);
  }

  return posthog;
}

/**
 * Capture custom user journey event in PostHog
 */
export function posthogCapture(
  eventName: string,
  properties: Record<string, any> = {}
) {
  if (typeof window === "undefined") return;

  initPostHog();

  try {
    posthog.capture(eventName, {
      timestamp: new Date().toISOString(),
      ...properties,
    });
  } catch (err) {
    console.warn("PostHog capture warning:", err);
  }
}

/**
 * Link visitor UUID & browser fingerprint with student details in PostHog
 */
export function posthogIdentify(
  distinctId: string,
  userProperties: {
    name?: string;
    email?: string;
    phone?: string;
    [key: string]: any;
  } = {}
) {
  if (typeof window === "undefined" || !distinctId) return;

  initPostHog();

  try {
    posthog.identify(distinctId, {
      $name: userProperties.name,
      $email: userProperties.email,
      $phone_number: userProperties.phone,
      ...userProperties,
    });
  } catch (err) {
    console.warn("PostHog identify warning:", err);
  }
}

/**
 * Convenience helper to track Course / Module Views in PostHog
 */
export function posthogTrackCourseView(
  courseTitle: string,
  courseId?: string,
  extraProperties: Record<string, any> = {}
) {
  posthogCapture("course_viewed", {
    courseTitle,
    courseId: courseId || courseTitle,
    ...extraProperties,
  });
}

/**
 * Convenience helper to track Lead submissions in PostHog
 */
export function posthogTrackLead(properties: {
  leadType: "full" | "partial" | "payment_completed";
  courseTitle?: string;
  source?: string;
  name?: string;
  phone?: string;
  email?: string;
  [key: string]: any;
}) {
  posthogCapture("lead_action", {
    ...properties,
  });
}
