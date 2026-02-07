const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const LoginModel = require("../models/loginModel");

exports.login = (req, res) => {
  const { email, password } = req.body;

  //  Validate input
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required"
    });
  }

  // Query database
  LoginModel.checkLogin(email, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = result[0];

    // Compare passwords
    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // JWT
    const token = jwt.sign(
      {
        id: user.login_id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    //  Respond
    res.json({
      token,
      user: {
        id: user.login_id,
        email: user.email,
        role: user.role
      }
    });
  });
};
