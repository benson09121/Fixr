import React, { useState } from "react";

export default function FeedNotif(prop) {

    const [showService, setShowService] = useState(false);
    const toggleShowService = ()=> {
     setShowService(!showService);
    }

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
                            <button type="button" name="chat" onClick={toggleShowService}>CHAT</button>
                    </div>
                </div> 
             
        </div>
        <hr />

       {showService && (
             <div className="feed-service-card">
             <div className="feed-card-container">
                 <div className="feed-card-header">
                     <span onClick={toggleShowService} style={{cursor:"pointer"}}>Cancel</span> 
                     <div>Send</div>
                 </div>
                     <div className="feed-card-content">
                         <div className="feed-card-profile">
                             <img src="../pics/user.png" alt="" />
                         </div>
                     <div className="feed-card-name">
                         <div className="feed-card-details">
                             <span className="feed-name">Benson Javier</span>
                             <span className="feed-service">|</span>
                             <span className="feed-service">Massage Service</span>
                         </div>
                             <span>What do you want to say?</span>
                             <textarea name="feed-comment" id="feed-comment" className="feed-comment"></textarea>
                         </div>
                     </div>
             </div>
           
         </div>


       )}
    </div>
    )
}