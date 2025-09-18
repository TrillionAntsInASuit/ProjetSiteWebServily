import "./home.css";
import { Link } from "react-router-dom";
import imageHome from "../../assets/imageHome.png";

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <div className="header-content">
          <h1 className="logo">Servily</h1>
          <nav className="nav-links">
            <Link to="/login">Log in</Link>
            <Link to="/register">Register</Link>
          </nav>
        </div>
      </header>

      <main className="home-main">
        <h2>Welcome to Servily</h2>
        <p>
          Discover and register for services provided by trusted employers.
          Whether you're looking for home repairs, tutoring, wellness, or
          more—Servily connects you with the right professionals.
        </p>
        <img src={imageHome} alt="Home" className="home-image" />
        <Link to="/register" className="cta-button">
          Get Started
        </Link>
      </main>

      <footer className="home-footer">
        &copy; {new Date().getFullYear()} Servily. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
