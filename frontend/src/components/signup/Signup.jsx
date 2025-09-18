import "./Signup.css";
import { useState } from "react";

export default function Signup() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  async function handleSubmit(e) {
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    const status = e.target.status.value;
    const estAbonne = false;

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      try {
        const response = await fetch(
          "http://localhost:5000/api/users/register",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password, status, estAbonne }),
          }
        );
        const data = await response.json();
        if (response.ok) {
          setSuccess(data.message);
          setError(null);
        } else {
          setError(data.message);
          setSuccess(null);
        }
      } catch (err) {
        setError("An error occurred. Please try again.");
        setSuccess(null);
      }
    };
  }
  return (
    <div className="signup-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            minLength="6"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            required
            minLength="6"
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select id="status" name="status" required>
            <option value="client">Client</option>
            <option value="employeur">Employeur</option>
          </select>
        </div>
        <button type="submit">Register</button>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </form>
    </div>
  );
}
