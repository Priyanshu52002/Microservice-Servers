const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");

const router = express.Router();

// Register endpoint
router.post("/api/register", registerUser);

// Login endpoint
router.post("/api/login", loginUser);

module.exports = router;