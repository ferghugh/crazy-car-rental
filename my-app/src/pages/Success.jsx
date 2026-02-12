import { useEffect, useState } from "react";
import axios from "axios";

export default function Success() {
  const [message, setMessage] = useState("Processing your booking...");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const carId = params.get("carId");
    const start = params.get("start");
    const end = params.get("end");

    // Save rental AFTER payment succeeds
    axios.post("http://localhost:5000/api/rentals", {
      car_id: 13,
      customer_id: 2,
      start_date: "2026-03-10",
      end_date: "2026-03-12",
      total_price: 500
    })
    .then(() => {
      setMessage("Your rental has been booked successfully!");
    })
    .catch(() => {
      setMessage("Payment succeeded, but booking failed. Please contact support.");
    });

  }, []);

  return (
    <div className="container mt-5">
      <h2>Payment Successful</h2>
      <p>{message}</p>
    </div>
  );
}
