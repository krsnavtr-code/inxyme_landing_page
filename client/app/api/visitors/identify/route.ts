import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { visitorId, fingerprint, device, name, email, phone } = body;

    const websiteApiUrl =
      process.env.INXYME_WEBSITE_API_URL || "https://www.inxyme.com/api";
    const landingApiUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5006";

    // 1. Save in inxyme-landing-page server (MySQL visitors table)
    try {
      await fetch(`${landingApiUrl}/api/visitors/identify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visitorId,
          fingerprint,
          name,
          email,
          phone,
        }),
        signal: AbortSignal.timeout(4000),
      });
    } catch (e: any) {
      console.warn("Landing identify sync warning:", e?.message);
    }

    // 2. Link visitor UUID & hardware fingerprint with lead details in inxyme-website
    try {
      const res = await fetch(`${websiteApiUrl}/visitors/identify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visitorId,
          fingerprint,
          device,
          name,
          email,
          phone,
        }),
        signal: AbortSignal.timeout(4000),
      });

      if (res.ok) {
        const data = await res.json();
        return NextResponse.json(data);
      }
    } catch (e: any) {
      console.warn("Website identify sync warning:", e?.message);
    }

    return NextResponse.json({
      success: true,
      message: "Visitor identified",
      visitorId,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err?.message || "Internal error" },
      { status: 500 }
    );
  }
}
