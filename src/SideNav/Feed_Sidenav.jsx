import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/sidenav.css";
import SideNav_Workers from "./SideNav_Workers";
import SideNav_Notif from "./SideNav_Notif";
import axios from "axios";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";


export default function Feed_Sidenav(prop) {
  const [cookies] = useCookies(["account_token"]);
  const [workers, setWorkers] = useState([]); 

  useEffect(() => {
    const workerInfo = jwtDecode(cookies.account_token);

    axios.post("http://localhost/Fixr/API/Home/getworker.php", workerInfo)
      .then((response) => {
        if (response.data && response.data.data) { 
          setWorkers(response.data.data); 
        } else {
          setWorkers([]); 
        }
      })
      .catch((error) => {
        console.error("Error fetching workers:", error);
        setWorkers([]); 
      });
  }, [cookies.account_token]);

  return (
    <>
      <div className="sidenav">
        <div className="sidenav-content">
          <div className="sidenav-header">
            <div className="sidenav-header-profile">
              <img src={prop.picture} alt="" />
              <div className="sidenav-user-class">
                {prop.class}
              </div>
            </div>
            <div className="sidenav-header-details">
              <span className="sidenav-name">
                {prop.name}
                <Link to="/profile"><img src="/pics/edit.png" alt="" /></Link>
              </span>
              <span className="sidenav-number">{prop.number}</span>
              <select name="status" id="status" className="status-dropdown" style={{ border:"none" }}>
                <option value="available">Available</option>
                <option value="busy">Busy</option>
                <option value="notdisturb">Do not disturb</option>
                <option value="brb">Be right Back</option>
                <option value="appear">Appear anyway</option>
              </select>
            </div>
          </div>
          <hr />  

          <div className="sidenav-worker-content">
            <div className="workers-text">
            <h5>Workers (Online)</h5>
            </div>
            {workers.length > 0 ? (
              workers.map(worker => (
                <SideNav_Workers
                  key={worker.user_id}
                  picture="../pics/user.png"
                  name={worker.name}
                  service={worker.CategoryName}
                  number={worker.phone}
                />
              ))
            ) : (
              <p>No available workers online.</p> 
            )}
          </div>  

          <div className="sidenav-notif">
                <div className="feed-side-post">
                <i className="fa-solid fa-magnifying-glass"></i>
                     <span>Post</span>
                </div>
          </div>

          <div className="sidenav-footer">
            <div className="sidenav-footer-content">
              <img src="/pics/history.png" alt="" />
              <span>Service History</span>
            </div>
            <div className="sidenav-footer-content">
              <img src="/pics/info.png" alt="" />
              <span>Location</span>
            </div>
            <Link to='aboutus'>
              <div className="sidenav-footer-content">
                <img src="/pics/about.png" alt="" />
                <span>About us</span>
              </div>
            </Link>
            <Link to="/">
              <div className="sidenav-footer-content">
                <img src="/pics/exit.png" alt="" />
                <span>Log out</span>
              </div>
            </Link> 
          </div>
        </div>
      </div>
    </>
  );
}
