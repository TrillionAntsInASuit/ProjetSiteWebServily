import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { AuthContext } from "../../context/auth-context.js";
import { useEffect } from "react";
import { useHttpClient } from "../../hooks/http-hook.js";
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
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const navigate = useNavigate();
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
    const foundUser = USERS.find(
      (user) =>
        user.email === entredValues.email &&
        user.password === entredValues.password
    );
    if (foundUser) {
      auth.login();
      localStorage.setItem("userType", foundUser.status);
      navigate("/");
    } else {
      alert("Invalid email or password");
    }

    /*try {
      const response = await sendRequest(
        import.meta.env.VITE_BACKEND_URL + "users/",
        "POST",
        JSON.stringify(entredValues),
        {
          "Content-Type": "application/json", //pour que le bodyParser sache comment faire le parse
        }
      );
      auth.login(response.userId, response.token);
    } catch (err) {
      console.error(err);
    }*/
  };
  return (
    <>
      <div>
        {isLoading /*&& <Spinner />*/}
        <ModalMessageErreur message={error} onClose={() => clearError()} />
      </div>
      <form onSubmit={authSubmitHandler}>
        <h1>Manage Life</h1>
        <h2>Login</h2>
        <hr />
        <div className="form-group__container">
          <div className="form-group">
            <h3>Login</h3>
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
