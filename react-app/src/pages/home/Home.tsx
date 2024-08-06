import React, { useState } from 'react';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-free/css/all.min.css';
import art from "../../assets/citysurfart.png"

function Home(){

    const [cityInputs, setCityInputs] = useState(["city0"]);

    const handleChange = (event: any) => {
        // setSelectedCity(event.target.value);
        // console.log('Selected City:', selectedCity);
    };

    const handleAdd = (event: any) => {
        event.preventDefault();
        if(cityInputs.length < 3){
            const newId = "city" + (cityInputs.length + 1).toString();
            setCityInputs([...cityInputs, newId]);
        }
    };

    // const locationIcon = <FontAwesomeIcon className="discover-icon" icon={faMapLocationDot} color="#E2B714"/> 
    const addCityIcon =  <FontAwesomeIcon className="add-city-icon" icon={faPlus} color="#E2B714"/> 

    return(
        <div className="container">
            <div className="d-flex justify-content-center">
                <div className="row">
                    <div className="col">
                        <img src={art} className="art"></img>
                    </div>
                    <div className="col">
                        <h1 className="header">Find Your <br/>City.</h1>

                        <form className="d-flex">
                            <div className="form-group me-3">
                                
                               
                                {cityInputs.map((id: any) => (
                                    <input
                                        key={id}
                                        id={id}
                                        className="form-control fontAwesome search-field"
                                        onChange={handleChange}
                                        list="list-timezone"
                                        placeholder="&#xf002; Search"
                                    />
                                ))}
                                <div className="add-btn-container">
                                    <button onClick={handleAdd} className="btn add-btn btn-outline-custom">{addCityIcon}</button> Add a city
                                </div>
                                <datalist id="list-timezone">
                                    <option value="Florence, AZ"></option>
                                    <option value="Gilbert, AZ"></option>
                                    <option value="Phoenix, AZ"></option>
                                    <option value="Prescott, AZ"></option>
                                    <option value="Flagstaff, AZ"></option>
                                    <option value="Globe, AZ"></option>
                                </datalist>
                            </div>

                            <button className="btn-outline-custom go-btn btn" type="submit">Go</button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;