"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { getOrCreateVisitorId } from "../utils/visitorTracker";
import { getDeviceFingerprint } from "../utils/fingerprint";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  options?: string[];
  isAction?: boolean;
}

interface LeadState {
  name: string;
  phone: string;
  email: string;
  interest: string;
  background: string;
}

export default function CounselorChatBot() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showNudge, setShowNudge] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [quickChips, setQuickChips] = useState<string[]>([]);

  const [leadData, setLeadData] = useState<LeadState>({
    name: "",
    phone: "",
    email: "",
    interest: "",
    background: "",
  });

  const sessionFpRef = useRef<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Dynamic persona per landing page / subdomain
  const getPageConfig = () => {
    const path = (pathname || "").toLowerCase();
    const host = typeof window !== "undefined" ? window.location.hostname.toLowerCase() : "";

    if (path.includes("sap") || host.includes("sap")) {
      return {
        subdomain: "sap-webinar",
        courseName: "SAP Career Certification & Live Webinar",
        advisorName: "Priya Sharma",
        advisorTitle: "Senior SAP Career Counselor",
        greeting: "Hello! 👋 I am Priya, Senior Career Counselor at Inxyme.",
        introText: "Ask me anything about SAP modules (FICO, ABAP, MM, SD, PP), placement assistance, or book your seat for our live ₹9 webinar!",
        quickOptions: [
          "Book ₹9 Live Webinar",
          "Learn SAP FICO / Finance",
          "Learn SAP ABAP / Coding",
          "100% Placement Support Info",
        ],
      };
    }

    if (path.includes("data-science") || host.includes("data-science")) {
      return {
        subdomain: "data-science",
        courseName: "Data Science & AI Master Program",
        advisorName: "Rohit Verma",
        advisorTitle: "Senior Data & AI Advisor",
        greeting: "Hi! 👋 I am Rohit, Senior Data & AI Mentor at Inxyme.",
        introText: "Ask me anything about Data Science, Machine Learning, Python AI curriculum, or corporate placements!",
        quickOptions: [
          "Data Science Syllabus",
          "AI & Machine Learning",
          "Placement Support",
          "Talk to Senior Mentor",
        ],
      };
    }

    if (path.includes("fde") || host.includes("fde") || path.includes("full-stack")) {
      return {
        subdomain: "fde",
        courseName: "Full Stack Developer Program",
        advisorName: "Ananya Sen",
        advisorTitle: "Tech Career Counselor",
        greeting: "Welcome! 👋 I am Ananya, Senior Tech Counselor at Inxyme.",
        introText: "Ask me anything about Full Stack Web Development (MERN / Java), projects, and guaranteed interviews!",
        quickOptions: [
          "MERN / Java Curriculum",
          "Real-world Projects",
          "Placement Assurance",
          "Connect with Counselor",
        ],
      };
    }

    return {
      subdomain: "general",
      courseName: "Inxyme Career Certifications",
      advisorName: "Priya Sharma",
      advisorTitle: "Senior Academic Advisor",
      greeting: "Hello! 👋 Welcome to Inxyme E-Learning.",
      introText: "How can I help you choose the best certification or book your ₹9 webinar seat today?",
      quickOptions: [
        "SAP Career Webinar (₹9)",
        "Data Science & AI",
        "Full Stack Development",
        "Free Career Counseling",
      ],
    };
  };

  const config = getPageConfig();

  // Initialize session fingerprint & automatic nudge
  useEffect(() => {
    if (typeof window === "undefined") return;
    let fp = sessionStorage.getItem("inxyme_chat_session_fp");
    if (!fp) {
      fp = `ai_chat_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      sessionStorage.setItem("inxyme_chat_session_fp", fp);
    }
    sessionFpRef.current = fp;

    const timer = setTimeout(() => {
      if (!hasInteracted) {
        setShowNudge(true);
      }
    }, 3500);

    return () => clearTimeout(timer);
  }, [hasInteracted]);

  // Don't show on thank-you page
  if (pathname && pathname.includes("/thank-you")) {
    return null;
  }

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Handle first open
  const handleOpenChat = () => {
    setIsOpen(true);
    setShowNudge(false);
    setHasInteracted(true);

    if (messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages([
          {
            id: "msg_1",
            sender: "bot",
            text: config.greeting,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
          {
            id: "msg_2",
            sender: "bot",
            text: config.introText,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            options: config.quickOptions,
          },
        ]);
        setQuickChips(config.quickOptions);
      }, 500);
    }
  };

  // Send message to AI Backend & Progressive Auto-Save
  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    // Add user message to UI
    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    try {
      const visitorId = getOrCreateVisitorId();
      let fingerprint = "";
      try {
        const fpRes = await getDeviceFingerprint();
        fingerprint = fpRes?.fingerprint || "";
      } catch {}

      // Call AI Counselor API
      const res = await fetch("/api/chat/counselor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-6).map((m) => ({ sender: m.sender, text: m.text })),
          context: {
            courseName: config.courseName,
            subdomain: config.subdomain,
            advisorName: config.advisorName,
          },
          leadData,
          sessionFingerprint: sessionFpRef.current,
          visitorId,
          fingerprint,
        }),
      });

      const data = await res.json();
      setIsTyping(false);

      if (data?.leadData) {
        setLeadData((prev) => ({ ...prev, ...data.leadData }));
      }

      const botReplyText =
        data?.reply ||
        "Thank you! At Inxyme, we offer complete live practical training, resume preparation, and 100% placement assistance. Would you like to connect on WhatsApp?";

      const isLeadCaptured = Boolean(data?.leadData?.phone && data?.leadData?.phone.length >= 10);

      setMessages((prev) => [
        ...prev,
        {
          id: `bot_${Date.now()}`,
          sender: "bot",
          text: botReplyText,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isAction: isLeadCaptured,
        },
      ]);

      if (data?.suggestions && Array.isArray(data.suggestions)) {
        setQuickChips(data.suggestions);
      }
    } catch (err) {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot_${Date.now()}`,
          sender: "bot",
          text: "At Inxyme, we provide industry-recognized certifications and 100% placement support. Feel free to leave your WhatsApp number or book your ₹9 webinar seat directly below!",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isAction: true,
        },
      ]);
    }
  };

  return (
    <div className="fixed bottom-20 right-5 z-50 font-sans">
      {/* Floating Nudge Bubble */}
      {!isOpen && showNudge && (
        <div
          onClick={handleOpenChat}
          className="cursor-pointer mb-3 max-w-[270px] bg-white text-gray-800 p-3.5 rounded-2xl shadow-2xl border border-orange-200 animate-bounce transition-all flex items-start gap-2.5"
        >
          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0 animate-pulse" />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-orange-600">
                {config.advisorName}
              </span>
              <span className="text-[10px] bg-indigo-50 text-indigo-600 font-bold px-1.5 py-0.5 rounded">
                AI Counselor
              </span>
            </div>
            <p className="text-xs text-gray-700 mt-1 leading-snug">
              Have doubts about SAP courses or ₹9 webinar? Ask me anything! 👋
            </p>
          </div>
        </div>
      )}

      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={handleOpenChat}
          className="group relative flex items-center gap-3 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white px-4 py-3.5 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-white/60"
          aria-label="Open AI Counselor Chat"
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-white text-orange-600 font-bold flex items-center justify-center text-sm shadow-inner overflow-hidden border border-orange-200">
              👩‍💼
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full animate-ping" />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
          </div>

          <div className="text-left hidden sm:block pr-1">
            <div className="text-xs font-bold leading-tight flex items-center gap-1.5">
              <span>{config.advisorName}</span>
              <span className="text-[10px] bg-emerald-600/30 text-white px-1.5 py-0.2 rounded-full">
                AI Live
              </span>
            </div>
            <div className="text-[11px] text-orange-100 font-medium">
              Career Counselor
            </div>
          </div>
        </button>
      )}

      {/* AI Chat Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[560px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 text-white p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-lg border border-white/40 shadow-sm">
                  👩‍💼
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-orange-600 rounded-full" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm text-white leading-tight">
                    {config.advisorName}
                  </h3>
                  <span className="text-[10px] bg-white/20 text-white font-bold px-1.5 py-0.5 rounded">
                    AI Active
                  </span>
                </div>
                <p className="text-[11px] text-orange-100 mt-0.5">
                  {config.advisorTitle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center text-white text-lg transition-colors"
                title="Minimize Chat"
              >
                &minus;
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center text-white text-sm font-bold transition-colors"
                title="Close"
              >
                &#x2715;
              </button>
            </div>
          </div>

          {/* Subheader Banner */}
          <div className="bg-orange-50 px-4 py-2 border-b border-orange-100 flex items-center justify-between text-[11px] text-orange-800">
            <span className="font-semibold truncate max-w-[240px]">
              📌 {config.courseName}
            </span>
            <span className="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              Instant Auto-Save
            </span>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-gray-50/60">
            {messages.map((msg) => {
              const isBot = msg.sender === "bot";
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isBot ? "items-start" : "items-end"} space-y-1.5`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed shadow-sm ${
                      isBot
                        ? "bg-white text-gray-800 border border-gray-100 rounded-tl-sm"
                        : "bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-tr-sm"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>

                  <span className="text-[10px] text-gray-400 px-1">
                    {msg.timestamp}
                  </span>

                  {/* Initial Quick Reply Chips */}
                  {msg.options && (
                    <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                      {msg.options.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(opt)}
                          className="text-[11px] font-semibold bg-white hover:bg-orange-50 text-orange-700 border border-orange-200 px-3 py-1.5 rounded-full shadow-xs hover:border-orange-400 hover:scale-102 active:scale-98 transition-all"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* High Intent Action Card (Triggered on phone capture) */}
                  {msg.isAction && (
                    <div className="mt-3 space-y-2 w-full pt-1">
                      {leadData.phone && (
                        <a
                          href={`https://wa.me/91${leadData.phone.replace(/[^0-9]/g, "").slice(-10)}?text=Hi%20Inxyme,%20I%20have%20inquired%20about%20${encodeURIComponent(config.courseName)}.%20Please%20share%20the%20details.`}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all"
                        >
                          <span>💬 Chat on WhatsApp (+91 {leadData.phone})</span>
                        </a>
                      )}
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          const bookingBtn = document.querySelector(
                            "[data-webinar-book-btn]"
                          ) as HTMLButtonElement;
                          if (bookingBtn) {
                            bookingBtn.click();
                          } else {
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }
                        }}
                        className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition-all"
                      >
                        <span>🎟️ Book ₹9 Webinar Seat Now</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-1.5 bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-3.5 py-2 w-16 shadow-xs">
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Dynamic Suggested Action Chips */}
          {quickChips.length > 0 && !isTyping && (
            <div className="px-3 py-1.5 bg-white border-t border-gray-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {quickChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(chip)}
                  className="whitespace-nowrap text-[10px] font-semibold bg-gray-50 hover:bg-orange-50 text-gray-700 hover:text-orange-700 border border-gray-200 hover:border-orange-300 px-2.5 py-1 rounded-full transition-all"
                >
                  {chip}
                </button>
              ))}
            </div>
          )}

          {/* Input Footer */}
          <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask anything or enter your name / phone..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
              className="flex-1 bg-gray-100 text-gray-800 text-xs px-3.5 py-2.5 rounded-xl border border-transparent focus:outline-none focus:border-orange-400 focus:bg-white transition-all"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim()}
              className="w-9 h-9 bg-orange-600 hover:bg-orange-700 disabled:opacity-40 text-white rounded-xl flex items-center justify-center shadow-sm transition-all"
              aria-label="Send Message"
            >
              <span className="text-sm font-bold">&#10148;</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
