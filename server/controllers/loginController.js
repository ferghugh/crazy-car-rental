const LoginModel = require("../models/loginModel");

const LoginController = {

 
  login: function(request, response) { 
    console.log("incoming body:" + request.body); 

    const { email, password } = request.body;
   
    LoginModel.checkLogin(email, password, function(error, result) {
      if (error) {
        console.error("Login error:", error);
        return response.status(500).json({ success: false, error: "Server issue" });
      }

      console.log("DB result",request);

      if (result.length > 0) {
        response.json({ success: true, message: "Logged in successfully" });
      } else {
        response.json({ success: false, message: "Invalid eamil or password" });
      }
    });

  }

};

module.exports = LoginController;
