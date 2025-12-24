import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    address: "",
    city: "",
    county: "",
    postcode: "",
    phone: "",
    email: "",
    driver_license: "",
  });
  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    //client-side validation can be added here
    if (!formData.firstname || !formData.lastname) {
      alert("First name and last name are required.");
      return;
    }
    axios
      .post("http://localhost:5000/api/customers", formData)
      .then((response) => {
        alert("Registration successful!");
        setFormData({
          firstname: "",
          lastname: "",
          address: "",
          city: "",
          county: "",
          postcode: "",
          phone: "",
          email: "",
          driver_license: "",
        });
      })
      .catch((error) => {
        console.error("There was an error registering the user!", error);
        alert("Registration failed. Please try again.");
      });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-9">
          <h2>Customer Registration</h2>

          <form onSubmit={handleSubmit}>
            {/* Form fields for registration */}
            <input
              className="form-control mb-2"
              type="text"
              name="firstname"
              placeholder="First Name"
              value={formData.firstname}
              onChange={handleChange}
            />
            <input
              className="form-control mb-2"
              type="text"
              name="lastname"
              placeholder="Last Name"
              value={formData.lastname}
              onChange={handleChange}
            />
            <input
              className="form-control mb-2"
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
            />
            <input
              className="form-control mb-2"
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
            />
            <input
              className="form-control mb-2"
              type="text"
              name="county"
              placeholder="County"
              value={formData.county}
              onChange={handleChange}
            />
            <input
              className="form-control mb-2"
              type="text"
              name="postcode"
              placeholder="Postcode"
              value={formData.postcode}
              onChange={handleChange}
            />
            <input
              className="form-control mb-2"
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <input
              className="form-control mb-2"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              className="form-control mb-2"
              type="text"
              name="driver_license"
              placeholder="Driver License Number"
              value={formData.driver_license}
              onChange={handleChange}
            />

            <button className="btn btn-primary" type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
