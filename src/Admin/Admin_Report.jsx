import React from "react";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

export default function Admin_Report(prop) {
    const divStyle = {
        width: '100%',
        minWidth: '80%',  
        height: 'auto',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
         aspectRatio: '16 / 9',
    };

    const slideImages = [
        {
            url: prop.picture1, 
        },
        {
            url: prop.picture2, 
        },
        {
            url: prop.picture3, 
        },
    ];

    return (
        <>
          <div className="admin-report-container">
                    <div className="report-details-content">
                        <span><span style={{ fontWeight: "bolder" }}>User: </span>{prop.name}</span>
                        <span><span style={{ fontWeight: "bolder" }}>Reported User: </span>{prop.reportedName}</span>
                        <span><span style={{ fontWeight: "bolder" }}>Reason for Report: </span>{prop.reason}</span>
                        <span><span style={{ fontWeight: "bolder" }}>Details: </span>{prop.details}</span>
                    </div>
              
                    <div className="proof-content" style={{ width: "20%" }}>
                        <div className="slide-container">
                            <Slide>
                                {slideImages.map((slideImage, index) => (
                                    <div key={index}>
                                        <div class="slideimage"style={{ ...divStyle, backgroundImage: `url(${slideImage.url})` }}>
                                        </div>
                                    </div>
                                ))}
                            </Slide>
                        </div>
                    </div>
        
                    <div className="report-action">
                        <button className="report-suspend" name="report-suspend">Suspend</button>
                        <button className="report-warning" name="report-warning">Warning</button>
                    </div>
          </div>
        </>
    );
}
