import React, { useEffect, useState } from "react";
import "../css/homecss.css";
import { Link } from "react-router-dom";
import Menu_Profile from "../Profile_Menu/Menu_Profile";
import Message from "./Message";
import Worker_SideNav from "../SideNav/Worker_Sidenav";
import Navbar from "../Navbar/Navbar";
import Appointment from "../Profile_Menu/Appointment";
import axios from "axios";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";


const Home = () => {
  const [cookies] = useCookies(["account_token"]);
  const [userInfo, setUserInfo] = useState({
    name: "",
    phone: "",
    account: "",
  });

  useEffect(() => {
    const userInfo = jwtDecode(cookies.account_token);
    axios.post("http://localhost/FIXR/API/Home/getInfo.php", userInfo)
      .then((response) => {
        setUserInfo({
          name: response.data.data.userInfo.name,
          phone: response.data.data.userInfo.phone,
          account: response.data.data.userInfo.account_type,
        });
        setCategories(response.data.data.categories); 
      });
  }, [cookies.account_token]);

  return (
    <>
    <Navbar/>
   
    <div className="home-content">
    <Worker_SideNav
          picture="/pics/user.png"
          name={userInfo.name}
          number={userInfo.phone}
          class={userInfo.account}
        />
      <div className="home-container">
      

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

          {/* Calendar card*/}
          <div className="card">
            <div className="card-header">
              <p>Calendar</p>
            </div>
                <div className="card-content">
                      <div className="card-month">
                              <span>July</span>
                      </div>
                      <div className="card-week">
                            <div className="card-days">
                                  <span>Su</span>
                            </div>
                            <div className="card-days">
                                  <span>Mo</span>
                            </div>
                            <div className="card-days">
                                  <span>Tu</span>
                            </div>
                            <div className="card-days">
                                  <span>We</span>
                            </div>
                            <div className="card-days">
                                  <span>Th</span>
                            </div>
                            <div className="card-days">
                                  <span>Fr</span>
                            </div>
                            <div className="card-days">
                                  <span>Sa</span>
                            </div>
                      </div>
                      
                      <div className="card-calendar-date">
                        <div className="card-date">
                                  <span></span>
                            </div>
                            <div className="card-date">
                                  <span>1</span>
                            </div>
                            <div className="card-date">
                                  <span>2</span>
                            </div>
                            <div className="card-date">
                                  <span>3</span>
                            </div>
                            <div className="card-date">
                                  <span>4</span>
                            </div>
                            <div className="card-date">
                                  <span>5</span>
                            </div>
                            <div className="card-date">
                                  <span>6</span>
                            </div>
                      </div>  
                      <div className="card-calendar-date">
                        <div className="card-date">
                                  <span>7</span>
                            </div>
                            <div className="card-date">
                                  <span>8</span>
                            </div>
                            <div className="card-date">
                                  <span>9</span>
                            </div>
                            <div className="card-date">
                                  <span>10</span>
                            </div>
                            <div className="card-date">
                                  <span>11</span>
                            </div>
                            <div className="card-date">
                                  <span>12</span>
                            </div>
                            <div className="card-date">
                                  <span>13</span>
                            </div>
                      </div>  

                      <div className="card-calendar-date">
                        <div className="card-date">
                                  <span>14</span>
                            </div>
                            <div className="card-date">
                                  <span>15</span>
                            </div>
                            <div className="card-date">
                                  <span>16</span>
                            </div>
                            <div className="card-date">
                                  <span>17</span>
                            </div>
                            <div className="card-date">
                                  <span>18</span>
                            </div>
                            <div className="card-date">
                                  <span>19</span>
                            </div>
                            <div className="card-date">
                                  <span>20</span>
                            </div>
                      </div>  

                      <div className="card-calendar-date">
                        <div className="card-date">
                                  <span>21</span>
                            </div>
                            <div className="card-date">
                                  <span>22</span>
                            </div>
                            <div className="card-date">
                                  <span>23</span>
                            </div>
                            <div className="card-date">
                                  <span>24</span>
                            </div>
                            <div className="card-date">
                                  <span>25</span>
                            </div>
                            <div className="card-date">
                                  <span>26</span>
                            </div>
                            <div className="card-date">
                                  <span>27</span>
                            </div>
                      </div>  

                      <div className="card-calendar-date">
                        <div className="card-date">
                                  <span>28</span>
                            </div>
                            <div className="card-date">
                                  <span>29</span>
                            </div>
                            <div className="card-date">
                                  <span>30</span>
                            </div>
                            <div className="card-date">
                                  <span>31</span>
                            </div>
                            <div className="card-date">
                                  <span></span>
                            </div>
                            <div className="card-date">
                                  <span></span>
                            </div>
                            <div className="card-date">
                                  <span></span>
                            </div>
                      </div>  

               
                </div>

            <div className="card-footer">
              <h5>Schedule</h5>
              <div className="card-schedule">
                  <span>July 26: Cleaning Service for Harry Potter</span>
                  <span>July 26: Cleaning Service for Harry Potter</span>
                  <span>July 26: Cleaning Service for Harry Potter</span>
              </div>
            </div>
          </div>
        </div>

       <Appointment/>
       

      </div>

     
    </div>
    </>
  );
};

export default Home;
