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
                                   <Link to='/home'><li>Home</li></Link>
                                   <Link to='/chats'><li>Chat</li></Link>
                                   <Link to="/feed"><li>Feed</li></Link>
                                </ul>
                            </div>
                </div>
            </div>

    )


}