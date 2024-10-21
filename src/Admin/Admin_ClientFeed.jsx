import React from "react";

export default function Admin_ClientFeed(prop) {
    return ( <> 
       <div className="client-feedback-content">
                                        <div className="client-feedback-container">
                                            <div className="client-feedback-uname">
                                                <span>{prop.uname}</span>
                                            </div>
                                            <div className="client-feedback-report">
                                                <span className="report-type">{prop.type}: </span>
                                                <span className="report-desc">{prop.desc}</span>
                                            </div>
                                            <div className="client-feedback-stars">
                                                <span>{prop.star}</span>
                                            </div>

                                        </div>
                                    </div>
                                    
    </>
    )
}
