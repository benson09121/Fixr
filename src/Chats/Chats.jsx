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
    <div className="customApp">
      
    <SideNav
      picture="/pics/user.png"
      name="Benson Javier"
      number="0912 345 6789"
      class="customWorker"
    />
      <div className="customChatContainer">

      
        <header>
          <h2 className="customServChat">Chat</h2>
          <h2 className="customServName">Service Name</h2>
          <h2 className="customServAdd">Barangay Name, Cavite City</h2>
          <div className="customProfile">
          <img src="..\pics\profile.png" alt="Profile Icon" className="customProfileIcon" />
            <div className="customStatusIndicator">
              <span className="customStatusOnline"></span> Online 
            </div>
            <FaEllipsisV className="customOptionsIcon" /> 
          </div>
        </header>

        <div className="customChatLayout">
          <div className="customChatHistory">
            <div className="customSearch">
              <input
                type="text"
                placeholder="Search chat history..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="customHistoryList">
              {filteredChatHistory.length > 0 ? (
                filteredChatHistory.map((chat) => (
                  <div key={chat.id} className="customChatItem">
                    <FaUserCircle className="customAvatarIcon" />
                    <div className="customChatDetails">
                      <div className="customChatHeader">
                        <div className="customServiceName">{chat.service}</div>
                        <div className="customTime">{chat.time}</div> 
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

          <div className="customBookingChat">
            <div className="customChatDisplay">
              {bookingChat.map((chat) => (
                <div
                  key={chat.id}
                  className={`customChatMessage ${
                    chat.service === "You" ? "customClient" : "customProvider"
                  }`}
                >
                  <div className="customServiceName">{chat.service}</div>
                  <p>{chat.message}</p>
                </div>
              ))} 
            </div>

            <div className="customMessageInput">
              <FiPlus className="customIcon" />
              <AiOutlinePicture className="customIcon" />
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
