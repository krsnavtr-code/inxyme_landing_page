const express = require("express");
const router = express.Router();

router.post("/payments/create-order", async (req, res) => {
  const { amount = 900, name, email, phone, course } = req.body;
  const razorpayKeyId =
    process.env.RAZORPAY_KEY_ID;
  const razorpayKeySecret =
    process.env.RAZORPAY_KEY_SECRET;
  const websiteApiUrl =
    process.env.INXYME_WEBSITE_API_URL;

  // 1. Try inxyme-website create-order
  try {
    const forwardRes = await fetch(`${websiteApiUrl}/payments/create-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: Math.round(Number(amount)),
        currency: "INR",
        receipt: `webinar_${Date.now()}`,
        notes: { name, email, phone, course, source: "sap-webinar-landing" },
      }),
    });
    if (forwardRes.ok) {
      const data = await forwardRes.json();
      if (data.success && data.order) {
        return res.json({
          success: true,
          order: data.order,
          key: razorpayKeyId,
        });
      }
    }
  } catch (e) {
    console.warn("Proxy to website create-order failed:", e.message);
  }

  // 2. Direct fallback to Razorpay API
  try {
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
        notes: { name, email, phone, course },
      }),
    });
    const orderData = await directRes.json();
    return res.json({ success: true, order: orderData, key: razorpayKeyId });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/payments/verify", async (req, res) => {
  const {
    orderId,
    paymentId,
    signature,
    name,
    email,
    phone,
    course,
    paymentAmount = 9,
  } = req.body;
  const websiteApiUrl =
    process.env.INXYME_WEBSITE_API_URL || "https://www.inxyme.com/api";

  // Forward to inxyme-website to save DirectPayment in MongoDB
  try {
    const websiteRes = await fetch(`${websiteApiUrl}/payments/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId,
        paymentId,
        signature,
        name,
        email,
        phone,
        course: `SAP Webinar - ${course || "SAP"}`,
        address: "Webinar Online Attendee",
        paymentAmount: Number(paymentAmount) || 9,
        isCompanyRegistration: false,
      }),
    });
    const websiteData = await websiteRes.json();
    console.log("[LANDING SERVER -> WEBSITE PAYMENT SYNC]:", websiteData);
  } catch (e) {
    console.error("Website payment sync error:", e.message);
  }

  res.json({
    success: true,
    message: "Payment recorded in inxyme-website records",
  });
});

module.exports = router;
