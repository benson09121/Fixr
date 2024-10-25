import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import Service_WorkerCard from "./Service_WorkerCard";
import '../css/servicebooking.css';

const libraries = ["places"];
const mapContainerStyle = {
  width: '100%',
  height: '97vh',
  border: '2px solid black',
};

export default function Service_Booking() {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState(null);
  const [locationGranted, setLocationGranted] = useState(false);
  const [showWorker, setShowWorker] = useState(false);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDIvyiOQy1CWwV2Ov3aFMx5g65tTfAa81o"
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading Maps, Please Wait...</div>;
  }

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Latitude:", latitude, "Longitude:", longitude);
          setCoords({ lat: latitude, lng: longitude });
          setLocationGranted(true);
        },
        () => {
          alert("Location access denied. Please allow access to your location.");
        }
      );
    }
  };

  const handleOpen = () => {
    if (locationGranted) {
      setOpen(!open);
    }
  };

  const handleShowWorker = () => {
    setShowWorker(!showWorker);
  };

  return (
    <>
      <div className="servicebooking-container">
        <div className="servicebooking-left">
          <div className="servicebooking-logo">
            <img src="../pics/logo4.png" alt="" />
            <Link to='/client'>
              <div className="servicebooking-back"> 
                <span>back</span>
              </div>
            </Link>
          </div>
          <div className="servicebooking-location">
            <span>Current Location:</span>
            <input type="text" name="" id="" />
            <button name="bookworker" onClick={handleShowWorker}>Book</button>
          </div>
          {showWorker && (
            <Service_WorkerCard
              profile="../pics/user.png"
              class="Worker"
              workername="Red Reyes"
              stars="⭐⭐⭐⭐⭐"
              number="0912 345 6789"
              address="Langkaan, Dasmariñas"
              onFindAnother={handleShowWorker}
            />
          )}
        </div>

        <div className="servicebooking-center">
          <button className="getlocation-btn" onClick={handleLocation}>
            Get Location
          </button>
          <button
            className={`closemap-btn ${!locationGranted ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleOpen}
            disabled={!locationGranted}
          >
            Show Map
          </button>
          <button
            className={`closemap-btn ${!locationGranted ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleOpen}
            disabled={!locationGranted}
          >
            Close Map
          </button>
        </div>

        <div className="servicebooking-right">
          {open && (
            <div className="service-map-content">
              {isLoaded && coords && (
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={coords}
                  zoom={10}
                >
                  <Marker position={coords} />
                </GoogleMap>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
