const express = require("express");
const router = express.Router();
const {
  capturePartialLead,
  markConverted,
  getPartialLeads,
} = require("../controllers/partialLeadController");

router.post("/partial-leads", capturePartialLead);
router.put("/partial-leads/convert", markConverted);
router.get("/partial-leads", getPartialLeads);

module.exports = router;
