import dataSource from "../../services/dataSource";
import { useEffect, useState } from "react";
import SavedCity from "../../components/SavedCity/SavedCity";
import { useNavigate } from "react-router-dom";

// This component displays all of the useres saved cities
function SavedCities({ modalOpen, setCities }: any) {
  const navigate = useNavigate();
  const [savedCities, setSavedCities] = useState<any[]>([]);

  useEffect(() => {
    getSavedCities();
  }, []);

  // Get saved cities from database
  // Makes API calls to get the city Ids user has saved 
  // and more calls to obtain data for each city
  const getSavedCities = async () => {
    let cityIds;
    try {
      // make request to API to obtain saved cities of user
      let result = await dataSource.get("/savedCities", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      cityIds = result.data[0].cities; // saved result in cityIds
    } catch (e) {
      console.log(e);
    }

    // For each saved city, get the data
    if (cityIds) {
      const fetchedCities = await Promise.all(
        cityIds.map(async (cityId: string) => {
          let result = await dataSource.get("/city?id=" + cityId);
          return result.data;
        }),
      );
      setSavedCities(fetchedCities);
    }
  };

  // Maps city data (description, name, etc.) to SavedCity component
  const renderSavedcities = () => {
    if (savedCities) {
      return savedCities.map((city: any, index: number) => {
        return (
          <SavedCity
            key={index}
            handleViewClick={handleViewClick}
            handleRemove={handleRemove}
            id={city._id}
            city={city}
          />
        );
      });
    }
  };

  // User clicked to view a saved city
  const handleViewClick = async (e: any) => {
    let id = e.currentTarget.id;
    let cityName;

    // loop over savedCities to obtain city name, and state of clicked city
    for (let city of savedCities) {
      if (city._id === id) {
        cityName = `${city.name}, ${city.state}`;
      }
    }

    // reset cities so that navigation to to /city will display it
    setCities([cityName]);

    // Navigate to cityView component
    navigate("/city");
  };

  // Used clicked to remove a city
  const handleRemove = async (e: any) => {
    // prompt user with confirmation
    let result = window.confirm("Are you sure you want to remove this city?");
    let id = e.currentTarget.id;
    if (result) {
      try {

        // Make API call to delete the city
        let deleted = await dataSource.delete("/deleteCity?id=" + id, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        // If city was deleted remove it from page
        if (deleted.data === "City Removed") {
          const newCities = savedCities.filter((city) => city._id !== id);
          setSavedCities(newCities);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className={"container main-content " + modalOpen}>
      <div className="row justify-content-center">
        <div className="col">
          <h3 className="header">Your Saved Cities.</h3>
          {renderSavedcities()}
        </div>
      </div>
    </div>
  );
}

export default SavedCities;
