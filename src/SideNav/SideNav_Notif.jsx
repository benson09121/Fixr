import React from "react";

export default function SideNav_Notif(prop) {
    return (
        <div className="sidenav-notif-content">
        <img src={prop.profile} alt="" />
          <div className="sidenav-notif-message">
              <span className="notif-name">{prop.notif_name}</span>
              <span className="notif-message">{prop.notif_message}</span>
          </div>
    </div>
    )

}