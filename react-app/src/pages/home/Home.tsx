import React, { useState, useEffect } from "react";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-free/css/all.min.css";
import art from "../../assets/citysurfart.gif";
import Search from "../../components/Search/Search";

// This component contains the home page that displays information about the site
// as well as the search component
function Home({ modalOpen, session, cities, setCities }: any) {
  const [cityCount, setCityCount] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const addCityIcon = (
    <FontAwesomeIcon className="add-city-icon" icon={faPlus} color="#E2B714" />
  );

  useEffect(() => {
    // Trigger the transition after the component mounts
    setIsVisible(true);
  }, []);

  return (
    <div className={"container main-content " + modalOpen}>
      <div className="row">
        <div className="col d-flex">
          <div className="art-container">
            <img
              src={art}
              className={
                isVisible ? "art unveil-image show" : "art unveil-image"
              }
            ></img>
          </div>
        </div>
        <div className="col">
          <h1>
            Find Your <br />
            City.
          </h1>
          <Search cities={cities} setCities={setCities} />
        </div>
      </div>
    </div>
  );
}

export default Home;
