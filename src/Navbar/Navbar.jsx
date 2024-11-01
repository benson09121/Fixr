import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/navbar.css";

export default function SideNav() {
    return(
        <div className="navbar">
                <div className="navbar-content">
                        <div className="navbar-logo">
                          <Link to="/home">  <img src="/pics/fixrlogo.png" alt="" /></Link>
                        </div>
                            <div className="navbar-types">
                                <ul>
                                   <Link to='/client/home'><li>Home</li></Link>
                                   <Link to='/client/Chats'><li>Chat</li></Link>
                                   <Link to="/client/feed"><li>Feed</li></Link>
                                </ul>
                            </div>
                </div>
            </div>

    )


}