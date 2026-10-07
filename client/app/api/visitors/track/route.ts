import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { visitorId, fingerprint, device, pageUrl, pageTitle, referrer } = body;

    if (!visitorId || !pageUrl) {
      return NextResponse.json({
        success: false,
        message: "visitorId and pageUrl are required",
      });
    }

    const websiteApiUrl =
      process.env.INXYME_WEBSITE_API_URL || "https://www.inxyme.com/api";
    const landingApiUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5006";

    // 1. Save directly into inxyme-landing-page server (MySQL visitors & visitor_page_views)
    let landingData = null;
    try {
      const landingRes = await fetch(`${landingApiUrl}/api/visitors/track`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visitorId,
          fingerprint,
          device,
          pageUrl,
          pageTitle,
          referrer,
        }),
        signal: AbortSignal.timeout(5000),
      });
      if (landingRes.ok) {
        landingData = await landingRes.json();
      }
    } catch (landingErr: any) {
      console.warn("Landing visitor track error:", landingErr?.message);
    }

    // 2. Also forward to inxyme-website visitor tracker (MongoDB sync)
    try {
      fetch(`${websiteApiUrl}/visitors/track`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visitorId,
          fingerprint,
          device,
          pageUrl,
          pageTitle,
          referrer,
        }),
        signal: AbortSignal.timeout(4000),
      }).catch(() => {});
    } catch (e: any) {
      console.warn("Website visitor sync warning:", e?.message);
    }

    if (landingData) {
      return NextResponse.json(landingData);
    }

    return NextResponse.json({
      success: true,
      message: "Visitor track recorded locally",
      visitorId,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err?.message || "Internal error" },
      { status: 500 }
    );
  }
}
