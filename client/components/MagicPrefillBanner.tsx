"use client";

import { FaUserCheck, FaTimes } from "react-icons/fa";
import { MagicPrefillData } from "../utils/magicLink";

interface MagicPrefillBannerProps {
  prefillData: MagicPrefillData | null;
  onClear: () => void;
}

export default function MagicPrefillBanner({
  prefillData,
  onClear,
}: MagicPrefillBannerProps) {
  if (!prefillData || (!prefillData.name && !prefillData.phone && !prefillData.email)) {
    return null;
  }

  const displayName = prefillData.name || prefillData.phone || "Returning Learner";

  return (
    <div className="bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 border border-amber-400/40 rounded-xl p-2.5 px-3 mb-3 flex items-center justify-between gap-2 text-xs animate-in fade-in slide-in-from-top-1 duration-200">
      <div className="flex items-center gap-2 text-amber-200">
        <FaUserCheck className="text-amber-400 text-sm shrink-0" />
        <span>
          Welcome back, <strong className="text-amber-300 font-bold">{displayName}</strong>! We prefilled your details.
        </span>
      </div>
      <button
        type="button"
        onClick={onClear}
        className="text-[11px] text-slate-400 hover:text-white underline cursor-pointer flex items-center gap-1 shrink-0 ml-1"
      >
        <span>Not you?</span>
        <FaTimes className="text-[10px]" />
      </button>
    </div>
  );
}
