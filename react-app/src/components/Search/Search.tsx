import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-free/css/all.min.css';

function Search({cityCount, setCityCount, cityOne, cityTwo, cityThree, setCityOne, setCityTwo, setCityThree}: any){

    const [cityInputs, setCityInputs] = useState(["city1"]);
    const [showAddButton, setShowAddButton] = useState(true);

    const updateSelected = (cityname: String)=>{
        if(cityOne == ""){
          setCityOne(cityname);
        }else if(cityTwo == ""){
          setCityTwo(cityname);
        }else if(cityThree == ""){
          setCityThree(cityname);
        }
    }

    const handleChange = (event: any) => {
        // setSelectedCity(event.target.value);
        // console.log('Selected City:', selectedCity);
        if(event.target.id == "city1"){
            setCityOne(event.target.value);
        }else if(event.target.id == "city2"){
            setCityTwo(event.target.value);
        }else if(event.target.id == "city3"){
            setCityThree(event.target.value);
        }
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
            if(cityInputs.length >= 2) setShowAddButton(false);
        }
    };

    const handleRemove = (event: any) => {
        event.preventDefault();
        const idToRemove = event.target.id;

        // Update city state props
        if(idToRemove == "city1"){
            setCityOne("");
        }else if(idToRemove == "city2"){
            setCityTwo("");
        }else if(idToRemove == "city3"){
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
        
            <div className="input-container">
                <input
                    key={id}
                    id={id}
                    value={id === 'city1' ? cityOne : id === 'city2' ? cityTwo : cityThree}
                    className="form-control fontAwesome search-field"
                    onChange={handleChange}
                    list="list-timezone"
                    placeholder="&#xf002; Search"
                />
                {id!=="city1"?
                <button id={id} onClick={handleRemove} className="remove-btn">X</button>
                :<button className="btn-outline-custom go-btn btn" type="submit">Go</button>}
            </div>
        ))}
        {showAddButton ?
        <div className="add-btn-container">
            <button onClick={handleAdd} className="btn add-btn btn-outline-custom">{addCityIcon}</button> Add a city
        </div>
        : <div className="add-btn-container"></div>}
        <datalist id="list-timezone">
            <option value="Florence, AZ"></option>
            <option value="Gilbert, AZ"></option>
            <option value="Phoenix, AZ"></option>
            <option value="Prescott, AZ"></option>
            <option value="Flagstaff, AZ"></option>
            <option value="Globe, AZ"></option>
        </datalist>
    </div>
</form>
)
}

export default Search;