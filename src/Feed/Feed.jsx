import React, { useEffect, useState } from "react";
import "../css/feed.css";
import { Link } from "react-router-dom";
import Menu_Profile from "../Profile_Menu/Menu_Profile";
import Feed_Sidenav from "../SideNav/Feed_Sidenav";
import Navbar from "../Navbar/Navbar";
import FeedNotif from "./FeedNotif";
import axios from "axios";
import { useCookies } from "react-cookie";
import {jwtDecode} from "jwt-decode";
function Feed() {
    const [cookies] = useCookies(["account_token"]);
    const [userInfo, setUserInfo] = useState({
        name: "",
        phone: "",
        account: "",
      });
      useEffect(() => {
        const userInfo = jwtDecode(cookies.account_token);
        axios.post("http://localhost/FIXR/API/Home/getInfo.php", { user_id: userInfo.user_id })
          .then((response) => {
            setUserInfo({
              name: response.data.data.userInfo.name,
              phone: response.data.data.userInfo.phone,
              account: response.data.data.userInfo.account_type,
            });
            setCategories(response.data.data.categories);
            setWorkerInfo(response.data.data.workerInfo);
          });
      }, [cookies.account_token]);
    
    return(
        <>
        <Navbar/>
        <div className="feed-content" style={{backgroundColor:"white"}}>
        <Feed_Sidenav
          picture="/pics/user.png"
          name={userInfo.name}
          number={userInfo.phone}
          class={userInfo.account}
        />
    <div className="feed-container">

            <FeedNotif
                profile="pics/user.png"
                name="Sam Ligaya"
                service="Aircon Service"
                message="I'm looking for clients who need their air conditioning units fixed."
            />

            <FeedNotif
                profile="pics/user.png"
                name="Red Reyes"
                service="Cleaning Service"
                message="Yeh."
            />

            <FeedNotif
                profile="pics/user.png"
                name="Geraldine Caasi"
                service="Massage Service"
                message="Looking for a relaxing massage? Contact me today!"
            />
            
            <FeedNotif
                profile="pics/user.png"
                name="Red Reyes"
                service="Cleaning Service"
                message="I just want you for my own."
            />
            

    
    </div>
    
       
 </div>
        </>
    )
    
}
export default Feed;