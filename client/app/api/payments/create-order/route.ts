import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount = 900, name, email, phone, course = "SAP Webinar" } = body;

    const razorpayKeyId =
      process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
      process.env.RAZORPAY_KEY_ID ||
      "rzp_live_TJDgLF2UiO13Pl";
    const razorpayKeySecret =
      process.env.RAZORPAY_KEY_SECRET || "Uw148hiPHHyJyHsTSH1xFWIX";
    const websiteApiUrl =
      process.env.INXYME_WEBSITE_API_URL || "https://www.inxyme.com/api";

    // 1. Try to create order via inxyme-website backend
    try {
      const orderPayload = {
        amount: Math.round(Number(amount)),
        currency: "INR",
        receipt: `webinar_${Date.now()}`,
        notes: {
          name: name || "",
          email: email || "",
          phone: phone || "",
          course: course || "SAP Webinar",
          source: "sap-webinar-landing",
        },
      };

      const res = await fetch(`${websiteApiUrl}/payments/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
        signal: AbortSignal.timeout(6000),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.order) {
          return NextResponse.json({
            success: true,
            order: data.order,
            key: razorpayKeyId,
          });
        }
      }
    } catch (websiteErr: any) {
      console.warn(
        "inxyme-website create-order proxy error, falling back to Razorpay direct API:",
        websiteErr?.message
      );
    }

    // 2. Direct fallback using Razorpay Orders API
    const authHeader = Buffer.from(
      `${razorpayKeyId}:${razorpayKeySecret}`
    ).toString("base64");

    const directRes = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${authHeader}`,
      },
      body: JSON.stringify({
        amount: Math.round(Number(amount)),
        currency: "INR",
        receipt: `webinar_${Date.now()}`,
        notes: {
          name: name || "",
          email: email || "",
          phone: phone || "",
          course: course || "SAP Webinar",
          source: "sap-webinar-landing",
        },
      }),
      signal: AbortSignal.timeout(6000),
    });

    if (directRes.ok) {
      const directOrder = await directRes.json();
      return NextResponse.json({
        success: true,
        order: directOrder,
        key: razorpayKeyId,
      });
    }

    const errText = await directRes.text();
    console.error("Razorpay direct API error:", errText);
    return NextResponse.json(
      { success: false, message: "Failed to create payment order" },
      { status: 500 }
    );
  } catch (err: any) {
    console.error("Error in create-order API route:", err);
    return NextResponse.json(
      { success: false, message: err?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
