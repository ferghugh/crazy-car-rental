// Import the express module
const express = require('express');
// Create a router instance
const router = express.Router();
// Import the CustomerController
const db = require("../config/dbconnection");
const { request } = require('http');

// Define the route to get all customers
router.post('/customers', (req, res) => {
   const{
    firstname,
    lastname,
    address,
    city,   
    county,
    postcode,
    phone,
    email,  
    driver_license
    // extract customer data from request body

   }= req.body;
   
if (!firstname || !lastname) {
    return res.status(400).json({ message: "First and last name required" });
  }
// SQL query to insert a new customer
  const sql = `
    INSERT INTO customers
    (firstname, lastname, address, city, county, postcode, phone, email, driver_license)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
// Execute the query with the provided customer data
  db.query(
    sql,
    [firstname, lastname, address, city, county, postcode, phone, email, driver_license],
    // Callback function to handle the result of the query
    (err, result) => {
        // Handle any errors that occur during the query execution
      if (err) {
        // Check for duplicate entry error (e.g., unique constraint violation)
        if (err.code === "ER_DUP_ENTRY") {
            // Send a 409 Conflict response if email or driver license already exists
          return res.status(409).json({
            message: "Email or driver licence already exists"
          });
        }
        // For other errors, send a 500 Internal Server Error response
        return res.status(500).json(err);
      }

      // Send a success response with the new customer's ID
      res.json({
        success: true,
        customer_id: result.insertId
      });
    }
  );
});

// Export the router to be used in other parts of the application

module.exports = router;
  