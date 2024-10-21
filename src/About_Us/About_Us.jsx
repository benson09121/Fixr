import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../css/aboutus.css';


function About_Us() {
    const navigate1 = useNavigate();

    const [hoveredStar, setHoveredStar] = useState(0); 
    const [selectedStar, setSelectedStar] = useState(0);

    const handleMouseOver = (index) => {
        setHoveredStar(index);
    };

    const handleClick = (index) => {
        setSelectedStar(index);
    };

    const handleMouseLeave = () => {
        setHoveredStar(0);
    };
        return (
        <>
            <div className="aboutus-container">
                    
         <div className="update-back-button">
            <i class="fa-solid fa-arrow-right"onClick={() => navigate1(-1)} id="aboutus-backbtn"></i>
            </div>
            <h1>About us</h1>
                    <div className="aboutus-content">
                       
                        <span>Our platform connects you with the nearest available home service professionals, streamlining the process of finding, hiring, and receiving top-notch services. Whether you need cleaning, repairs, or wellness services, we ensure a seamless experience from booking to service execution. Clients can easily locate and book skilled professionals, while workers can register to offer their services and connect with potential clients. Operating across the Philippines, we support both urban and rural communities by uplifting the informal sector, providing reliable opportunities for local service providers, and delivering dependable solutions for our users.</span>
                  </div>

                  <h1>Feedback</h1>

                  <div className="aboutus-feedback">
                       <div className="aboutus-feedback-header">
                            <select name="feedbackKind" id="feedbackKind">
                                <option value="generalFeedback">General Feedback</option>
                                <option value="bugReport">Bug Report</option>
                                <option value="featureRequest">Feature Request</option>
                            </select>

                            <div className="star-rating" onMouseLeave={handleMouseLeave}>
                              {[1, 2, 3, 4, 5].map((star, index) => (
                                    <span
                                        key={index}
                                        className={`star ${hoveredStar >= star || selectedStar >= star ? 'yellow' : ''}`}
                                        onMouseOver={() => handleMouseOver(star)}
                                        onClick={() => handleClick(star)}
                                    >
                                        &#9733;
                                    </span>
                                ))}
                            </div>
                       </div>

                       <div className="aboutus-feedback-center">
                            <textarea name="feedback" id="feedback" cols="30" rows="10" placeholder="Please describe your feedback in detail" ></textarea>
                       </div>

                                <div className="aboutus-feedback-footer">
                                    <button type="submit" name="feedbackbtn" className="feedbackbtn">Submit</button>
                                </div>
                       
                 </div>
            </div>
        </>
    )
}

export default About_Us;