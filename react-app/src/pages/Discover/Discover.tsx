import Mapbox from '../../components/Mapbox/Mapbox';
import "./Discover.css";
import Search from '../../components/Search/Search';
import { useState } from 'react';

function Discover(){

    const [cityOne, setCityOne] = useState("");
    const [cityTwo, setCityTwo] = useState("");
    const [cityThree, setCityThree] = useState("");
    const [cityCount, setCityCount] = useState(1);

    return(
        <div className="container main-content">

            <div className="row">
                <div className="col">
                    <h1>Select up to three cities.</h1>
                    <div className="" id="mapbox">
                        <Mapbox cityCount={cityCount} setCityCount={setCityCount} cityOne={cityOne} cityTwo={cityTwo} cityThree={cityThree} setCityOne={setCityOne} setCityTwo={setCityTwo} setCityThree={setCityThree} />
                    </div>
                    <Search cityCount={cityCount} setCityCount={setCityCount} cityOne={cityOne} cityTwo={cityTwo} cityThree={cityThree} setCityOne={setCityOne} setCityTwo={setCityTwo} setCityThree={setCityThree} />

                </div>
            </div>
 
        </div>
    )
}

export default Discover;