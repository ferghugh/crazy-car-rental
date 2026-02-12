import { Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { isAuthenticated, getUserRole } from "../utils/auth";

function Dashboard() {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    axios.get("http://localhost:5000/api/current")
      .then((res) => {
        if (res.data.success) {
          setRentals(res.data.rentals);
        }
      })
      .catch((err) => {
        console.error("Error fetching current rentals:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // auth will check now!
  if (!isAuthenticated() || getUserRole() !== "admin") {
    return <Navigate to="/" />;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Admin Dashboard</h2>

      <h4>Current Rentals</h4>

      {loading ? (
        <p>Loading rentals...</p>
      ) : rentals.length === 0 ? (
        <p>No active rentals at the moment.</p>
      ) : (
        <div className="row">
          {rentals.map((rental) => (
            <div className="col-md-4 mb-3" key={rental.rental_id}>
              <div className="card shadow-sm border-primary">
                <div className="card-body">
                  <h5 className="card-title text-primary">
                    Rental #{rental.rental_id}
                  </h5>
                  {/* status */}
                  <span className={`badge mb-2 ${
                    rental.status === "current"
                    ? "bg-success"
                    : rental.status === "Upcoming"
                    ? "bg-warning text-dark"
                    : "bg-secondary"
                  }`}
                  >
                    {rental.status}
                  </span>
                  <p className="card-text">
                    <strong>Car ID:</strong> {rental.car_id} <br />
                    <strong>Customer:</strong> {rental.customer_id} <br />
                    <strong>Start:</strong> {new Date(rental.start_date).toLocaleDateString()} <br />
                    <strong>End:</strong> {new Date(rental.end_date).toLocaleDateString()} <br />
                    <strong>Total:</strong> €{rental.total_price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
  

export default Dashboard;
