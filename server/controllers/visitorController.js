const db = require("../config/db");

/**
 * Track visitor navigation, returning visits, course views & device fingerprint
 */
exports.trackVisitor = async (req, res) => {
  const {
    visitorId,
    fingerprint,
    device = {},
    pageUrl = "/sap-webinar",
    pageTitle = "SAP Webinar",
    courseInterest,
    referrer = "",
  } = req.body;

  if (!visitorId) {
    return res.status(400).json({ success: false, message: "visitorId is required" });
  }

  const ipAddress =
    req.headers["x-forwarded-for"] ||
    req.socket.remoteAddress ||
    "127.0.0.1";
  const userAgent = req.headers["user-agent"] || "";

  try {
    // 1. Check if visitor exists
    const [existing] = await db.execute(
      "SELECT id, total_visits, page_views, name, email, phone, is_known_lead FROM visitors WHERE visitor_id = ?",
      [visitorId]
    );

    let isReturning = false;
    let totalVisits = 1;
    let profileData = null;

    if (existing.length > 0) {
      isReturning = true;
      totalVisits = (existing[0].total_visits || 1) + 1;
      profileData = existing[0];

      await db.execute(
        `UPDATE visitors 
         SET total_visits = total_visits + 1,
             page_views = page_views + 1,
             last_page = ?,
             last_course = COALESCE(?, last_course),
             fingerprint = COALESCE(?, fingerprint),
             ip_address = ?,
             user_agent = ?,
             device_os = COALESCE(?, device_os),
             device_browser = COALESCE(?, device_browser),
             device_type = COALESCE(?, device_type),
             last_seen = CURRENT_TIMESTAMP
         WHERE visitor_id = ?`,
        [
          pageUrl,
          courseInterest || null,
          fingerprint || null,
          ipAddress,
          userAgent,
          device.os || null,
          device.browser || null,
          device.type || null,
          visitorId,
        ]
      );
    } else {
      // If new visitor, check if device fingerprint already matches an existing visitor
      if (fingerprint) {
        const [matchedByFp] = await db.execute(
          "SELECT id, name, email, phone, is_known_lead FROM visitors WHERE fingerprint = ? AND (name IS NOT NULL OR email IS NOT NULL) LIMIT 1",
          [fingerprint]
        );
        if (matchedByFp.length > 0) {
          profileData = matchedByFp[0];
        }
      }

      await db.execute(
        `INSERT INTO visitors 
         (visitor_id, fingerprint, total_visits, page_views, last_page, last_course, ip_address, user_agent, device_os, device_browser, device_type, name, email, phone, is_known_lead)
         VALUES (?, ?, 1, 1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          visitorId,
          fingerprint || null,
          pageUrl,
          courseInterest || null,
          ipAddress,
          userAgent,
          device.os || null,
          device.browser || null,
          device.type || null,
          profileData ? profileData.name : null,
          profileData ? profileData.email : null,
          profileData ? profileData.phone : null,
          profileData ? profileData.is_known_lead : 0,
        ]
      );
    }

    // 2. Insert into visitor_page_views
    await db.execute(
      `INSERT INTO visitor_page_views 
       (visitor_id, fingerprint, page_url, page_title, course_interest, referrer, ip_address) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        visitorId,
        fingerprint || null,
        pageUrl,
        pageTitle,
        courseInterest || null,
        referrer,
        ipAddress,
      ]
    );

    return res.json({
      success: true,
      visitorId,
      isReturning,
      totalVisits,
      knownProfile: profileData
        ? {
            name: profileData.name,
            email: profileData.email,
            phone: profileData.phone,
          }
        : null,
    });
  } catch (err) {
    console.error("Visitor tracking error in MySQL:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * Identify a visitor with concrete contact info (links fingerprint + visitorId to student)
 */
exports.identifyVisitor = async (req, res) => {
  const { visitorId, fingerprint, name, email, phone } = req.body;

  if (!visitorId && !fingerprint) {
    return res.status(400).json({ success: false, message: "visitorId or fingerprint is required" });
  }

  try {
    if (visitorId) {
      await db.execute(
        `UPDATE visitors 
         SET name = COALESCE(?, name),
             email = COALESCE(?, email),
             phone = COALESCE(?, phone),
             fingerprint = COALESCE(?, fingerprint),
             is_known_lead = 1
         WHERE visitor_id = ?`,
        [name || null, email || null, phone || null, fingerprint || null, visitorId]
      );
    }

    if (fingerprint) {
      await db.execute(
        `UPDATE visitors 
         SET name = COALESCE(?, name),
             email = COALESCE(?, email),
             phone = COALESCE(?, phone),
             is_known_lead = 1
         WHERE fingerprint = ?`,
        [name || null, email || null, phone || null, fingerprint]
      );
    }

    return res.json({ success: true, message: "Visitor identified successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * Get visitor profile by visitorId
 */
exports.getVisitor = async (req, res) => {
  const { visitorId } = req.params;

  try {
    const [rows] = await db.execute(
      "SELECT * FROM visitors WHERE visitor_id = ?",
      [visitorId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "Visitor not found" });
    }

    return res.json({ success: true, visitor: rows[0] });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * Lookup visitor profile by hardware browser fingerprint (Incognito / cleared cache recovery)
 */
exports.lookupByFingerprint = async (req, res) => {
  const { fingerprint } = req.params;

  try {
    const [rows] = await db.execute(
      "SELECT name, email, phone, total_visits, last_course FROM visitors WHERE fingerprint = ? AND (name IS NOT NULL OR email IS NOT NULL) ORDER BY last_seen DESC LIMIT 1",
      [fingerprint]
    );

    if (rows.length === 0) {
      return res.json({ success: false, found: false });
    }

    return res.json({ success: true, found: true, profile: rows[0] });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
