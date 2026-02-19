
const LoginModel = require("../models/loginModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const LoginController = {

  login: async function (request, response) {
    const { email, password } = request.body;
  

    LoginModel.checkLogin(email, async function (error, result) {
      if (error) {
        console.error("Login error:", error);
        return response.status(500).json({ success: false, error: "Server issue" });
      }
     
      if (result.length === 0) {
        return response.status(401).json({
          success: false,
          message: "Invalid email or password"
        });
      }

      const user = result[0];

      // compare hashed password
      const isMatch =  bcrypt.compareSync(password, user.password);
      if (!isMatch) {
          return response.status(401).json({
          success: false,
          message: "Invalid email or password"
           
        });
      }

      // create the jwt
      const token = jwt.sign(
        { login_id: user.login_id,
          customer_id: user.customer_id, 
          role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      response.json({
        success: true,
        token,
        user: {
          customer_id: user.customer_id,
          role: user.role,
          email: user.email
        }
      });
    });
  }

};


module.exports = LoginController;
