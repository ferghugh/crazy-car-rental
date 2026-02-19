import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, getUserRole, getToken } from "../utils/auth.js";
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
  const [showPayment, setShowPayment] = useState(false);
  const formRef = useRef(null);

  const navigate = useNavigate();
  const loggedIn = isAuthenticated();

  // Fetch cars
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/cars")
      .then((response) => setCars(response.data))
      .catch((error) => console.error(error));
  }, []);

  // Scroll to form
  useEffect(() => {
    if (showForm && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showForm]);

  // Step 1: Show form only
  const handleRentNow = (car) => {
    if (!loggedIn) {
      alert("Please log in to rent a car.");
      navigate("/login");
      return;
    }

    if (getUserRole() !== "user") {
      alert("Only users can rent cars.");
      return;
    }

    setSelectedCar(car);
    setShowForm(true);
    setShowPayment(false);
  };

  // Step 2: Validate dates + create payment intent
  const handleProceedToPayment = async () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start < today) {
      alert("Start date cannot be in the past.");
      return;
    }

    if (end <= start) {
      alert("End date must be after start date.");
      return;
    }

    try {
      const result = await axios.post(
        "http://localhost:5000/api/rentals/create-payment-intent",
        {
          car_id: selectedCar.car_id,
          start_date: startDate,
          end_date: endDate
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        }
      );

      setSelectedCar({
        ...selectedCar,
        clientSecret: result.data.clientSecret
      });

      setShowPayment(true);

    } catch (error) {
      console.error(error.response?.data || error);
      alert(error.response?.data?.message || "Payment setup failed.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Crazy Car Rental - Available Cars</h2>

      <div className="row">
        {cars.map((car) => (
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

            <button
              className="btn btn-primary"
              onClick={handleProceedToPayment}
            >
              Proceed to payment
            </button>

            {showPayment && selectedCar.clientSecret && (
              <Elements
                stripe={stripePromise}
                options={{ clientSecret: selectedCar.clientSecret }}
              >
                <CheckoutForm
                  carId={selectedCar.car_id}
                  startDate={startDate}
                  endDate={endDate}
                />
              </Elements>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CarList;
