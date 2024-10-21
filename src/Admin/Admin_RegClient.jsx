import React from "react";

export default function Admin_RegClient(prop) {
    return ( <>
    <div className="registered-client-content">
             <span className="registered-client-name">{prop.name}</span>
             <span className="registered-client-address">{prop.address}</span>               
      </div>
    </>
    )
}