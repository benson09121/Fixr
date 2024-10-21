import React from "react";
import "../css/updateprofile.css";
import { Link } from "react-router-dom";
import { useState } from 'react';
import Navbar from "../Navbar/Navbar";
import SideNav from "../SideNav/SideNav";
import { useNavigate } from 'react-router-dom';

function Update_Profile() {
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [showPassword3, setShowPassword3] = useState(false);
    const [showChangePass, setShowChangePass] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
    }
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

                        <form onSubmit={handleSubmit}>
                                <div className="update-forms">
                                    <label htmlFor="">Full Name</label>
                                    <input type="text" name="fname" id="fname" className="input-form" placeholder="Surname, Firstname" />
                                </div>

                                <div className="update-forms">
                                    <label htmlFor="">Email</label>
                                    <input type="text" name="email" id="email" className="input-form" placeholder="example@email.com" />
                                </div>

                                <div className="update-forms">
                                    <label htmlFor="">Mobile Number</label>
                                    <input type="" name="mobileno" id="mobileno" className="input-form" placeholder="0123-456-7890" />
                                </div>

                                <div className="update-buttons">
                                    <button className="update-save-btn">Save</button>
                                    <button  type="button" className="update-changepass-btn"onClick={() => setShowChangePass(!showChangePass)} >Change Password</button>
                                </div>

                        </form>
                    {showChangePass && (
                        <div className="update-change-password" >
                                <h2>Change Password</h2>
                                <form action="">
                                    <div className="update-profile-form">   
                                            <div className="update-profile-fields">
                                                <label htmlFor="">Current Password</label>
                                              <div className="update-profile-eye">
                                                <input type={showPassword ? "text" : "password"} className="pass-form" name="currentpass" />
                                                            <span className="eye" onClick={() => setShowPassword(!showPassword)}>
                                                        <i className={showPassword ? "fa fa-eye-slash" : "fa fa-eye"}></i>
                                                        </span>
                                                      </div>
                                            </div>

                                            <div className="update-profile-fields">
                                                <label htmlFor="">Current Password</label>
                                              <div className="update-profile-eye">
                                                <input type={showPassword2 ? "text" : "password"} className="pass-form" name="newpass" />
                                                            <span className="eye" onClick={() => setShowPassword2(!showPassword2)}>
                                                        <i className={showPassword2 ? "fa fa-eye-slash" : "fa fa-eye"}></i>
                                                        </span>
                                                      </div>
                                            </div>

                                            <div className="update-profile-fields">
                                                <label htmlFor="">Current Password</label>
                                              <div className="update-profile-eye">
                                                <input type={showPassword3 ? "text" : "password"} className="pass-form" name="confirmpass" />
                                                            <span className="eye" onClick={() => setShowPassword3(!showPassword3)}>
                                                        <i className={showPassword3 ? "fa fa-eye-slash" : "fa fa-eye"}></i>
                                                        </span>
                                                      </div>
                                            </div>
                                    </div>


                                </form>
                        </div>
                        )}
                    <form action="">
                            
                        </form>

                 </div>

        </div>
    )
}
export default Update_Profile;