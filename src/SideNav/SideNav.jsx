import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/sidenav.css";
export default function SideNav() {
  return (
    <>
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <img src="/pics/logo4.png" alt="Logo" />
          </div>
        </div>
        <div className={`sidebar-contents ${location.pathname === "/home" ? "active" : ""}`} id="homes">
          <Link to="/home">
            <h2>Home</h2>{" "}
          </Link>
        </div>
        <div className={`sidebar-contents ${location.pathname === "/bookings" ? "active" : ""}`} id="booking">
          <Link to="/bookings">
            <h2>Bookings</h2>
          </Link>
        </div>
        <div className={`sidebar-contents ${location.pathname === "/Chats" ? "active" : ""}`} id="chats">
        <Link to="/Chats">
          <h2>Chat</h2>
          </Link>
        </div>
        <div className={`sidebar-contents ${location.pathname === "/feeds" ? "active" : ""}`} id="feeds">
          <h2>Feed</h2>
        </div>
      </div>
    </>
  );
}
