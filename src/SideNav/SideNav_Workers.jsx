import React from "react";

export default function SideNav_Workers(prop) {

    return (
      <div className="sidenav-workers">
        <div className="workers-content">
                   <img src={prop.picture} alt="" />
             </div>  
             <div className="workers-details">
                  <div className="workers-profile">
                       <span className="worker-name">{prop.name}</span>
                       <span className="worker-service"> | </span>
                       <span className="worker-service">{prop.service}</span>
                  </div>
                  <span className="worker-number">
                       {prop.number}
                  </span>
             </div>
        </div>
    )
}