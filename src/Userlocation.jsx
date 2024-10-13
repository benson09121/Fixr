import React, { useState } from "react";
import "./css/userlocationcss.css";
import { Link } from "react-router-dom";

function Userlocation() {

    return(

            <div className="userloc-background">
                    <div className="userloc-content">
                           <div className="userloc-search">
                                    <img src="/pics/info.png" alt="" />
                                    <span>Where do you live?</span>
                          </div>
                         <Link to='/home'> <button className="userloc-donebtn">Done</button> </Link>

                </div>
        </div>
    )
}

export default Userlocation;