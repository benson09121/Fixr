import React, { useEffect, useState } from "react";
import "../css/clientcss.css";
import Client_Cards from "./Client_Cards";
import Navbar from "../Navbar/Navbar";
import SideNav from "../SideNav/SideNav";
import axios from "axios";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

const Client = () => {
  const [cookies] = useCookies(["account_token"]);
  const [userInfo, setUserInfo] = useState({
    name: "",
    phone: "",
    account: "",
  });
  const [categories, setCategories] = useState([]);
  const [workerInfo, setWorkerInfo] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [showWorkerModal, setShowWorkerModal] = useState(false);

  useEffect(() => {
    const userInfo = jwtDecode(cookies.account_token);
    axios.post("http://localhost/FIXR/API/Home/getInfo.php", userInfo)
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

  const openModal = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedService(null);
  };

  const openWorkerModal = (worker) => {
    setSelectedWorker(worker);
    setShowWorkerModal(true);
  };

  const closeWorkerModal = () => {
    setShowWorkerModal(false);
    setSelectedWorker(null);
  };

  const handleBooking = () => {
    alert(`Booking confirmed with ${selectedWorker.name}`);
    closeWorkerModal();
    closeModal();
  };

  const filteredServices = activeFilter === "All"
    ? workerInfo
    : workerInfo.filter((workers) => workers.Status === activeFilter);

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
              categories.map((category, index) => (
                <Client_Cards 
                  key={index}
                  picture="/pics/default.png"
                  name={category}
                />
              ))
            ) : (
              <h3 style={{padding:"10px"}}>No available services.</h3>
            )}
          </div>

          {/* Table for Booking Status */}
          <div className="booking-table">
            <h3 style={{marginBottom:"10px"}}>Booking List</h3>
            <div className="filter-options">
              <button
                className={`filter-option ${activeFilter === "All" ? "active" : ""}`}
                onClick={() => setActiveFilter("All")}
              >
                All
              </button>
              <button
                className={`filter-option ${activeFilter === "Pending" ? "active" : ""}`}
                onClick={() => setActiveFilter("Pending")}
              >
                Pending
              </button>
              <button
                className={`filter-option ${activeFilter === "In-Progress" ? "active" : ""}`}
                onClick={() => setActiveFilter("In-Progress")}
              >
                In-Progress
              </button>
              <button
                className={`filter-option ${activeFilter === "Completed" ? "active" : ""}`}
                onClick={() => setActiveFilter("Completed")}
              >
                Completed
              </button>
            </div>

            {filteredServices.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Booking Type</th>
                    <th>Worker Complied</th>
                    <th>Booking Date</th>
                    <th>Booking Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredServices.map((workers, index) => (
                    <tr key={index} onClick={() => openModal(workers)}>
                      <td>{workers.CategoryName}</td>
                      <td>{0}</td>
                      <td>{workers.RequestedDate}</td>
                      <td className={workers.Status === "Completed" ? "status-done" : "status-ongoing"}>
                        {workers.Status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No {activeFilter.toLowerCase()} bookings available.</p>
            )}
          </div>

          {/* Modal for Booking Details */}
          {showModal && selectedService && (
            <div className="modal-overlay" onClick={closeModal}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={closeModal}>X</button>
                <h3>Booking Details</h3>
                <p><strong>Name:</strong> {selectedService.name}</p>
                <p><strong>Service:</strong> {selectedService.service}</p>
                <p><strong>Date:</strong> {selectedService.date}</p>
                <p><strong>Status:</strong> {selectedService.status}</p>

                {selectedService.status === "Queue" && (
                  <div>
                    <h4>Available Workers</h4>
                    <ul>
                      {selectedService.workers.map((worker, index) => (
                        <li key={index} onClick={() => openWorkerModal(worker)} style={{ cursor: "pointer", color: "blue" }}>
                          {worker.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Client;
