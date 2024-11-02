import React, { useState, useEffect } from "react";
import "../css/updateprofile.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Update_Profile() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [description, setDescription] = useState("");
    const [userId, setUserId] = useState(1); 
    const navigate = useNavigate();

    useEffect(() => {
        axios.post("http://localhost/FIXR/API/Home/getCategory.php")
            .then(response => {
                if (response.data.status === 200) {
                    setCategories(response.data.data);
                } else {
                    console.error("No categories found");
                }
            })
            .catch(error => console.error("Error fetching categories:", error));
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post("http://localhost/FIXR/API/Home/submitRequest.php", {
            user_id: userId,
            category: selectedCategory,
            description: description
        })
        .then(response => {
            if (response.data.status === 200) {
                alert("Request submitted successfully!");
                setSelectedCategory("");
                setDescription("");
            } else {
                alert("Failed to submit request");
            }
        })
        .catch(error => console.error("Error submitting request:", error));
    };

    return (
        <div className="update-content">
            <div className="update-back-button">
                <i className="fa-solid fa-arrow-right" onClick={() => navigate(-1)}></i>
            </div>

            <div className="update-profile-picture">
                <img src="/pics/user.png" alt="" />
            </div>

            <div className="update-content-forms">
                <h1>Request Form</h1>
                <form onSubmit={handleSubmit}>
                    <div className="update-forms">
                        <label htmlFor="service-type">Service Type:</label>
                        <select
                            id="service-type"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            style={{ width: "30%" }}
                        >
                            <option value="">Select a Service</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="update-forms">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="update-buttons">
                        <button className="update-save-btn" type="submit">Request</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Update_Profile;
