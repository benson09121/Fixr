import React, { useState } from "react";
import "../css/clientcss.css";
import { Link } from "react-router-dom";
import Menu_Profile from "../Profile_Menu/Menu_Profile";
import Client_Cards from "./Client_Cards";


const Client = () =>  {

    return (
     <div className="clienthome-content">
        <div className="clienthome-sidebar">
                <div className="clienthome-sidebar-header">
                  <div className="clienthome-logo">
                    <img src="/pics/logo4.png" alt="Logo" />
                  </div>
                </div>
                <div className="clienthome-sidebar-contents" id="homes">
                <Link to="/home"><h2>Home</h2> </Link> 
                </div>
                <div className="clienthome-sidebar-contents" id="bookings">
                  <Link to="/bookings"><h2>Bookings</h2></Link>
                </div>
                <div className="clienthome-sidebar-contents" id="chats">
                  <h2>Chat</h2>
                </div>
                <div className="clienthome-sidebar-contents" id="feeds">
                  <h2>Feed</h2>
                </div>
                <div className="clienthome-sidebar-contents"  id="clienthome">
                <Link to="/client"><h2>Client Home (preview)</h2></Link>
                </div>
              </div>
        
              <div className="container"> 
                  
                {/* profile button */}
                <Menu_Profile/>

                  <div className="clienthome-container">
                    <h1>Services</h1>
                        <div className="clienthome-search">
                            <span>Search</span> <img src="/pics/search.png" alt="" />
                        </div>
                        <input type="text" className="clienthome-searchbar" />

                      <div className="clienthome-services">

                        {/*card 1*/}
                        <Client_Cards 
                            picture="pics/spray.png"
                            name="Cleaning"
                            />

                         {/*card 2*/}
                         <Client_Cards
                            picture="pics/haircare.png"
                            name="Hair Care"
                            />
                           

                         {/*card 3*/}
                         <Client_Cards
                            picture="pics/beauty.png"
                            name="Beauty"
                            />

                        {/*card 4*/}
                        <Client_Cards
                            picture="pics/aircon.png"
                            name="Aircon"
                            />
                        {/*card 5*/}
                           <Client_Cards
                            picture="pics/massage.png"
                            name="Massage"
                            />
                      </div>

                  </div>





                </div> 

         </div>   

                
    )

}
export default Client;
  