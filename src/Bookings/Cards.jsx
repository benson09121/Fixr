import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function Cards(prop) {
  return (
    <div className="booking-booked-card" onClick={prop.onClick} style={{cursor: "pointer"}}>
      <div className="booking-booked-name">
        <img src="pics/woman.png" alt="" className="booking-booked-profile" />
        <span>{prop.name}</span>
      </div>
      <div className="booking-booked-location">
        <img src="pics/info.png" alt="" className="location-icon" />
        <span>{prop.location}</span>
      </div>
      <div className="booking-booked-ratings">
        <span>{prop.ratings}</span>
      </div>
    </div>
  );
}
