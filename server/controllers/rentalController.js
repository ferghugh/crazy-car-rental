
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const RentalModel = require("../models/rentalModel");
const CarModel = require("../models/carModel");

const RentalController = {

  // CREATE PAYMENT INTENT
  createPaymentIntent: async function (req, res) {
    
    try {
      const { car_id, start_date, end_date } = req.body;
      const customer_id = req.user.customer_id;

      if (!car_id || !start_date || !end_date) {
        
        return res.status(400).json({
          success: false,
          message: "Missing required fields"
          
        });
      }
      // CHECK AVAILABILITY
RentalModel.checkCarAvailability(
  car_id,
  start_date,
  end_date,
  (err, results) => {

    if (err) {
      return res.status(500).json({
        success: false,
        message: "Database error"
      });
    }

    if (results.length > 0) {
      return res.status(400).json({
        success: false,
        message: "This car is already booked for the selected dates."
      });
    }

      
  });
      const start = new Date(start_date);
      const end = new Date(end_date);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (start < today) {
        return res.status(400).json({
          success: false,
          message: "Cannot book in the past"
        });
      }

      const daysBooked = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

      if (daysBooked <= 0) {
        return res.status(400).json({
          success: false,
          message: "End date must be after start date"
        });
      }

      CarModel.getAllCars(async function (err, cars) {
        if (err || !cars) {
          return res.status(500).json({
            success: false,
            message: "Car not found"
          });
        }

      const car = cars.find(c => c.car_id === parseInt(car_id));

          if (!car) {
        return res.status(404).json({
          success: false,
          message: "Car not found"
  });
}


        const total_price = car.price_per_day * daysBooked;

        const paymentIntent = await stripe.paymentIntents.create({
          amount: total_price * 100,
          currency: "usd",
          metadata: {
            car_id,
            customer_id,
            start_date,
            end_date,
            total_price
          }
        });

        res.json({
          success: true,
          clientSecret: paymentIntent.client_secret
        });
      });

    } catch (error) {
      console.error("PaymentIntent error:", error);
      res.status(500).json({
        success: false,
        message: "Stripe error"
      });
    }
  },

  // CONFIRM RENTAL AFTER PAYMENT
  confirmRental: async function (req, res) {
    try {
      const { payment_intent } = req.body;

      const intent = await stripe.paymentIntents.retrieve(payment_intent);

      if (intent.status !== "succeeded") {
        return res.status(400).json({
          success: false,
          message: "Payment not completed"
        });
      }

      const { car_id, customer_id, start_date, end_date, total_price } = intent.metadata;

      RentalModel.createRental(
        { car_id, customer_id, start_date, end_date, total_price },
        function (error, result) {

          if (error) {
            console.error("Error creating rental:", error);
            return res.status(500).json({
              success: false,
              message: "Database error"
            });
          }

          res.json({
            success: true,
            rental_id: result.insertId
          });
        }
      );

    } catch (error) {
      console.error("Confirm error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to confirm rental"
      });
    }
  },

  // GET ALL
  getAllRentals: function (req, res) {
    RentalModel.getAllRentals(function (error, result) {
      if (error) {
        return res.status(500).json({
          success: false,
          message: "Error fetching rentals"
        });
      }

      res.json({
        success: true,
        rentals: result
      });
    });
  },

  // GET CURRENT
  getCurrentRentals: function (req, res) {
    RentalModel.getCurrentRentals(function (error, result) {
      if (error) {
        return res.status(500).json({
          success: false,
          message: "Error fetching current rentals"
        });
      }

      res.json({
        success: true,
        rentals: result
      });
    });
  }

};

    



module.exports = RentalController;
