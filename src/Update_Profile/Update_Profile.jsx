import React, { useEffect } from "react";
import "../css/updateprofile.css";
import { Link } from "react-router-dom";
import { useState } from 'react';
import Navbar from "../Navbar/Navbar";
import SideNav from "../SideNav/SideNav";
import { useNavigate } from 'react-router-dom';
import {useCookies} from 'react-cookie';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';


function Update_Profile() {
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [showPassword3, setShowPassword3] = useState(false);
    const [showChangePass, setShowChangePass] = useState(false);
    const [user, setUser] = useState([
        {
            fname: '',
            email: '',
            mobileno: '',
            current_password: '',
            new_password: '',
        }
    ]);

    const handleChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    };

    const [cookies] = useCookies(['account_token']);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        console.log("hello");
        const data = jwtDecode(cookies.account_token);
        const user_id = data.user_id;
        event.preventDefault();
        const userData = {
            lname: user.fname.split(',')[0],
            fname: user.fname.split(',')[1],
            email: user.email,
            phone: user.mobileno,
            user_id: user_id,
            current_password: user.current_password,
            new_password: user.new_password
            
        };
        axios.post('http://localhost/FIXR/API/updateProfile.php', userData)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        })

    }

    useEffect(() => {
        const data = jwtDecode(cookies.account_token);
        const user_id = data.user_id;
        axios.post('http://localhost/FIXR/API/getProfile.php', {user_id: user_id})
        .then(response => {
            console.log(response.data.data);
            setUser({
                fname: response.data.data[0].lastName + ', ' + response.data.data[0].firstName,
                email: response.data.data[0].email,
                mobileno: response.data.data[0].phone
            });
        }
        )
    }, []);

    return(


        <div className="update-content">

            <div className="update-back-button">
            <i class="fa-solid fa-arrow-right"onClick={() => navigate(-1)}></i>
            </div>

      {/*profile picture*/}
              <div className="update-profile-picture">
                    <img src="/pics/user.png" alt="" />
              </div>


        {/*update form*/}
                 <div className="update-content-forms">
                        <h1>Update Profile</h1>

                        <form>
                                <div className="update-forms">
                                    <label htmlFor="">Full Name</label>
                                    <input type="text" name="fname" id="fname" className="input-form" placeholder="Surname, Firstname" onChange={handleChange} value={user.fname} />
                                </div>

                                <div className="update-forms">
                                    <label htmlFor="">Email</label> 
                                    <input type="text" name="email" id="email" className="input-form" placeholder="example@email.com" onChange={handleChange} value={user.email}  />
                                </div>

                                <div className="update-forms">
                                    <label htmlFor="">Mobile Number</label>
                                    <input type="" name="mobileno" id="mobileno" className="input-form" placeholder="0123-456-7890" onChange={handleChange} value={user.mobileno} />
                                </div>

                                <div className="update-buttons">
                                    <button type="submit" className="update-save-btn" onClick={handleSubmit}>Save</button>
                                    <button  type="button" className="update-changepass-btn"onClick={() => setShowChangePass(!showChangePass)} >Change Password</button>
                                </div>

                        
                    {showChangePass && (
                        <div className="update-change-password" >
                                <h2>Change Password</h2>
                                    <div className="update-profile-form">   
                                            <div className="update-profile-fields">
                                                <label htmlFor="">Current Password</label>
                                              <div className="update-profile-eye">
                                                <input type={showPassword ? "text" : "password"} className="pass-form" name="current_password" onChange={handleChange} />
                                                            <span className="eye" onClick={() => setShowPassword(!showPassword)}>
                                                        <i className={showPassword ? "fa fa-eye-slash" : "fa fa-eye"}></i>
                                                        </span>
                                                      </div>
                                            </div>

                                            <div className="update-profile-fields">
                                                <label htmlFor="">Repeat Password</label>
                                              <div className="update-profile-eye">
                                                <input type={showPassword2 ? "text" : "password"} className="pass-form" name="confirmpass" onChange={handleChange}  />
                                                            <span className="eye" onClick={() => setShowPassword2(!showPassword2)}>
                                                        <i className={showPassword2 ? "fa fa-eye-slash" : "fa fa-eye"}></i>
                                                        </span>
                                                      </div>
                                            </div>

                                            <div className="update-profile-fields">
                                                <label htmlFor="">New Password</label>
                                              <div className="update-profile-eye">
                                                <input type={showPassword3 ? "text" : "password"} className="pass-form" name="new_password"  onChange={handleChange} />
                                                            <span className="eye" onClick={() => setShowPassword3(!showPassword3)}>
                                                        <i className={showPassword3 ? "fa fa-eye-slash" : "fa fa-eye"}></i>
                                                        </span>
                                                      </div>
                                            </div>
                                    </div>


                        </div>
                        )}
                        </form>

                 </div>

        </div>
    )
}
export default Update_Profile;