import React, { useState } from "react";
import "../css/bookingscss.css";
import { Link } from "react-router-dom";
import Cards from "./Cards";
import Menu_Profile from "../Profile_Menu/Menu_Profile";
import ProfileCard from "./ProfileCard";
import SideNav from "../SideNav/SideNav";

export default function Bookings() {
  
  const [selectedModal, setSelectedModal] = useState(false);

  const handleClick = () => {
    setSelectedModal(true);
  };
  const handleCloseModal = () => {
    setSelectedModal(false);
  };


  return (
    <>
      <div className="bookings-content">
        <SideNav 
         picture="/pics/user.png"
         name="Benson Javier"
         number="0912 345 6789"
         class="Worker"
        />
        <div className="container">
          {/* profile button */}
          <Menu_Profile/>

          <div className="booking-booked">
            <div className="booking-search">
              <h3>Search</h3>
              <div className="booking-search-bar">
                <img src="/pics/search.png" alt="" />
                <input type="text" id="search" placeholder="Search something" />
              </div>
            </div>

            <div className="booking-booked-header">
              <div className="booking-nearyou">
                <span>Near You</span>
              </div>
              <div className="booking-ratings-header">
                <select name="Ratings" id="cars">
                  <option value="Ratings">Ratings</option>
                </select>
              </div>
            </div>
            {/*card 1*/}
            <Cards
              name="Angel Habuen"
              location="Langkaan, Dasmariñas"
              ratings="⭐⭐⭐⭐⭐  5.0"
              onClick={handleClick}
            />
            {/*card 2*/}
            <Cards
              name="Carlos Rosales"
              location="Langkaan, Dasmariñas"
              ratings="⭐⭐⭐⭐⭐  5.0"
              onClick={handleClick}
            />
            {/*card 3*/}
            <Cards
              name="Don Ponasana"
              location="Langkaan, Dasmariñas"
              ratings="⭐⭐⭐⭐⭐  5.0"
              onClick={handleClick}
            />

            {/*card 4*/}
            <Cards
              name="Al king Serrazawa"
              location="Langkaan, Dasmariñas"
              ratings="⭐⭐⭐⭐⭐  5.0"
              onClick={handleClick}
            />

            {/*card 5*/}
            <Cards
              name="Gabby Falconito"
              location="Langkaan, Dasmariñas"
              ratings="⭐⭐⭐⭐⭐  5.0"
              onClick={handleClick}
            />
          </div>
        </div>

        {selectedModal && (
          <ProfileCard 
          onClose={handleCloseModal}
          
          />
        )}
      </div>
    </>
  );
}