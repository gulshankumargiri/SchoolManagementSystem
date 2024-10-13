const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

// Routes
const authRoutes = require('./routes/authRoutes');

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors()); // This takes care of CORS headers
app.use(express.json()); // Parses incoming JSON requests

// Routes
app.use('/api/auth', authRoutes);

// Optional: Custom CORS settings (only if specific customization is needed)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
// Enable cors at the server side. 
// const cors = require('cors')
// const corsOption = {
//     origin: ['http://localhost:5000'],
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
// }
// app.use(cors(corsOption));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
