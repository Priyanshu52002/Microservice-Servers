const express = require("express");
const publicRoutes = require("./routes/publicRoutes");

const app = express();
app.use(express.json());

// Routes
app.use(publicRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Main Service is running!");
});

module.exports = app;