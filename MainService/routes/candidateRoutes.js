const express = require("express");
const { addCandidate, getCandidates } = require("../controllers/candidateController");
const jwtAuth = require("../middlewares/jwtAuth");

const router = express.Router();

// Add a candidate (protected route)
router.post("/api/candidate", jwtAuth, addCandidate);

// Get candidates for the logged-in user (protected route)
router.get("/api/candidate", jwtAuth, getCandidates);

module.exports = router;