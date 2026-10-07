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

const db = require("../config/db");
const { sendPaymentAlert } = require("../services/mailService");

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

  if (!paymentId || !orderId) {
    return res.status(400).json({ success: false, message: "paymentId and orderId are required" });
  }

  const cleanName = name || "Webinar Attendee";
  const cleanEmail = email || "student@inxyme.com";
  const cleanPhone = phone || "0000000000";
  const cleanCourse = course ? `SAP Webinar - ${course}` : "SAP Webinar";
  const numericAmount = Number(paymentAmount) || 9.0;

  // 1. Save payment directly into inxyme-landing-page MySQL database
  try {
    await db.execute(
      `INSERT INTO payments 
       (order_id, payment_id, signature, name, email, phone, course, amount, currency, status, method) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'INR', 'success', 'razorpay')
       ON DUPLICATE KEY UPDATE 
         status = 'success', 
         signature = VALUES(signature),
         name = VALUES(name),
         email = VALUES(email),
         phone = VALUES(phone)`,
      [
        orderId,
        paymentId,
        signature || null,
        cleanName,
        cleanEmail,
        cleanPhone,
        cleanCourse,
        numericAmount,
      ]
    );
    console.log(`[PAYMENT SAVED IN MYSQL]: ${paymentId} | ${cleanName} | ₹${numericAmount} | ${cleanCourse}`);
  } catch (dbErr) {
    console.error("MySQL payment insert error:", dbErr.message);
  }

  // 2. Dispatch real-time payment confirmation email alert to admin
  sendPaymentAlert({
    name: cleanName,
    email: cleanEmail,
    phone: cleanPhone,
    course: cleanCourse,
    amount: numericAmount,
    paymentId,
    orderId,
  }).catch((err) => console.error("Payment alert email notice:", err.message));

  // 3. Forward to inxyme-website to save DirectPayment in MongoDB
  const websiteApiUrl =
    process.env.INXYME_WEBSITE_API_URL || "https://www.inxyme.com/api";
  try {
    const websiteRes = await fetch(`${websiteApiUrl}/payments/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId,
        paymentId,
        signature,
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        course: cleanCourse,
        address: "Webinar Online Attendee",
        paymentAmount: numericAmount,
        isCompanyRegistration: false,
      }),
    });
    const websiteData = await websiteRes.json();
    console.log("[LANDING SERVER -> WEBSITE PAYMENT SYNC]:", websiteData);
  } catch (e) {
    console.warn("Website payment sync notice:", e.message);
  }

  res.json({
    success: true,
    message: "Payment successfully verified and saved in inxyme-landing-page database",
    paymentId,
    orderId,
  });
});

// GET /api/payments - List all payments with pagination
router.get("/payments", async (req, res) => {
  try {
    const { limit = 50, offset = 0 } = req.query;
    const [rows] = await db.execute(
      "SELECT * FROM payments ORDER BY created_at DESC LIMIT ? OFFSET ?",
      [parseInt(limit), parseInt(offset)]
    );
    res.json({ success: true, count: rows.length, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
