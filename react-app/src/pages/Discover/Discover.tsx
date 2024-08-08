import Mapbox from '../../components/Mapbox/Mapbox';
import "./Discover.css";
import Search from '../../components/Search/Search';

function Discover(){

    return(
        <div className="container main-content">

            <div className="row">
                <div className="col">
                    <h1>Select up to three cities.</h1>
                    <div className="" id="mapbox">
                        <Mapbox/>
                    </div>
                    <Search />

                </div>
            </div>
 
        </div>
    )
}

export default Discover;