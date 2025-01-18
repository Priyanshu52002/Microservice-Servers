// Get user profile using API key
const axios=require('axios')

exports.getProfile = async (req, res) => {
  const apiKey = req.query.api_key;
  if (!apiKey) {
    return res.status(400).json({ error: "API key is required" });
  }

  try {
    const response = await axios.get(`http://localhost:8000/api/public/profile`, {
      params: { api_key: apiKey },
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.response?.data || "Server error" });
  }
};

// Get all candidates linked to the API key user
exports.getCandidates = async (req, res) => {
  const apiKey = req.query.api_key;
  try {
    if (apiKey) {
      // API key access
      const response = await axios.get(`http://localhost:8000/api/public/candidates`, {
        params: { api_key: apiKey },
      });
      res.status(200).json(response.data);
    } 
    else {
      // JWT token access
      const jwtToken = req.headers.authorization?.split(" ")[1];
      if (!jwtToken) {
        return res.status(401).json({ error: "JWT token is required" });
      }

      const response = await axios.get(`http://localhost:8000/api/candidates`, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });

      res.status(200).json(response.data);
    }
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.response?.data || "Server error" });
  }
};
