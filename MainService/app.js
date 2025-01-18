const express = require("express");
const authRoutes = require("./routes/authRoutes");
const candidateRoutes = require("./routes/candidateRoutes");
const publicApiRoutes=require("./routes/publicApiRoutes")

const app = express();
app.use(express.json());

// Routes
app.use(authRoutes);
app.use(candidateRoutes);
app.use(publicApiRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Main Service is running!");
});

module.exports = app;