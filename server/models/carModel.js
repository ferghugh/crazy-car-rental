// The model handles the Http and and errors that may occur

const db = require("../config/dbconnection");

const CarModel = {
  getAllCars: function (callback) {
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
    db.query(sql, function (error, results) {
      if (error) {
        return callback(error, null);
      }
      callback(null, results);
    });
  },
};

module.exports = CarModel;
