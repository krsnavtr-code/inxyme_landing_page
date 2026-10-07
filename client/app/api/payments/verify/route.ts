import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      orderId,
      paymentId,
      signature,
      name,
      email,
      phone,
      course = "SAP Webinar",
      paymentAmount = 9,
    } = body;

    if (!orderId || !paymentId || !signature) {
      return NextResponse.json(
        {
          success: false,
          message: "orderId, paymentId, and signature are required",
        },
        { status: 400 }
      );
    }

    const secret =
      process.env.RAZORPAY_KEY_SECRET || "Uw148hiPHHyJyHsTSH1xFWIX";

    // 1. Verify Razorpay cryptographic signature
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(`${orderId}|${paymentId}`);
    const expectedSignature = hmac.digest("hex");

    if (expectedSignature !== signature) {
      console.error("[PAYMENT VERIFICATION FAILED]: Signature mismatch", {
        received: signature,
        expected: expectedSignature,
      });
      return NextResponse.json(
        {
          success: false,
          message: "Invalid payment signature. Verification failed.",
        },
        { status: 400 }
      );
    }

    // 2. Save payment record into inxyme-website's backend & database (DirectPayment collection)
    const websiteApiUrl =
      process.env.INXYME_WEBSITE_API_URL || "https://www.inxyme.com/api";

    const websitePaymentPayload = {
      orderId,
      paymentId,
      signature,
      name: (name || "").trim(),
      email: (email || "").toLowerCase().trim(),
      phone: String(phone || "").trim(),
      course: course ? `SAP Webinar - ${course}` : "SAP Career Webinar",
      address: "Live Webinar Online Attendee",
      paymentAmount: Number(paymentAmount) || 9,
      isCompanyRegistration: false,
    };

    let websiteRecorded = false;
    try {
      const websiteRes = await fetch(`${websiteApiUrl}/payments/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(websitePaymentPayload),
        signal: AbortSignal.timeout(8000),
      });

      if (websiteRes.ok) {
        const websiteData = await websiteRes.json();
        websiteRecorded = websiteData.success;
        console.log(
          "[INXYME-WEBSITE PAYMENT RECORD SAVED]:",
          websiteData
        );
      } else {
        const errText = await websiteRes.text();
        console.warn(
          "[INXYME-WEBSITE PAYMENT RECORD STATUS]:",
          websiteRes.status,
          errText
        );
      }
    } catch (err: any) {
      console.error(
        "Failed to forward payment to inxyme-website backend:",
        err?.message
      );
    }

    // 3. Save lead into inxyme-landing-page database & dispatch admin email
    const landingApiUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5006";

    const landingLeadPayload = {
      name: (name || "").trim(),
      email: (email || "").toLowerCase().trim(),
      phone: String(phone || "").trim(),
      program: `Webinar: ${course}`,
      subdomain: "sap-webinar",
      source: "sap-webinar-rs9-landing",
      qualification: "Paid ₹9 via Razorpay",
      specialisation: course || "SAP",
      time_slot: `Razorpay: ${paymentId}`,
      state: "Online",
    };

    let leadRecorded = false;
    try {
      const leadRes = await fetch(`${landingApiUrl}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(landingLeadPayload),
        signal: AbortSignal.timeout(6000),
      });

      if (leadRes.ok) {
        leadRecorded = true;
        console.log("[INXYME-LANDING-PAGE LEAD RECORDED]:", landingLeadPayload.email);
      }
    } catch (err: any) {
      console.warn("Landing page express backend sync warning:", err?.message);
    }

    // Fallback log in runtime
    console.log("[WEBINAR REGISTRATION COMPLETED]:", {
      orderId,
      paymentId,
      amount: 9,
      email,
      name,
      websiteRecorded,
      leadRecorded,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully. Registration and payment recorded.",
      paymentId,
      orderId,
      websiteRecorded,
      leadRecorded,
    });
  } catch (err: any) {
    console.error("Error in verify payment route:", err);
    return NextResponse.json(
      { success: false, message: err?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
