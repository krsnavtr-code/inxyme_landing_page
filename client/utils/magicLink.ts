"use client";

export interface MagicPrefillData {
  uid?: string;
  name?: string;
  phone?: string;
  email?: string;
  courseTitle?: string;
  courseId?: string;
  isMagicLink?: boolean;
  isReturningUser?: boolean;
  source?: string;
}

const STORAGE_KEY = "inxyme_magic_user";

/**
 * Save user prefill data in localStorage for returning user experience
 */
export const savePrefillData = (data: Partial<MagicPrefillData>): void => {
  if (typeof window === "undefined") return;
  try {
    const existing = getStoredPrefillData();
    const merged: MagicPrefillData = {
      ...existing,
      ...(data.name && { name: data.name.trim() }),
      ...(data.phone && { phone: data.phone.trim() }),
      ...(data.email && { email: data.email.trim().toLowerCase() }),
      ...(data.uid && { uid: data.uid }),
      ...(data.courseTitle && { courseTitle: data.courseTitle }),
      isReturningUser: true,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));

    // Dispatch global event so all active forms on the page update immediately
    window.dispatchEvent(
      new CustomEvent("inxyme:magic-prefill", { detail: merged })
    );
  } catch (e) {
    console.warn("Could not save prefill data:", e);
  }
};

/**
 * Retrieve stored user prefill data from localStorage
 */
export const getStoredPrefillData = (): MagicPrefillData => {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn("Could not read prefill data:", e);
  }
  return {};
};

/**
 * Clear prefill data if user clicks "Not you?"
 */
export const clearPrefillData = (): void => {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(
      new CustomEvent("inxyme:magic-prefill", {
        detail: { name: "", phone: "", email: "", isCleared: true },
      })
    );
  } catch (e) {
    console.warn("Could not clear prefill data:", e);
  }
};

/**
 * Client-side decode of magic token or URL query parameters
 */
export const parseMagicLinkParams = (): MagicPrefillData | null => {
  if (typeof window === "undefined") return null;

  try {
    const params = new URLSearchParams(window.location.search);

    // 1. Direct clear command in URL
    if (params.get("clear_magic") === "true") {
      clearPrefillData();
      return null;
    }

    // 2. Direct plain query parameters: ?name=Rahul&phone=9876543210&email=rahul@example.com
    const name = params.get("name") || params.get("fullname");
    const phone = params.get("phone") || params.get("mobile");
    const email = params.get("email");
    const course = params.get("course") || params.get("module");

    if (name || phone || email) {
      const data: MagicPrefillData = {
        name: name || undefined,
        phone: phone || undefined,
        email: email || undefined,
        courseTitle: course || undefined,
        isMagicLink: true,
        isReturningUser: true,
      };
      savePrefillData(data);
      return data;
    }

    // 3. Encoded token in URL (?magic=... or ?token=...)
    const token = params.get("magic") || params.get("token");
    if (token) {
      try {
        const decoded = JSON.parse(atob(token));
        const data: MagicPrefillData = {
          name: decoded.n || decoded.name,
          phone: decoded.p || decoded.phone,
          email: decoded.e || decoded.email,
          courseTitle: decoded.c || decoded.course,
          isMagicLink: true,
          isReturningUser: true,
        };
        savePrefillData(data);
        return data;
      } catch {}
    }

    // 4. Fallback to localStorage stored returning user
    const stored = getStoredPrefillData();
    if (stored && (stored.name || stored.phone || stored.email)) {
      return {
        ...stored,
        isReturningUser: true,
      };
    }
  } catch (err) {
    console.warn("Error parsing magic link params:", err);
  }

  return null;
};
