import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCodeBranch } from "@fortawesome/free-solid-svg-icons";
import { faContactCard } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from "react-router-dom";

// This component holds some additional information links
// and displays at the bottom of the page.
function Footer() {
  return (
    <footer className="bg-dark">
      <div className="container p-1">
        <div className="p-1">
          <Link className="footer-link" to="/about">
            <FontAwesomeIcon className="" icon={faContactCard} /> About
          </Link>
          <Link className="footer-link" to="/privacy">
            <FontAwesomeIcon className="" icon={faLock} /> Privacy
          </Link>
          <a
            target="_blank"
            className="footer-link"
            href="https://github.com/scottwmaxwell/citysurf"
          >
            <FontAwesomeIcon className="" icon={faCodeBranch} /> Github
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
