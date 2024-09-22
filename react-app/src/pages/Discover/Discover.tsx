import Mapbox from "../../components/Mapbox/Mapbox";
import "./Discover.css";
import Search from "../../components/Search/Search";
import { useState } from "react";

function Discover({ modalOpen, cities, setCities }: any) {
  return (
    <div className={"container main-content " + modalOpen}>
      <div className="row">
        <div className="col">
          <h1>Select up to three cities.</h1>
          <div className="" id="mapbox">
            <Mapbox cities={cities} setCities={setCities} />
          </div>
          <Search cities={cities} setCities={setCities} />
        </div>
      </div>
    </div>
  );
}

export default Discover;
