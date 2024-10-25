import React from "react";
import { Link } from "react-router-dom";

export default function Client_Cards(prop){

    return(

     <div className="clienthome-card">
        <Link to="/servicebooking">
        <div className="clienthome-service-info">
              <img src={prop.picture} alt="" />
              <span>{prop.name}</span>
        </div>
        </Link>
</div>


    )
}