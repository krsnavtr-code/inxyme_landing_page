import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      courseTitle = "SAP Webinar",
      source = "sap-webinar-landing",
      pageUrl = "/sap-webinar",
      sessionFingerprint,
      visitorId,
      fingerprint,
      device,
    } = body;

    const hasContact =
      (email && email.trim().length > 0) || (phone && phone.trim().length > 0);

    if (!hasContact) {
      return NextResponse.json({
        success: false,
        message: "Need at least email or phone number to record partial lead.",
      });
    }

    const websiteApiUrl =
      process.env.INXYME_WEBSITE_API_URL || "https://www.inxyme.com/api";
    const landingApiUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5006";

    // 1. Forward to inxyme-website backend to save in PartialLead & Contact collections & trigger real-time alert
    try {
      await fetch(`${websiteApiUrl}/partial-leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          courseTitle,
          source: `landing_${source}`,
          pageUrl,
          sessionFingerprint,
          visitorId,
          fingerprint,
          device,
        }),
        signal: AbortSignal.timeout(6000),
      });
    } catch (websiteErr: any) {
      console.warn("Website partial-lead sync notice:", websiteErr?.message);
    }

    // 2. Save into inxyme-landing-page server (MySQL partial_leads table & trigger instant SMTP alert)
    try {
      await fetch(`${landingApiUrl}/api/partial-leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          courseTitle,
          source,
          pageUrl,
          sessionFingerprint,
          visitorId,
          fingerprint,
          device,
        }),
        signal: AbortSignal.timeout(5000),
      });
    } catch (landingErr: any) {
      console.warn("Landing server partial-lead insert notice:", landingErr?.message);
    }

    // 3. Dispatch Server-Side Tracking Event (Meta CAPI / GA4)
    try {
      const serverTrackingPayload = {
        eventType: "PartialLead",
        pageUrl,
        pageTitle: `SAP Webinar - ${courseTitle}`,
        visitorId,
        fingerprint,
        userData: { name, email, phone },
        customData: { courseTitle, source },
      };

      fetch(`${websiteApiUrl}/server-tracking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(serverTrackingPayload),
        signal: AbortSignal.timeout(4000),
      }).catch(() => {});
    } catch {}

    console.log(
      `[PARTIAL LEAD CAPTURED]: ${name || "Unknown"} | Phone: ${phone || "N/A"} | Email: ${email || "N/A"} | Course: ${courseTitle}`
    );

    return NextResponse.json({
      success: true,
      message: "Partial lead captured and synced successfully",
      sessionFingerprint,
    });
  } catch (err: any) {
    console.error("Error in partial-leads API:", err);
    return NextResponse.json(
      { success: false, message: err?.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionFingerprint } = body;

    const websiteApiUrl =
      process.env.INXYME_WEBSITE_API_URL || "https://www.inxyme.com/api";
    const landingApiUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5006";

    if (sessionFingerprint) {
      fetch(`${landingApiUrl}/api/partial-leads/convert`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionFingerprint }),
        signal: AbortSignal.timeout(3000),
      }).catch(() => {});

      fetch(`${websiteApiUrl}/partial-leads/convert`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionFingerprint }),
        signal: AbortSignal.timeout(3000),
      }).catch(() => {});
    }

    return NextResponse.json({ success: true, message: "Marked converted" });
  } catch {
    return NextResponse.json({ success: true });
  }
}
