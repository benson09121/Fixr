import React from "react";

export default function Admin_UserTable(prop) {
    return(
        <>
                               <tr>
                                            <td>
                                                <img src={prop.picture} alt="" />
                                                <span>{prop.name}</span>
                                            </td>
                                            <td>
                                                <span>{prop.number}</span>
                                            </td>
                                            <td>
                                               <span>{prop.role}</span>
                                            </td>
                                            <td>
                                                <span>{prop.status}</span>
                                            </td>
                                            <td>
                                                <span>{prop.date}</span>
                                            </td>
                                            <td>
                                                <div className="manageuser-btn">
                                                <button className="manageuser-edit">Edit</button>
                                                <button className="manageuser-delete">Delete</button>
                                                </div>
                                            </td>
                                        </tr>
        </>
    )
}