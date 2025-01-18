const mongoose = require("mongoose");

const CandidateSchema = new mongoose.Schema({
  first_name: {
     type: String, 
     required: true, 
     minlength: [3, "First name must be at least 3 characters long"]
    },
  last_name: { 
    type: String, 
    required: true,
    },
  email: { 
    type: String, 
    required: true,
    match: [/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}/, "Please provide a valid email address"],
    },
  user_id: { // Reference to User
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true }, 
});

module.exports = mongoose.model("Candidate", CandidateSchema);
