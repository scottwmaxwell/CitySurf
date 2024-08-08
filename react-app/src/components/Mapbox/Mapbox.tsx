import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import {Popup, MapMouseEvent} from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import "./Mapbox.css";

const Mapbox = ({cityCount, setCityOne, setCityTwo, setCityThree}: any) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const lng = -95.5; // Example longitude
  const lat = 40; // Example latitude

  const cityCountRef = useRef(cityCount);

  const updateSelected = (cityname: String)=>{
    let cityCountCurrent = cityCountRef.current;
    if(cityCountCurrent == 1){
      setCityOne(cityname);
    }else if(cityCountCurrent == 2){
      setCityTwo(cityname);
    }else if(cityCountCurrent == 3){
      setCityThree(cityname);
    }
  }

  useEffect(() => {
    cityCountRef.current = cityCount; // Update the ref value whenever cityCount changes
  }, [cityCount]);

  useEffect(() => {
    if (mapRef.current) return; // initialize map only once

    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || "";

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/smaxwell/clzksr078001f01r379nw3znw', // stylesheet location
      center: [lng, lat], // starting position [lng, lat]
      zoom: 3 // starting zoom
    });

    mapRef.current.on("load", () => {
      mapRef.current?.addSource("places", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {
                name:"Phoenix, AZ",
                description:
                  '<strong>Phoenix, AZ</strong><p>',
                icon: "marker"
              },
              geometry: {
                type: "Point",
                coordinates: [-112.038659, 33.4484]
              }
            },
            {
              type: "Feature",
              properties: {
                name:"TESTNAME2",
                description:
                  '<strong>Make it Mount Pleasant</strong><p><a href="http://www.mtpleasantdc.com/makeitmtpleasant" target="_blank" title="Opens in a new window">Make it Mount Pleasant</a> is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>',
                icon: "marker"
              },
              geometry: {
                type: "Point",
                coordinates: [-76.038659, 38.931567]
              }
            },
            // More features...
          ]
        }
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

      mapRef.current?.on("click", "places", (e: MapMouseEvent & { features?: mapboxgl.MapboxGeoJSONFeature[] }) => {
        const coordinates = (e.features![0].geometry as GeoJSON.Point).coordinates.slice();
        let cityname = e.features![0].properties!.name;
        updateSelected(cityname);
        const description = e.features![0].properties!.description;

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // new Popup()
        //   .setLngLat(coordinates as [number, number])
        //   .setHTML(description)
        //   .addTo(mapRef.current!);
          
      });

      mapRef.current?.on("mouseenter", "places", () => {
        mapRef.current!.getCanvas().style.cursor = "pointer";
      });

      mapRef.current?.on("mouseleave", "places", () => {
        mapRef.current!.getCanvas().style.cursor = "";
      });
    });
    // return () => map.current?.remove();

  }, []);

  return (
    <div>
      <div ref={mapContainer} style={{ width: '100%', height: '400px' }} />
    </div>
  );
};

export default Mapbox;
