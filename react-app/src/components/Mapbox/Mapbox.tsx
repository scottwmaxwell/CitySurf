import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { Popup, MapMouseEvent } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./Mapbox.css";
import dataSource from "../../services/dataSource";


// Interface used for validating type returned from API
interface GeoJsonFeature {
  type: "Feature";
  properties: {
    name: string;
    icon: string;
  };
  geometry: {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
  };
}

// Interactive map from mapbox API
const Mapbox = ({ setCities, cities }: any) => {
  const citiesRef = useRef<string[]>([]);

  // Mapbox variables
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const lng = -95.5; // Example longitude
  const lat = 40; // Example latitude

  // User selected city from map
  const updateSelected = (cityname: string) => {
    let citiesTemp = [...citiesRef.current];
    citiesTemp[citiesTemp.length - 1] = cityname; // Used
    setCities(citiesTemp); // update the global cities state variable with new selection
  };

  // Get map lat/lon data from API
  const getGeoJson = async () => {
    const geoJson = await dataSource('/cityGeoJSON');
    return geoJson.data;
  }

  useEffect(() => {
    citiesRef.current = cities; // Update the ref value whenever cityCount changes
  }, [cities]);

  useEffect(() => {
    if (mapRef.current) return; // initialize map only once

    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || "";

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/smaxwell/clzksr078001f01r379nw3znw", // stylesheet location
      center: [lng, lat], // starting position [lng, lat]
      zoom: 3, // starting zoom
    });

    // On map loading, place locations of cities on map
    mapRef.current.on("load", async () => {
      const geoJsonData = await getGeoJson();
      mapRef.current?.addSource("places", {
        type: "geojson",
        data: geoJsonData,
      });

      // Layer for city locations
      mapRef.current?.addLayer({
        id: "places",
        type: "symbol",
        source: "places",
        layout: {
          "icon-image": ["get", "icon"],
          "icon-allow-overlap": true,
        },
        minzoom: 2, // User must be zoomed in enough to view cities
      });

      // User clicks location on map
      mapRef.current?.on(
        "click",
        "places",
        (e: MapMouseEvent & { features?: mapboxgl.MapboxGeoJSONFeature[] }) => {
          // Extract the coordinates from the first feature's geometry
          const coordinates = (
            e.features![0].geometry as GeoJSON.Point
          ).coordinates.slice(); // Create a copy of the coordinates array
           // Extract the city name from the feature's properties
          let cityname = e.features![0].properties!.name;
          // Update the selected city name
          updateSelected(cityname);

          // Adjust the longitude to account for crossing the international date line
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }
        },
      );

      // change mouse cursor on hover
      mapRef.current?.on("mouseenter", "places", () => {
        mapRef.current!.getCanvas().style.cursor = "pointer";
      });

      // Change mouse cursor on leaving location dot
      mapRef.current?.on("mouseleave", "places", () => {
        mapRef.current!.getCanvas().style.cursor = "";
      });
    });
  }, []);

  return (
    <div>
      <div ref={mapContainer} style={{ width: "100%", height: "400px" }} />
    </div>
  );
};

export default Mapbox;
