"use client";

import { useState, useEffect, useCallback } from "react";
import {
  MagicPrefillData,
  parseMagicLinkParams,
  clearPrefillData,
} from "../utils/magicLink";

export function useMagicPrefill() {
  const [prefillData, setPrefillData] = useState<MagicPrefillData | null>(null);
  const [isMagicLink, setIsMagicLink] = useState(false);
  const [isReturningUser, setIsReturningUser] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const data = parseMagicLinkParams();
    if (data) {
      setPrefillData(data);
      if (data.isMagicLink) setIsMagicLink(true);
      if (data.isReturningUser) setIsReturningUser(true);
    }

    const handleCustomEvent = (e: CustomEvent<any>) => {
      if (e.detail?.isCleared) {
        setPrefillData(null);
        setIsMagicLink(false);
        setIsReturningUser(false);
      } else if (e.detail) {
        setPrefillData(e.detail);
        setIsReturningUser(true);
      }
    };

    window.addEventListener(
      "inxyme:magic-prefill" as any,
      handleCustomEvent as any
    );
    return () => {
      window.removeEventListener(
        "inxyme:magic-prefill" as any,
        handleCustomEvent as any
      );
    };
  }, []);

  const clearPrefill = useCallback(() => {
    clearPrefillData();
    setPrefillData(null);
    setIsMagicLink(false);
    setIsReturningUser(false);
  }, []);

  return {
    prefillData,
    isMagicLink,
    isReturningUser,
    clearPrefill,
  };
}
