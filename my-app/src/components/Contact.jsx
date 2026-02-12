import {useState} from "react";
import axios from "axios";



function Contact() {
  const[formData,setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/contact",
        formData
      );

      setResponseMessage(response.data.message);

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });

    } catch (error) {
      setResponseMessage("Error sending message.");
    }
  };

  return (
    <div className="container mt-5">

      <h2>Contact Us</h2>

      {/* Emergency Box */}
      <div className="alert alert-danger mt-3">
        <strong>🚨 24/7 Emergency Breakdown:</strong> +353 87 123 4567
      </div>

      <form onSubmit={handleSubmit} className="mt-4">

        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Subject</label>
          <input
            type="text"
            className="form-control"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Message</label>
          <textarea
            className="form-control"
            rows="4"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">
          Send Message
        </button>

        {responseMessage && (
          <div className="mt-3 alert alert-info">
            {responseMessage}
          </div>
        )}

      </form>
    </div>
  );
}
export default Contact;