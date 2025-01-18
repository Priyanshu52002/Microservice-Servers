const express = require("express");
const { getProfile, getCandidates } = require("../controllers/publicController");

const router = express.Router();

// Public API endpoints
router.get("/api/public/profile",getProfile);
router.get("/api/public/candidates",getCandidates);

module.exports = router;