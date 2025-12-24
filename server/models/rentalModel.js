// import the database connection
const db = require("../config/dbconnection");

const RentalModel = {
  // Define functions related to car rentals

  createRental: function (rental,callback) {
    // Insert a new rental record into the rental table
    const sql = `
      INSERT INTO rentals (car_id, customer_id, start_date, end_date,total_price)
      VALUES (?, ?, ?, ?, ?)`;

    // Execute the query with these parameters to prevent SQL injection
    db.query(
      sql,
      [
        rental.car_id,
        rental.customer_id,
        rental.start_date,
        rental.end_date,
        rental.total_price,
      ],
      callback
    );
  },
};

module.exports = RentalModel;
