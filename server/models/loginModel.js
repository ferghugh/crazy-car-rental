
// import the database connection 
const db = require("../config/dbconnection");

// Model handles all database communication
const LoginModel = {

  //This function will be called by the controller
  checkLogin: function(email, password, callback) {
    const sql = "SELECT * FROM login WHERE email = ? AND password = ?";
    db.query(sql, [email, password], function(error, result) {
      if(error) return callback(error,null);
      callback(null, result);
    });
  }

};
//This line makes the model available to the rest of your backend.
//const LoginModel = require("../models/loginModel");

module.exports = LoginModel;
//The model defines how to interact with the database. It’s responsible for fetching, inserting, updating, or deleting data.

//Example for your login table:

//findUser is a function that checks if a username/password exists.

//? is a placeholder to avoid SQL injection.

//callback is used to return data or errors to the controller.