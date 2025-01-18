// controllers/candidateController.js
const Candidate = require("../models/Candidate");

// Add a candidate
exports.addCandidate = async (req, res) => {
  const { first_name, last_name, email } = req.body;
  const userId = req.userId; // Extracted from JWT middleware

  try {
    // Checking if candidate already exists
    // const existingCandidate = await Candidate.findOne({ email });
        
    // if (existingCandidate) {
    //     return res.status(400).json({ error: "Candidate already exists" });
    // }
    
    // Create a new candidate
    const newCandidate = new Candidate({ first_name, last_name, email, user_id: userId });
    await newCandidate.save();

    res.status(201).json({ message: "Candidate added successfully", candidate: newCandidate });
  } catch (error) {
    res.status(500).json({ error: "Failed to add candidate" });
  }
};

// Retrieve candidates for the logged-in user
exports.getCandidates = async (req, res) => {
  const userId = req.userId; 
  try {
    const candidates = await Candidate.find({ user_id: userId });

    if (!candidates.length) {
      return res.status(404).json({ message: "No candidates have been added by the user." });
    }

    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve candidates" });
  }
};


// Retrieve candidates for the Api-key user
exports.getPublicCandidates = async (req, res) => {
  const userId = req.user._id; 
  try {
    const candidates = await Candidate.find({ user_id: userId });

    if (!candidates.length) {
      return res.status(404).json({ message: "No candidates have been added by the user." });
    }

    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve candidates" });
  }
};

exports.getProfile= async(req,res)=>{
  const { first_name, last_name, email } = req.user;
  res.status(200).json({ first_name, last_name, email });
};
