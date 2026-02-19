console.log("Loading rentalRoutes.js...");
// rentalRoutes.js
// Set up Express router
const express = require("express");
// Create a router instance
const router = express.Router();
// Import the RentalController
const RentalController = require("../controllers/rentalController"); // Importing request from http module
// import authmiddleware
const authMiddleware = require("../middleware/authMiddleware");



// Define the route to create a new rental

router.post("/create-payment-intent", authMiddleware, RentalController.createPaymentIntent);

router.post("/confirm", authMiddleware, RentalController.confirmRental);

// GET current rentals and all rentals
router.get("/", RentalController.getAllRentals);
router.get("/current", RentalController.getCurrentRentals);

// Export the router to be used in app.js
module.exports = router;