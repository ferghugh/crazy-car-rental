
// import the database connection 
const db = require("../config/dbconnection");

// Model handles all database communication
const LoginModel = {

  //This function will be called by the controller
  //it checks if a user with this email exists
  // password comparison is handled in the controller using bycrypt
  checkLogin: function(email, callback) {


    const sql = "SELECT * FROM login WHERE email = ?";

    db.query(sql, [email], function(error, result) {
      if(error) return callback(error,null);

      //return the database result to the controller
      callback(null, result);
    });
  }

};
//This line makes the model available to the rest of the  backend.

module.exports = LoginModel;
//The model defines how to interact with the database. 
//It’s responsible for fetching, inserting, updating, or deleting data.

//Example for your login table:

// a user record should contain email,hashed password and role

//? is a placeholder to avoid SQL injection.

//callback is used to return data or errors to the controller.