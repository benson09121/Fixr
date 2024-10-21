import React from "react";

export default function Admin_RegWorker(prop) {
    return(<>
      <div className="registered-worker-content">
             <span className="registered-worker-name">{prop.workerName}</span>
             <span className="registered-worker-service">|</span>
             <span className="registered-worker-service">{prop.serviceName}</span>
        </div>
    </>
    )
}