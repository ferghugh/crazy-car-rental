
// The route calls the controller function to get the list of cars

const express = require('express');
// Create a router instance
const router = express.Router();
// Import the CarController
const CarController = require("../controllers/carController");
// Define the route to get all cars
router.get('/cars', CarController.getCars);

// Export the router to be used in app.js
module.exports = router;
