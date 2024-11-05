import React, { useEffect, useState } from "react";
import "../css/clientcss.css";
import Client_Cards from "./Client_Cards";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import SideNav from "../SideNav/SideNav";
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
  const [workerInfo, setWorkerInfo] = useState([]);
  const [activeFilter, setActiveFilter] = useState("Pending");
  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [showWorkerModal, setShowWorkerModal] = useState(false);
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
        setWorkerInfo(response.data.data.workerInfo);
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

  const openModal = (service) => {
    axios.post("http://localhost/FIXR/API/Home/getRequestDetails.php", { request_id: service.request_id })
      .then((response) => {
        setSelectedService({
          ...service,
          ...response.data.data.requestDetails,
          providers: response.data.data.providers,
          providerCount: response.data.data.providerCount
        });
        setShowModal(true);
      })
      .catch((error) => {
        console.error("There was an error fetching the request details!", error);
      });
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

  const handleBooking = (provider) => {
    const bookingData = {
      request_id: selectedService.request_id,
      provider_id: provider.provider_id,
      booking_date: new Date().toISOString(),
      service_date: selectedService.RequestedDate,
      status: 'Scheduled',
      status_date: new Date().toISOString()
    };
    const handleStatusChange = (status) => {
      axios.post("http://localhost/FIXR/API/Home/updateServiceRequestStatus.php", {
        request_id: selectedService.request_id,
        status: status
      })
      .then((response) => {
        if (response.data.status === 200) {
          console.log(`Service request status updated to ${status}`);
          window.location.reload();
        } else {
          console.error(`Failed to update service request status to ${status}`);
        }
      })
      .catch((error) => {
        console.error(`There was an error updating the service request status to ${status}!`, error);
      });
    };
    axios.post("http://localhost/FIXR/API/Home/bookService.php", bookingData)
      .then((response) => {
        if (response.data.status === 200) {
          alert("Service booked successfully!");
          axios.post("http://localhost/FIXR/API/Home/updateServiceRequestStatus.php", {
            request_id: selectedService.request_id,
            status: 'In-Progress'
          })
          .then((response) => {
            if (response.data.status === 200) {
              console.log("Service request status updated to In-Progress");
              window.location.reload();
            } else {
              console.error("Failed to update service request status");
            }
          })
          .catch((error) => {
            console.error("There was an error updating the service request status!", error);
          });
        } else {
          alert("Failed to book service");
        }
      })
      .catch((error) => {
        console.error("There was an error booking the service!", error);
      });
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
                  picture={"http://localhost/FIXR/API/Images/" + category.image}
                  name={category.CategoryName}
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
                      <td>0</td>
                      <td>{workers.RequestedDate}</td>
                      <td 
                        className={
                          workers.Status === "Completed" 
                            ? "status-done" 
                            : workers.Status === "In-Progress" 
                            ? "status-ongoing" 
                            : "status-pending"
                        }
                      >
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
                <p><strong>Category Name:</strong> {selectedService.CategoryName}</p>
                <p><strong>Description:</strong> {selectedService.Description}</p>
                {selectedService.Status === "In-Progress" ? (
                  <>
                    <h4>Provider</h4>
                    {selectedService.providers.map((provider, index) => (
                      <div key={index}>
                        <div className="client-provider-content">
                        <p>{provider.f_name} {provider.l_name}</p>
                        <div className="client-provider-buttons">
                              <Link to='/chats'><button className="client-provider-chat"> <i class="fa-regular fa-comment"></i>  Chat</button></Link>
                              <Link to='/servicebooking'> <button className="client-provider-getloc"><i class="fa-solid fa-location-crosshairs"></i> Get Location</button></Link>
                        </div>
                        </div>
                      </div>
                    ))}
                    <div className="client-provider-footerbtn">
                    <button onClick={() => handleStatusChange("Cancelled")} className="client-provider-cancelled">Mark this Cancelled</button>
                    <button onClick={() => handleStatusChange("Completed")} className="client-provider-complete">Mark this Complete</button>
                    </div>
                  </>
                ) : (
                  <>
                    <h4>Providers</h4>
                    <ul>
                      {selectedService.providers.map((provider, index) => (
                        <li key={index}>
                          {provider.f_name} {provider.l_name}
                          <button onClick={() => handleBooking(provider)}>Book</button>
                          <button onClick={closeModal}>Cancel</button>
                        </li>
                      ))}
                    </ul>
                  </>
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