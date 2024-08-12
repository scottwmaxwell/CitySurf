import { useEffect, useState, useRef } from "react";
import dataSource from "../../dataSource";
import Search from "../../components/Search/Search";
import Summary from "../../components/CityCards/Summary/Summary";
import Weather from "../../components/CityCards/Weather/Weather";
import './CityView.css';


function CityView({modalOpen, cityOne, setCityOne, cityTwo, setCityTwo, cityThree, setCityThree, cityCount, setCityCount}:any){

    const [cityData, setCityData] = useState<any[]>([]);
    const initialRender = useRef(true);

    useEffect(()=>{
        if (initialRender.current) {
            getSelectedCities();
            initialRender.current = false; // Set it to false after the first run
        }
    }, []);

    const getSelectedCities = async()=>{
        try{
            let selectedCities = [cityOne, cityTwo, cityThree];
            for(let selectCity of selectedCities){
                if(selectCity !== ''){
                    let [city, state] = selectCity.replace(' ', '').split(',')
                    let result = await dataSource.get(`/city?cityname=${city}&citystate=${state}`);
                    setCityData(prevCityData => [...prevCityData, result.data]);
                    console.log("Retrieved data for: " + result.data.city);
                    console.log(cityData);
                }
            }
        }catch(e){
            console.log(e);
        }
    }

    const renderSummaries = ()=>{
        if(cityData){
            return cityData.map((data:any, index:number) => {
                return (
                    <Summary key={index} data={data} />
                );
            });
        }
    }

    return(
        <div className={"container main-content " + modalOpen}>
            <div className="row">
                <div className="col-3 side-panel">
                    <Search cityCount={cityCount} setCityCount={setCityCount} cityOne={cityOne} cityTwo={cityTwo} cityThree={cityThree} setCityOne={setCityOne} setCityTwo={setCityTwo} setCityThree={setCityThree}  />
                </div>
                <div className="col-lg">
                    {renderSummaries()}
                    <Weather cityData={cityData} />
                </div>
            </div>
        </div>
    )
}

export default CityView;