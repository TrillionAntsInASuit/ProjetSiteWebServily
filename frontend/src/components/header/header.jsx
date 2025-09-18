import "./header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="home-header">
      <div className="header-content">
        <h1 className="logo">Servily</h1>
        <nav className="nav-links">
          <Link to="/login">Log in</Link>
          <Link to="/register">Register</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
