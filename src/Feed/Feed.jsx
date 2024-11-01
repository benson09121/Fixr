import React, { useState } from "react";
import "../css/feed.css";
import { Link } from "react-router-dom";
import Menu_Profile from "../Profile_Menu/Menu_Profile";
import Feed_Sidenav from "../SideNav/Feed_Sidenav";
import Navbar from "../Navbar/Navbar";
import FeedNotif from "./FeedNotif";

function Feed() {
 
    return(
        <>
        <Navbar/>
        <div className="feed-content" style={{backgroundColor:"white"}}>
        <Feed_Sidenav
      picture="/pics/user.png"
      name="Benson Javier"
      number="0912 345 6789"
      class="Worker"
    />
    <div className="feed-container">

            <FeedNotif
                profile="pics/user.png"
                name="Sam Ligaya"
                service="Aircon Service"
                message="I'm looking for clients who need their air conditioning units fixed."
            />

            <FeedNotif
                profile="pics/user.png"
                name="Red Reyes"
                service="Cleaning Service"
                message="Yeh."
            />

            <FeedNotif
                profile="pics/user.png"
                name="Geraldine Caasi"
                service="Massage Service"
                message="Looking for a relaxing massage? Contact me today!"
            />
            
            <FeedNotif
                profile="pics/user.png"
                name="Red Reyes"
                service="Cleaning Service"
                message="I just want you for my own."
            />
            

    
    </div>
    
       
 </div>
        </>
    )
    
}
export default Feed;