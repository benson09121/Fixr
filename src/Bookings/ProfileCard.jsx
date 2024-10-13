import React, { useState } from "react";
import '../css/ProfileCard.css';

export default function ProfileCard(prop) {
  const skillsData = {
    cleaning: {
      title: "Cleaning",
      images: ["/cleaning-image1.jpg", "/cleaning-image2.jpg"],
    },
    massage: {
      title: "Massage",
      images: ["/massage-image1.jpg", "/massage-image2.jpg"],
    },
    aircon: {
      title: "Aircon",
      images: ["/ac-image1.jpg", "/ac-image2.jpg"],
    },
    beauty: {
      title: "Beauty",
      images: ["/beauty-image1.jpg", "/beauty-image2.jpg"],
    },
    haircare: {
      title: "Hair Care",
      images: ["/haircare-image1.jpg", "/haircare-image2.jpg"],
    },
  };

  const [selectedSkill, setSelectedSkill] = useState(null);

  const handleSkillClick = (skill) => {
    setSelectedSkill(skill);
  };

  const handleClosePopup = () => {
    setSelectedSkill(null);
  };


  return (
    <>
      <div className="modals modal-show" onClick={prop.onClose}>
        <div className="profile-card" onClick={(e) => e.stopPropagation()}>
          <div className="profile-headers">
            <div className="profile-avatar-section">
              <img
                className="profile-avatar"
                src="/profile-avatar.png"
                alt="Profile"
              />
            </div>
            <div className="profile-info-section">
              <h2>asdfasdfasfd</h2>
              <p>Villa Isabel, Dasmarinas</p>
              <div className="rating">
                <span>⭐⭐⭐⭐☆</span>
              </div>
            </div>
            <div className="profile-book-section">
              <button className="book-button">Book</button>
            </div>
          </div>

          <div className="profile-body">
            <div className="description-section">
              <h3>Description</h3>
              <textarea placeholder="About Yourself :>" />
            </div>

            <div className="skills-section">
              <h3>Skills</h3>
              <ul>
                {Object.keys(skillsData).map((skillKey) => (
                  <li key={skillKey} onClick={() => handleSkillClick(skillKey)}>
                    <img
                      src={`/${skillKey}-icon.png`}
                      alt={skillsData[skillKey].title}
                      className="skill-icon"
                    />
                    <div className="skill-bar">
                      <div
                        className="skill-fill"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="reviews-section">
              <h3>Reviews</h3>
              <ul className="review-list">
                <li>
                  <span className="review-avatar">👤</span> Anya{" "}
                  <span className="review-stars">⭐⭐⭐⭐☆</span>{" "}
                  <p>Great Service!</p>
                </li>
                <li>
                  <span className="review-avatar">👤</span> Raemil{" "}
                  <span className="review-stars">⭐⭐⭐⭐☆</span>{" "}
                  <p>I was wondering if you have...</p>
                </li>
                <li>
                  <span className="review-avatar">👤</span> Charmaine{" "}
                  <span className="review-stars">⭐⭐⭐⭐☆</span>{" "}
                  <p>You're all set! We'll see you..</p>
                </li>
                <li>
                  <span className="review-avatar">👤</span> Chyyan{" "}
                  <span className="review-stars">⭐⭐⭐⭐☆</span>{" "}
                  <p>That's all for now, thank you!</p>
                </li>
                <li>
                  <span className="review-avatar">👤</span> Thea{" "}
                  <span className="review-stars">⭐⭐⭐⭐☆</span>{" "}
                  <p>Okay, thank you so much!</p>
                </li>
                <li>
                  <span className="review-avatar">👤</span> Aisha{" "}
                  <span className="review-stars">⭐⭐⭐⭐☆</span>{" "}
                  <p>That's all for now, thank you!</p>
                </li>
                <li>
                  <span className="review-avatar">👤</span> Rallian{" "}
                  <span className="review-stars">⭐⭐⭐⭐☆</span>{" "}
                  <p>Okay, thank you so much!</p>
                </li>
                <li>
                  <span className="review-avatar">👤</span> Don{" "}
                  <span className="review-stars">⭐⭐⭐⭐☆</span>{" "}
                  <p>Ako ay pogi</p>
                </li>
                <li>
                  <span className="review-avatar">👤</span> King{" "}
                  <span className="review-stars">⭐⭐⭐⭐☆</span> <p>I love</p>
                </li>
              </ul>
            </div>

            {selectedSkill && (
              <div className="popup-overlay" onClick={handleClosePopup}>
                <div
                  className="popup-content"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button className="close-button" onClick={handleClosePopup}>
                    X
                  </button>
                  <h3>{skillsData[selectedSkill].title}</h3>
                  <div className="skill-images">
                    {skillsData[selectedSkill].images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${skillsData[selectedSkill].title} ${index + 1}`}
                        className="popup-image"
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
