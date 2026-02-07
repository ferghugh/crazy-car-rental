const axios = require("axios");

async function getWeather(req, res) {
  try {
    const city = req.query.city || "Dublin";

    const response = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=53.3498&longitude=-6.2603&current_weather=true`
    );

    res.json({
      success: true,
      weather: response.data.current_weather
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch weather",
      error: error.message
    });
  }
}

module.exports = { getWeather };
