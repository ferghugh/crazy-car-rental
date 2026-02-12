// server/app.js
const express = require('express');

// Import CORS middleware
const cors = require('cors');

//import dotenv 
const dotenv = require('dotenv');

dotenv.config();

// Create an Express application
const app = express();

// Middleware
//Enable CORS for all routes
app.use(cors());
//Reads the body of incoming requests and parses it as JSON
app.use(express.json()); 


// Import routes
const authRoutes = require('./routes/authRoutes')
const loginRoutes = require('./routes/loginRoutes');
const carRoutes = require("./routes/carRoutes");
const rentalRoutes = require("./routes/rentalRoutes");//
const customerRoutes = require("./routes/customerRoutes");
const currencyRoutes = require("./routes/currencyRoutes.js");
const weatherRoutes = require("./routes/weatherRoutes.js");
const paymentRoutes =  require( "./routes/paymentRoutes.js")
const contactRoutes = require("./routes/contactRoutes.js");

// Mount routes under /api
app.use("/api/auth",authRoutes);
app.use('/api', loginRoutes);
app.use("/api", carRoutes);
app.use("/api", rentalRoutes);
app.use("/api", customerRoutes);
app.use("/api/currency",currencyRoutes);
app.use("/api",weatherRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api",contactRoutes);





// Start the server
const PORT = 5000;
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});

// Note! This is the place to  connect everything