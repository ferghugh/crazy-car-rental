// rentalRoutes.js
// test to see if file is loaded

console.log("rentalRoutes.js is loaded");
// Set up Express router
const express = require("express");
// Create a router instance
const router = express.Router();
// Import the RentalController
const RentalController = require("../controllers/rentalController");

// Define the route to create a new rental
router.post("/rentals", RentalController.createRental);

// Export the router to be used in app.js
module.exports = router;