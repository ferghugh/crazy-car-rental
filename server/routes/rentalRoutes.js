// rentalRoutes.js
// Set up Express router
const express = require("express");
// Create a router instance
const router = express.Router();
// Import the RentalController
const RentalController = require("../controllers/rentalController"); // Importing request from http module

// Define the route to create a new rental
router.post("/rentals", RentalController.createRental);// when a POST request is made to /rentals, call createRental function in the controller

// GET current rentals
router.get("/rentals/current", RentalController.getCurrentRentals);

// Export the router to be used in app.js
module.exports = router;