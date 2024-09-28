import image from "../../assets/CitySurfLogo.png";
import "./Nav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompass } from "@fortawesome/free-solid-svg-icons";
import { faCity } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// This component displays at the top of every page so the user can navigate
// to different parts of the site
function Nav({
  openModal,
  setModalOpen,
  loggedIn,
  setLoggedIn,
  setToastShow,
  setToastMessage,
  setToastTitle,
}: any) {

  // 
  const detectSmallScreen = () => {
    if (window.innerWidth < 800) {
      return true;
    }
    return false;
  };

  // Used to change Navbar according to window/screen size
  const [smallScreen, setSmallScreen] = useState(detectSmallScreen());

  useEffect(() => {
    // Listen to window resize
    window.addEventListener("resize", () => {
      setSmallScreen(detectSmallScreen());
    });
  }, []);

  // Check if logged in
  setLoggedIn(!!localStorage.getItem("token"));

  // Prompt use to login
  const handleLogin = () => {
    setModalOpen(true);
  };

  // Used clicked logout button
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove session token from storage
    setLoggedIn(!!localStorage.getItem("token")); // Alert app to login state change
    // Display Toast
    setToastMessage("You have been logged out.");
    setToastTitle("Message");
    setToastShow(true);
  };

  return (
    <nav className="navbar bg-dark">
      <Link className="navbar-brand" to="/">
        <img
          src={image}
          height="30"
          className="d-inline-block align-top"
          alt=""
        />
        {!smallScreen && <span className="brand-text">CitySurf</span>}
      </Link>
      <div className="nav-items">
        {loggedIn && (
          <Link
            to="/savedcities"
            className="btn btn-dark btn-outline-custom your-cities"
          >
            <FontAwesomeIcon
              className="discover-icon"
              icon={faCity}
              color="#E2B714"
            />
            {!smallScreen && <span>Your Cities</span>}
          </Link>
        )}

        <Link to="/discover" className="btn btn-dark btn-outline-custom">
          <FontAwesomeIcon
            className="discover-icon"
            icon={faCompass}
            color="#E2B714"
          />
          {!smallScreen && <span>Discover</span>}
        </Link>
        {loggedIn ? (
          <a className="btn btn-dark btn-outline-custom" onClick={handleLogout}>
            Logout
          </a>
        ) : (
          <a className="btn btn-dark btn-outline-custom" onClick={handleLogin}>
            Login
          </a>
        )}
      </div>
    </nav>
  );
}

export default Nav;
