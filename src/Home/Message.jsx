import React from "react";

export default function Message(prop) {
  return (
    <>
    <div className="message">
      <img src={prop.picture} alt="" />
      <div className="text-message">
        <p>
          {" "}
          <span>{prop.name}</span>
          <br />
          {prop.message}{" "}
        </p>
      </div>
      <div>
        <h6>{prop.rating}</h6>
      </div>
    </div>
    </>
  );
}
