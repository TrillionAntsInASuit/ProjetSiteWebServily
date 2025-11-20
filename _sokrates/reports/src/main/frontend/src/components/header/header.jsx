import "./header.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth-context.js";

const Header = () => {
  const { isLoggedIn, userType, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };
  return (
    <header className="home-header">
      <div className="header-content">
        <NavLink to="/"><h1 className="logo">Servily</h1></NavLink>
        <nav className="nav-links">
          {isLoggedIn && userType === "client" && (
            <>
              <NavLink to="/services">Services</NavLink>
              <NavLink to="/">Dashboard</NavLink>
              <NavLink to="/subscribe">Subscribe</NavLink>
              <NavLink to="/help">Help</NavLink>
              <button onClick={handleLogout}>Disconnect</button>
            </>
          )}

          {isLoggedIn && userType === "employeur" && (
            <>
              <NavLink to="/services">Services</NavLink>
              <NavLink to="/">Dashboard</NavLink>
              <NavLink to="/subscribe">Subscribe</NavLink>
              <NavLink to="/create">Create</NavLink>
              <NavLink to="/help">Help</NavLink>
              <button onClick={handleLogout}>Disconnect</button>
            </>
          )}
          {!isLoggedIn && (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
              <NavLink to="/help">Help</NavLink>

            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
