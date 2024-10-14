import React, { useState } from "react";
import "./css/homecss.css";
import { Link } from "react-router-dom";

const Home = () => {
  const [showProfile, setShowProfile] = useState(false);

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  return (
    <div className="home-content">
      <div className="home-sidebar">
        <div className="home-sidebar-header">
          <div className="home-logo">
            <img src="/pics/logo4.png" alt="Logo" />
          </div>
        </div>
        <div className="home-sidebar-contents" id="home">
        <Link to="/home"><h2>Home</h2> </Link> 
        </div>
        <div className="home-sidebar-contents" id="bookings">
          <Link to="/bookings"><h2>Bookings</h2></Link>
        </div>
        <div className="home-sidebar-contents"  id="chats">
          <h2>Chat</h2>
        </div>
        <div className="home-sidebar-contents"  id="feeds">
          <h2>Feed</h2>
        </div>
        <div className="home-sidebar-contents"  id="feeds">
        <Link to="/client"><h2>Client Home (preview)</h2></Link>
        </div>
      </div>

      <div className="container">
        {/* profile button */}
        <div className="profile">
          <button onClick={toggleProfile} className="profile-btn"> <img src="/pics/profile.png" alt="" />
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
                      <button style={{backgroundColor:"#ededea"}}>Edit Profile</button>
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
                <Link to='/'> <div className="dropdown-content">
                  <img src="/pics/exit.png" alt="Log Out" />
                  <span>Log out</span> 
                </div></Link>
              </div>
            </div>
          )}
        </div>


       
        <div className="card-sets">

                 {/*review card*/}
                        <div className="card">
                                <div className="card-header">
                                        <p>Reviews</p>
                                </div>
                                <div className="card-content">
                                        <div className="message">
                                                <img src="/pics/woman.png" alt="" />
                                                        <div className="text-message">
                                                                <p> <span>Anya</span><br />Great Service! </p>
                                                        </div>
                                                        <div>
                                                                <h6>⭐⭐⭐</h6>
                                                        </div>
                                        </div>

                                        <div className="message">
                                                <img src="/pics/man.png" alt="" />
                                                        <div className="text-message">
                                                                <p> <span>Raemil</span><br />I was wondering if you have.. </p>
                                                        </div>
                                                        <div>
                                                                <h6>⭐⭐⭐</h6>
                                                        </div>
                                        </div>

                                        <div className="message">
                                                <img src="/pics/woman.png" alt="" />
                                                        <div className="text-message">
                                                                <p> <span>Charmaine</span><br />You're all set, We'll see you </p>
                                                        </div>
                                                        <div>
                                                                <h6>⭐⭐⭐</h6>
                                                        </div>                                                       
                                        </div>

                                        <div className="message">
                                                <img src="/pics/man.png" alt="" />
                                                        <div className="text-message">
                                                                <p> <span>Chyyan</span><br />That's all for now, thank you! </p>
                                                        </div>
                                                        <div>
                                                                <h6>⭐⭐⭐</h6>
                                                        </div> 
                                        </div>

                                        <div className="message">
                                                <img src="/pics/woman.png" alt="" />
                                                        <div className="text-message">
                                                                <p> <span>Thea</span><br />Okay, thank you so much! </p>
                                                        </div>
                                                        <div>
                                                                <h6>⭐⭐⭐</h6>
                                                        </div> 
                                        </div>

                                        <div className="message">
                                                <img src="/pics/woman.png" alt="" />
                                                        <div className="text-message">
                                                                <p> <span>Aisha</span><br />That's all for now, thank you! </p>
                                                        </div>
                                                        <div>
                                                                <h6>⭐⭐⭐</h6>
                                                        </div> 
                                        </div>

                                        <div className="message">
                                                <img src="/pics/man.png" alt="" />
                                                        <div className="text-message">
                                                                <p> <span>Rallian</span><br />Okay, thank you so much! </p>
                                                        </div>
                                                        <div>
                                                                <h6>⭐⭐⭐</h6>
                                                        </div> 
                                        </div>

                                </div>

                                <div className="card-footer">
                                        <h5>Total</h5>
                                </div>  
                        </div>


                {/*history card*/}
                        <div className="card">
                                <div className="card-header">
                                        <p>History</p>
                                </div>
                                <div className="card-content">
                                        <div className="message2">
                                                <img src="/pics/woman.png" alt="" />
                                                        <div className="text-message">
                                                                <p> <span>Anya</span><br />Lankaan, Dasmariñas</p>
                                                        </div>
                                                        <h6>Cleaning</h6>
                                        </div>

                                        <div className="message2">
                                                <img src="/pics/man.png" alt="" />
                                                        <div className="text-message">
                                                                <p> <span>Raemil</span><br />Lankaan, Dasmariñas </p>
                                                        </div>
                                                        <h6>Aircon</h6>
                                        </div>

                                        <div className="message3">
                                                <img src="/pics/woman.png" alt="" />
                                                        <div className="text-message">
                                                                <p> <span>Charmaine</span><br />Lankaan, Dasmariñas</p>
                                                        </div>
                                                        <h6>Massage</h6>
                                        </div>

                                        <div className="message2">
                                                <img src="/pics/man.png" alt="" />
                                                        <div className="text-message">
                                                                <p> <span>Chyyan</span><br />Lankaan, Dasmariñas</p>
                                                        </div>
                                                        <h6>Aircon</h6>
                                        </div>

                                        <div className="message3">
                                                <img src="/pics/woman.png" alt="" />
                                                        <div className="text-message">
                                                                <p> <span>Thea</span><br />Lankaan, Dasmariñas</p>
                                                        </div>
                                                        <h6>Beauty</h6>
                                        </div>

                                        <div className="message2">
                                                <img src="/pics/woman.png" alt="" />
                                                        <div className="text-message">
                                                                <p> <span>Aisha</span><br />Lankaan, Dasmariñas</p>
                                                        </div>
                                                        <h6>Massage</h6>
                                        </div>

                                        <div className="message2">
                                                <img src="/pics/man.png" alt="" />
                                                        <div className="text-message">
                                                                <p> <span>Rallian</span><br />Lankaan, Dasmariñas</p>
                                                        </div>
                                                        <h6>Hair Care</h6>
                                        </div>

                                </div>

                                <div className="card-footer">
                                        <h5>Total</h5>
                                </div>  
                        </div>

                {/*incoming appointment card*/}
                <div className="card">
                        <div className="card-header">
                                <p>Incoming Appointment</p>
                        </div>
                        <div className="card-content">
                                <div className="message2">
                                        <img src="/pics/woman.png" alt="" />
                                                <div className="text-message">
                                                        <p> <span>Anya</span><br />Lankaan, Dasmariñas</p>
                                                </div>
                                                        <div className="request">
                                                                <p>Cleaning</p>
                                                                <div className="buttons">
                                                                <button className="accept">Accept</button>
                                                                <button className="reject">Reject</button>
                                                                </div>
                                                </div>
                                                
                                </div>

                                <div className="message2">
                                        <img src="/pics/man.png" alt="" />
                                                <div className="text-message">
                                                        <p> <span>Raemil</span><br />Lankaan, Dasmariñas</p>
                                                </div>
                                                        <div className="request">
                                                                <p>Aircon</p>
                                                                <div className="buttons">
                                                                <button className="accept">Accept</button>
                                                                <button className="reject">Reject</button>
                                                                </div>
                                                </div>
                                </div>

                                <div className="message3">
                                        <img src="/pics/woman.png" alt="" />
                                                <div className="text-message">
                                                        <p> <span>Charmaine</span><br />Lankaan, Dasmariñas</p>
                                                </div>
                                                        <div className="request">
                                                                <p>Massage</p>
                                                                <div className="buttons">
                                                                <button className="accept">Accept</button>
                                                                <button className="reject">Reject</button>
                                                                </div>
                                                </div>
                                </div>

                                <div className="message2">
                                        <img src="/pics/man.png" alt="" />
                                                <div className="text-message">
                                                        <p> <span>Aircon</span><br />Lankaan, Dasmariñas</p>
                                                </div>
                                                        <div className="request">
                                                                <p>Cleaning</p>
                                                                <div className="buttons">
                                                                <button className="accept">Accept</button>
                                                                <button className="reject">Reject</button>
                                                                </div>
                                                </div>
                                </div>

                                <div className="message3">
                                        <img src="/pics/woman.png" alt="" />
                                                <div className="text-message">
                                                        <p> <span>Thea</span><br />Lankaan, Dasmariñas</p>
                                                </div>
                                                        <div className="request">
                                                                <p>Beauty</p>
                                                                <div className="buttons">
                                                                <button className="accept">Accept</button>
                                                                <button className="reject">Reject</button>
                                                                </div>
                                                </div>
                                </div>

                                <div className="message2">
                                        <img src="/pics/woman.png" alt="" />
                                                <div className="text-message">
                                                        <p> <span>Aisha</span><br />Lankaan, Dasmariñas</p>
                                                </div>
                                                        <div className="request">
                                                                <p>Massage</p>
                                                                <div className="buttons">
                                                                <button className="accept">Accept</button>
                                                                <button className="reject">Reject</button>
                                                                </div>
                                                </div>
                                </div>

                                <div className="message2">
                                        <img src="/pics/man.png" alt="" />
                                                <div className="text-message">
                                                        <p> <span>Rallian</span><br />Lankaan, Dasmariñas</p>
                                                </div>
                                                        <div className="request">
                                                                <p>Hair Care</p>
                                                                <div className="buttons">
                                                                <button className="accept">Accept</button>
                                                                <button className="reject">Reject</button>
                                                                </div>
                                                        </div>
                                </div>

                        </div>

            <div className="card-footer">
                    <h5>Total</h5>
            </div>  
                        </div>

          </div>
      </div>
    </div>
  );
};

export default Home;
