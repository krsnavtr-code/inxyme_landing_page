const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST || "smtp.hostinger.com",
  port: parseInt(process.env.MAIL_PORT || "465", 10),
  secure:
    process.env.MAIL_PORT === "465" ||
    !process.env.MAIL_PORT ||
    process.env.MAIL_ENCRYPTION === "ssl",
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

/**
 * Verify SMTP connection status on server startup
 */
async function verifySmtpConnection() {
  try {
    await transporter.verify();
    console.log(
      `[SMTP READY] Connected to Hostinger SMTP (${process.env.MAIL_HOST || "smtp.hostinger.com"}:${process.env.MAIL_PORT || 465}) - Ready to send emails.`,
    );
    return true;
  } catch (error) {
    console.error(
      `[SMTP ERROR] Failed to connect to SMTP server: ${error.message}`,
    );
    return false;
  }
}

/**
 * Sends a structured HTML email to the admin whenever a new lead is captured
 */
async function sendLeadNotificationToAdmin(leadData) {
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
    timeSlot,
    time_slot,
  } = leadData;
  const preferredTime = timeSlot || time_slot;

  const adminEmail = process.env.ADMIN_EMAIL || "anand24h@gmail.com";
  const fromName = process.env.MAIL_FROM_NAME || "Inxyme";
  const fromAddress =
    process.env.MAIL_FROM_ADDRESS || "noreply@inxyme.com";

  const cleanPhone = String(phone || "").replace(/[^0-9]/g, "");
  const subject = `🔥 New Lead: ${name} | ${program || "Certification Course"} (${subdomain})`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, Helvetica, sans-serif; background-color: #f4f6fa; margin: 0; padding: 20px; color: #17243a; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 14px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
        .header { background: #1b325e; color: #ffffff; padding: 24px; text-align: center; }
        .header h1 { margin: 0; font-size: 22px; font-weight: 800; color: #ffc21c; }
        .header p { margin: 6px 0 0; font-size: 13px; color: #dce7fa; }
        .content { padding: 25px; }
        .badge { display: inline-block; background: #eef4ff; color: #1565c0; font-weight: bold; font-size: 12px; padding: 5px 12px; border-radius: 20px; margin-bottom: 15px; }
        .table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 14px; }
        .table tr { border-bottom: 1px solid #edf2f7; }
        .table td { padding: 12px 8px; }
        .table td.label { font-weight: bold; color: #4a5568; width: 38%; }
        .table td.value { color: #1a202c; font-weight: 600; }
        .footer { background: #f8fafc; padding: 15px 20px; text-align: center; font-size: 11px; color: #718096; border-top: 1px solid #e2e8f0; }
        .cta-btn { display: inline-block; background: #20c76a; color: #ffffff !important; text-decoration: none; font-weight: bold; padding: 10px 20px; border-radius: 8px; margin-top: 15px; font-size: 13px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Course Enquiry Lead Captured</h1>
          <p>Inxyme E-Learning Platform — Course Enquiry</p>
        </div>
        <div class="content">
          <span class="badge">Subdomain: ${subdomain}</span>
          <table class="table">
            <tr>
              <td class="label">Full Name:</td>
              <td class="value">${name}</td>
            </tr>
            <tr>
              <td class="label">Mobile Number:</td>
              <td class="value"><a href="tel:${phone}" style="color: #1565c0; text-decoration: none; font-weight: bold;">${phone}</a></td>
            </tr>
            <tr>
              <td class="label">Email Address:</td>
              <td class="value"><a href="mailto:${email}" style="color: #1565c0; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td class="label">University:</td>
              <td class="value">${university || "N/A"}</td>
            </tr>
            <tr>
              <td class="label">Program:</td>
              <td class="value">${program || "N/A"}</td>
            </tr>
            <tr>
              <td class="label">Specialisation:</td>
              <td class="value">${specialisation || "Not Specified / General"}</td>
            </tr>
            ${preferredTime ? `
            <tr>
              <td class="label" style="color: #1565c0;">Preferred Free Time:</td>
              <td class="value" style="color: #1565c0; font-weight: bold;">${preferredTime}</td>
            </tr>
            ` : ''}
            ${qualification && !preferredTime ? `
            <tr>
              <td class="label">Highest Qualification:</td>
              <td class="value">${qualification}</td>
            </tr>
            ` : ''}
            ${state ? `
            <tr>
              <td class="label">State:</td>
              <td class="value">${state}</td>
            </tr>
            ` : ''}
            <tr>
              <td class="label">Form Source:</td>
              <td class="value">${source || "Landing Page"}</td>
            </tr>
            <tr>
              <td class="label">Submission Date & Time:</td>
              <td class="value">${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</td>
            </tr>
          </table>
          <div style="text-align: center; margin-top: 20px;">
            <a href="https://wa.me/91${cleanPhone.slice(-10)}" class="cta-btn" style="color: #ffffff;">Chat on WhatsApp →</a>
          </div>
        </div>
        <div class="footer">
          This is an automated real-time lead notification from the Inxyme E-Learning Platform.
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"${fromName}" <${fromAddress}>`,
      to: adminEmail,
      subject: subject,
      html: htmlContent,
    });
    console.log(
      `[EMAIL SENT] Lead notification successfully sent to admin (${adminEmail}) - MessageID: ${info.messageId}`,
    );
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(
      "[EMAIL ERROR] Failed to send email to admin:",
      error.message,
    );
    return { success: false, error: error.message };
  }
}

module.exports = {
  transporter,
  verifySmtpConnection,
  sendLeadNotificationToAdmin,
};
