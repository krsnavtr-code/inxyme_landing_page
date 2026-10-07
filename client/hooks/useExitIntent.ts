"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const EXIT_INTENT_STORAGE_KEY = "inxyme_exit_intent_dismissed";
const LEAD_SUBMITTED_KEY = "inxyme_lead_submitted";

interface UseExitIntentOptions {
  /** Minimum delay in milliseconds before exit intent can trigger (default: 4000ms) */
  minDelay?: number;
  /** Storage type to remember dismissal: 'session' | 'local' (default: 'session') */
  storage?: "session" | "local";
}

export function useExitIntent({
  minDelay = 4000,
  storage = "session",
}: UseExitIntentOptions = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const isEnabledRef = useRef(false);
  const hasTriggeredRef = useRef(false);

  const getStorage = useCallback(() => {
    if (typeof window === "undefined") return null;
    return storage === "local" ? window.localStorage : window.sessionStorage;
  }, [storage]);

  const hasBeenDismissed = useCallback(() => {
    const s = getStorage();
    if (!s) return false;
    if (s.getItem(EXIT_INTENT_STORAGE_KEY)) return true;
    if (sessionStorage.getItem(LEAD_SUBMITTED_KEY)) return true;
    return false;
  }, [getStorage]);

  const triggerModal = useCallback(() => {
    if (hasTriggeredRef.current || hasBeenDismissed()) return;
    hasTriggeredRef.current = true;
    setIsOpen(true);
  }, [hasBeenDismissed]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    const s = getStorage();
    if (s) {
      s.setItem(EXIT_INTENT_STORAGE_KEY, Date.now().toString());
    }
  }, [getStorage]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (hasBeenDismissed()) return;

    const delayTimer = setTimeout(() => {
      isEnabledRef.current = true;
    }, minDelay);

    // Desktop: Mouse leaving top edge of viewport
    const handleMouseLeave = (e: MouseEvent) => {
      if (!isEnabledRef.current || hasTriggeredRef.current) return;
      if (e.clientY <= 25) {
        triggerModal();
      }
    };

    // Mobile: Rapid scroll up towards address bar after reading content
    let lastScrollY = window.scrollY;
    let lastScrollTime = Date.now();

    const handleScroll = () => {
      if (!isEnabledRef.current || hasTriggeredRef.current) return;
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      const timeDiff = currentTime - lastScrollTime;
      const scrollDiff = lastScrollY - currentScrollY;

      if (
        timeDiff > 0 &&
        timeDiff < 250 &&
        scrollDiff > 200 &&
        currentScrollY > 400
      ) {
        triggerModal();
      }

      lastScrollY = currentScrollY;
      lastScrollTime = currentTime;
    };

    // Mobile: Inactivity dwell timer (35 seconds)
    const dwellTimer = setTimeout(() => {
      if (
        isEnabledRef.current &&
        !hasTriggeredRef.current &&
        window.innerWidth < 768
      ) {
        triggerModal();
      }
    }, 35000);

    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(delayTimer);
      clearTimeout(dwellTimer);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [minDelay, hasBeenDismissed, triggerModal]);

  return { isOpen, closeModal };
}
