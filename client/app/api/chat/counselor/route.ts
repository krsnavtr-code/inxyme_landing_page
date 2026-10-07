import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// Helper to extract phone, email, and name from text
function extractEntities(text: string) {
  const phoneRegex = /(?:\+?91[\-\s]?)?([6-9]\d{9})\b/;
  const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})\b/;

  const phoneMatch = text.match(phoneRegex);
  const emailMatch = text.match(emailRegex);

  let extractedName: string | null = null;
  const namePatterns = [
    /(?:my name is|mera naam|i am|this is|call me)\s+([a-zA-Z\s]{2,25})/i,
    /^([A-Z][a-z]+(?:\s[A-Z][a-z]+)?)$/,
  ];

  for (const pattern of namePatterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      const candidate = match[1].trim();
      if (!candidate.toLowerCase().includes("hello") && !candidate.toLowerCase().includes("webinar") && !candidate.toLowerCase().includes("sap")) {
        extractedName = candidate;
        break;
      }
    }
  }

  return {
    phone: phoneMatch ? phoneMatch[1] : null,
    email: emailMatch ? emailMatch[1].toLowerCase() : null,
    name: extractedName,
  };
}

// Local Counselor Knowledge Engine (Fallback when API key has quota limits)
function generateKnowledgeBaseResponse(
  userMessage: string,
  courseContext: string,
  advisorName: string,
  hasPhone: boolean,
  hasName: boolean,
  studentName?: string
): string {
  const lower = userMessage.toLowerCase();
  const nameSalutation = studentName ? `${studentName}, ` : "";

  // 1. ₹9 Webinar Doubts
  if (lower.includes("9") || lower.includes("rupee") || lower.includes("webinar") || lower.includes("session")) {
    const nextAsk = !hasPhone
      ? "Would you like me to reserve your slot? What is your WhatsApp number so I can send the direct webinar link?"
      : "Your seat details will be sent directly on WhatsApp!";
    return `Yes ${nameSalutation}our exclusive SAP Career Webinar is just ₹9! In this live interactive session, industry mentors guide you on SAP ABAP, FICO, MM, SD, resume building, and 100% placement roadmap. ${nextAsk}`;
  }

  // 2. SAP FICO / Finance / B.Com
  if (lower.includes("fico") || lower.includes("finance") || lower.includes("b.com") || lower.includes("bcom") || lower.includes("mba") || lower.includes("account")) {
    const nextAsk = !hasPhone
      ? "Shall I send the complete SAP FICO module syllabus to your WhatsApp? What is your number?"
      : "I have noted your interest in SAP FICO!";
    return `SAP FICO is ideal for anyone from a Commerce, Finance, B.Com, or MBA background! You don't need any coding knowledge. We cover Financial Accounting, General Ledger, AP/AR, and Asset Accounting with live corporate project implementations. ${nextAsk}`;
  }

  // 3. SAP ABAP / Technical / Coding
  if (lower.includes("abap") || lower.includes("coding") || lower.includes("tech") || lower.includes("b.tech") || lower.includes("developer")) {
    const nextAsk = !hasPhone
      ? "What is your WhatsApp number so our senior technical lead can share sample ABAP source projects?"
      : "Our ABAP lead will connect with you!";
    return `SAP ABAP is the core programming backbone of the entire SAP ERP ecosystem! Perfect for IT, BCA, MCA, and B.Tech graduates. We train you from core syntax to Advanced OOPS ABAP, CDS Views, and S/4 HANA migrations with live server access. ${nextAsk}`;
  }

  // 4. SAP MM / SD / PP / Supply Chain
  if (lower.includes("mm") || lower.includes("sd") || lower.includes("pp") || lower.includes("supply") || lower.includes("sales") || lower.includes("material")) {
    const nextAsk = !hasPhone ? "May I know your WhatsApp number to share the module breakdown?" : "";
    return `SAP MM (Materials Management) and SAP SD (Sales & Distribution) are the highest-hiring functional modules in manufacturing, logistics, and retail. No coding required at all! ${nextAsk}`;
  }

  // 5. Placements, Salary, Jobs
  if (lower.includes("placement") || lower.includes("job") || lower.includes("salary") || lower.includes("career") || lower.includes("assist")) {
    const nextAsk = !hasPhone ? "Share your WhatsApp number and our placement cell will share recent alumni hiring proofs!" : "";
    return `Inxyme provides 100% placement support! This includes guaranteed mock interviews with corporate managers, professional resume crafting, personal portfolio hosting, and interview scheduling with our network of top hiring partners (TCS, Infosys, Capgemini, Wipro, and MNCs). Average fresher packages range between 4.5 to 8 LPA. ${nextAsk}`;
  }

  // 6. Timings, Duration, Batches
  if (lower.includes("time") || lower.includes("timing") || lower.includes("duration") || lower.includes("batch") || lower.includes("weekend") || lower.includes("class")) {
    const nextAsk = !hasPhone ? "What is your mobile number so I can check slot availability for you?" : "";
    return `We offer flexible batch schedules with both Weekday and Weekend evening slots designed specifically for college students and working professionals. Plus, every session is recorded so you can rewatch anytime with 1-on-1 doubt clearance. ${nextAsk}`;
  }

  // 7. General Inquiry / Greetings
  if (lower.includes("hi") || lower.includes("hello") || lower.includes("hey")) {
    return `Hello ${nameSalutation}welcome to Inxyme! I am ${advisorName}, your senior career counselor. Are you looking to upgrade your career with SAP, Data Science, or attend our ₹9 Live Career Webinar?`;
  }

  // Default helpful response
  const followUp = !hasPhone
    ? "To share the complete curriculum PDF and fee structure with you, may I have your WhatsApp number?"
    : "Feel free to ask any other questions, or click below to secure your ₹9 webinar seat!";

  return `That is a great question! At Inxyme, we ensure every student gets comprehensive live practical training, industry-recognized certification, and 1-on-1 mentor guidance. ${followUp}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      message = "",
      history = [],
      context = {},
      leadData = {},
      sessionFingerprint = "",
      visitorId = "",
      fingerprint = "",
    } = body;

    const {
      courseName = "SAP Career Certification & Webinar",
      subdomain = "sap-webinar",
      advisorName = "Priya Sharma",
    } = context;

    // 1. Extract newly typed contact entities
    const extracted = extractEntities(message);
    const updatedLead = {
      name: (extracted.name || leadData.name || "").trim(),
      phone: (extracted.phone || leadData.phone || "").trim(),
      email: (extracted.email || leadData.email || "").trim(),
      interest: leadData.interest || "",
      background: leadData.background || "",
    };

    const hasNewContact = Boolean(
      (extracted.phone && extracted.phone !== leadData.phone) ||
      (extracted.name && extracted.name !== leadData.name) ||
      (extracted.email && extracted.email !== leadData.email)
    );

    // 2. PROGRESSIVE AUTO-SAVE TO DATABASE:
    // If any contact info is present or updated, save immediately into partial_leads table
    const landingApiUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5006";

    if (updatedLead.phone || updatedLead.name || updatedLead.email) {
      try {
        fetch(`${landingApiUrl}/api/partial-leads`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: updatedLead.name || undefined,
            phone: updatedLead.phone || undefined,
            email: updatedLead.email || undefined,
            courseTitle: `${courseName} (AI Chat)`,
            source: `ai-chatbot-${subdomain}`,
            pageUrl: `/sap-webinar`,
            sessionFingerprint,
            visitorId,
            fingerprint,
          }),
          signal: AbortSignal.timeout(4000),
        }).catch((err) => console.warn("Partial lead auto-save notice:", err.message));
      } catch {}

      // If user has provided both Name and Phone, also record full lead in leads table
      if (updatedLead.name && updatedLead.phone && updatedLead.phone.length >= 10 && hasNewContact) {
        try {
          fetch(`${landingApiUrl}/api/leads`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: updatedLead.name,
              phone: updatedLead.phone,
              email: updatedLead.email || `student_${Date.now()}@inxyme.com`,
              program: courseName,
              subdomain,
              source: `ai-counselor-chat`,
              qualification: updatedLead.background || "Live AI Chatbot Inquiry",
              specialisation: courseName,
              time_slot: `Chatbot: ${sessionFingerprint}`,
              state: "Online",
            }),
            signal: AbortSignal.timeout(4000),
          }).catch(() => {});
        } catch {}
      }
    }

    // 3. GENERATE COUNSELOR RESPONSE
    let botReply = "";
    const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "";

    let geminiSucceeded = false;
    if (geminiKey) {
      try {
        const systemPrompt = `You are ${advisorName}, Senior Academic Career Counselor at Inxyme E-Learning Platform. 
You are chatting live with an interested student on our ${courseName} landing page.
Your tone: Warm, professional, helpful, respectful, and persuasive (natural Indian Hinglish/English).
Key Knowledge:
- Course: ${courseName} (SAP ABAP, FICO, MM, SD, PP, live interactive training, 1-on-1 doubts).
- Live Webinar: ₹9 booking fee only, includes career guidance, resume building, and placement roadmap.
- Placement Support: 100% placement assistance, mock interviews, corporate partner network (TCS, Infosys, Capgemini, Wipro, etc.).
- Goal: Helpfully answer whatever question the student asks in 2-3 friendly sentences. 
- Lead collection: If the student hasn't shared their phone number yet, politely ask for their WhatsApp number so you can share the syllabus PDF or confirm their webinar slot.
Student Name so far: ${updatedLead.name || "Unknown"}
Student Phone so far: ${updatedLead.phone || "Not provided yet"}`;

        // Attempt 1: Official @google/genai SDK
        try {
          const ai = new GoogleGenAI({ apiKey: geminiKey });
          const response = await ai.models.generateContent({
            model: "gemini-3.8-flash",
            contents: `${systemPrompt}\n\nRecent context: ${JSON.stringify(history.slice(-3))}\n\nStudent says: "${message}"\nCounselor Reply:`,
          });

          if (response && response.text && response.text.trim().length > 0) {
            botReply = response.text.trim();
            geminiSucceeded = true;
          }
        } catch (sdkErr: any) {
          // Attempt 2: REST fallback (gemini-flash-latest)
          const conversationParts = [
            { text: systemPrompt },
            ...history.slice(-4).map((h: any) => ({
              text: `${h.sender === "user" ? "Student" : "Counselor"}: ${h.text}`,
            })),
            { text: `Student: ${message}\nCounselor:` },
          ];

          const geminiRes = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-goog-api-key": geminiKey,
              },
              body: JSON.stringify({
                contents: [{ parts: conversationParts }],
                generationConfig: {
                  maxOutputTokens: 250,
                  temperature: 0.7,
                },
              }),
              signal: AbortSignal.timeout(5000),
            }
          );

          if (geminiRes.ok) {
            const geminiData = await geminiRes.json();
            const generated =
              geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (generated && generated.trim().length > 0) {
              botReply = generated.trim();
              geminiSucceeded = true;
            }
          }
        }
      } catch (geminiErr: any) {
        console.warn("Gemini call notice, activating Counselor Knowledge Engine:", geminiErr.message);
      }
    }

    // 4. Intelligent Local Knowledge Engine (Smooth fallback with 100% reliability)
    if (!geminiSucceeded || !botReply) {
      botReply = generateKnowledgeBaseResponse(
        message,
        courseName,
        advisorName,
        Boolean(updatedLead.phone && updatedLead.phone.length >= 10),
        Boolean(updatedLead.name),
        updatedLead.name
      );
    }

    // 5. Suggest context-aware quick action chips
    let suggestions: string[] = [];
    if (!updatedLead.phone) {
      suggestions = ["Book ₹9 Live Webinar", "Placement Assistance Info", "SAP FICO / Finance", "SAP ABAP / Coding"];
    } else {
      suggestions = ["How to pay ₹9 for Webinar?", "Share Syllabus PDF", "Connect on WhatsApp"];
    }

    return NextResponse.json({
      success: true,
      reply: botReply,
      leadData: updatedLead,
      suggestions,
      hasContact: Boolean(updatedLead.phone || updatedLead.email),
    });
  } catch (err: any) {
    console.error("Chat counselor route error:", err);
    return NextResponse.json(
      {
        success: false,
        reply: "Thank you for reaching out! Our academic counseling team will assist you with full details. Feel free to book your ₹9 webinar slot directly!",
      },
      { status: 500 }
    );
  }
}
