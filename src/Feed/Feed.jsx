import React, { useState } from "react";
import "../css/feed.css";
import { Link } from "react-router-dom";
import Menu_Profile from "../Profile_Menu/Menu_Profile";
import SideNav from "../SideNav/SideNav";
import Navbar from "../Navbar/Navbar";

function Feed() {
    return(
        <div className="feed-content" style={{backgroundColor:"white"}}>
    <Navbar/>
    
    <SideNav/>
       
        </div>
    )
    
}
export default Feed;