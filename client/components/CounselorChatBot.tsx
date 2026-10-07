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
  const [currentStep, setCurrentStep] = useState<
    "welcome" | "name" | "phone" | "email" | "background" | "completed"
  >("welcome");

  const [leadData, setLeadData] = useState<LeadState>({
    name: "",
    phone: "",
    email: "",
    interest: "",
    background: "",
  });

  const sessionFpRef = useRef<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Determine course and counselor persona based on current page/subdomain
  const getPageConfig = () => {
    const path = (pathname || "").toLowerCase();
    const host = typeof window !== "undefined" ? window.location.hostname.toLowerCase() : "";

    if (path.includes("sap") || host.includes("sap")) {
      return {
        subdomain: "sap-webinar",
        courseName: "SAP Career Certification & Live Webinar",
        advisorName: "Priya Sharma",
        advisorTitle: "Senior SAP Career Counselor",
        greeting: "Hello! 👋 Welcome to Inxyme SAP Academy.",
        introText: "Are you planning to learn SAP (ABAP, FICO, MM, SD, PP) or book your seat for our upcoming live ₹9 webinar?",
        quickOptions: [
          "Book ₹9 Live Webinar",
          "Learn SAP FICO / Finance",
          "Learn SAP ABAP / Tech",
          "100% Placement Assistance Info",
        ],
      };
    }

    if (path.includes("data-science") || host.includes("data-science")) {
      return {
        subdomain: "data-science",
        courseName: "Data Science & AI Master Program",
        advisorName: "Rohit Verma",
        advisorTitle: "Senior Data & AI Advisor",
        greeting: "Hi! 👋 Welcome to Inxyme Data Science Portal.",
        introText: "Looking to build a high-growth career in Data Science, Machine Learning, or Generative AI?",
        quickOptions: [
          "Data Science Syllabus",
          "Machine Learning & AI",
          "Job Placement Support",
          "Speak to Senior Mentor",
        ],
      };
    }

    if (path.includes("fde") || host.includes("fde") || path.includes("full-stack")) {
      return {
        subdomain: "fde",
        courseName: "Full Stack Developer Program",
        advisorName: "Ananya Sen",
        advisorTitle: "Tech Career Counselor",
        greeting: "Welcome! 👋 Explore Inxyme Full Stack Engineering.",
        introText: "Ready to become a full-stack software engineer with guaranteed interview opportunities?",
        quickOptions: [
          "MERN / Java Curriculum",
          "Live Real-world Projects",
          "Placement Assurance",
          "Connect with Counselor",
        ],
      };
    }

    return {
      subdomain: "general",
      courseName: "Inxyme Career Certifications",
      advisorName: "Priya Sharma",
      advisorTitle: "Senior Academic Counselor",
      greeting: "Hello! 👋 Welcome to Inxyme E-Learning.",
      introText: "Which career track are you interested in exploring today?",
      quickOptions: [
        "SAP Career Webinar (₹9)",
        "Data Science & AI",
        "Full Stack Development",
        "Free Career Counseling",
      ],
    };
  };

  const config = getPageConfig();

  // Initialize session fingerprint
  useEffect(() => {
    if (typeof window === "undefined") return;
    let fp = sessionStorage.getItem("inxyme_chat_session_fp");
    if (!fp) {
      fp = `chat_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      sessionStorage.setItem("inxyme_chat_session_fp", fp);
    }
    sessionFpRef.current = fp;

    // Show nudge speech bubble after 3.5 seconds
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
        setCurrentStep("welcome");
      }, 700);
    }
  };

  // Auto-save lead data progressively into database
  const autoSaveToDatabase = async (updatedFields: Partial<LeadState>, stepName: string) => {
    try {
      const merged = { ...leadData, ...updatedFields };
      const visitorId = getOrCreateVisitorId();
      let fingerprint = "";

      try {
        const fpResult = await getDeviceFingerprint();
        fingerprint = fpResult?.fingerprint || "";
      } catch {}

      // 1. Save directly into partial-leads (MySQL & email alert)
      await fetch("/api/partial-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: merged.name || undefined,
          phone: merged.phone || undefined,
          email: merged.email || undefined,
          courseTitle: merged.interest ? `${config.courseName} (${merged.interest})` : config.courseName,
          source: `chatbot_${config.subdomain}_${stepName}`,
          pageUrl: typeof window !== "undefined" ? window.location.pathname : "/sap-webinar",
          sessionFingerprint: sessionFpRef.current,
          visitorId,
          fingerprint,
        }),
      });

      console.log(`[CHATBOT AUTO-SAVE] Step: ${stepName} saved to MySQL partial_leads!`, merged);
    } catch (e) {
      console.warn("Chatbot auto-save notice:", e);
    }
  };

  // Submit complete lead to full leads table
  const submitCompleteLead = async (finalData: LeadState) => {
    try {
      const visitorId = getOrCreateVisitorId();

      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: finalData.name.trim(),
          email: finalData.email.trim() || `student_${Date.now()}@inxyme.com`,
          phone: finalData.phone.trim(),
          program: config.courseName,
          subdomain: config.subdomain,
          source: `chatbot-${config.subdomain}`,
          qualification: finalData.background || "Chatbot Registration",
          specialisation: finalData.interest || "General",
          time_slot: `Chatbot: ${sessionFpRef.current}`,
          state: "Online",
        }),
      });

      // Mark partial lead as converted
      await fetch("/api/partial-leads", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionFingerprint: sessionFpRef.current }),
      });
    } catch (e) {
      console.warn("Full lead submit error:", e);
    }
  };

  // Process User Input
  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    setTimeout(async () => {
      setIsTyping(false);

      if (currentStep === "welcome") {
        // Save initial selected interest
        const updated = { ...leadData, interest: text };
        setLeadData(updated);
        autoSaveToDatabase({ interest: text }, "interest-selected");

        setMessages((prev) => [
          ...prev,
          {
            id: `bot_${Date.now()}`,
            sender: "bot",
            text: `Excellent choice! To personalize your curriculum and share details, may I know your good name? 😊`,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
        setCurrentStep("name");
      } else if (currentStep === "name") {
        // Name captured -> IMMEDIATELY save to database
        const updated = { ...leadData, name: text };
        setLeadData(updated);
        autoSaveToDatabase({ name: text }, "name-entered");

        setMessages((prev) => [
          ...prev,
          {
            id: `bot_${Date.now()}`,
            sender: "bot",
            text: `Nice to meet you, ${text}! What is your WhatsApp/Mobile number so our academic mentor can share the brochure & webinar slot details? 📱`,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
        setCurrentStep("phone");
      } else if (currentStep === "phone") {
        const cleanPhone = text.replace(/[^0-9]/g, "");
        if (cleanPhone.length < 10) {
          setMessages((prev) => [
            ...prev,
            {
              id: `bot_${Date.now()}`,
              sender: "bot",
              text: "Please enter a valid 10-digit mobile number so we can reach you on WhatsApp! 🙏",
              timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            },
          ]);
          return;
        }

        // Phone captured -> IMMEDIATELY save to database & trigger real-time admin alert
        const updated = { ...leadData, phone: cleanPhone };
        setLeadData(updated);
        autoSaveToDatabase({ phone: cleanPhone }, "phone-entered");

        setMessages((prev) => [
          ...prev,
          {
            id: `bot_${Date.now()}`,
            sender: "bot",
            text: `Thank you! And what is your Email Address to send your certification syllabus PDF? 📩`,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            options: ["Skip Email"],
          },
        ]);
        setCurrentStep("email");
      } else if (currentStep === "email") {
        const emailValue = text.toLowerCase().includes("skip") ? "" : text;
        const updated = { ...leadData, email: emailValue };
        setLeadData(updated);
        autoSaveToDatabase({ email: emailValue }, "email-entered");

        setMessages((prev) => [
          ...prev,
          {
            id: `bot_${Date.now()}`,
            sender: "bot",
            text: `Almost done! Are you currently a working professional, a fresher/college student, or looking for a career change? 🎓`,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            options: [
              "Working Professional",
              "College Student / Fresher",
              "Looking for Career Change",
            ],
          },
        ]);
        setCurrentStep("background");
      } else if (currentStep === "background") {
        const finalData = { ...leadData, background: text };
        setLeadData(finalData);

        // Submit complete lead to full leads table & mark converted
        await submitCompleteLead(finalData);

        setMessages((prev) => [
          ...prev,
          {
            id: `bot_${Date.now()}`,
            sender: "bot",
            text: `🎉 Fantastic, ${finalData.name || "friend"}! Your request is registered successfully. Our senior academic advisor will connect with you on WhatsApp (+91 ${finalData.phone}) shortly!`,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            isAction: true,
          },
        ]);
        setCurrentStep("completed");
      }
    }, 700);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans">
      {/* Floating Nudge Bubble (shows before chat is opened) */}
      {!isOpen && showNudge && (
        <div
          onClick={handleOpenChat}
          className="cursor-pointer mb-3 max-w-[260px] bg-white text-gray-800 p-3.5 rounded-2xl shadow-2xl border border-orange-200 animate-bounce transition-all flex items-start gap-2.5"
        >
          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0 animate-pulse" />
          <div>
            <p className="text-xs font-bold text-orange-600">
              {config.advisorName} • Online
            </p>
            <p className="text-xs text-gray-700 mt-0.5 leading-snug">
              Need syllabus or want to book ₹9 webinar? Click here to chat! 👋
            </p>
          </div>
        </div>
      )}

      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={handleOpenChat}
          className="group relative flex items-center gap-3 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white px-4 py-3.5 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-white/60"
          aria-label="Open Counselor Chat"
        >
          {/* Avatar with pulse */}
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
                Online
              </span>
            </div>
            <div className="text-[11px] text-orange-100 font-medium">
              Live Career Guidance
            </div>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[390px] h-[550px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
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
                <h3 className="font-bold text-sm text-white leading-tight">
                  {config.advisorName}
                </h3>
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
            <span className="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
              Instant Replies
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

                  {/* Quick Reply Chips */}
                  {msg.options && currentStep !== "completed" && (
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

                  {/* Completion Action Buttons */}
                  {msg.isAction && (
                    <div className="mt-3 space-y-2 w-full pt-1">
                      {leadData.phone && (
                        <a
                          href={`https://wa.me/91${leadData.phone.replace(/[^0-9]/g, "").slice(-10)}?text=Hi%20Inxyme,%20I%20have%20inquired%20about%20${encodeURIComponent(config.courseName)}.%20Please%20share%20details.`}
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
                          // Trigger seat booking popup if available on window
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

          {/* Input Footer */}
          {currentStep !== "completed" ? (
            <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
              <input
                type={currentStep === "phone" ? "tel" : currentStep === "email" ? "email" : "text"}
                placeholder={
                  currentStep === "name"
                    ? "Type your name..."
                    : currentStep === "phone"
                    ? "Enter 10-digit mobile number..."
                    : currentStep === "email"
                    ? "Enter email address..."
                    : "Type your message..."
                }
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
          ) : (
            <div className="p-3 bg-gray-50 border-t border-gray-100 text-center text-xs text-gray-500">
              Need more help? Our team will reach out shortly.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
