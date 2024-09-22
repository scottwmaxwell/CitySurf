import { useEffect, useState, useRef } from "react";
import dataSource from "../../services/dataSource";
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
import Cookies from "js-cookie";

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
  const [savedCities, setSavedCities ] = useState<any[]>([]);
  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      getSelectedCities();
      initialRender.current = false; // Set it to false after the first run
    }
  }, []);

  // Get cities from Database based on search fields
  const getSelectedCities = async () => {
    try {
      if(loggedIn){
        await getSavedCities();
      }
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

  // Get saved cities to indicate if a city is saved already
  const getSavedCities = async () => {
    let cityIds;
    try{
        let result = await dataSource.get('/savedCities', {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        });
        cityIds = result.data[0].cities;
        if(cityIds){
          setSavedCities(cityIds);
        } 
    }catch(e){
        console.log(e);
        console.log('bad auth')
    }
  }

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
          <Search cities={cities} setCities={setCities} getSelectedCities={getSelectedCities} />
        </div>
        <div className="col-lg">
          {renderSummaries()}
          {cityData.length < 1 && <h1>Search for a city!</h1>}
          {cityData.length > 0 && <Weather cityData={cityData} />}
          {cityData.length > 0 && <Housing cityData={cityData} />}
          {cityData.length > 0 && <Population cityData={cityData} />}
          {cityData.length > 0 && <Jobs cityData={cityData} />}
          {cityData.length > 0 && <AverageSalary cityData={cityData} />}
          {cityData.length > 0 && <Diversity cityData={cityData} />}
          <div className="d-flex flex-wrap">
            {cityData.length > 0 && <CommunityMetrics cityData={cityData} header="Cleanliness" />}
            {cityData.length > 0 && <CommunityMetrics cityData={cityData} header="Education" />}
            {cityData.length > 0 && <CommunityMetrics cityData={cityData} header="Landmarks" />}
            {cityData.length > 0 && <CommunityMetrics cityData={cityData} header="Safety" />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CityView;
