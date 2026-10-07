const db = require('../config/db');

module.exports = async function () {
  console.log("Running Migration 007: Creating tracking, visitor, payment & partial lead tables...");

  try {
    // 1. Partial Leads Table (Drop-offs / onBlur form saves)
    await db.execute(`
      CREATE TABLE IF NOT EXISTS partial_leads (
        id INT AUTO_INCREMENT PRIMARY KEY,
        session_fingerprint VARCHAR(120) NOT NULL UNIQUE,
        visitor_id VARCHAR(120) NULL,
        fingerprint VARCHAR(120) NULL,
        name VARCHAR(255) NULL,
        email VARCHAR(255) NULL,
        phone VARCHAR(50) NULL,
        course_title VARCHAR(255) NULL,
        source VARCHAR(100) DEFAULT 'sap-webinar-landing',
        page_url VARCHAR(255) DEFAULT '/sap-webinar',
        device TEXT NULL,
        converted TINYINT(1) DEFAULT 0,
        alert_sent TINYINT(1) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_session (session_fingerprint),
        INDEX idx_email (email),
        INDEX idx_phone (phone),
        INDEX idx_visitor (visitor_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log("✔ partial_leads table verified/created");

    // 2. Visitors Table (Unique device / returning visitor profiles)
    await db.execute(`
      CREATE TABLE IF NOT EXISTS visitors (
        id INT AUTO_INCREMENT PRIMARY KEY,
        visitor_id VARCHAR(120) NOT NULL UNIQUE,
        fingerprint VARCHAR(120) NULL,
        name VARCHAR(255) NULL,
        email VARCHAR(255) NULL,
        phone VARCHAR(50) NULL,
        total_visits INT DEFAULT 1,
        page_views INT DEFAULT 1,
        last_page VARCHAR(255) NULL,
        last_course VARCHAR(255) NULL,
        ip_address VARCHAR(100) NULL,
        user_agent TEXT NULL,
        device_os VARCHAR(50) NULL,
        device_browser VARCHAR(50) NULL,
        device_type VARCHAR(50) NULL,
        is_known_lead TINYINT(1) DEFAULT 0,
        last_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_visitor_id (visitor_id),
        INDEX idx_fingerprint (fingerprint),
        INDEX idx_visitor_phone (phone)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log("✔ visitors table verified/created");

    // 3. Visitor Page Views / Course Views Log
    await db.execute(`
      CREATE TABLE IF NOT EXISTS visitor_page_views (
        id INT AUTO_INCREMENT PRIMARY KEY,
        visitor_id VARCHAR(120) NOT NULL,
        fingerprint VARCHAR(120) NULL,
        page_url VARCHAR(255) NOT NULL,
        page_title VARCHAR(255) NULL,
        course_interest VARCHAR(255) NULL,
        referrer TEXT NULL,
        ip_address VARCHAR(100) NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_vpv_visitor (visitor_id),
        INDEX idx_vpv_created (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log("✔ visitor_page_views table verified/created");

    // 4. Payments Table (All ₹9 webinar registrations & transactions)
    await db.execute(`
      CREATE TABLE IF NOT EXISTS payments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id VARCHAR(120) NOT NULL,
        payment_id VARCHAR(120) NOT NULL UNIQUE,
        signature VARCHAR(255) NULL,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        course VARCHAR(255) DEFAULT 'SAP Webinar',
        amount DECIMAL(10,2) DEFAULT 9.00,
        currency VARCHAR(10) DEFAULT 'INR',
        status VARCHAR(50) DEFAULT 'success',
        method VARCHAR(50) DEFAULT 'razorpay',
        notes TEXT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_pay_id (payment_id),
        INDEX idx_pay_order (order_id),
        INDEX idx_pay_email (email),
        INDEX idx_pay_phone (phone)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log("✔ payments table verified/created");

    // 5. Server Tracking Logs (Meta CAPI & Server-side tracking logs)
    await db.execute(`
      CREATE TABLE IF NOT EXISTS server_tracking_logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        event_type VARCHAR(100) NOT NULL,
        page_url VARCHAR(255) NULL,
        page_title VARCHAR(255) NULL,
        visitor_id VARCHAR(120) NULL,
        fingerprint VARCHAR(120) NULL,
        ip_address VARCHAR(100) NULL,
        user_agent TEXT NULL,
        user_data TEXT NULL,
        custom_data TEXT NULL,
        status VARCHAR(50) DEFAULT 'dispatched',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_stl_event (event_type),
        INDEX idx_stl_created (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log("✔ server_tracking_logs table verified/created");

    console.log("All tracking tables created successfully in Hostinger MySQL!");
  } catch (err) {
    console.error("Migration 007 Error:", err.message);
    throw err;
  }
};
