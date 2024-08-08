import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import "./Mapbox.css";

const Mapbox = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const lng = -95.5; // Example longitude
  const lat = 40; // Example latitude

  useEffect(() => {
    if (map.current) return; // initialize map only once

    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || "";

    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/smaxwell/clzksr078001f01r379nw3znw', // stylesheet location
      center: [lng, lat], // starting position [lng, lat]
      zoom: 3 // starting zoom
    });
  }, []);

  return (
    <div>
      <div ref={mapContainer} style={{ width: '100%', height: '400px' }} />
    </div>
  );
};

export default Mapbox;
