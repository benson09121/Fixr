import React from "react";

export default function FeedNotif(prop) {

    return(
     <div className="feed-notif">
        <div className="feed-header">
            <div className="feed-picture">
            <img src={prop.profile} alt="" />
            </div>
                <div className="feed-profile">
                    <div className="feed-service-type"> 
                         <span className="feed-name">{prop.name}</span>
                         <span className="feed-service">|</span>
                         <span className="feed-service">{prop.service}</span>
                    </div>
                    <span className="feed-message">{prop.message}</span>

                    <div className="feed-buttons">
                            <button type="button" name="reserve">RESERVE</button>
                            <button type="button" name="appoint">APPOINT</button>
                            <button type="button" name="chat">CHAT</button>
                    </div>
                </div> 
             
        </div>
        <hr />
    </div>
    )
}