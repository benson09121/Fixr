import React from "react";

export default function Admin_Approval(prop) {
    return (
        <>
         <div className="worker-approval-content">
                 <div className="worker-approval-profile">
                      <div className="worker-profile-details">
                            <span className="worker-approval-name">{prop.workerName}</span>
                            <span className="worker-approval-service">|</span>
                            <span className="worker-approval-service">{prop.serviceName}</span>
                      </div>
                           <span className="worker-approval-address">{prop.workerAddress}</span>
                 </div> 
                             <div className="worker-approval-buttons">
                                  <button className="worker-approval-accept" name="accept">Accept</button>
                                  <button className="worker-approval-Reject" name="reject">Reject</button>
                             </div>
                                                 
         </div>
        </>
    );
}