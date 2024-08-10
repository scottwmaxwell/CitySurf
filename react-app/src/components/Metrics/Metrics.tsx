import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import './Metrics.css';


function Metrics(){

    const [stars, setStars] = useState([1, 2, 3, 4, 5])
    const [starsSelected, setStarsSelected]  = useState([0, 0, 0, 0]);

    useEffect(()=>{
        console.log("test");
        navigator.geolocation.getCurrentPosition((result)=>{
            console.log(result);
        });
    }, []);

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
    </div>)
}

export default Metrics;