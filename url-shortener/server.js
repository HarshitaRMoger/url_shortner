// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');
const urlRoutes = require('./routes/urlRoutes');

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// DB connection
connectDB();

// routes
app.use('/', urlRoutes);

// start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});