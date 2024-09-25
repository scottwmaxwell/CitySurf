import dataSource from "../../services/dataSource";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import SavedCity from "../../components/SavedCity/SavedCity";
import { useNavigate } from "react-router-dom";

// This component displays all of the useres saved cities
function SavedCities({ modalOpen }: any) {
  const navigate = useNavigate();
  const [savedCities, setSavedCities] = useState<any[]>([]);

  useEffect(() => {
    getSavedCities();
  }, []);

  // Get saved cities from database
  const getSavedCities = async () => {
    let cityIds;
    try {
      let result = await dataSource.get("/savedCities", {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      cityIds = result.data[0].cities;
    } catch (e) {
      console.log(e);
      console.log("bad auth");
    }

    if (cityIds) {
      const fetchedCities = await Promise.all(
        cityIds.map(async (cityId: string) => {
          let result = await dataSource.get("/city?id=" + cityId);
          return result.data;
        }),
      );

      console.log(fetchedCities);
      setSavedCities(fetchedCities);
    }
  };

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

  const handleViewClick = async (e: any) => {
    let id = e.currentTarget.id;
    let cityName;
    console.log(savedCities);
    for (let city of savedCities) {
      if (city._id == id) {
        cityName = `${city.name}, ${city.state}`;
      }
    }

    // Navigate to cityView page
    navigate("/city");
  };

  const handleRemove = async (e: any) => {
    let result = window.confirm("Are you sure you want to remove this city?");
    let id = e.currentTarget.id;
    if (result) {
      try {
        console.log(e.currentTarget.id);
        let deleted = await dataSource.delete("/deleteCity?id=" + id, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        if (deleted.data === "City Removed") {
          console.log(savedCities);
          console.log(id);
          const newCities = savedCities.filter((city) => city._id != id);
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
