import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/sidenav.css";
import SideNav_Notif from "./SideNav_Notif";



export default function Worker_SideNav(prop) {
 

  return (
    <>
      <div className="sidenav">
        <div className="sidenav-content">
          <div className="sidenav-header">
            <div className="sidenav-header-profile">
              <img src={prop.picture} alt="" />
              <div className="sidenav-user-class">
                {prop.class}
              </div>
            </div>
            <div className="sidenav-header-details">
              <span className="sidenav-name">
                {prop.name}
                <Link to="/profile"><img src="/pics/edit.png" alt="" /></Link>
              </span>
              <span className="sidenav-number">{prop.number}</span>
              <select name="status" id="status" className="status-dropdown" style={{ border:"none" }}>
                <option value="available">Available</option>
                <option value="busy">Busy</option>
                <option value="notdisturb">Do not disturb</option>
                <option value="brb">Be right Back</option>
                <option value="appear">Appear anyway</option>
              </select>
            </div>
          </div>
     

        <div className="sidenav-container">
          <div className="worker-sidenav-notif">
            <div className="notification-text">
            <h5>Notifications:</h5>
            </div>
            <SideNav_Notif 
              profile="../pics/user.png"
              notif_name="Aisha rated you 3 stars."
              notif_message='"Thank you so much!"'
            />
            <SideNav_Notif 
              profile="../pics/user.png"
              notif_name="Rallian messaged you."
              notif_message='"Hello, how much for your cleaning service?"'
            />
            <SideNav_Notif 
              profile="../pics/user.png"
              notif_name="Thea rated you 1 star."
              notif_message='"Ampangit ng lasa nung milktea"'
            />

<SideNav_Notif 
              profile="../pics/user.png"
              notif_name="Aisha rated you 3 stars."
              notif_message='"Thank you so much!"'
            />
            <SideNav_Notif 
              profile="../pics/user.png"
              notif_name="Rallian messaged you."
              notif_message='"Hello, how much for your cleaning service?"'
            />
            <SideNav_Notif 
              profile="../pics/user.png"
              notif_name="Thea rated you 1 star."
              notif_message='"Ampangit ng lasa nung milktea"'
            />

<SideNav_Notif 
              profile="../pics/user.png"
              notif_name="Aisha rated you 3 stars."
              notif_message='"Thank you so much!"'
            />
            <SideNav_Notif 
              profile="../pics/user.png"
              notif_name="Rallian messaged you."
              notif_message='"Hello, how much for your cleaning service?"'
            />
            <SideNav_Notif 
              profile="../pics/user.png"
              notif_name="Thea rated you 1 star."
              notif_message='"Ampangit ng lasa nung milktea"'
            />

            <SideNav_Notif 
              profile="../pics/user.png"
              notif_name="Aisha rated you 3 stars."
              notif_message='"Thank you so much!"'
            />
            <SideNav_Notif 
              profile="../pics/user.png"
              notif_name="Rallian messaged you."
              notif_message='"Hello, how much for your cleaning service?"'
            />
            <SideNav_Notif 
              profile="../pics/user.png"
              notif_name="Thea rated you 1 star."
              notif_message='"Ampangit ng lasa nung milktea"'
            />
          </div>

          <div className="sidenav-footer">
            <div className="sidenav-footer-content">
              <img src="/pics/history.png" alt="" />
              <span>Service History</span>
            </div>
            <div className="sidenav-footer-content">
              <img src="/pics/info.png" alt="" />
              <span>Location</span>
            </div>
            <Link to='aboutus'>
              <div className="sidenav-footer-content">
                <img src="/pics/about.png" alt="" />
                <span>About us</span>
              </div>
            </Link>
            <Link to="/">
              <div className="sidenav-footer-content">
                <img src="/pics/exit.png" alt="" />
                <span>Log out</span>
              </div>
            </Link> 
          </div>
      </div>  
        </div>
      </div>
    </>
  );
}
