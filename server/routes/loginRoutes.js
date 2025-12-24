const express = require("express");
//This creates a small “mini-app” just for login routes.
const router = express.Router();
const LoginController = require("../controllers/loginController");

// when someone sends Post request to login/test
//run the testLogin function inside the controller
router.post("/login", LoginController.login);

//This allows the route to be imported into your main app.
module.exports = router;


//Routes define the endpoints that your frontend will call.

//Explanation:

//POST /login endpoint for your React frontend to send login data.

//Calls the controller function loginController.login.