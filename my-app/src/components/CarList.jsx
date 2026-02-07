// Import necessary modules from React
import React, { useEffect, useState, useRef } from "react";
// Import axios for making HTTP requests
import axios from "axios";

// CarList component to display the list of cars
function CarList() {
  // State to hold and remember the list of cars
  const [cars, setCars] = useState([]);
  // State to manage selected car and form visibility
  const [selectedCar, setSelectedCar] = useState(null);
  const [showForm, setShowForm] = useState(false);
  // Reference for the rental form to enable scrolling,so when the form appears it scrolls into view
  const formRef = useRef(null);
  // State to manage rental dates
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Fetch the list of cars from the server when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/cars")
      .then((response) => setCars(response.data))
      .catch((error) => console.error(error));
  }, []);
  // Scroll to the rental form when it is shown
  useEffect(() => {
    if (showForm && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showForm]);

  const handleBooking = () => {
    //check dates are selected
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
    const timeBooked = end - start;
    const daysBooked = timeBooked / (1000 * 60 * 60 * 24);

    //check end date is after start date
    if (daysBooked <= 0) {
      alert("End date must be after start date.");
      return;
    }

    // step 1 create a javascript object, Axios will convert it to json and send the http post request to the server
    axios
      .post("http://localhost:5000/api/rentals", {
        car_id: selectedCar.car_id, // Replace with actual customer ID
        customer_id: 1, // Replace with actual customer ID
        start_date: startDate, // Replace with actual start date
        end_date: endDate, // Replace with actual end date
        total_price: selectedCar.price_per_day * daysBooked, //  total price
      })
      .then((response) => {
        // Handle the success
        alert("Rental booked successfully!");
        setShowForm(false);
        setStartDate("");
        setEndDate("");
      })
      .catch((error) => {
        // Handle the error
        console.error("Error booking rental:", error);
        alert("Failed to book rental.");
      });
  };

  // Render the list of cars
  return (
    // Container for the car list
    <div className="container mt-4">
      <h2>Crazy Car Rental - Available Cars</h2>

      {/* OPEN row HERE */}
      <div className="row">
        {cars.map(
          (
            car, // repeat for each car
          ) => (
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
                    onClick={() => {
                      setSelectedCar(car);
                      setShowForm(true);
                    }}
                  >
                    Rent Now
                  </button>
                </div>
              </div>
            </div>
          ),
        )}
      </div>
      {/* CLOSE row HERE */}
      {showForm &&
        selectedCar && ( // Display rental form if a car is selected
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
              {/* A user clicks the "Confirm Rental" button */}
              <button className="btn btn-primary" onClick={handleBooking}>
                Confirm Rental
              </button>
            </div>
          </div>
        )}
    </div>
  );
}

export default CarList;
