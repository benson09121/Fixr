import React from "react";

export default function Client_Cards({ picture, name, onClick }) {
  return (
    <div className="clienthome-card" onClick={() => onClick(name)}>
      <div className="clienthome-service-info">
        <img src={picture} alt="" />
        <span>{name}</span>
      </div>
    </div>
  );
}