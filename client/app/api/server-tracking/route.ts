import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const hashData = (value: string | undefined): string | undefined => {
  if (!value || typeof value !== "string") return undefined;
  const normalized = value.trim().toLowerCase();
  if (!normalized) return undefined;
  return crypto.createHash("sha256").update(normalized).digest("hex");
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      eventType = "PageView",
      pageUrl = "/sap-webinar",
      pageTitle = "SAP Career Webinar",
      visitorId,
      fingerprint,
      userData = {},
      customData = {},
    } = body;

    const ipAddress =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";
    const userAgent = req.headers.get("user-agent") || "";

    const websiteApiUrl =
      process.env.INXYME_WEBSITE_API_URL || "https://www.inxyme.com/api";
    const landingApiUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5006";

    // 1. Save directly into inxyme-landing-page server (MySQL server_tracking_logs table)
    try {
      fetch(`${landingApiUrl}/api/server-tracking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventType,
          pageUrl,
          pageTitle,
          visitorId,
          fingerprint,
          userData,
          customData,
        }),
        signal: AbortSignal.timeout(3000),
      }).catch(() => {});
    } catch {}

    // 2. Forward to inxyme-website server-tracking service
    try {
      fetch(`${websiteApiUrl}/server-tracking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventType,
          pageUrl,
          pageTitle,
          visitorId,
          fingerprint,
          ipAddress,
          userAgent,
          userData,
          customData,
        }),
        signal: AbortSignal.timeout(4000),
      }).catch(() => {});
    } catch {}

    // 2. Direct Meta CAPI Dispatch if Meta Pixel token is present
    const pixelId = process.env.META_PIXEL_ID || "1612208420573846";
    const accessToken = process.env.META_CAPI_ACCESS_TOKEN;

    if (accessToken && accessToken.length > 10) {
      const { email, phone, name } = userData;
      const metaPayload = {
        data: [
          {
            event_name: eventType,
            event_time: Math.floor(Date.now() / 1000),
            action_source: "website",
            event_source_url: pageUrl,
            user_data: {
              client_ip_address: ipAddress,
              client_user_agent: userAgent,
              ...(email && { em: [hashData(email)] }),
              ...(phone && { ph: [hashData(phone)] }),
              ...(name && { fn: [hashData(name.split(" ")[0])] }),
              ...(visitorId && { external_id: [hashData(visitorId)] }),
            },
            custom_data: {
              content_name: pageTitle,
              ...customData,
            },
          },
        ],
      };

      fetch(
        `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(metaPayload),
        }
      ).catch(() => {});
    }

    return NextResponse.json({
      success: true,
      message: `Server-side event ${eventType} dispatched`,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err?.message || "Internal error" },
      { status: 500 }
    );
  }
}
