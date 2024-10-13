
import React ,{ useState} from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from "react-router-dom";

export default function Menu_Profile(){

    const [showProfile, setShowProfile] = useState(false);

    const toggleProfile = () => {
      setShowProfile(!showProfile);
    };

    return(
    <>
    <div className="profile">
          <button onClick={toggleProfile} className="profile-btn">
            {" "}
            <img src="/pics/profile.png" alt="" />
          </button>
          {showProfile && (
            <div className="profile-box">
              <div className="profile-header">
                <div className="profile-image">
                  <img src="/pics/man.png" alt="Profile" id="profile-picture" />
                  <div className="profile-class">Worker</div>
                </div>
                <div className="profile-info">
                  <p>
                    Benson Javier <br />
                    <span>
                      0912 345 6789 <br />
                      <button style={{ backgroundColor: "#ededea" }}>
                        Edit Profile
                      </button>
                    </span>
                  </p>
                </div>
              </div>
              <div className="profile-dropdown">
                <div className="dropdown-content">
                  <img src="/pics/history.png" alt="Service History" />
                  <span>Service History</span>
                </div>
                <div className="dropdown-content">
                  <img src="/pics/info.png" alt="Location" />
                  <span>Location</span>
                </div>
                <div className="dropdown-content">
                  <img src="/pics/about.png" alt="About Us" />
                  <span>About us</span>
                </div>

                <Link to="/">
                  <div className="dropdown-content">
                    <img src="/pics/exit.png" alt="Log Out" />
                    <span>Log out</span>
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>
    </>
    )
}