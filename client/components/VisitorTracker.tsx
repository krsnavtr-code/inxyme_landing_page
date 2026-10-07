"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackVisitorPageView } from "../utils/visitorTracker";
import { initPostHog } from "../utils/posthog";

export default function VisitorTracker() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string>("");

  useEffect(() => {
    // 1. Initialize PostHog client
    initPostHog();

    // 2. Track page view with browser fingerprint & visitor UUID
    if (pathname && pathname !== lastTrackedPath.current) {
      lastTrackedPath.current = pathname;
      trackVisitorPageView(pathname, document?.title || "Inxyme SAP Webinar");
    }
  }, [pathname]);

  return null;
}
