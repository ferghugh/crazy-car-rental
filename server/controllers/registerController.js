const bcrypt = require("bcryptjs");
const db = require("../config/dbconnection");

const RegisterController = {

  register: function (req, res) {
    const { email, password } = req.body;

    //  validation
    if (!email || !password) {
      return res.status(400).json({ message: "Missing email or password" });
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    const sql =
      "INSERT INTO login (email, password, role) VALUES (?, ?, 'user')";

    db.query(sql, [email, hashedPassword], (error, result) => {
      if (error) {
        // Duplicate email (unique constraint)
        return res
          .status(409)
          .json({ message: "Account already exists" });
      }

      res.json({
        success: true,
        message: "Account created successfully"
      });
    });
  }

};

module.exports = RegisterController;
