import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import {jwtDecode} from "jwt-decode";
import axios from "axios";

export default function Appointment() {
    
    const [cookies] = useCookies(["account_token"]);
    const [showAppointment, setShowAppointment] = useState(false);
    const [appointmentInfo, setAppointmentInfo] = useState([]);
    
    const toggleAppointment = () => {
        setShowAppointment(!showAppointment);
    };
    
    useEffect(() => {
        const userInfo = jwtDecode(cookies.account_token);
        axios.post("http://localhost/FIXR/API/Home/getAppointments.php", userInfo)
            .then((response) => {
                setAppointmentInfo(response.data.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the appointments!", error);
            });
    }, [cookies.account_token]);

    const acceptAppointment = (requestId) => {
        const userInfo = jwtDecode(cookies.account_token);
        axios.post("http://localhost/FIXR/API/Home/acceptAppointment.php", {
            request_id: requestId,
            provider_id: userInfo.user_id,
        })
        .then((response) => {
            console.log(response.data.message);
        })
        .catch((error) => {
            console.error("There was an error accepting the appointment!", error);
        });
    };

    return (
        <>
            <div>
                <div className="home-appointment" onClick={toggleAppointment}>
                    <label><span>{appointmentInfo.length}</span> clients are looking for cleaning appointments</label>
                </div>

                {showAppointment && (
                    <div className="appointment-cards">
                        {appointmentInfo.map((appointment, index) => (
                            <div key={index} className="appointment-item">
                                <div className="appointment-content">
                                    <div className="appointment-card">
                                        <div className="appointment-profile">
                                            <img src="pics/user.png" alt="User Profile" />
                                            <h1>{appointment.name}</h1>
                                            <span>{appointment.Address.Street}, {appointment.Address.Barangay}, {appointment.Address.Municipality}</span>
                                            <div className="appointment-category">
                                                <h6>Category: {appointment.CategoryName}</h6>
                                                <h6>Description: {appointment.Description}</h6>
                                            </div>
                                        </div>
                                        <div className="appointment-btn">
                                            <button className="appointment-accept" onClick={() => acceptAppointment(appointment.request_id)}>Accept</button>
                                            <button className="appointment-reject">Reject</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
