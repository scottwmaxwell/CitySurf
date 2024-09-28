import { useEffect, useState, useRef } from "react";
import "./CityView.css";

// Components
import dataSource from "../../services/dataSource";
import Search from "../../components/Search/Search";

import Summary from "../../components/CityCards/Summary/Summary";
import { Chart } from "../../components/CityCards/Chart/Chart";
import { CommunityMetrics } from "../../components/CityCards/CommunityMetrics/CommunityMetrics";


// Displays the many charts for different metrics and a summary for each selected city
function CityView({
  modalOpen,
  cities,
  setCities,
  setToastShow,
  setToastTitle,
  setToastMessage,
  loggedIn,
}: any) {
  const [cityData, setCityData] = useState<any[]>([]);
  const [savedCities, setSavedCities] = useState<any[]>([]);
  const initialRender = useRef(true);

  useEffect(() => {

    // Limits calls to backend
    if (initialRender.current) {
      getSelectedCities();
      initialRender.current = false; // Set it to false after the first run
    }
  }, []);

  // Get cities from Database based on search fields
  const getSelectedCities = async () => {
    try {

      // Only get saved cities if user is logged in
      if (loggedIn) {
        await getSavedCities();
      }

      const selectedCities = cities; // get cities from search field
      setCityData([]); // reset city data to avoid duplicates

      // Loop over user selected cities and retrieved them from the backend
      for (let selectCity of selectedCities) {
        if (selectCity !== "") {
          let [city, state] = selectCity.split(",");
          state = state.replace(" ", "");
          let result = await dataSource.get(
            `/city?cityname=${city}&citystate=${state}`
          );
          setCityData((prevCityData) => [...prevCityData, result.data]);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  // Get saved cities to indicate if a city is saved already
  const getSavedCities = async () => {
    let cityIds;
    try {
      // make request to API
      let result = await dataSource.get("/savedCities", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      cityIds = result.data[0].cities; // save response
      if (cityIds) {
        setSavedCities(cityIds); // save into state variable
      }
    } catch (e) {
      console.log(e);
    }
  };

  // Map city data to summary components
  const renderSummaries = () => {
    if (cityData) {
      return cityData.map((data: any, index: number) => {
        return (
          <Summary
            key={index}
            data={data}
            setToastShow={setToastShow}
            setToastTitle={setToastTitle}
            setToastMessage={setToastMessage}
            loggedIn={loggedIn}
            savedCity={savedCities.includes(data._id)}
          />
        );
      });
    }
  };

  return (
    <div className={"container main-content " + modalOpen}>
      <div className="row">
        <div className="col-3 side-panel">
          <Search
            cities={cities}
            setCities={setCities}
            getSelectedCities={getSelectedCities}
          />
        </div>
        <div className="col-lg">
          {renderSummaries()}

          {cityData.length > 0 && (
            <>
              <Chart
                cityNames={cityData.map((city) => city.city)}
                plotData={cityData.map((city) => city.weather.avg_temp)}
                plotType="scatter"
                plotName="Temperature Highs"
              />
              <Chart
                cityNames={cityData.map((city) => city.city)}
                plotData={cityData.map((city) => city.housing)}
                plotType="scatter"
                plotName="Average Mortgage Loan"
              />
              <Chart
                cityNames={cityData.map((city) => city.city)}
                plotData={cityData.map((city) => city.population)}
                plotType="scatter"
                plotName="Population"
              />
              <Chart
                cityNames={cityData.map((city) => city.city)}
                plotData={cityData.map((city) => city.job_industry)}
                plotType="bar"
                plotName="Job Industry"
              />
              <Chart
                cityNames={cityData.map((city) => city.city)}
                plotData={cityData.map((city) => city.avg_salary)}
                plotType="bar"
                plotName="Average Salary"
              />
              <Chart
                cityNames={cityData.map((city) => city.city)}
                plotData={cityData.map((city) => city.diversity)}
                plotType="bar"
                plotName="Diversity"
              />
            </>
          )}

          <div className="d-flex flex-wrap">
            {cityData.length > 0 && (
              <CommunityMetrics cityData={cityData} header="Cleanliness" />
            )}
            {cityData.length > 0 && (
              <CommunityMetrics cityData={cityData} header="Education" />
            )}
            {cityData.length > 0 && (
              <CommunityMetrics cityData={cityData} header="Landmarks" />
            )}
            {cityData.length > 0 && (
              <CommunityMetrics cityData={cityData} header="Safety" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CityView;
