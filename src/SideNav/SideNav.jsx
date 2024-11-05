import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../css/sidenav.css";
import SideNav_Workers from "./SideNav_Workers";
import SideNav_Notif from "./SideNav_Notif";
import axios from "axios";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";


export default function SideNav(prop) {
  const [cookies, setCookies, removeCookies] = useCookies(["account_token"]);
  const [workers, setWorkers] = useState([]); 
  const navigate = useNavigate();
  useEffect(() => {
    if (cookies.account_token && typeof cookies.account_token === 'string') {
      try {
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
      } catch (error) {
        console.error("Invalid token:", error);

      }
    } else {
      console.log("No valid token found");
   
    }
  }, [cookies.account_token]);


  function handleLogout(){
    removeCookies("account_token",{path:"/"});
    window.location.href = "/";
    window.location.reload();
  }

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
            <div className="notification-text">
            <h5>Notifications:</h5>
            </div>
            <SideNav_Notif 
              profile="../pics/user.png"
              notif_name="Aisha rated you 3 stars."
              notif_message='"Thank you so much!"'
            />
            <SideNav_Notif 
              profile="../pics/user.png"
              notif_name="Rallian messaged you."
              notif_message='"Hello, how much for your cleaning service?"'
            />
            <SideNav_Notif 
              profile="../pics/user.png"
              notif_name="Thea rated you 1 star."
              notif_message='"Ampangit ng lasa nung milktea"'
            />

<SideNav_Notif 
              profile="../pics/user.png"
              notif_name="Thea rated you 1 star."
              notif_message='"Ampangit ng lasa nung milktea"'
            />

<SideNav_Notif 
              profile="../pics/user.png"
              notif_name="Thea rated you 1 star."
              notif_message='"Ampangit ng lasa nung milktea"'
            />
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
              <div className="sidenav-footer-content" onClick={handleLogout}>
                <img src="/pics/exit.png" alt="" />
                <span>Log out</span>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}
