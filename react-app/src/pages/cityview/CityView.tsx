import { useEffect, useState, useRef } from "react";
import dataSource from "../../dataSource";
import Search from "../../components/Search/Search";
import Summary from "../../components/CityCards/Summary/Summary";
import Weather from "../../components/CityCards/Weather/Weather";
import "./CityView.css";
import { Population } from "../../components/CityCards/Population/Population";
import { Jobs } from "../../components/CityCards/Jobs/Jobs";
import { AverageSalary } from "../../components/CityCards/AverageSalary/AverageSalary";
import { Diversity } from "../../components/CityCards/Diversity/Diversity";
import { Housing } from "../../components/CityCards/Housing/Housing";
import { CommunityMetrics } from "../../components/CityCards/CommunityMetrics/CommunityMetrics";

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
  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      getSelectedCities();
      initialRender.current = false; // Set it to false after the first run
    }
  }, []);

  const getSelectedCities = async () => {
    try {
      let selectedCities = cities;
      setCityData([]);
      for (let selectCity of selectedCities) {
        if (selectCity !== "") {
          let [city, state] = selectCity.split(",");
          state = state.replace(" ", "");
          let result = await dataSource.get(
            `/city?cityname=${city}&citystate=${state}`
          );
          setCityData((prevCityData) => [...prevCityData, result.data]);
          console.log("Retrieved data for: " + result.data.city);
          console.log(cityData);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

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
          />
        );
      });
    }
  };


  return (
    <div className={"container main-content " + modalOpen}>
      <div className="row">
        <div className="col-3 side-panel">
          <Search cities={cities} setCities={setCities} getSelectedCities={getSelectedCities} />
        </div>
        <div className="col-lg">
          {renderSummaries()}
          <div className="d-flex">
            {cityData.length > 0 && <CommunityMetrics cityData={cityData} header="Cleanliness" />}
            {cityData.length > 0 && <CommunityMetrics cityData={cityData} header="Education" />}
            {/* {cityData.length > 0 && <CommunityMetrics cityData={cityData} header="Landmarks" />} */}
            {cityData.length > 0 && <CommunityMetrics cityData={cityData} header="Safety" />}
          </div>
          {cityData.length < 1 && <h1>Search for a city!</h1>}
          {cityData.length > 0 && <Weather cityData={cityData} />}
          {cityData.length > 0 && <Housing cityData={cityData} />}
          {cityData.length > 0 && <Population cityData={cityData} />}
          {cityData.length > 0 && <Jobs cityData={cityData} />}
          {cityData.length > 0 && <AverageSalary cityData={cityData} />}
          {cityData.length > 0 && <Diversity cityData={cityData} />}
        </div>
      </div>
    </div>
  );
}

export default CityView;
