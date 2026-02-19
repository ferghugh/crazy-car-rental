const bcrypt = require("bcryptjs");
const db = require("../config/dbconnection");

const RegisterController = {

  register: function (req, res) {

    const { email, password, firstname, lastname } = req.body;

    if (!email || !password || !firstname || !lastname) {
      return res.status(400).json({
        message: "Missing required fields"
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    // Step 1: Insert into customers
    const customerSql = `
      INSERT INTO customers (firstname, lastname, email)
      VALUES (?, ?, ?)
    `;

    db.query(customerSql, [firstname, lastname, email], (error, customerResult) => {

      if (error) {
        return res.status(500).json({ message: "Customer creation failed" });
      }

      const newCustomerId = customerResult.insertId;

      // Step 2: Insert into login
      const loginSql = `
        INSERT INTO login (email, password, role, customer_id)
        VALUES (?, ?, 'user', ?)
      `;

      db.query(loginSql, [email, hashedPassword, newCustomerId], (error2) => {

        if (error2) {
          return res.status(409).json({
            message: "Account already exists"
          });
        }

        res.json({
          success: true,
          message: "Account created successfully"
        });
      });
    });
  }

};

module.exports = RegisterController;
