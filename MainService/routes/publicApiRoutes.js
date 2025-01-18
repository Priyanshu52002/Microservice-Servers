const express = require("express");
const validateApiKey = require("../middlewares/validateApiKey");
const Candidate = require("../models/Candidate");
const { getPublicCandidates , getProfile}=require("../controllers/candidateController")

const router = express.Router();

// Fetch user profile (using API key )
router.get("/api/public/profile",validateApiKey,getProfile);

// Fetch candidates (using API key)
router.get("/api/public/candidates",validateApiKey,getPublicCandidates);

module.exports = router;