import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated, getUserRole } from "../utils/auth";
import CurrencyConverterModal from "./CurrencyConverter";
import WeatherModal from "./Weather";

function Navbar() {
  const [loggedIn, setLoggedIn] = useState(isAuthenticated());
  const [role, setRole] = useState(getUserRole());
  const [showConverter, setShowConverter] = useState(false);
  const [showWeather, setShowWeather] = useState(false);

  useEffect(() => {
    const syncAuth = () => {
      setLoggedIn(isAuthenticated());
      setRole(getUserRole());
    };

    // Run on mount
    syncAuth();

    // Listen for login/logout changes
    window.addEventListener("storage", syncAuth);

    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          {/* Brand */}
          <Link className="navbar-brand" to="/">
            Crazy Car Rental
          </Link>

          {/* Hamburger button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapsible menu */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto text-center">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>

              {loggedIn && (
                <>
                  <li className="nav-item">
                    <button
                      className="btn btn-outline-light ms-2"
                      onClick={() => setShowConverter(true)}
                    >
                      Currency Converter
                    </button>
                  </li>
                  <li className="nav-item">
                    {" "}
                    <button
                      className="btn btn-outline-light ms-2"
                      onClick={() => setShowWeather(true)}
                    >
                      {" "}
                      Weather{" "}
                    </button>{" "}
                  </li>
                </>
              )}

              {!loggedIn && (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              )}

              {loggedIn && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>

                  {role === "admin" && (
                    <li className="nav-item">
                      <Link className="nav-link" to="/dashboard">
                        Dashboard
                      </Link>
                    </li>
                  )}

                  <li className="nav-item">
                    <Link className="nav-link" to="/logout">
                      Logout
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <CurrencyConverterModal
        show={showConverter}
        onClose={() => setShowConverter(false)}
      />
      <WeatherModal show={showWeather} onClose={() => setShowWeather(false)} />
    </>
  );
}

export default Navbar;
