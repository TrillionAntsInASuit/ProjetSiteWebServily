import "./header.css";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="home-header">
      <div className="header-content">
        <h1 className="logo">Servily</h1>
        <nav className="nav-links">
          <NavLink to="/login">Log in</NavLink>
          <NavLink to="/register">Register</NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
