const db = require("../config/db");
const { sendLeadNotificationToAdmin } = require("../services/mailService");

exports.captureLead = async (req, res) => {
  const {
    name,
    email,
    phone,
    state,
    qualification,
    specialisation,
    university,
    program,
    subdomain,
    source,
  } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({
      success: false,
      message: "Name, email, and phone number are required",
    });
  }

  const cleanSubdomain = (subdomain || "sap").toLowerCase().trim();

  try {
    // 1. Insert lead record into database
    try {
      await db.execute(
        `INSERT INTO leads (name, email, phone, state, qualification, specialisation, university, program, subdomain, source) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          name.trim(),
          email.trim(),
          phone.trim(),
          state ? state.trim() : null,
          qualification ? qualification.trim() : null,
          specialisation ? specialisation.trim() : null,
          university ? university.trim() : null,
          program ? program.trim() : null,
          cleanSubdomain,
          source ? source.trim() : "landing-page",
        ],
      );
    } catch (colErr) {
      console.warn("Fallback to standard lead insert:", colErr.message);
      await db.execute(
        `INSERT INTO leads (name, email, phone, state, qualification, subdomain, source) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          name.trim(),
          email.trim(),
          phone.trim(),
          state ? state.trim() : null,
          qualification ? qualification.trim() : null,
          cleanSubdomain,
          source ? source.trim() : "landing-page",
        ],
      );
    }

    console.log(
      `[LEAD CAPTURED] ${name} | ${email} | ${phone} | Subdomain: ${cleanSubdomain} | Source: ${source}`,
    );

    // 2. Dispatch email notification to admin asynchronously
    sendLeadNotificationToAdmin({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      state: state ? state.trim() : null,
      qualification: qualification ? qualification.trim() : null,
      specialisation: specialisation ? specialisation.trim() : null,
      university: university ? university.trim() : null,
      program: program ? program.trim() : null,
      subdomain: cleanSubdomain,
      source: source ? source.trim() : "landing-page",
    }).catch((mailErr) => {
      console.error("[MAIL ASYNC ERROR]:", mailErr.message);
    });

    return res.status(201).json({
      success: true,
      message: "Lead captured successfully and saved in database",
    });
  } catch (error) {
    console.error("Lead capture database error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while saving lead",
      error: error.message,
    });
  }
};

exports.getLeads = async (req, res) => {
  const { subdomain } = req.query;

  try {
    let query = "SELECT * FROM leads ORDER BY created_at DESC LIMIT 100";
    let params = [];

    if (subdomain) {
      query =
        "SELECT * FROM leads WHERE subdomain = ? ORDER BY created_at DESC LIMIT 100";
      params = [subdomain.toLowerCase().trim()];
    }

    const [rows] = await db.execute(query, params);
    return res.json({
      success: true,
      count: rows.length,
      leads: rows,
    });
  } catch (error) {
    console.error("Fetch leads error:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching leads",
    });
  }
};

// CRM Sync API Endpoint with authentication and filtering
exports.syncLeads = async (req, res) => {
  const apiKey = req.headers["x-api-key"];
  const CRM_API_KEY = process.env.CRM_API_KEY || "your-secret-crm-api-key";

  // API Key Authentication
  if (!apiKey || apiKey !== CRM_API_KEY) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized - Invalid or missing API key",
    });
  }

  const {
    subdomain,
    last_sync,
    start_date,
    end_date,
    limit = 100,
    offset = 0,
  } = req.query;

  try {
    let query = "SELECT * FROM leads WHERE 1=1";
    let params = [];

    // Subdomain filter
    if (subdomain) {
      query += " AND subdomain = ?";
      params.push(subdomain.toLowerCase().trim());
    }

    // Date range filter (using last_sync timestamp or start_date/end_date)
    if (last_sync) {
      query += " AND created_at >= ?";
      params.push(last_sync);
    } else if (start_date) {
      query += " AND created_at >= ?";
      params.push(start_date);
      if (end_date) {
        query += " AND created_at <= ?";
        params.push(end_date);
      }
    }

    // Ordering and pagination
    query += " ORDER BY created_at DESC LIMIT ? OFFSET ?";
    params.push(parseInt(limit), parseInt(offset));

    const [rows] = await db.execute(query, params);

    // Get total count for pagination
    let countQuery = "SELECT COUNT(*) as total FROM leads WHERE 1=1";
    let countParams = [];

    if (subdomain) {
      countQuery += " AND subdomain = ?";
      countParams.push(subdomain.toLowerCase().trim());
    }

    if (last_sync) {
      countQuery += " AND created_at >= ?";
      countParams.push(last_sync);
    } else if (start_date) {
      countQuery += " AND created_at >= ?";
      countParams.push(start_date);
      if (end_date) {
        countQuery += " AND created_at <= ?";
        countParams.push(end_date);
      }
    }

    const [countResult] = await db.execute(countQuery, countParams);
    const total = countResult[0].total;

    // Get latest sync timestamp for next incremental sync
    const [latestResult] = await db.execute(
      "SELECT MAX(created_at) as latest_sync FROM leads",
    );
    const latestSync = latestResult[0].latest_sync;

    return res.json({
      success: true,
      data: {
        leads: rows,
        pagination: {
          total,
          limit: parseInt(limit),
          offset: parseInt(offset),
          has_more: parseInt(offset) + parseInt(limit) < total,
        },
        sync_info: {
          latest_sync: latestSync,
          synced_count: rows.length,
          timestamp: new Date().toISOString(),
        },
      },
    });
  } catch (error) {
    console.error("CRM sync error:", error);
    return res.status(500).json({
      success: false,
      message: "Error syncing leads",
      error: error.message,
    });
  }
};
