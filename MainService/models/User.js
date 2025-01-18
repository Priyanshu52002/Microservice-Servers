const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  first_name: { 
    type: String, 
    required: true,
    minlength: [3, "First name must be at least 3 characters long"]
},
  last_name: { 
    type: String, 
    required: true ,
},
  email: { 
    type: String, 
    required: true, 
    unique: true ,
    match: [/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}/, "Please provide a valid email address"],
},
  password_hash: { 
    type: String, 
    required: true,
    minlength: [6, "Password must be at least 6 characters long"],
},
  api_key: { 
    type: String, 
    required: true, 
    unique: true  
},
});

module.exports = mongoose.model("User", UserSchema);
