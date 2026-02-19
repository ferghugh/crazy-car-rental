const express = require("express");
const router = express.Router();

//Middleware
const authMiddleware = require("../middleware/authMiddleware");
const RegisterController = require("../controllers/registerController");

//GET /api/auth/
//Checks if user is authenticated and returns user info
router.get("/me", authMiddleware, (req, res) => {
  res.json({
    login_id: req.user.login_id,
    customer_id: req.user.customer_id,
    role: req.user.role
  });
});


// this is to create the account
router.post("/register",RegisterController.register);

module.exports = router;
