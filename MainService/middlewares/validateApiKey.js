const User = require("../models/User");

const validateApiKey = async (req, res, next) => {
  const apiKey = req.query.api_key; // Extracting API key from query parameters

  if (!apiKey) {
    return res.status(400).json({ error: "API key is required" });
  }

  try {
    const user = await User.findOne({ api_key: apiKey });
    // console.log("inside validate",user)
    if (!user) {
      return res.status(403).json({ error: "Invalid API key" });
    }

    req.user = user; // Attaching user information to request
    next();
  } catch (error) {
    res.status(500).json({ error: "Server error during API key validation" });
  }
};

module.exports = validateApiKey;