
// server/app.js
const express = require('express');
// Import CORS middleware
const cors = require('cors');
// Create an Express application
const app = express();

// Middleware
//Enable CORS for all routes
app.use(cors());
//Reads the body of incoming requests and parses it as JSON
app.use(express.json()); // step 2 to handle json data


// Import routes
const loginRoutes = require('./routes/loginRoutes');
const carRoutes = require("./routes/carRoutes");
const rentalRoutes = require("./routes/rentalRoutes");//
const customerRoutes = require("./routes/customerRoutes");

// Mount routes under /api
app.use('/api', loginRoutes);
app.use("/api", carRoutes);
app.use("/api", rentalRoutes);
app.use("/api", customerRoutes);


// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//This is where you connect everything:

//    /api prefix helps organize routes.

//  Starts your Express server.