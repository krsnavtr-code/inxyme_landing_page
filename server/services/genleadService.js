const GENLEAD_BASE_URL = process.env.GENLEAD_API_URL || "https://genlead.in";
const GENLEAD_SECRET_KEY = process.env.GENLEAD_SECRET_KEY || "eklabya_contact_secret_key_2026";

/**
 * Real-time automatic push of Full or Partial Lead to Genlead CRM
 */
async function pushToGenlead(leadData) {
  try {
    const payload = {
      name: leadData.name || "",
      full_name: leadData.name || "",
      email: leadData.email || "",
      phone: leadData.phone || "",
      mobile: leadData.phone || "",
      courses: leadData.course || leadData.program || leadData.courseTitle || "General Inquiry",
      course: leadData.course || leadData.program || leadData.courseTitle || "General Inquiry",
      lead_source: leadData.source || leadData.lead_source || "Landing Page",
      lead_type: leadData.lead_type || (leadData.is_partial ? "Partial Form Lead" : "Landing Page Lead"),
      utm_source: leadData.utm_source || "",
      utm_campaign: leadData.utm_campaign || leadData.campaign || "",
      utm_medium: leadData.utm_medium || "",
      landing_page: leadData.landing_page || leadData.pageUrl || "",
      message: leadData.message || (leadData.state ? `State: ${leadData.state}` : "") || "",
    };

    console.log(`[GENLEAD SYNC] Pushing ${payload.lead_type} to Genlead...`, {
      name: payload.name,
      phone: payload.phone,
      source: payload.lead_source,
    });

    // Primary endpoint: /api/push-lead, Fallback: /api/eklabya-lead
    const primaryUrl = GENLEAD_BASE_URL.includes("/api/") ? GENLEAD_BASE_URL : `${GENLEAD_BASE_URL}/api/push-lead`;
    const fallbackUrl = `${GENLEAD_BASE_URL.replace(/\/api\/.*$/, "")}/api/eklabya-lead`;

    let response = await fetch(primaryUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "x-secret-key": GENLEAD_SECRET_KEY,
      },
      body: JSON.stringify(payload),
    });

    if (response.status === 404) {
      console.log(`[GENLEAD SYNC] Primary endpoint 404, using live fallback: ${fallbackUrl}`);
      response = await fetch(fallbackUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "x-secret-key": GENLEAD_SECRET_KEY,
        },
        body: JSON.stringify(payload),
      });
    }

    const data = await response.json().catch(() => ({}));
    if (response.ok) {
      console.log(`[GENLEAD SYNC SUCCESS] Lead synced to Genlead CRM: ID ${data.lead_id}`);
      return { success: true, lead_id: data.lead_id };
    } else {
      console.warn(`[GENLEAD SYNC WARNING] HTTP ${response.status}:`, data);
      return { success: false, error: data };
    }
  } catch (err) {
    console.error("[GENLEAD SYNC ERROR]:", err.message);
    return { success: false, error: err.message };
  }
}

module.exports = { pushToGenlead };
