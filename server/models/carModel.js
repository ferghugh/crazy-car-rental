// The model handles the Http and and errors that may occur

const db = require("../config/dbconnection");

// Function to get all cars from the database
const CarModel = {
  getAllCars: function (callback) {
    // SQL query to select car details along with their model information
    const sql = `
      SELECT 
        c.car_id,
        c.registration_number,
        c.car_status,
        cm.car_make,
        cm.car_model,
        cm.car_year,
        cm.price_per_day,
        cm.image_url
      FROM cars c
      JOIN car_model cm ON c.car_model_id = cm.car_model_id `;
      // Execute the query
    db.query(sql, function (error, results) {
      // Handle any errors during the query execution
      if (error) {
        return callback(error, null);
      }
      // Return the results through the callback
      callback(null, results);
    });
  },
};

module.exports = CarModel;
