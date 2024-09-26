import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from "react-router-dom";
import "./Search.css";
import { debounce } from 'lodash';
import dataSource from "../../services/dataSource";

// This component contains the logic for searching and adding more fields.
function Search({ cities, setCities, getSelectedCities }: any) {
  const [suggestions, setSuggestions] = useState([""]);
  const navigate = useNavigate();
  const location = useLocation();
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null); // Store timeout ID in a ref

  interface SearchResult {
    item: {
      type: string;
      properties: {
        name: string;
        icon: string;
      };
      geometry: {
        type: string;
        coordinates: [number, number];
      };
    };
    refIndex: number;
  }

  useEffect(()=>{
    getSuggestions.cancel();
  }, []);
  

  const handleChange = (event: any) => {
    let citiesTemp = [...cities];
    const index: number = Number(event.target.id);
    citiesTemp[index] = event.target.value;
    setCities(citiesTemp);
    getSuggestions(event.target.value);
  };

  const getSuggestions = debounce(async (searchValue:string)=>{
    if(searchValue != ""){
      const results = await dataSource(`/citySuggestions?search=${searchValue}`);
      const newSuggesetions = results.data.map((result: SearchResult)=> result.item.properties.name )
      setSuggestions(newSuggesetions);
    }
  }, 500);

  const handleGo = (e: any) => {
    console.log("Go/Add Pressed");
    if (location.pathname === "/city") {
      getSelectedCities();
    } else {
      navigate("/city");
    }
  };

  const handleAdd = (event: any) => {
    if (cities.length < 3) setCities([...cities, ""]);
  };

  const handleRemove = (event: any) => {
    console.log("handleRemove");
    let citiesTemp = [...cities];
    const index: number = Number(event.target.id);
    console.log("Which index to remove? " + index);
    citiesTemp.splice(index, 1);
    setCities(citiesTemp);
  };

  const renderCityInputs = () => {
    return cities.map((city: string, index: number) => (
      <div key={index.toString()} className="input-container">
        <input
          id={index.toString()}
          value={city}
          className="form-control fontAwesome search-field"
          onChange={handleChange}
          list="list-suggestions"
          placeholder="&#xf002; Search"
        />
        {index !== 0 ? (
          <button
            id={index.toString()}
            key={"remove-btn-" + city}
            onClick={handleRemove}
            className="remove-btn"
          >
            X
          </button>
        ) : (
          <a
            onClick={handleGo}
            key={"go-btn" + city}
            className="btn-outline-custom go-btn btn"
          >
            Go
          </a>
        )}
      </div>
    ));
  };

  // const locationIcon = <FontAwesomeIcon className="discover-icon" icon={faMapLocationDot} color="#E2B714"/>
  const addCityIcon = (
    <FontAwesomeIcon className="add-city-icon" icon={faPlus} color="#E2B714" />
  );

  return (
    <div className="search-container">
      <div className="d-flex">
        <div className="form-group me-3">
          {renderCityInputs()}

          {cities.length < 3 ? (
            <div className="add-btn-container">
              <button
                onClick={handleAdd}
                className="btn add-btn btn-outline-custom"
              >
                {addCityIcon}
              </button>{" "}
              Add a city
            </div>
          ) : (
            <div className="add-btn-container"></div>
          )}

          <datalist id="list-suggestions">
                        {suggestions.map((id)=>(
                            <option value={id}></option>
                        ))}
          </datalist>
        </div>
      </div>
    </div>
  );
}

export default Search;
