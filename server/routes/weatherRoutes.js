// The route
const express = require('express');

// import the currencyController
const { getWeather }  = require('../controllers/weatherController');
//create the instance
const router = express.Router();

//define the routes
router.get("/weather",getWeather);


//export the router to be used in app.js
module.exports = router;