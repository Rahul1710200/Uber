import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const LiveTracking = () => {
  const [currentPosition, setCurrentPosition] = useState({
    lat: 28.7041, // Default to Delhi
    lng: 77.1025,
  });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });

      const watchId = navigator.geolocation.watchPosition((position) => {
        setCurrentPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  return (
    <MapContainer
      center={currentPosition}
      zoom={15}
      style={{ height: "70vh", width: "29%" }}
    >
      {/* Free Tile Layer from OpenStreetMap */}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Marker for Current Location */}
      <Marker position={currentPosition} />
    </MapContainer>
  );
};

export default LiveTracking;
