import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { Popup, MapMouseEvent } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./Mapbox.css";
import cityData from "../../assets/citydata.json";

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

interface GeoJsonFeatureCollection {
  type: "FeatureCollection";
  features: GeoJsonFeature[];
}

const Mapbox = ({ setCities, cities }: any) => {
  const citiesRef = useRef<string[]>([]);

  // Mapbox variables
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const lng = -95.5; // Example longitude
  const lat = 40; // Example latitude

  const updateSelected = (cityname: string) => {
    console.log(citiesRef);
    let citiesTemp = [...citiesRef.current];
    citiesTemp[citiesTemp.length - 1] = cityname;
    setCities(citiesTemp);
  };

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

    console.log(cityData);

    mapRef.current.on("load", () => {
      mapRef.current?.addSource("places", {
        type: "geojson",
        data: cityData as GeoJsonFeatureCollection,
      });

      mapRef.current?.addLayer({
        id: "places",
        type: "symbol",
        source: "places",
        layout: {
          "icon-image": ["get", "icon"],
          "icon-allow-overlap": true,
        },
        minzoom: 2,
      });

      mapRef.current?.on(
        "click",
        "places",
        (e: MapMouseEvent & { features?: mapboxgl.MapboxGeoJSONFeature[] }) => {
          const coordinates = (
            e.features![0].geometry as GeoJSON.Point
          ).coordinates.slice();
          let cityname = e.features![0].properties!.name;
          updateSelected(cityname);

          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }
        },
      );

      mapRef.current?.on("mouseenter", "places", () => {
        mapRef.current!.getCanvas().style.cursor = "pointer";
      });

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
