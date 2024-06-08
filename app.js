const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const screenRoutes = require('./Routes/ScreenRoute');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON payloads
app.use(bodyParser.urlencoded({ extended: true })); // To parse URL-encoded payloads

// Routes
app.use('/screens', screenRoutes);

// Health check route
app.get("/", (req, res) => {
    res.send("The server is working");
});

// Export the app
module.exports = app;
