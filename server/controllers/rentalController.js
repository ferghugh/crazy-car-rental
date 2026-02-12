// server/controllers/rentalController.js
// Import the RentalModel

const RentalModel = require("../models/rentalModel");

// The controller to handle rental related requests
const RentalController = {

    // Function to create a new rental
  createRental: function (req, res) {

    const rental = req.body;
    // validation
    if (!rental.car_id || !rental.customer_id || !rental.start_date || !rental.end_date || !rental.total_price) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // Call the model function to create a rental
    RentalModel.createRental(req.body, function (error, result) {
       console.log("Creating rental for:", rental.car_id, rental.start_date);
       // Handle duplicate booking gracefully
      if (error) {

        if (error.code === "ER_DUP_ENTRY") {
          return res.status(200).json({
            success: false,
            message: "This car is already booked for the selected dates."
           
          });
           
        }

        console.error("Error creating rental:", error);

        return res.status(500).json({
          success: false,
          message: "Database error"
        });
      }

      // Success response
      res.status(201).json({
        success: true,
        rental_id: result.insertId
      });

    });
  },
  // GET all rentals
getAllRentals: function (req, res) {
  RentalModel.getAllRentals(function (error, result) {

    if (error) {
      console.error("Error fetching rentals:", error);
      return res.status(500).json({
        success: false,
        message: "Error fetching rentals"
      });
    }

    res.json({
      success: true,
      rentals: result
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

      