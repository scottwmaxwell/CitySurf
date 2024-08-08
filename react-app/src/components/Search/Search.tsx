import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-free/css/all.min.css';

function Search(){

    const [cityInputs, setCityInputs] = useState(["city1"]);
    const [showAddButton, setShowAddButton] = useState(true);

    const handleChange = (event: any) => {
        // setSelectedCity(event.target.value);
        // console.log('Selected City:', selectedCity);
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

            if(cityInputs.length >= 2) setShowAddButton(false);
        }
    };

    const handleRemove = (event: any) => {
        event.preventDefault();
        const idToRemove = event.target.id;
        
        // Use the function form of setCityInputs to work with the latest state
        setCityInputs(prevCityInputs => {
            const newCityInputs = prevCityInputs.filter(id => id !== idToRemove);
            
            // Update the button visibility based on the new length
            setShowAddButton(true);
            
            return newCityInputs;
        });
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