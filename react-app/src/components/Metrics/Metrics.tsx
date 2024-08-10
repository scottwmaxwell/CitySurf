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
        setLocationPermission(2);
    }

    const locationError = (error: any)=>{
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
        let selectedStars = [...starsSelected];
        let id = Number(e.currentTarget.id);

        if(className.includes("metric-1")){
            selectedStars[0] = id;
        }

        if(className.includes("metric-2")){
            selectedStars[1] = id;
        }
        if(className.includes("metric-3")){
            selectedStars[2] = id;
        }
        if(className.includes("metric-4")){
            selectedStars[3] = id;
        }

        setStarsSelected(selectedStars);
    }

    return (<div>
        {locationPermission > 1?
            <form className="form">
                <div className="input-box">

                    <div className="d-flex justify-content-left">
                        <h1 className="main-header">Rate Your<br />City.</h1>
                    </div>

                    <div className="d-flex justify-content-between">
                        <p className="metric-label">Cleanliness</p>
                        <div className="stars d-flex">
                        {stars.map((id: any) => (
                            <div key={"metric-1" + id} className={starsSelected[0] >= id? "star-icon metric-1 selected":"star-icon metric-1"} onClick={handleStarClick} id={id}>
                                <FontAwesomeIcon className="add-city-icon" icon={faStar} /> 
                            </div>
                        ))}
                        </div>
                    </div>

                    <div className="d-flex justify-content-between">
                        <p className="metric-label">Safety</p>
                        <div className="stars d-flex ml-auto">
                        {stars.map((id: any) => (
                            <div key={"metric-2" + id} className={starsSelected[1] >= id? "star-icon metric-2 selected":"star-icon metric-2"} onClick={handleStarClick} id={id}>
                                <FontAwesomeIcon className="add-city-icon" icon={faStar} /> 
                            </div>
                        ))}
                        </div>
                    </div>

                    <div className="d-flex justify-content-between ">
                        <p className="metric-label">Landmarks</p>
                        <div className="stars d-flex">
                        {stars.map((id: any) => (
                            <div key={"metric-3" + id} className={starsSelected[2] >= id? "star-icon metric-3 selected":"star-icon metric-3"} onClick={handleStarClick} id={id}>
                                <FontAwesomeIcon className="add-city-icon" icon={faStar} /> 
                            </div>
                        ))}
                        </div>
                    </div>

                    <div className="d-flex justify-content-between">
                        <p className="metric-label">Education</p>
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