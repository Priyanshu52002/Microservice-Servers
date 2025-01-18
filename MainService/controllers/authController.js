const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// Register a new user
exports.registerUser = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  try {
    // Checking if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hashing the password
    const password_hash = await bcrypt.hash(password, 10);

    // Generating a unique API key
    const api_key = crypto.randomBytes(16).toString("hex");

    // Creating a new user
    const newUser = new User({ first_name, last_name, email, password_hash, api_key });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully", api_key });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Login user functionality
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Finding the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Comparing passwords
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generating JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};