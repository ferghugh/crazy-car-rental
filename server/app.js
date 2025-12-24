
// server/app.js
const express = require('express');
// Import CORS middleware
const cors = require('cors');
// Create an Express application
const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Import routes
const loginRoutes = require('./routes/loginRoutes');
const carRoutes = require("./routes/carRoutes");
const rentalRoutes = require("./routes/rentalRoutes");
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