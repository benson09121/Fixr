import React from "react";

export default function Service_WorkerCard({ profile, class: workerClass, workername, stars, number, address, onFindAnother }) {
    return (
        <div className="servicebooking-worker">
            <div className="servicebooking-profile">
                <div className="servicebooking-profile-class">
                    <img src={profile} alt="" />
                    <span>{workerClass}</span>
                </div>
                <div className="servicebooking-profile-info">
                    <div className="servicebooking-profile-header">
                        <span className="servicebooking-name">{workername}</span>
                        <span className="servicebooking-stars">{stars}</span>
                    </div>
                    <span className="servicebooking-number">{number}</span>
                    <span className="servicebooking-address">{address}</span>
                </div>
            </div>

            <div className="servicebooking-button">
                <button name="findanother" onClick={onFindAnother}>Find Another</button>
                <button>Chat</button>
            </div>
        </div>
    );
}
