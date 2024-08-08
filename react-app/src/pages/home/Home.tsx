import React, { useState } from 'react';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-free/css/all.min.css';
import art from "../../assets/citysurfart.png"
import Search from '../../components/Search/Search';

function Home({modalOpen, session}:any){

    // const [cityInputs, setCityInputs] = useState(["city1"]);
    // const [showAddButton, setShowAddButton] = useState(true);

    // const handleGo = (e: any)=>{
    //     e.preventDefault();
    //     console.log("Go Pressed");
    // }

    // const handleChange = (event: any) => {
    //     // setSelectedCity(event.target.value);
    //     // console.log('Selected City:', selectedCity);
    // };

    // const handleAdd = (event: any) => {
    //     event.preventDefault();
    //     if(cityInputs.length < 3){
    //         const newId = "city" + (cityInputs.length + 1).toString();
    //         setCityInputs([...cityInputs, newId]);

    //         if(cityInputs.length >= 2) setShowAddButton(false);
    //     }
    // };

    // const handleRemove = (event: any) => {
    //     event.preventDefault();
    //     const idToRemove = event.target.id;
        
    //     // Use the function form of setCityInputs to work with the latest state
    //     setCityInputs(prevCityInputs => {
    //         const newCityInputs = prevCityInputs.filter(id => id !== idToRemove);
            
    //         // Update the button visibility based on the new length
    //         setShowAddButton(true);
            
    //         return newCityInputs;
    //     });
    // };

    // const locationIcon = <FontAwesomeIcon className="discover-icon" icon={faMapLocationDot} color="#E2B714"/> 
    const addCityIcon =  <FontAwesomeIcon className="add-city-icon" icon={faPlus} color="#E2B714"/> 

    return(
        <div className={"container main-content " + modalOpen }>
                <div className="row">
                    <div className="col">
                        <img src={art} className="art"></img>
                    </div>
                    <div className="col">
                        <h1 className="header">Find Your <br/>City.</h1>
                        <Search />
                    </div>
                </div>
        </div>
    )
}

export default Home;