const db = require("../config/db");
const { sendPartialLeadAlert } = require("../services/mailService");

/**
 * Capture or update partial form fills (onBlur auto-save / exit intent)
 */
exports.capturePartialLead = async (req, res) => {
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
  } = req.body;

  const cleanFingerprint = sessionFingerprint || `fp_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  const cleanPhone = phone ? phone.trim() : null;
  const cleanEmail = email ? email.trim() : null;
  const cleanName = name ? name.trim() : null;

  const hasContact = Boolean(cleanPhone || cleanEmail);

  if (!hasContact) {
    return res.status(200).json({
      success: true,
      message: "No contact info yet to store",
      sessionFingerprint: cleanFingerprint,
    });
  }

  try {
    const deviceStr = typeof device === "object" ? JSON.stringify(device) : String(device || "");

    // Check if partial lead exists
    const [existing] = await db.execute(
      "SELECT id, alert_sent, phone, email, name FROM partial_leads WHERE session_fingerprint = ?",
      [cleanFingerprint]
    );

    let isNewAlertNeeded = false;

    if (existing.length > 0) {
      const record = existing[0];
      // Update existing record
      await db.execute(
        `UPDATE partial_leads 
         SET name = COALESCE(?, name),
             email = COALESCE(?, email),
             phone = COALESCE(?, phone),
             course_title = COALESCE(?, course_title),
             source = COALESCE(?, source),
             page_url = COALESCE(?, page_url),
             visitor_id = COALESCE(?, visitor_id),
             fingerprint = COALESCE(?, fingerprint),
             device = COALESCE(?, device),
             updated_at = CURRENT_TIMESTAMP
         WHERE session_fingerprint = ?`,
        [
          cleanName,
          cleanEmail,
          cleanPhone,
          courseTitle,
          source,
          pageUrl,
          visitorId || null,
          fingerprint || null,
          deviceStr || null,
          cleanFingerprint,
        ]
      );

      // If we previously had no phone/email and now we do, and no alert sent yet
      if (!record.alert_sent && (cleanPhone || cleanEmail)) {
        isNewAlertNeeded = true;
      }
    } else {
      // Insert new partial lead
      await db.execute(
        `INSERT INTO partial_leads 
         (session_fingerprint, visitor_id, fingerprint, name, email, phone, course_title, source, page_url, device, alert_sent) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)`,
        [
          cleanFingerprint,
          visitorId || null,
          fingerprint || null,
          cleanName,
          cleanEmail,
          cleanPhone,
          courseTitle,
          source,
          pageUrl,
          deviceStr || null,
        ]
      );
      isNewAlertNeeded = true;
    }

    console.log(
      `[PARTIAL LEAD SAVED IN MYSQL]: ${cleanName || "Visitor"} | Phone: ${cleanPhone || "N/A"} | Email: ${cleanEmail || "N/A"} | Course: ${courseTitle}`
    );

    // Send real-time email alert if new contact captured
    if (isNewAlertNeeded && (cleanPhone || cleanEmail)) {
      sendPartialLeadAlert({
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        courseTitle,
        pageUrl,
        source,
      }).then((result) => {
        if (result && result.success) {
          db.execute(
            "UPDATE partial_leads SET alert_sent = 1 WHERE session_fingerprint = ?",
            [cleanFingerprint]
          ).catch(() => {});
        }
      }).catch((e) => console.error("Mail alert error:", e.message));
    }

    return res.status(200).json({
      success: true,
      message: "Partial lead saved in inxyme-landing-page database",
      sessionFingerprint: cleanFingerprint,
    });
  } catch (error) {
    console.error("Partial lead MySQL error:", error);
    return res.status(500).json({
      success: false,
      message: "Database error saving partial lead",
      error: error.message,
    });
  }
};

/**
 * Mark a partial lead as converted (user completed registration & paid)
 */
exports.markConverted = async (req, res) => {
  const { sessionFingerprint } = req.body;
  if (!sessionFingerprint) {
    return res.status(400).json({ success: false, message: "sessionFingerprint is required" });
  }

  try {
    await db.execute(
      "UPDATE partial_leads SET converted = 1 WHERE session_fingerprint = ?",
      [sessionFingerprint]
    );
    return res.json({ success: true, message: "Marked as converted" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * Get all partial leads with filtering
 */
exports.getPartialLeads = async (req, res) => {
  try {
    const { converted, limit = 50, offset = 0 } = req.query;
    let query = "SELECT * FROM partial_leads WHERE 1=1";
    let params = [];

    if (converted !== undefined) {
      query += " AND converted = ?";
      params.push(Number(converted));
    }

    query += " ORDER BY updated_at DESC LIMIT ? OFFSET ?";
    params.push(parseInt(limit), parseInt(offset));

    const [rows] = await db.execute(query, params);
    return res.json({ success: true, count: rows.length, data: rows });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
