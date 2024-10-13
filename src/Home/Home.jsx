import React, { useState } from "react";
import "../css/homecss.css";
import { Link } from "react-router-dom";
import Menu_Profile from "../Profile_Menu/Menu_Profile";
import Message from "./Message";
import SideNav from "../SideNav/SideNav";

const Home = () => {
  return (
    <div className="home-content">
      <SideNav />

      <div className="container">
        {/* profile button */}
        <Menu_Profile />

        <div className="card-sets">
          {/*review card*/}
          <div className="card">
            <div className="card-header">
              <p>Reviews</p>
            </div>
            <div className="card-content">
              <Message
                name="Anya"
                picture="/pics/woman.png"
                message="Great Service!"
                rating="⭐⭐⭐"
              />

              <Message
                name="Raemil"
                picture="/pics/man.png"
                message="I was wondering if you have.."
                rating="⭐⭐⭐"
              />
              <Message
                name="Charmaine"
                picture="/pics/woman.png"
                message="You're all set, We'll see you"
                rating="⭐⭐⭐"
              />
              <Message
                name="Chyyan"
                picture="/pics/man.png"
                message="That's all for now, thank you!"
                rating="⭐⭐⭐"
              />
              <Message
                name="Thea"
                picture="/pics/woman.png"
                message="Okay, thank you so much!"
                rating="⭐⭐⭐"
              />

              <div className="message">
                <img src="/pics/woman.png" alt="" />
                <div className="text-message">
                  <p>
                    {" "}
                    <span>Aisha</span>
                    <br />
                    That's all for now, thank you!{" "}
                  </p>
                </div>
                <div>
                  <h6>⭐⭐⭐</h6>
                </div>
              </div>

              <div className="message">
                <img src="/pics/man.png" alt="" />
                <div className="text-message">
                  <p>
                    {" "}
                    <span>Rallian</span>
                    <br />
                    Okay, thank you so much!{" "}
                  </p>
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
                  <p>
                    {" "}
                    <span>Anya</span>
                    <br />
                    Lankaan, Dasmariñas
                  </p>
                </div>
                <h6>Cleaning</h6>
              </div>

              <div className="message2">
                <img src="/pics/man.png" alt="" />
                <div className="text-message">
                  <p>
                    {" "}
                    <span>Raemil</span>
                    <br />
                    Lankaan, Dasmariñas{" "}
                  </p>
                </div>
                <h6>Aircon</h6>
              </div>

              <div className="message3">
                <img src="/pics/woman.png" alt="" />
                <div className="text-message">
                  <p>
                    {" "}
                    <span>Charmaine</span>
                    <br />
                    Lankaan, Dasmariñas
                  </p>
                </div>
                <h6>Massage</h6>
              </div>

              <div className="message2">
                <img src="/pics/man.png" alt="" />
                <div className="text-message">
                  <p>
                    {" "}
                    <span>Chyyan</span>
                    <br />
                    Lankaan, Dasmariñas
                  </p>
                </div>
                <h6>Aircon</h6>
              </div>

              <div className="message3">
                <img src="/pics/woman.png" alt="" />
                <div className="text-message">
                  <p>
                    {" "}
                    <span>Thea</span>
                    <br />
                    Lankaan, Dasmariñas
                  </p>
                </div>
                <h6>Beauty</h6>
              </div>

              <div className="message2">
                <img src="/pics/woman.png" alt="" />
                <div className="text-message">
                  <p>
                    {" "}
                    <span>Aisha</span>
                    <br />
                    Lankaan, Dasmariñas
                  </p>
                </div>
                <h6>Massage</h6>
              </div>

              <div className="message2">
                <img src="/pics/man.png" alt="" />
                <div className="text-message">
                  <p>
                    {" "}
                    <span>Rallian</span>
                    <br />
                    Lankaan, Dasmariñas
                  </p>
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
                  <p>
                    {" "}
                    <span>Anya</span>
                    <br />
                    Lankaan, Dasmariñas
                  </p>
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
                  <p>
                    {" "}
                    <span>Raemil</span>
                    <br />
                    Lankaan, Dasmariñas
                  </p>
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
                  <p>
                    {" "}
                    <span>Charmaine</span>
                    <br />
                    Lankaan, Dasmariñas
                  </p>
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
                  <p>
                    {" "}
                    <span>Aircon</span>
                    <br />
                    Lankaan, Dasmariñas
                  </p>
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
                  <p>
                    {" "}
                    <span>Thea</span>
                    <br />
                    Lankaan, Dasmariñas
                  </p>
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
                  <p>
                    {" "}
                    <span>Aisha</span>
                    <br />
                    Lankaan, Dasmariñas
                  </p>
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
                  <p>
                    {" "}
                    <span>Rallian</span>
                    <br />
                    Lankaan, Dasmariñas
                  </p>
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
