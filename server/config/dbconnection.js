const mysql = require('mysql2'); // changed due to error 'mysql'

// create the connection to database
const dbconnection = mysql.createConnection({//object with connection details
  host: 'localhost',
  user: 'root',
  password: 'Pfizer53',
  database: 'car_rental'
});


// connect when the file loads
dbconnection.connect(function(error){
  if(error)throw error;
  console.log("connected to the database");
});

// export the connection so models can use it
module.exports = dbconnection;
//This file is where we connect MySQL database. 
// Think of it as the “bridge” between your Node.js backend and the database.
//Explanation:

//mysql.createConnection sets up the database connection.

//con.connect actually opens the connection.

//Exporting con allows other parts of your app (controllers/models) to use this connection.

// don't run queries directly here. Keep it only for connection, so the  MVC structure stays clean.