import "./Summary.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as faBookmarkreg } from "@fortawesome/free-regular-svg-icons";
import {
  faUsersLine,
  faPersonWalking,
  faMapLocationDot,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import dataSource from "../../../services/dataSource";
import Cookies from "js-cookie";
import Toast from "../../Toast/Toast";

function Summary({
  data,
  setToastShow,
  setToastTitle,
  setToastMessage,
  loggedIn,
  savedCity
}: any) {
  const [saved, setSaved] = useState(savedCity);


  // Used to handle when user clicks save/unsave button
  const handleSave = async () => {
    if (saved === false) {
      try {
        console.log(data._id);
        let result = await dataSource.put(`/saveCity?id=${data._id}`, null, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });

        if (result.data === "City Added") {
          setSaved(true);
          setToastShow(true);
          setToastTitle("Message");
          setToastMessage("Saved City");
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      handleRemove(data._id);
    }
  };

  // Used to remove a city from the user's list in the database
  const handleRemove = async (id: any)=>{
    let result = window.confirm("Are you sure you want to remove this city?");
    if(result){
        try{
            console.log("Removing city with id of:" + id);
            let deleted = await dataSource.delete('/deleteCity?id=' + id ,{
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`
                }
            });
            if(deleted.data === "City Removed"){
              setSaved(false);
              setToastShow(true);
              setToastTitle("Message");
              setToastMessage("Removed City");
            }

        }catch(e){
            console.log(e);
        }
        
    }
}

  const populationIcon = (
    <FontAwesomeIcon
      className="discover-icon"
      icon={faUsersLine}
      color="#E2B714"
    />
  );
  const walkScoreIcon = (
    <FontAwesomeIcon
      className="discover-icon"
      icon={faPersonWalking}
      color="#E2B714"
    />
  );
  const locationIcon = (
    <FontAwesomeIcon
      className="discover-icon"
      icon={faMapLocationDot}
      color="#E2B714"
    />
  );
  const saveIcon = (
    <FontAwesomeIcon
      onClick={handleSave}
      className="discover-icon"
      icon={saved ? faBookmark : faBookmarkreg}
      color="#E2B714"
    />
  );

  return (
    <div className="card bg-dark">
      <div className="card-content">
        <div className="row">
          <div className="d-flex">
            {loggedIn && <div className="save-icon">{saveIcon}</div>}
            <h1 className="card-header">
              {data.city}, {data.state}{" "}
            </h1>
          </div>
          <p>{data.description}</p>
        </div>

        <div className="d-flex gap-5">
          <div>
            {populationIcon} Population: {data.population["2020"]}
          </div>
          <div>
            {walkScoreIcon} Walk Score: {data.walkscore}
          </div>
          <div>
            {locationIcon}
            {data.lat}, {data.lon}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Summary;
