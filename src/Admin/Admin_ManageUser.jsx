import React, { useState } from "react";
import { Link } from "react-router-dom";
import Admin_Sidenav from "./Admin_Sidenav";
import Admin_UserTable from "./Admin_UserTable";
import '../css/adminmanageuser.css';
import {
    Navbar,
    Nav,
    NavDropdown,
} from "react-bootstrap";
const navBarData = [
         {
        label: "All",
        submenu: [
            {
                label: "All",
                url: "/manageuser",
            },
            {

                label: "Worker",
                url: "/worker",
                submenu: [
                    {
                        label: "All",
                        url: "/worker/all",
                    },
                    {
                        label: "Massage",
                        url: "/worker/massage",
                    },
                    {
                        label: "Cleaning",
                        url: "/worker/cleaning",
                    },
                    {
                        label: "Beauty",
                        url: "/worker/beauty",
                    },
                    {
                        label: "Aircon",
                        url: "/worker/aircon",
                    },
                    {
                        label: "Hair Care",
                        url: "/worker/haircare",
                    },
                ],
            },
            {
                label: "Client",
                url: "/javascript",
            },
           
        ],
    },
];



export default function Admin_ManageUser() {
    const menuShow = (mItems) => {
        return mItems.map(
            (item, index) => {
                if (item.submenu) {
                    return (
                        <NavDropdown
                            title={
                                item.label
                            }
                            key={index}
                            className="dropdown-menu-dark 
                                       dropend">
                            {menuShow(
                                item.submenu
                            )}
                        </NavDropdown>
                    );
                } else {
                    return (
                        <Nav.Link
                            href={
                                item.url
                            }
                            key={index}>
                            {item.label}
                        </Nav.Link>
                    );
                }
            }
        );
    };
    const navStyle = {
        border: "solid 1px",
        color: "black",
        fontWeight: "bold",
        height:"40px",
        fontSize:"15px",
        textAlign:"center",
        borderRadius:"5px",
    };

    return (<>
    <div className="admin-content">
        <div className="admin-container" >
                    <Admin_Sidenav 
                        adminProfile="/pics/user.png"
                        adminName="Admin"
                    />
                </div>
                

                <div className="admin-right-content">
                         <div className="admin-right-container">
                                <div className="manage-user-header">
                                        <div className="manage-user-searchbar">
                                            <i class="fa-solid fa-magnifying-glass"></i>
                                            <input type="text" name="" id="" />
                                        </div>
                                                <Navbar
                                                    bg="transparent"
                                                    expand="lg"
                                                    variant="light">
                                            
                                                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                                    <Navbar.Collapse id="basic-navbar-nav">
                                                        <Nav
                                                            className="mr-auto"
                                                            style={navStyle}>
                                                            {menuShow(
                                                                navBarData
                                                            )}
                                                        </Nav>
                                                    </Navbar.Collapse>
                                                </Navbar>
                                   
                                </div>
                                <div className="manage-user-center">
                                                <table>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Contact Number</th>
                                                        <th>Role</th>
                                                        <th>Status</th>
                                                        <th>Joined Date</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                    <Admin_UserTable
                                                        picture="/pics/user.png"
                                                        name="Alexander Hamilton"
                                                        number="09123456789"
                                                        role="Worker | Massage"
                                                        status="Online"
                                                        date="01 Jan 2021"
                                                      />

                                                        <Admin_UserTable
                                                        picture="/pics/user.png"
                                                        name="Alexander Hamilton"
                                                        number="09123456789"
                                                        role="Worker | Massage"
                                                        status="Online"
                                                        date="01 Jan 2021"
                                                      />

                                                        <Admin_UserTable
                                                        picture="/pics/user.png"
                                                        name="Alexander Hamilton"
                                                        number="09123456789"
                                                        role="Worker | Massage"
                                                        status="Online"
                                                        date="01 Jan 2021"
                                                      />

                                                        <Admin_UserTable
                                                        picture="/pics/user.png"
                                                        name="Alexander Hamilton"
                                                        number="09123456789"
                                                        role="Worker | Massage"
                                                        status="Online"
                                                        date="01 Jan 2021"
                                                      />

                                                        <Admin_UserTable
                                                        picture="/pics/user.png"
                                                        name="Alexander Hamilton"
                                                        number="09123456789"
                                                        role="Worker | Massage"
                                                        status="Online"
                                                        date="01 Jan 2021"
                                                      />

                                                        <Admin_UserTable
                                                        picture="/pics/user.png"
                                                        name="Alexander Hamilton"
                                                        number="09123456789"
                                                        role="Worker | Massage"
                                                        status="Online"
                                                        date="01 Jan 2021"
                                                      />

                                                        <Admin_UserTable
                                                        picture="/pics/user.png"
                                                        name="Alexander Hamilton"
                                                        number="09123456789"
                                                        role="Worker | Massage"
                                                        status="Online"
                                                        date="01 Jan 2021"
                                                      />

                                                        <Admin_UserTable
                                                        picture="/pics/user.png"
                                                        name="Alexander Hamilton"
                                                        number="09123456789"
                                                        role="Worker | Massage"
                                                        status="Online"
                                                        date="01 Jan 2021"
                                                      />

                                                        <Admin_UserTable
                                                        picture="/pics/user.png"
                                                        name="Alexander Hamilton"
                                                        number="09123456789"
                                                        role="Worker | Massage"
                                                        status="Online"
                                                        date="01 Jan 2021"
                                                      />

                                                        <Admin_UserTable
                                                        picture="/pics/user.png"
                                                        name="Alexander Hamilton"
                                                        number="09123456789"
                                                        role="Worker | Massage"
                                                        status="Online"
                                                        date="01 Jan 2021"
                                                      />

                                            <Admin_UserTable
                                                        picture="/pics/user.png"
                                                        name="Alexander Hamilton"
                                                        number="09123456789"
                                                        role="Worker | Massage"
                                                        status="Online"
                                                        date="01 Jan 2021"
                                                      />
                                                </table>
                                </div>

                                <div className="manage-user-footer">
                                        <div className="manage-user-rowsnum">
                                            <span>1-10 of 1776 rows</span>
                                        </div>
                                        <div className="manage-user-totalrows">
                                            <button>&lt;&lt;</button>
                                            <button>&lt;</button>
                                            <span>1</span>
                                            <span>2</span>
                                            <span>...</span>
                                            <span>178</span>
                                            <button>&gt;</button>
                                            <button>&gt;&gt;</button>
                                        </div>
                                </div>
                         </div>
                      
                        </div>

                </div>
    </>
    )
}