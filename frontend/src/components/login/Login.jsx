import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { AuthContext } from "../../context/auth-context.js";
import { useEffect } from "react";
import { useHttpClient } from "../../hooks/http-hook.js";
import { supabase } from "../../../../backend/util/supabaseClient.js";
import USERS from "../../data/data.js";
//import Spinner from "../UIElements/LoadingSpinner";
import ModalMessageErreur from "../UIElements/ModalMessageErreur";
//import { useTranslation } from "react-i18next";
//import LanguageSwitcher from "../../containers/changeLanguage.jsx";

export default function Login() {
  //const { t } = useTranslation();
  const auth = useContext(AuthContext);
  const [entredValues, setEntredValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const handleInputChange = (identifier, value) => {
    setEntredValues((prevValue) => ({
      ...prevValue,
      [identifier]: value,
    }));
  };

  useEffect(() => {
    if (auth.isLoggedIn) {
      navigate("/");
    }
  }, [auth.isLoggedIn, navigate]);

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", entredValues.email)
        .eq("password", entredValues.password);
      if (error || !data || data.length === 0) {
        alert("Invalid email or password");
        return;
      }
      const loggedInUser = data[0];
      auth.login(loggedInUser.id, "dummy-token", loggedInUser.status);
      localStorage.setItem("userId", loggedInUser.id);
      localStorage.setItem("token", "dummy-token");
      localStorage.setItem("userType", loggedInUser.status);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  return (
    <>
      <div>
        {isLoading /*&& <Spinner />*/}
        <ModalMessageErreur message={error} onClose={() => clearError()} />
      </div>
      <form onSubmit={authSubmitHandler} className="login-form">
        <h1>Manage Life</h1>
        <h2>Login</h2>
        <hr />
        <div className="form-group__container">
          <div className="form-group">
            <input
              type="email"
              id="email"
              required
              placeholder="Email..."
              onChange={(event) =>
                handleInputChange("email", event.target.value)
              }
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              required
              placeholder="Password..."
              onChange={(event) =>
                handleInputChange("password", event.target.value)
              }
            />
          </div>

          <button type="submit" className="button-login">
            Login
          </button>
        </div>
        <p>
          No account? <Link to="/register">Register</Link>
        </p>
        {/* <LanguageSwitcher /> */}
      </form>
    </>
  );
}
