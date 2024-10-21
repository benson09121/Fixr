import React from "react";
import { Link } from "react-router-dom";

export default function Admin_Sidenav(prop) {

return(
<>
                    <div className="admin-sidenav">
                            <div className="admin-sidenav-header">
                                <img src={prop.adminProfile} alt="" />
                                <h5>{prop.adminName}</h5> 
                            </div>
                            <hr />
                            <div className="admin-sidenav-container">
                                <div className="admin-sidenav-center">

                                    <Link to="/adminhome">
                                        <div className="admin-sidenav-content">
                                            <i class="fa-solid fa-chart-column"></i>
                                            <span>Dashboard</span>
                                        </div>
                                        </Link> 

                                        <Link to='/manageuser'>
                                        <div className="admin-sidenav-content">
                                        <i class="fa-solid fa-user-pen"></i>
                                        <span>Manage User</span>
                                        </div>
                                        </Link> 
                                </div>

                                <div className="admin-sidenav-footer">
                                  <Link to='/'><div className="admin-sidenav-logout">
                                          <i class="fa-solid fa-arrow-right-from-bracket"></i>
                                          <span>Logout</span>
                                    </div></Link>  
                                </div>
                            </div>

                        </div>

</>
)
}