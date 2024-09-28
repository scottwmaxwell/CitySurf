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

  // Interface used to verify search suggestion result type
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

  // Update cities as user types
  const handleChange = (event: any) => {
    let citiesTemp = [...cities];
    const index: number = Number(event.target.id);
    citiesTemp[index] = event.target.value;
    setCities(citiesTemp);
    getSuggestions(event.target.value);
  };

  // Debounce used to wait for user to stop typing before making call
  const getSuggestions = debounce(async (searchValue:string)=>{
    if(searchValue != ""){
      try{
        // Make API call for search suggestions
        const results = await dataSource(`/citySuggestions?search=${searchValue}`);
        const newSuggesetions = results.data.map((result: SearchResult)=> result.item.properties.name )
        setSuggestions(newSuggesetions);
      }catch(e){
        console.log(e);
      }
    }
  }, 500);

  // navigates to the view city page 
  // or re-calls the getSelectedCities if already on cityView
  const handleGo = (e: any) => {
    console.log("Go/Add Pressed");

    // already on city page?
    if (location.pathname === "/city") {
      getSelectedCities(); // Call the API to get city data
    } else {
      // Go to the city page where the data call will occur automatically
      navigate("/city"); 
    }
  };

  const handleAdd = (event: any) => {
    if (cities.length < 3) setCities([...cities, ""]);
  };

  // User removes searech field
  const handleRemove = (event: any) => {
    let citiesTemp = [...cities];
    const index: number = Number(event.target.id);
    citiesTemp.splice(index, 1); // remove city 
    setCities(citiesTemp); // re-save the new list of cities
  };

  // Creates number of search fields user has added/removed (will always display at least one)
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

  // Icon used for saving cities
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
