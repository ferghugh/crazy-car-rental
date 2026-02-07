import React, { useState } from "react";
import axios from "axios";

function WeatherModal({ show, onClose }) {
  const [city, setCity] = useState("Dublin");
  const [weather, setWeather] = useState(null);

  if (!show) return null;

  const handleFetchWeather = () => {
    axios
      .get(`http://localhost:5000/api/weather?city=${city}`)
      .then((res) => setWeather(res.data.weather))
      .catch(() => alert("Failed to fetch weather"));
  };

  const getWeatherIcon = (code) => { if (code === 0) return "☀️"; // Clear sky 
  if (code === 1 || code === 2) return "🌤️"; 
  if (code === 3) return "☁️"; 
  if (code >= 45 && code <= 48) return "🌫️";
  if (code >= 51 && code <= 67) return "🌧️"; 
  if (code >= 71 && code <= 77) return "❄️"; 
  if (code >= 80 && code <= 82) return "🌦️";
  if (code >= 95) return "⛈️"; 
   return "🌡️";
  };
  
  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Weather</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <div className="mb-3">
              <label>City</label>
              <input
                type="text"
                className="form-control"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <button className="btn btn-primary" onClick={handleFetchWeather}>
              Get Weather
            </button>

            {weather && (
              <div className="alert alert-info mt-3 text-center">
                <div style={{ fontSize: "3rem" }}>
                  {getWeatherIcon(weather.weathercode)}
                </div>

                <p className="mt-2">
                  <strong>Temperature:</strong> {weather.temperature}°C
                </p>
                <p>
                  <strong>Wind Speed:</strong> {weather.windspeed} km/h
                </p>
                <p>
                  <strong>Wind Direction:</strong> {weather.winddirection}°
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherModal;
