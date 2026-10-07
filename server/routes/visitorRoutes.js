const express = require("express");
const router = express.Router();
const {
  trackVisitor,
  identifyVisitor,
  getVisitor,
  lookupByFingerprint,
} = require("../controllers/visitorController");

router.post("/visitors/track", trackVisitor);
router.post("/visitors/identify", identifyVisitor);
router.get("/visitors/:visitorId", getVisitor);
router.get("/visitors/lookup/fingerprint/:fingerprint", lookupByFingerprint);

module.exports = router;
