import Link from "next/link";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

interface FooterProps {
  universityName?: string;
  programName?: string;
}

export default function Footer({
  universityName = "Professional Certification",
  programName = "Career Programs",
}: FooterProps) {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs py-12 border-t border-slate-800">
      <div className="w-[min(1240px,94%)] mx-auto space-y-8">
        {/* Top Header in Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black tracking-tight leading-none">
              <span className="text-[#0066ff]">IN</span><span className="text-[#ff6a00]">X</span><span className="text-[#0066ff]">YME</span>
            </span>
            <span className="text-slate-700">|</span>
            <span className="text-slate-300 font-semibold text-xs">
              {universityName} {programName ? `– ${programName}` : ""}
            </span>
          </div>

          <div className="flex items-center gap-6 text-slate-400 font-medium">
            <a href="#top" className="hover:text-white transition-colors">
              Back to Top ↑
            </a>
            <a href="#enroll" className="hover:text-white transition-colors">
              Enquire Now
            </a>
          </div>
        </div>

        {/* 4-column layout for complete business transparency */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-4">
          <div className="space-y-3">
            <div className="text-sm font-black text-white uppercase tracking-wider">
              About Inxyme
            </div>
            <p className="text-[11px] leading-relaxed text-slate-400">
              Inxyme is an independent professional vocational learning platform offering job-ready certification courses in SAP, Data Science, AI/ML, and Full-Stack Engineering.
            </p>
            <div className="text-[11px] text-slate-500">
              Entity: Inxyme E-Learning
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-black text-white uppercase tracking-wider">
              Policy &amp; Legal Pages
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about-us" className="hover:text-white transition-colors">
                  About Us &amp; Platform Profile
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy (Data &amp; Cookies)
                </Link>
              </li>
              <li>
                <Link href="/terms-conditions" className="hover:text-white transition-colors">
                  Terms &amp; Conditions / Enrollment
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-white transition-colors">
                  Statutory &amp; Trademark Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-white transition-colors">
                  Contact Us &amp; Student Support
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-black text-white uppercase tracking-wider">
              Certification Tracks
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="/sap" className="hover:text-white transition-colors">
                  SAP S/4HANA (ABAP, FICO, MM, SD)
                </a>
              </li>
              <li>
                <a href="/data-science" className="hover:text-white transition-colors">
                  Data Science &amp; Business Analytics
                </a>
              </li>
              <li>
                <a href="/ai-ml" className="hover:text-white transition-colors">
                  Artificial Intelligence &amp; ML
                </a>
              </li>
              <li>
                <a href="/fde" className="hover:text-white transition-colors">
                  Full Stack Software Engineering
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-black text-white uppercase tracking-wider">
              Corporate Office &amp; Contact
            </div>
            <ul className="space-y-2 text-[11px] text-slate-400">
              <li className="flex items-start gap-2">
                <FaMapMarkerAlt className="text-blue-500 shrink-0 mt-0.5" />
                <span>B-127, B Block, Sector 2, Noida, Uttar Pradesh 201301</span>
              </li>
              <li className="flex items-center gap-2">
                <FaPhone className="text-emerald-500 shrink-0" />
                <a href="tel:+919990999561" className="hover:text-white">
                  +91 9990999561 / +91 9266585858
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-indigo-400 shrink-0" />
                <a href="mailto:info@inxyme.com" className="hover:text-white">
                  info@inxyme.com
                </a>
              </li>
              <li className="text-slate-500 pt-1">
                Desk Hours: Mon – Sat (9:30 AM – 6:30 PM IST)
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer section */}
        <div className="bg-slate-900/70 rounded-xl p-5 border border-slate-800 space-y-2 text-[11px] leading-relaxed text-slate-400">
          <p className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">
            Important Statutory &amp; Non-Affiliation Disclaimer:
          </p>
          <p>
            <strong>Inxyme</strong> is an independent vocational e-learning platform offering career-oriented certification courses. SAP, SAP S/4HANA, ABAP, FICO, MM, SD, and PP are registered trademarks of SAP SE in Germany and other countries. Inxyme is NOT affiliated with, endorsed by, or an authorized training partner of SAP SE. All programs are independent educational modules designed to build hands-on competency.
          </p>
          <p>
            All course fees, schedules, and completion timelines are managed by Inxyme. Placement support is provided on a best-effort basis and does not constitute a guaranteed salary or employment promise.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-slate-500 text-[11px] pt-2">
          <div>
            &copy; {new Date().getFullYear()} Inxyme. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400 font-medium">
            <Link href="/about-us" className="hover:text-white transition-colors">
              About Us
            </Link>
            <span>•</span>
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms-conditions" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </Link>
            <span>•</span>
            <Link href="/disclaimer" className="hover:text-white transition-colors">
              Disclaimer
            </Link>
            <span>•</span>
            <Link href="/contact-us" className="hover:text-white transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
