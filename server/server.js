require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const pageRoutes = require("./routes/pageRoutes");
const leadRoutes = require("./routes/leadRoutes");
const { verifySmtpConnection } = require("./services/mailService");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", pageRoutes);
app.use("/api", leadRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Database connection check
db.getConnection()
  .then((connection) => {
    console.log("Connected to Hostinger MySQL database (inxyme.com)");
    connection.release();
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
  });

// SMTP Mail Connection Check
verifySmtpConnection();

// Server start
const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(
    `[CRM SYNC API] CRM sync endpoint available at: http://localhost:${PORT}/api/crm/sync`,
  );
  console.log(
    `[CRM SYNC API] Use header: x-api-key: ${process.env.CRM_API_KEY || "your-secret-crm-api-key"}`,
  );
});
