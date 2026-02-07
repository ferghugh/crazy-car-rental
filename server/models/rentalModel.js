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

  // get all the rentals
getAllRentals: function (callback) {
    const sql = "SELECT rental_id, car_id, customer_id, start_date, end_date, total_price FROM rentals  ORDER BY start_date DESC";
    db.query(sql, callback);
  },


// get current (active) rentals
getCurrentRentals: function (callback) {
  const sql = `
    SELECT rental_id, car_id, customer_id, start_date, end_date, total_price
    FROM rentals
    WHERE CURDATE() BETWEEN start_date AND end_date
    ORDER BY start_date
  `;

  db.query(sql, callback);
}
};



module.exports = RentalModel;
