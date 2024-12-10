const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
const path = require("path");

connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
