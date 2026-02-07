// The route
const express = require('express');

// import the currencyController
const { getRates,convertCurrency }  = require('../controllers/currencyController');
//create the instance
const router = express.Router();

//define the routes
router.get("/rates",getRates);
router.get("/convert", convertCurrency);

//export the router to be used in app.js
module.exports = router;