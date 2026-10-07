const db = require("../config/db");

/**
 * Log server-side events (Meta CAPI / GA4 measurement logs)
 */
exports.logEvent = async (req, res) => {
  const {
    eventType = "PageView",
    pageUrl = "/sap-webinar",
    pageTitle = "SAP Webinar",
    visitorId,
    fingerprint,
    userData = {},
    customData = {},
    status = "dispatched",
  } = req.body;

  const ipAddress =
    req.headers["x-forwarded-for"] ||
    req.socket.remoteAddress ||
    "127.0.0.1";
  const userAgent = req.headers["user-agent"] || "";

  try {
    const userDataStr = typeof userData === "object" ? JSON.stringify(userData) : String(userData || "");
    const customDataStr = typeof customData === "object" ? JSON.stringify(customData) : String(customData || "");

    await db.execute(
      `INSERT INTO server_tracking_logs 
       (event_type, page_url, page_title, visitor_id, fingerprint, ip_address, user_agent, user_data, custom_data, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        eventType,
        pageUrl,
        pageTitle,
        visitorId || null,
        fingerprint || null,
        ipAddress,
        userAgent,
        userDataStr || null,
        customDataStr || null,
        status,
      ]
    );

    return res.json({
      success: true,
      message: `Server event ${eventType} saved in database`,
    });
  } catch (err) {
    console.error("Server tracking logging error:", err.message);
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * Retrieve tracking logs
 */
exports.getLogs = async (req, res) => {
  try {
    const { eventType, search, limit = 50, offset = 0 } = req.query;
    let query = "SELECT * FROM server_tracking_logs WHERE 1=1";
    let params = [];

    if (eventType) {
      query += " AND event_type = ?";
      params.push(eventType);
    }

    if (search && search.trim()) {
      query += " AND (page_url LIKE ? OR visitor_id LIKE ? OR ip_address LIKE ? OR user_data LIKE ?)";
      const pattern = `%${search.trim()}%`;
      params.push(pattern, pattern, pattern, pattern);
    }

    // Count query
    let countQuery = query.replace("SELECT *", "SELECT COUNT(*) as total");
    const [countRows] = await db.execute(countQuery, params);
    const total = countRows[0]?.total || 0;

    query += " ORDER BY created_at DESC LIMIT ? OFFSET ?";
    params.push(parseInt(limit), parseInt(offset));

    const [rows] = await db.execute(query, params);
    return res.json({ success: true, count: rows.length, total, data: rows });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
