import React ,{ useState} from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from "react-router-dom";

export default function Appointment() {
    const [showAppointment, setShowAppointment] = useState(false);

    const toggleAppointment = () => {
      setShowAppointment(!showAppointment);
    }
    return(
    <>
    <div>
    <div className="home-appointment" onClick={toggleAppointment}>
              <label htmlFor=""><span>2</span> clients are looking for cleaning appointments</label>
      </div>
      {showAppointment && (
     <div className="appointment-cards">
            <div className="appointment-content" >
                    <div className="appointment-card">
                          <div className="appointment-profile">
                                <img src="pics/man.png" alt="" />
                                <h1>Harry Potter</h1>
                                <span>123 Maple Street, Bayan, Dasmariñas, Cavite City</span>

                          </div>
                          <div className="appointment-btn">
                        <button className="appointment-accept">Accept</button>
                        <button className="appointment-reject">Reject</button>
                       </div>
                    </div>

                    <div className="appointment-card">
                          <div className="appointment-profile">
                                <img src="pics/man.png" alt="" />
                                <h1>Harry Potter</h1>
                                <span>123 Maple Street, Bayan, Dasmariñas, Cavite City</span>

                          </div>
                          <div className="appointment-btn">
                        <button className="appointment-accept">Accept</button>
                        <button className="appointment-reject">Reject</button>
                       </div>
                    </div>
                   
            </div>

            
    </div>
    
          )}
    </div>
    </>


    )
};
