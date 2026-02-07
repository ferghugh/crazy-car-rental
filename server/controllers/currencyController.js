// currencyConntroller
const axios = require("axios");

async function getRates(req, res) {
  try {
    const base = req.query.base || "EUR";

    const response = await axios.get(
      `https://open.er-api.com/v6/latest/${base}`
    );

    res.json({
      success: true,
      base: response.data.base_code,
      date: response.data.time_last_update_utc,
      rates: response.data.rates
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch currency rates",
      error: error.message
    });
  }
}
async function convertCurrency(req, res) {
  try {
    const { from, to, amount } = req.query;

    if (!from || !to || !amount) {
      return res.status(400).json({
        success: false,
        message: "Please provide 'from', 'to', and 'amount' query parameters"
      });
    }

    const response = await axios.get(
      `https://open.er-api.com/v6/latest/${from}`
    );

    const rates = response.data.rates;

    if (!rates[to]) {
      return res.status(400).json({
        success: false,
        message: `Invalid target currency code: ${to}`
      });
    }

    const converted = Number(amount) * rates[to];

    res.json({
      success: true,
      from,
      to,
      amount: Number(amount),
      converted,
      rate: rates[to]
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to convert currency",
      error: error.message
    });
  }
}

module.exports = { getRates, convertCurrency };
