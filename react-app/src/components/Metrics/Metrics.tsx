import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import "./Metrics.css";
import dataSource from "../../services/dataSource";
import Cookies from "js-cookie";

// This component is used to collect data from the user regarding 
// their opinion of their own city stats
function Metrics({
  setModalOpen,
  setToastMessage,
  setShowToast,
  setToastTitle,
}: any) {
  const stars = [1, 2, 3, 4, 5];
  const [starsSelected, setStarsSelected] = useState([0, 0, 0, 0]);
  const [locationPermission, setLocationPermission] = useState(0); // 0 = not set, 1 = permission denied, 2 = success
  const [location, setLocation] = useState();
  const [cityId, setCityId] = useState("");

  const locationIcon = (
    <FontAwesomeIcon
      className="discover-icon"
      icon={faMapLocationDot}
      color="#E2B714"
    />
  );

  useEffect(() => {
    getLocation();
  }, []);

  // Used to get the resulting location of the geoLocation of the user
  const locationResult = async (location: any) => {
    setLocationPermission(2);
    console.log(location.coords);
    let coords = location.coords;
    let request = `/citybygeo?lat=${coords.latitude}&lon=${coords.longitude}`;
    let result = await dataSource.get(request);
    console.log("City Name:" + result.data.city);
    if (!result) {
      setToastMessage("Unable to find city from location");
      setShowToast(true);
      setToastTitle("Error");
      setCityId("notfound");
    } else {
      setCityId(result.data._id);
    }
  };

  const locationError = (error: any) => {
    setLocationPermission(1);
  };

  // Called when the user navigates to this component
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(locationResult, locationError);
  };

  const handleContinue = async () => {
    if (cityId) {
      console.log(starsSelected);
      let payload = {
        cleanliness: starsSelected[0],
        safety: starsSelected[1],
        landmarks: starsSelected[2],
        education: starsSelected[3],
        cityId: cityId,
      };
      let result = await dataSource.put("/ratecity", payload, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      setModalOpen(false);
    } else {
      setModalOpen(false);
    }
  };

  const handleStarClick = (e: any) => {
    let className = e.currentTarget.className;
    let selectedStars = [...starsSelected];
    let id = Number(e.currentTarget.id);

    if (className.includes("metric-1")) {
      selectedStars[0] = id;
    }

    if (className.includes("metric-2")) {
      selectedStars[1] = id;
    }
    if (className.includes("metric-3")) {
      selectedStars[2] = id;
    }
    if (className.includes("metric-4")) {
      selectedStars[3] = id;
    }

    setStarsSelected(selectedStars);
  };

  return (
    <div>
      {locationPermission > 1 || cityId === "notfound" ? (
        <div className="form">
          <div className="input-box">
            <div className="d-flex justify-content-left">
              <h1 className="main-header">
                Rate Your
                <br />
                City.
              </h1>
            </div>

            <div className="d-flex justify-content-between">
              <p className="metric-label">Cleanliness</p>
              <div className="stars d-flex">
                {stars.map((id: any) => (
                  <div
                    key={"metric-1" + id}
                    className={
                      starsSelected[0] >= id
                        ? "star-icon metric-1 selected"
                        : "star-icon metric-1"
                    }
                    onClick={handleStarClick}
                    id={id}
                  >
                    <FontAwesomeIcon className="add-city-icon" icon={faStar} />
                  </div>
                ))}
              </div>
            </div>

            <div className="d-flex justify-content-between">
              <p className="metric-label">Safety</p>
              <div className="stars d-flex ml-auto">
                {stars.map((id: any) => (
                  <div
                    key={"metric-2" + id}
                    className={
                      starsSelected[1] >= id
                        ? "star-icon metric-2 selected"
                        : "star-icon metric-2"
                    }
                    onClick={handleStarClick}
                    id={id}
                  >
                    <FontAwesomeIcon className="add-city-icon" icon={faStar} />
                  </div>
                ))}
              </div>
            </div>

            <div className="d-flex justify-content-between ">
              <p className="metric-label">Landmarks</p>
              <div className="stars d-flex">
                {stars.map((id: any) => (
                  <div
                    key={"metric-3" + id}
                    className={
                      starsSelected[2] >= id
                        ? "star-icon metric-3 selected"
                        : "star-icon metric-3"
                    }
                    onClick={handleStarClick}
                    id={id}
                  >
                    <FontAwesomeIcon className="add-city-icon" icon={faStar} />
                  </div>
                ))}
              </div>
            </div>

            <div className="d-flex justify-content-between">
              <p className="metric-label">Education</p>
              <div className="stars d-flex">
                {stars.map((id: any) => (
                  <div
                    key={"metric-4" + id}
                    className={
                      starsSelected[3] >= id
                        ? "star-icon metric-4 selected"
                        : "star-icon metric-4"
                    }
                    onClick={handleStarClick}
                    id={id}
                  >
                    <FontAwesomeIcon className="add-city-icon" icon={faStar} />
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group d-flex justify-content-end">
              <button
                onClick={handleContinue}
                type="submit"
                className="btn btn-outline-custom login-btn"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      ) : (
        // ELSE

        <div className="input-box">
          <div className="d-flex justify-content-left">
            {locationPermission === 0 ? (
              <h4 className="main-header">
                {locationIcon} Please accept the location permission.
              </h4>
            ) : (
              <h4 className="main-header">That's Okay!</h4>
            )}
          </div>

          {locationPermission === 1 && (
            <div className="d-flex justify-content-center">
              <p>
                We see you don't want to share your location. Please select
                Continue.
              </p>
            </div>
          )}

          {locationPermission === 1 && (
            <div className="form-group d-flex justify-content-end">
              <button
                onClick={handleContinue}
                className="btn btn-outline-custom login-btn"
              >
                Continue
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Metrics;
