import "./home.css";
import { Link } from "react-router-dom";
import imageHome from "../../assets/imageHome.png";
import Header from "../header/header.jsx";

const Home = () => {
  return (
    <div className="home-container">
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
