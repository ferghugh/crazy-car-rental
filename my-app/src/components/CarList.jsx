import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, getUserRole } from "../utils/auth.js";
import axios from "axios";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm.jsx";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function CarList() {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const formRef = useRef(null);
  const[showPayment,setShowPayment] = useState(false);

  const navigate = useNavigate();
  const loggedIn = isAuthenticated();
  const role = getUserRole();

  

   // Fetch the list of cars from the server when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/cars")
      .then((response) => setCars(response.data))
      .catch((error) => console.error(error));
  }, []);

  //Scroll to the rental form when it is shown
  useEffect(() => {
    if (showForm && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showForm]);

  // Handle Rent Now
  const handleRentNow = async (car) => {
    if (!loggedIn) {
      navigate("/login");
      return;
    }

    // Fetch Stripe clientSecret BEFORE showing form
    const res = await axios.post(
      "http://localhost:5000/api/payments/create-payment-intent",
      { amount: car.price_per_day * 100 }
    );

    setSelectedCar({
      ...car,
      clientSecret: res.data.clientSecret,
    });

    setShowForm(true);
  };

  // Handle booking (your existing logic)
  const handleBooking = () => {
    if (!startDate || !endDate) {
      alert("Please select a start and an end date.");
      return;
    }
    //calculate number of days
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  //check start date is not in the past
    if (start < today) {
      alert("Start date must be today or in the future.");
      return;
    }
    //calculate total price
    const daysBooked = (end - start) / (1000 * 60 * 60 * 24);
   //check end date is after start date
    if (daysBooked <= 0) {
      alert("End date must be after start date.");
      return;
    }
//step 1 create a javascript object, Axios will convert it to json and send the http post request to the server
    axios
      .post("http://localhost:5000/api/rentals", {
        car_id: selectedCar.car_id,
        customer_id: 1,
        start_date: startDate,
        end_date: endDate,
        total_price: selectedCar.price_per_day * daysBooked,
      })
      .then(() => {
        alert("Rental booked successfully!");
        setShowForm(false);
        setStartDate("");
        setEndDate("");
      })
      .catch((error) => {
        console.error("Error booking rental:", error);
        alert("Failed to book rental.");
      });
  };
  // Render the list of cars
  return (
       // Container for the car list
    <div className="container mt-4">
      <h2>Crazy Car Rental - Available Cars</h2>

      {/* Car Grid */}
      <div className="row">
        {cars.map((car) => (
            // Card for each car
          <div key={car.car_id} className="col-md-6 col-lg-4 mb-3">
            <div className="card h-100">
              <div className="card-body">
                {car.image_url && (
                  <img
                    src={`/car-images/${car.image_url}`}
                    alt={`${car.car_make} ${car.car_model}`}
                    className="img-fluid mb-3 car-image"
                  />
                )}

                <h5 className="card-title">
                  {car.car_make} {car.car_model}
                </h5>

                <p className="card-text">
                  Year: {car.car_year}
                  <br />
                  Reg: {car.registration_number}
                  <br />
                  Status: {car.car_status}
                  <br />
                  Price per day: €{car.price_per_day}
                </p>

                <button
                  className="btn btn-success"
                  onClick={() => handleRentNow(car)}
                >
                  Rent Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Rental Form (only appears once, outside the grid) */}
      {showForm && selectedCar && (
        <div className="card mt-4" ref={formRef}>
          <div className="card-body">
            <h4>
              Rent {selectedCar.car_make} {selectedCar.car_model}
            </h4>

            <div className="mb-3">
              <label className="form-label">Start Date:</label>
              <input
                type="date"
                className="form-control"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">End Date:</label>
              <input
                type="date"
                className="form-control"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <button className="btn btn-primary" onClick={() => setShowPayment(true)}>
              Proceed to payment
            </button>

            {/* Stripe Checkout */}
            {showPayment && selectedCar.clientSecret && (
              <Elements
                stripe={stripePromise}
                options={{ clientSecret: selectedCar.clientSecret }}
              >
                <CheckoutForm 
                carId={selectedCar.car_id}
                startDate={startDate}
                endDate={endDate} />
              </Elements>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CarList;
