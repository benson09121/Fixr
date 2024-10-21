import React, { useState } from "react";
import "../css/chat.css";
import { FaUserCircle, FaEllipsisV } from "react-icons/fa"; 
import { BsFillChatFill } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import { AiOutlinePicture } from "react-icons/ai";
import SideNav from "../SideNav/SideNav";
import Navbar from "../Navbar/Navbar";
import Menu_Profile from "../Profile_Menu/Menu_Profile";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      service: "Prince",
      message:
        "Hi! I just booked a cleaning service for tomorrow. Can I confirm if it includes deep cleaning of the carpets?",
      time: "Sent",
    },
    {
      id: 2,
      service: "John Doe",
      message: "You're all set! We'll see you then!",
      time: "09/02",
    },
    {
      id: 3,
      service: "Jane Smith",
      message: "That's it for now, thank you!",
      time: "09/01",
    },
    {
      id: 4,
      service: "Lawrence",
      message: "How can I book?",
      time: "08/21",
    },
  ]);

  const [bookingChat, setBookingChat] = useState([
    { id: 1, service: "You", message: "Hi, I would like to book a service for next week." },
    { id: 2, service: "Provider", message: "Sure! What service are you looking for?" },
    { id: 3, service: "You", message: "I need a cleaning service on Monday." },
    { id: 4, service: "Provider", message: "Your booking is confirmed for Monday at 10 AM." },
    { id: 5, service: "You", message: "Great! Thank you!" },
  ]);

  const handleSendMessage = () => {
    if (message) {
      const newMessage = {
        id: bookingChat.length + 1,
        service: "You",
        message: message,
      };
      setBookingChat([...bookingChat, newMessage]);
      setMessage("");
    }
  };

  const filteredChatHistory = chatHistory.filter(
    (chat) =>
      chat.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
<>
<Navbar />
    <div className="app">
      
    <SideNav
      picture="/pics/user.png"
      name="Benson Javier"
      number="0912 345 6789"
      class="Worker"
    />
      <div className="chat-container">

      
        <header>
          <h2 className="serv-chat">Chat</h2>
          <h2 className="serv-name">Service Name</h2>
          <h2 className="serv-add">Barangay Name, Cavite City</h2>
          <div className="profile">
          <img src="..\pics\profile.png" alt="Profile Icon" className="profile-icon" />
            <div className="status-indicator">
              <span className="status-online"></span> Online 
            </div>
            <FaEllipsisV className="options-icon" /> 
          </div>
        </header>

       

        <div className="chat-layout">
          <div className="chat-history">
            <div className="search">
              <input
                type="text"
                placeholder="Search chat history..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="history-list">
              {filteredChatHistory.length > 0 ? (
                filteredChatHistory.map((chat) => (
                  <div key={chat.id} className="chat-item">
                    <FaUserCircle className="avatar-icon" />
                    <div className="chat-details">
                      <div className="chat-header">
                        <div className="service-name">{chat.service}</div>
                        <div className="time">{chat.time}</div> 
                      </div>
                      <p>{chat.message}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No messages found.</p>
              )}
            </div>
          </div>

          
          <div className="booking-chat">
            <div className="chat-display">
              {bookingChat.map((chat) => (
                <div
                  key={chat.id}
                  className={`chat-message ${
                    chat.service === "You" ? "client" : "provider"
                  }`}
                >
                  <div className="service-name">{chat.service}</div>
                  <p>{chat.message}</p>
                </div>
              ))} 
            </div>

          
            <div className="message-input">
              <FiPlus className="icon" />
              <AiOutlinePicture className="icon" />
              <input
                type="text"
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button onClick={handleSendMessage}>
                <BsFillChatFill />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
