import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import './Metrics.css';


function Metrics({setModalOpen}: any){

    const [stars, setStars] = useState([1, 2, 3, 4, 5])
    const [starsSelected, setStarsSelected]  = useState([0, 0, 0, 0]);
    const [locationPermission, setLocationPermission] = useState(0); // 0 = not set, 1 = permission denied, 2 = success
    const [location, setLocation] = useState();


    const locationIcon = <FontAwesomeIcon className="discover-icon" icon={faMapLocationDot} color="#E2B714"/> 

    useEffect(()=>{
        getLocation();
    }, []);


    const locationResult = (result: any)=>{
        console.log(result);
        setLocationPermission(2);
    }

    const locationError = (error: any)=>{
        console.log(error);
        setLocationPermission(1);
    }

    const getLocation = ()=>{
        navigator.geolocation.getCurrentPosition(locationResult, locationError);
    }

    const handleContinue = ()=>{
        setModalOpen(false);
    }

    const handleStarClick = (e: any)=>{

        let className = e.currentTarget.className
        console.log(className)
        let selectedStars = [...starsSelected];
        console.log("Before Copy:" + starsSelected);
        console.log("After copy: " + selectedStars);
        let id = Number(e.currentTarget.id);

        if(className.includes("metric-1")){
            console.log("clicked metric-1 for " + id + "stars.")
            selectedStars[0] = id;
        }

        if(className.includes("metric-2")){
            console.log("clicked metric-2 for " + id + "stars.")
            selectedStars[1] = id;
        }
        if(className.includes("metric-3")){
            console.log("clicked metric-3 for " + id + "stars.")
            selectedStars[2] = id;
        }
        if(className.includes("metric-4")){
            console.log("clicked metric-4 for " + id + "stars.");
            selectedStars[3] = id;
        }

        setStarsSelected(selectedStars);
        console.log(selectedStars);
    }

    return (<div>
        {locationPermission > 1?
            <form className="form">
                <div className="input-box">

                    <div className="d-flex justify-content-left">
                        <h1 className="main-header">Rate Your<br />City.</h1>
                    </div>

                    <div className="form-group d-flex justify-content-center">
                        <p className="metric-label">Metric1 </p>
                        <div className="stars d-flex">
                        {stars.map((id: any) => (
                            <div key={"metric-1" + id} className={starsSelected[0] >= id? "star-icon metric-1 selected":"star-icon metric-1"} onClick={handleStarClick} id={id}>
                                <FontAwesomeIcon className="add-city-icon" icon={faStar} /> 
                            </div>
                        ))}
                        </div>
                    </div>



                    <div className="form-group d-flex justify-content-center">
                        <p className="metric-label">Metric2 </p>
                        <div className="stars d-flex">
                        {stars.map((id: any) => (
                            <div key={"metric-2" + id} className={starsSelected[1] >= id? "star-icon metric-2 selected":"star-icon metric-2"} onClick={handleStarClick} id={id}>
                                <FontAwesomeIcon className="add-city-icon" icon={faStar} /> 
                            </div>
                        ))}
                        </div>
                    </div>

                    <div className="form-group d-flex justify-content-center">
                        <p className="metric-label">Metric3 </p>
                        <div className="stars d-flex">
                        {stars.map((id: any) => (
                            <div key={"metric-3" + id} className={starsSelected[2] >= id? "star-icon metric-3 selected":"star-icon metric-3"} onClick={handleStarClick} id={id}>
                                <FontAwesomeIcon className="add-city-icon" icon={faStar} /> 
                            </div>
                        ))}
                        </div>
                    </div>

                    <div className="form-group d-flex justify-content-center">
                        <p className="metric-label">Metric4 </p>
                        <div className="stars d-flex">
                        {stars.map((id: any) => (
                            <div key={"metric-4" + id} className={starsSelected[3] >= id? "star-icon metric-4 selected":"star-icon metric-4"} onClick={handleStarClick} id={id}>
                                <FontAwesomeIcon className="add-city-icon" icon={faStar} /> 
                            </div>
                        ))}
                        </div>
                    </div>

                    <div className="form-group d-flex justify-content-end">
                        <button type="submit" className="btn btn-outline-custom login-btn">Submit</button>
                    </div>
                </div>
                </form>
            : // ELSE
            
                <div className="input-box">

                    <div className="d-flex justify-content-left">
                        {locationPermission == 0?
                            <h4 className="main-header">{locationIcon} Please accept the location permission.</h4>
                        :
                            <h4 className="main-header">That's Okay!</h4>
                        }
                    </div>

                    {locationPermission == 1 &&
                    <div className="d-flex justify-content-center">
                        <p>We see you don't want to share your location. Please select Continue.</p>
                    </div>
                    }

                        {locationPermission == 1 &&
                        <div className="form-group d-flex justify-content-end">
                            <button onClick={handleContinue} className="btn btn-outline-custom login-btn">Continue</button>
                        </div>
                        }
                </div>
            }
    </div>)
}

export default Metrics;