import { useEffect, useState, useRef } from "react";
import dataSource from "../../dataSource";
import Search from "../../components/Search/Search";
import Summary from "../../components/CityCards/Summary/Summary";
import Weather from "../../components/CityCards/Weather/Weather";
import "./CityView.css";
import { Population } from "../../components/CityCards/Population/Population";

function CityView({
  modalOpen,
  cities,
  setCities,
  setToastShow,
  setToastTitle,
  setToastMessage,
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
          let [city, state] = selectCity.replace(" ", "").split(",");
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
          {cityData.length < 1 && <h1>Search for a city!</h1>}
          {cityData.length > 0 && <Weather cityData={cityData} />}
          {cityData.length > 0 && <Population cityData={cityData} />}
        </div>
      </div>
    </div>
  );
}

export default CityView;
