import React, { useState } from "react";
import "./modal.css";

const validateEmail = (email) => {
  return email.includes("@");
};
const validatePhoneNumber = (phone) => {
  return phone.length === 10 && !isNaN(phone);
};

const validateDob = (dob) => {
  const currentDate = new Date();
  const dobDate = new Date(dob);
  return dobDate <= currentDate;
};

export default function Modal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });
  const [error, setError] = useState("");

  const toggleModal = () => {
    setIsOpen(!isOpen);
    setError("");
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, email, phone, dob } = formData;

    if (!username || !email || !phone || !dob) {
      setError("All fields are required.");
      return;
    }

    if (!validateDob(dob)) {
      alert("Invalid date of birth. Date of birth cannot be in the future.");
      return;
    }
    if (!validateEmail(email)) {
      alert("Invalid email. Please check your email address.");
      return;
    }
    if (!validatePhoneNumber(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }

    alert("Form Submitted Successfully!");
    toggleModal();
    setFormData({ username: "", email: "", phone: "", dob: "" });
  };
  const handleOutsideClick = (e) => {
    if (e.target.className === "modal") {
      toggleModal();
    }
  };

  return (
    <div className="App">
      <h1>User Details Modal</h1>
      <button onClick={toggleModal}>Open Form</button>

      {isOpen && (
        <div className="modal" onClick={handleOutsideClick}>
          <div className="modal-content">
            <h1>Fills Details</h1>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="phone">Phone:</label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="dob">Date of Birth:</label>
                <input
                  type="date"
                  id="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
              </div>

              {error && <p style={{ color: "red" }}>{error}</p>}
              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
