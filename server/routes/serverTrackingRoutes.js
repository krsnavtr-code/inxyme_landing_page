const express = require("express");
const router = express.Router();
const {
  logEvent,
  getLogs,
} = require("../controllers/serverTrackingController");

router.post("/server-tracking", logEvent);
router.get("/server-tracking/logs", getLogs);

module.exports = router;
