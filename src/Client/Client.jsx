import React, { useEffect, useState } from "react";
import "../css/clientcss.css";
import Client_Cards from "./Client_Cards";
import Navbar from "../Navbar/Navbar";
import SideNav from "../SideNav/SideNav";
import News_Container from "./News_Container";
import axios from "axios";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Client = () => {
  const [cookies] = useCookies(["account_token"]);
  const [userInfo, setUserInfo] = useState({
    name: "",
    phone: "",
    account: "",
  });
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (cookies.account_token && typeof cookies.account_token === 'string') {
      try {
        const decodedToken = jwtDecode(cookies.account_token);
        if (decodedToken.account_type !== "client") {
          console.log("Not a client");
          navigate("/");
        } else {
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
        }
      } catch (error) {
        console.error("Invalid token:", error);
        navigate("/");
      }
    } else {
      console.log("No valid token found");
      navigate("/");
    }
  }, [cookies.account_token]);

  return (
    <>
      <Navbar />
      <div className="clienthome-content">
        <SideNav
          picture="/pics/user.png"
          name={userInfo.name}
          number={userInfo.phone}
          class={userInfo.account}
        />
        <div className="clienthome-container">
      

          <div className="client-search-content">
            <h4>Services</h4>
            <div className="client-search-bar">
              <span>Search</span>
              <span><i className="fa-solid fa-magnifying-glass"></i></span>
            </div>
            <div className="client-search-input">
              <input type="text" />
            </div>
          </div>

          <div className="client-services">

            {categories.length > 0 ? (
            categories.map((category) => (
              <Client_Cards 
                picture="/pics/default.png"
                name={category}
              />
            ))
          ) : (
            <h3 style={{padding:"10px"}}>No available services.</h3>
          )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Client;
