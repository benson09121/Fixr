import React, { useState } from "react";
import "../css/homecss.css";
import Navbar from "../Navbar/Navbar";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

function Test() { 
    const spanStyle = {
        padding: '20px',
        background: '#efefef',
        color: '#000000'
      }
      
      const divStyle = {
        width:'200px',
        height: '100px',
         backgroundSize: 'cover',
         backgroundPosition: 'center',
      }
      const slideImages = [
        {
          url: 'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
          caption: 'Slide 1'
        },
        {
          url: 'https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80',
          caption: 'Slide 2'
        },
        {
          url: 'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
          caption: 'Slide 3'
        },
      ];

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
    <div className="container" style={{width:"200px"}}>
        <div className="slide-container">
        <Slide>
         {slideImages.map((slideImage, index)=> (
            <div key={index}>
              <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
                <span style={spanStyle}>{slideImage.caption}</span>
              </div>
            </div>
          ))} 
        </Slide>

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

      </div>
      </>
       
    )

}


export default Test;