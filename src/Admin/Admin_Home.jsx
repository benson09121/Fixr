import React, { useState, useEffect, useRef } from "react";
import '../css/adminhome.css';
import { Link } from "react-router-dom";
import Admin_Sidenav from "./Admin_Sidenav";
import Admin_Cards from "./Admin_Cards";
import Admin_Approval from "./Admin_Approval";
import Admin_RegWorker from "./Admin_RegWorker";
import Admin_RegClient from "./Admin_RegClient";
import Admin_ClientFeed from "./Admin_ClientFeed";
import Admin_Report from "./Admin_Report";

import { Chart } from "react-google-charts";

export const data = [
    ["City", "User Per Month"],
    ["January", 500],
    ["February", 380],
    ["March", 410],
    ["April", 490],
    ["May", 350],
    ["June", 350],
    ["July", 400],
    ["August", 280],
    ["September", 290],
    ["October", 180],
    ["November", 450],
    ["December", 470],
];

export const options = {
    chartArea: { width: "90%" },
    colors: ["#4597c8"],
    bar: { groupWidth: "90%" },
    legend: { position: "top" },
};

export default function Admin_Home() {
    const [showReportPanel, setShowReportPanel] = useState(false);
    const [showAddService, setShowAddService] = useState(false); 
    const reportPanelRef = useRef(null);

    const handleReportClick = () => {
        setShowReportPanel(!showReportPanel);
    };

    const handleAddServiceClick = () => { 
        setShowAddService(!showAddService);   
    };

    const handleClickOutside = (event) => {
        if (reportPanelRef.current && !reportPanelRef.current.contains(event.target)) {
            setShowReportPanel(false);
        }
    };

    useEffect(() => {
        if (showReportPanel) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showReportPanel]);

    return (
        <>
            <div className="admin-content">
                <div className="admin-container">
                    <Admin_Sidenav adminProfile="/pics/user.png" adminName="Admin" />
                </div>

                <div className="admin-right-content">
                    <div className="admin-service-panel">
                        <div className="admin-service-card">
                           
                            <Admin_Cards 
                            picture="/pics/spray.png" 
                            name="Cleaning" 
                            />

                            <Admin_Cards 
                            picture="/pics/haircare.png" 
                            name="Hair Care" 
                            />
                            <Admin_Cards 
                            picture="/pics/beauty.png" 
                            name="Beauty" 
                            />

                            <Admin_Cards 
                            picture="/pics/aircon.png" 
                            name="Aircon" 
                            />

                            <Admin_Cards 
                            picture="/pics/massage.png" 
                            name="Massage" 
                            />
                            
                            <Admin_Cards 
                                picture="/pics/add.png" 
                                name="Add Service" 
                                onClick={handleAddServiceClick}
                            />
                        </div>

                        <div className="admin-report-card" onClick={handleReportClick}>
                            <img src="/pics/danger.png" alt="" />
                            <div className="admin-report-number">
                                <span>8</span>
                            </div>
                        </div>

                        {showAddService && (
                            <div className="admin-add-service">
                                <div className="add-service-content">
                                    <input type="text" placeholder="Name of the service" />
                                    <div className="add-service-circle">
                                        <input id="avatar" type="file" name="avatar" accept="image/png, image/jpeg" />
                                    </div>
                                    <button>Add</button>
                                </div>
                            </div>
                        )}
                        {showReportPanel && (
                            <div className="admin-report-panel" ref={reportPanelRef}>
                                <div className="report-panel-container">
                                    <div className="report-panel-header">
                                        <div className="report-details"><span>Report Details</span></div>
                                        <div className="report-proof"><span>Proof</span></div>
                                        <div className="report-buttons"><span>a</span></div>
                                    </div>
                                    <div className="report-panel-center">
                                        <Admin_Report 
                                            name="User's Name"
                                            reportedName="Worker's Name"
                                            reason="Inappropriate language in the chat"
                                            details="Unnecessary cursing in chat"
                                            picture1="/pics/wallpaper.png"
                                            picture2="/pics/massage.png"
                                            picture3="/pics/beauty.png"
                                        />

                                            <Admin_Report 
                                            name="User's Name"
                                            reportedName="Worker's Name"
                                            reason="Inappropriate language in the chat"
                                            details="Unnecessary cursing in chat"
                                            picture1="/pics/wallpaper.png"
                                            picture2="/pics/massage.png"
                                            picture3="/pics/beauty.png"
                                        />

                                            <Admin_Report 
                                            name="User's Name"
                                            reportedName="Worker's Name"
                                            reason="Inappropriate language in the chat"
                                            details="Unnecessary cursing in chat"
                                            picture1="/pics/wallpaper.png"
                                            picture2="/pics/massage.png"
                                            picture3="/pics/beauty.png"
                                        />

                                            <Admin_Report 
                                            name="User's Name"
                                            reportedName="Worker's Name"
                                            reason="Inappropriate language in the chat"
                                            details="Unnecessary cursing in chat"
                                            picture1="/pics/wallpaper.png"
                                            picture2="/pics/massage.png"
                                            picture3="/pics/beauty.png"
                                        />

                                            <Admin_Report 
                                            name="User's Name"
                                            reportedName="Worker's Name"
                                            reason="Inappropriate language in the chat"
                                            details="Unnecessary cursing in chat"
                                            picture1="/pics/wallpaper.png"
                                            picture2="/pics/massage.png"
                                            picture3="/pics/beauty.png"
                                        />
                                      
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                     
                     <div className="admin-center-content">
                            <div className="admin-worker-approval">
                                    <div className="worker-approval-header">
                                        <h5>Worker Approval</h5>
                                    </div>
                                <div className="worker-approval-center">
                                    <Admin_Approval 
                                        workerName="Worker's Name"
                                        serviceName="Service Name"
                                        workerAddress="123 Maple Street, Bayan, Dasmariñas, Cavite City"
                                    />

                                    <Admin_Approval 
                                        workerName="Worker's Name"
                                        serviceName="Service Name"
                                        workerAddress="123 Maple Street, Bayan, Dasmariñas, Cavite City"
                                    />

                                    <Admin_Approval 
                                        workerName="Worker's Name"
                                        serviceName="Service Name"
                                        workerAddress="123 Maple Street, Bayan, Dasmariñas, Cavite City"
                                    />

                                    <Admin_Approval 
                                        workerName="Worker's Name"
                                        serviceName="Service Name"
                                        workerAddress="123 Maple Street, Bayan, Dasmariñas, Cavite City"
                                    />

                                    <Admin_Approval 
                                        workerName="Worker's Name"
                                        serviceName="Service Name"
                                        workerAddress="123 Maple Street, Bayan, Dasmariñas, Cavite City"
                                    />

                                    <Admin_Approval 
                                        workerName="Worker's Name"
                                        serviceName="Service Name"
                                        workerAddress="123 Maple Street, Bayan, Dasmariñas, Cavite City"
                                    />

                                    <Admin_Approval 
                                        workerName="Worker's Name"
                                        serviceName="Service Name"
                                        workerAddress="123 Maple Street, Bayan, Dasmariñas, Cavite City"
                                    />

                                    <Admin_Approval 
                                        workerName="Worker's Name"
                                        serviceName="Service Name"
                                        workerAddress="123 Maple Street, Bayan, Dasmariñas, Cavite City"
                                    />

                                    <Admin_Approval 
                                        workerName="Worker's Name"
                                        serviceName="Service Name"
                                        workerAddress="123 Maple Street, Bayan, Dasmariñas, Cavite City"
                                    />
                                    
                                        

                                </div>
                                <div className="worker-approval-footer">
                                        <span>Pending: <span className="total-pending">60</span> </span>
                                </div>
                            </div>

                            <div className="admin-registered-worker">
                                <div className="registered-worker-header">
                                            <h5>Registered Worker</h5>
                                    </div>
                                <div className="registered-worker-center">
                                    <Admin_RegWorker 
                                    workerName="Worker's Name"
                                    serviceName="Service Name"
                                    />

                                    <Admin_RegWorker 
                                    workerName="Worker's Name"
                                    serviceName="Service Name"
                                    />

                                    <Admin_RegWorker 
                                    workerName="Worker's Name"
                                    serviceName="Service Name"
                                    />

<Admin_RegWorker 
                                    workerName="Worker's Name"
                                    serviceName="Service Name"
                                    />

<Admin_RegWorker 
                                    workerName="Worker's Name"
                                    serviceName="Service Name"
                                    />

<                                   Admin_RegWorker 
                                    workerName="Worker's Name"
                                    serviceName="Service Name"
                                    />

                                    <Admin_RegWorker 
                                    workerName="Worker's Name"
                                    serviceName="Service Name"
                                    />

                                    <Admin_RegWorker 
                                    workerName="Worker's Name"
                                    serviceName="Service Name"
                                    />

                                    <Admin_RegWorker 
                                    workerName="Worker's Name"
                                    serviceName="Service Name"
                                    />


                                    <Admin_RegWorker 
                                    workerName="Worker's Name"
                                    serviceName="Service Name"
                                    />
                                </div>
                                <div className="registered-worker-footer">
                                        <span>Total: <span className="total-registered-worker">4,321</span></span>
                                </div>
                            </div>
                           
                           <div className="admin-registered-client">
                                <div className="registered-client-header">
                                        <h5>Registered Client</h5>
                                </div>
                                  <div className="registered-client-center">
                                        <Admin_RegClient 
                                            name="Client's Name"
                                            address="123 Maple Street, Bayan, Dasmariñas, Cavite City"
                                        />  

                                            <Admin_RegClient 
                                            name="Client's Name"
                                            address="123 Maple Street, Bayan, Dasmariñas, Cavite City"
                                        />  

                                            <Admin_RegClient 
                                            name="Client's Name"
                                            address="123 Maple Street, Bayan, Dasmariñas, Cavite City"
                                        />  

                                            <Admin_RegClient 
                                            name="Client's Name"
                                            address="123 Maple Street, Bayan, Dasmariñas, Cavite City"
                                        />  

                                            <Admin_RegClient 
                                            name="Client's Name"
                                            address="123 Maple Street, Bayan, Dasmariñas, Cavite City"
                                        />  
                                            <Admin_RegClient 
                                            name="Client's Name"
                                            address="123 Maple Street, Bayan, Dasmariñas, Cavite City"
                                        />  

                                            <Admin_RegClient 
                                            name="Client's Name"
                                            address="123 Maple Street, Bayan, Dasmariñas, Cavite City"
                                        />  

                                            <Admin_RegClient 
                                            name="Client's Name"
                                            address="123 Maple Street, Bayan, Dasmariñas, Cavite City"
                                        />  
                                        
                                    </div>

                                    <div className="registered-client-footer">
                                        <span>Total: <span className="total-registered-client">8,765</span></span>
                                    </div>
                           </div>
                     </div>

                    <div className="admin-footer-panel">
                            <div className="admin-client-feedback">
                                <div className="client-feedback-header">
                                        <div className="client-feedback-name">
                                            <span>Name</span>
                                        </div>
                                        <div className="client-feedback-feedback">
                                            <span>Feedback</span>
                                        </div>
                                        <div className="client-feedback-rating">
                                            <span>Rating</span>
                                        </div>
                                </div>
                                
                                    <Admin_ClientFeed 
                                        uname="User's Name"
                                        type="General Feedback"
                                        desc="The overall design of thewebsite is clean and easy to navigate, whichmakes for a pleasant user experience.However, some sections feel a bit cluttered,especially when viewing on smaller screens. "
                                        star="★★★"
                                    />

                                    <Admin_ClientFeed 
                                        uname="User's Name"
                                        type="General Feedback"
                                        desc="The overall design of thewebsite is clean and easy to navigate, whichmakes for a pleasant user experience.However, some sections feel a bit cluttered,especially when viewing on smaller screens. "
                                        star="★★★"
                                    />

                                        <Admin_ClientFeed 
                                        uname="User's Name"
                                        type="General Feedback"
                                        desc="The overall design of thewebsite is clean and easy to navigate, whichmakes for a pleasant user experience.However, some sections feel a bit cluttered,especially when viewing on smaller screens. "
                                        star="★★★"
                                    />

                                        <Admin_ClientFeed 
                                        uname="User's Name"
                                        type="General Feedback"
                                        desc="The overall design of thewebsite is clean and easy to navigate, whichmakes for a pleasant user experience.However, some sections feel a bit cluttered,especially when viewing on smaller screens. "
                                        star="★★★"
                                    />

                            </div>

                            <div className="admin-user-graph">
                                <div className="user-graph-header">
                                        <div>
                                            <span>Users per month</span>
                                        </div>
                                        <div>
                                            <select name="graphyear" id="graphyear">
                                                <option value="2024">2024</option>
                                                <option value="2024">2023</option>
                                                <option value="2024">2022</option>
                                            </select>
                                        </div>
                                </div>
                                <div className="user-graph-center">
                                    <div className="admin-gram" style={{marginTop: "-13px", }}>
                                        <Chart
                                            chartType="ColumnChart"
                                            width="auto"
                                            height="200px"
                                            data={data}
                                            options={options}
                                            />
                                      </div>
                               </div>
                            </div>
                    </div>
                </div>

    
            </div>
        </>
    ) 

}