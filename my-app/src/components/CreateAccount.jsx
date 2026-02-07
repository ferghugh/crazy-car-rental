import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// createAccount component
// create login credentials
//defaul role is user

function CreateAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleCreateAccount = async (e) => {
    e.preventDefault();

    //validation

    if (!email || !password || !confirmPassword) {
      setMessage("All field are required to be filled");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Passwords are not matching");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        email,
        password,
      });
      setMessage("Account created successfully, redirecting now to login");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch {
      setMessage("Account already exist!");
    }
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-6 offset-lg-3">
          <h3>Create Account</h3>

          {message && <p>{message}</p>}

          <form onSubmit={handleCreateAccount}>
            <div className="form-group mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group mb-3">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button className="btn btn-primary" type="submit">
              Create Account
            </button>
          </form>

          {/* Link back to login */}
          <div className="mt-3">
            <p>
              Already have an account?{" "}
              <span
                style={{
                  color: "blue",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={() => navigate("/login")}
              >
                Login here
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
