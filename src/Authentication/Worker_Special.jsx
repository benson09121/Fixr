import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Client_Cards from "../Client/Client_Cards";
import { Link } from "react-router-dom";

export default function Worker_Special() {
    const [cookies] = useCookies(["account_token"]);
    const [categories, setCategories] = useState([]);
    const [userInfo, setUserInfo] = useState({
        name: "",
        phone: "",
        account: "",
    });
    const [selectedCategories, setSelectedCategories] = useState([]); 
    const navigate = useNavigate();

    useEffect(() => {
        if (cookies.account_token && typeof cookies.account_token === 'string') {
          try {
            const decodedToken = jwtDecode(cookies.account_token);
            if (decodedToken.account_type !== "client") {
              console.log("Not a client");
              if(decodedToken.account_type === "worker") {
                navigate("/worker/home");
              } else if(decodedToken.account_type === "admin") {
                navigate("/admin/dashboard");
              } else {
              navigate("/");
              }
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

    const handleCardClick = (category) => {
        setSelectedCategories(prevSelected => 
            prevSelected.includes(category) 
                ? prevSelected.filter(c => c !== category) 
                : [...prevSelected, category]
        ); 
    };

    return (
        <>
        <body style={{backgroundColor:"#00afe8", height:"100vh"}}>
            <div className="worker-special-content" style={{display:"flex", flexDirection:"column"}}>
                <div className="update-back-button" style={{alignSelf:"flex-start", width:"100%"}}>
                    <i class="fa-solid fa-arrow-right" onClick={() => navigate(-1)}></i>
                </div>
                <h2 style={{ marginTop:"40px", color:"white" , alignSelf:"center"}}>  What’s Your Specialization?</h2>
                <div className="client-services" style={{width:"80%", alignSelf:"center"}}>
                    {categories.length > 0 ? (
                        categories.map((category, index) => (
                            <div
                                key={index}
                                onClick={() => handleCardClick(category)}
                                style={{
                                    border: "1px solid #ccc",
                                    padding: "10px",
                                    margin: "5px",
                                    cursor: "pointer",
                                    borderRadius: "20px",
                                    backgroundColor: selectedCategories.includes(category) ? "#8dbedd" : "#8dbedd",
                                    color: selectedCategories.includes(category) ? "white" : "black",
                                    display: "flex",
                                    justifyContent: "center",
                                    width: "17%",
                                }}
                            >
                                <Client_Cards 
                                    picture={"http://localhost/FIXR/API/Images/" + category.image}
                                    name={category.CategoryName}
                                />
                            </div>
                        ))
                    ) : (
                        navigate("/worker/home")
                    )}
                </div>
                <div style={{marginTop:"30px",display:"flex", flexDirection:"row-reverse", width:"90%"}}>
                   <Link to='/worker/home'> <button style={{padding:"10px 35px", border:"none", backgroundColor:"white", borderRadius:"20px"}}>Select</button></Link>
                </div>
            </div>
        </body>
        </>
    );
}