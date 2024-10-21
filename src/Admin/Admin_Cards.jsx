import React from "react";

export default function Admin_Cards(prop) {
    return (
        <>
            <div className="admin-card" onClick={prop.onClick}>
                <div className="admin-service-info">
                    <img src={prop.picture} alt="" />
                    <span>{prop.name}</span>
                </div>
            </div>
        </>
    );
}