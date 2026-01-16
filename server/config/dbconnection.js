const mysql = require('mysql2'); // changed due to error 'mysql'

// create the connection to database
const dbconnection = mysql.createConnection({//object with connection details
  host: 'localhost',
  user: 'root',
  password: 'Pfizer53',
  database: 'car_rental'
});

/*
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  let sql = "CREATE TABLE login (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(25), password VARCHAR(25))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(" Login Table created");
  });
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  const sql = "insert into login (email, password) VALUES ('fergal@example.com', 'admin')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});

*/
// connect when the file loads
dbconnection.connect(function(error){
  if(error)throw error;
  console.log("connected to the database");
});

// export the connection so models can use it
module.exports = dbconnection;
//This file is where you connect to your MySQL database. 
// Think of it as the “bridge” between your Node.js backend and the database.
//Explanation:

//mysql.createConnection sets up the database connection.

//con.connect actually opens the connection.

//Exporting con allows other parts of your app (controllers/models) to use this connection.

// You shouldn’t run queries directly here. Keep it only for connection, so your MVC structure stays clean.