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
    const sql = "SELECT rental_id, car_id, customer_id, start_date, end_date, total_price FROM rentals ORDER BY start_date DESC";
    db.query(sql, callback);
  },


// get current  active rentals
getCurrentRentals: function (callback) {
  const sql = `
    SELECT 
      rental_id,
      car_id,
      customer_id,
      start_date,
      end_date,
      total_price,
      CASE
        WHEN start_date > CURDATE() THEN 'Upcoming'
        WHEN start_date <= CURDATE() AND end_date >= CURDATE() THEN 'Current'
        ELSE 'Completed'
      END AS status
    FROM rentals
    ORDER BY start_date DESC
  `;


  db.query(sql, callback);
},

checkCarAvailability: function (car_id, start_date, end_date, callback) {
  const sql = `
    SELECT * FROM rentals
    WHERE car_id = ?
    AND start_date <= ?
    AND end_date >= ?
  `;

  db.query(sql, [car_id, end_date, start_date], callback);
}
};

module.exports = RentalModel;
