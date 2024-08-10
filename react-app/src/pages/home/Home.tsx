import React, { useState } from 'react';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-free/css/all.min.css';
import art from "../../assets/citysurfart.png"
import Search from '../../components/Search/Search';

function Home({modalOpen, session}:any){

    const [cityOne, setCityOne] = useState("");
    const [cityTwo, setCityTwo] = useState("");
    const [cityThree, setCityThree] = useState("");
    const [cityCount, setCityCount] = useState(1);

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
                        <Search setCityCount={setCityCount} cityOne={cityOne} cityTwo={cityTwo} cityThree={cityThree} setCityOne={setCityOne} setCityTwo={setCityTwo} setCityThree={setCityThree} />
                    </div>
                </div>
        </div>
    )
}

export default Home;