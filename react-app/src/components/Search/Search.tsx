import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';

/**
 * This component contains the UX logic for searching and adding more fields.
 */
function Search({cityCount, setCityCount, cityOne, cityTwo, cityThree, setCityOne, setCityTwo, setCityThree}: any){



    useEffect(()=>{
        renderCityInputs();
    }, [])

    const renderCityInputs = ()=>{
        console.log(cityCount);
        // TODO: Refactor the way search inputs are mapped...
        if(cityTwo !== ""){
            setCityInputs([...cityInputs, "city2"]);
            setCityCount(cityInputs.length + 1);
        }

        if(cityThree !== ""){
            setCityInputs([...cityInputs, "city3"]);
            setCityCount(cityInputs.length + 1);    
        }
    }

    const [cityInputs, setCityInputs] = useState(["city1"]);
    const [showAddButton, setShowAddButton] = useState(true);
    const [searchSuggestions, setSearchSuggestions] = useState([""]); // TODO: Get new search suggestions each time cityInput changes

    const updateSelected = (cityname: String)=>{
        if(cityOne === ""){
          setCityOne(cityname);
        }else if(cityTwo === ""){
          setCityTwo(cityname);
        }else if(cityThree === ""){
          setCityThree(cityname);
        }
    }

    const handleChange = (event: any) => {
        if(event.target.id === "city1"){
            setCityOne(event.target.value);
        }else if(event.target.id === "city2"){
            setCityTwo(event.target.value);
        }else if(event.target.id === "city3"){
            setCityThree(event.target.value);
        }

        // TODO: get searchSuggestions based on input

    };


    const handleGo = (e: any)=>{
        e.preventDefault();
        console.log("Go Pressed");
    }

    const handleAdd = (event: any) => {
        event.preventDefault();
        if(cityInputs.length < 3){
            const newId = "city" + (cityInputs.length + 1).toString();
            setCityInputs([...cityInputs, newId]);
            setCityCount(cityInputs.length + 1);
            console.log("cityCount Updated: " + cityCount);
            if(cityInputs.length >= 2) setShowAddButton(false);
        }
    };

    const handleRemove = (event: any) => {
        event.preventDefault();
        const idToRemove = event.target.id;

        // Update city state props
        if(idToRemove === "city1"){
            setCityOne("");
        }else if(idToRemove === "city2"){
            
            if(cityThree !== ""){
                console.log(cityThree)
                setCityTwo(cityThree);
                setCityThree("");
            }else{
                setCityTwo("");
            }

        }else if(idToRemove === "city3"){
            setCityThree("");
        }
        
        // Use the function form of setCityInputs to work with the latest state
        setCityInputs(prevCityInputs => {
            const newCityInputs = prevCityInputs.filter(id => id !== idToRemove);
            
            // Update the button visibility based on the new length
            setShowAddButton(true);
            
            return newCityInputs;
        });
        setCityCount(cityInputs.length - 1);
    };

    // const locationIcon = <FontAwesomeIcon className="discover-icon" icon={faMapLocationDot} color="#E2B714"/> 
    const addCityIcon =  <FontAwesomeIcon className="add-city-icon" icon={faPlus} color="#E2B714"/> 

    return(                        
    <form onSubmit={handleGo} className="d-flex">
    <div className="form-group me-3">

        {cityInputs.map((id: any) => (
        
            <div key={"input-container-" + id} className="input-container">
                <input
                    id={id}
                    value={id === 'city1' ? cityOne : id === 'city2' ? cityTwo : cityThree}
                    className="form-control fontAwesome search-field"
                    onChange={handleChange}
                    list="list-timezone"
                    placeholder="&#xf002; Search"
                />
                {id!=="city1"?
                <button id={id} key={"remove-btn-" + id} onClick={handleRemove} className="remove-btn">X</button>
                :<Link to='/city' key={"go-btn" + id} className="btn-outline-custom go-btn btn">Go</Link>}
            </div>
        ))}
        {showAddButton ?
        <div className="add-btn-container">
            <button onClick={handleAdd} className="btn add-btn btn-outline-custom">{addCityIcon}</button> Add a city
        </div>
        : <div className="add-btn-container"></div>}


        <datalist id="list-timezone">
            {searchSuggestions.map((id)=>(
                <option value={id}></option>
            ))}
        </datalist>


    </div>
</form>
)
}

export default Search;