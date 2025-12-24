console.log("customerRoutes loaded");
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
    

   }= req.body;
if (!firstname || !lastname) {
    return res.status(400).json({ message: "First and last name required" });
  }

  const sql = `
    INSERT INTO customers
    (firstname, lastname, address, city, county, postcode, phone, email, driver_license)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [firstname, lastname, address, city, county, postcode, phone, email, driver_license],
    (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(409).json({
            message: "Email or driver licence already exists"
          });
        }
        return res.status(500).json(err);
      }

      res.json({
        success: true,
        customer_id: result.insertId
      });
    }
  );
});

module.exports = router;
  