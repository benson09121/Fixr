import React from "react";

export default function Client_Cards(prop){

    return(
        <div className="clienthome-card"> 
        <div className="clienthome-service-info">
              <img src={prop.picture} alt="" />
              <span>{prop.name}</span>
        </div>
</div>
    )
}