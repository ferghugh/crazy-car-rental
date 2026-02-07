import React, { useState } from "react";
import axios from "axios";

function CurrencyConverterModal({ show, onClose }) {
  const [from, setFrom] = useState("EUR");
  const [to, setTo] = useState("USD");
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(null);

  const handleConvert = () => {
    axios
      .get(
        `http://localhost:5000/api/currency/convert?from=${from}&to=${to}&amount=${amount}`,
      )
      .then((response) => setResult(response.data.converted))
      .catch(() => alert("Conversion failed"));
  };

  if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Currency Converter</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <div className="mb-3">
              <label>From:</label>
              <input
                type="text"
                className="form-control"
                value={from}
                onChange={(e) => setFrom(e.target.value.toUpperCase())}
              />
            </div>

            <div className="mb-3">
              <label>To:</label>
              <input
                type="text"
                className="form-control"
                value={to}
                onChange={(e) => setTo(e.target.value.toUpperCase())}
              />
            </div>

            <div className="mb-3">
              <label>Amount:</label>
              <input
                type="number"
                className="form-control"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <button className="btn btn-primary" onClick={handleConvert}>
              Convert
            </button>

            {result !== null && (
              <div className="alert alert-success mt-3">
                Converted Amount: <strong>{result}</strong>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrencyConverterModal;
