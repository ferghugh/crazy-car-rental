// server/controllers/rentalController.js
// Import the RentalModel

const RentalModel = require("../models/rentalModel");

// The controller to handle rental related requests
const RentalController = {
    // Function to create a new rental
  createRental: function (request, response) {
    // Call the model function to create a rental
    RentalModel.createRental(request.body, function (error, result) {
        // Handle any errors
      if (error) {
        console.error("Error creating rental:", error);
        return response
          .status(500)
          .json({ success: false, message: "Database error" });
      }
      // Send success response
      // Respond with the new rental ID

      response.json({
        success: true,
        rental_id: result.insertId,
      });
    });
  },

// GET current rentals
getCurrentRentals: function (req, res) {
  RentalModel.getCurrentRentals(function (error, result) {
    if (error) {
      console.error("Error fetching current rentals:", error);
      return res.status(500).json({
        success: false,
        message: "Error fetching current rentals"
      });
    }
  
  res.json({
    success: true,
    rentals: result
  });
  });
}
};

module.exports = RentalController;
