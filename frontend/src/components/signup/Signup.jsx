import "./Signup.css";
import { useContext, useState } from "react";
import { supabase } from "../../../util/supabaseClient.js";
import { AuthContext } from "../../context/auth-context.js";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [error, setError] = useState(null);
  const auth = useContext(AuthContext);
  const [success, setSuccess] = useState(null);
  const [passwordAreNotEqual, setPasswordAreNotEqual] = useState(false);
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    setPasswordAreNotEqual(false);
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    const status = e.target.status.value;
    const estAbonne = false;
    if (password !== confirmPassword) {
      setPasswordAreNotEqual(true);
      setError("Passwords do not match");
      return;
    }
    try {
      const { data, error } = await supabase.from("users").insert([
        {
          name,
          email,
          password,
          status,
          estAbonne: false,
        },
      ]);
      const userId = data?.user?.id;
      if (error) {
        setError("Signup failed. Please try again later.");
        return;
      }

      auth.login(userId, "dummy-token", status);
      localStorage.setItem("userType", status);
      navigate("/");
    } catch (error) {
      console.error("Signup error:", error);
      setError("Registration failed. Please try again later.");
    }
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
