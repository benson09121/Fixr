import React, { useState } from "react";
import "../css/chat.css";
import { FaUserCircle } from "react-icons/fa"; 
import { BsFillChatFill } from "react-icons/bs"; 
import { FiPlus } from "react-icons/fi"; 
import { AiOutlinePicture } from "react-icons/ai"; 
import SideNav from "../SideNav/SideNav";
import Menu_Profile from "../Profile_Menu/Menu_Profile";

export default function Chat(){
  const [message, setMessage] = useState(""); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [chatHistory, setChatHistory] = useState([
    { id: 1, service: "Prince", message: "Hi! I just booked a cleaning service for tomorrow. Can I confirm if it includes deep cleaning of the carpets?" },
    { id: 2, service: "John Doe", message: "You're all set! We'll see you then!" },
    { id: 3, service: "Jane Smith", message: "That's it for now, thank you!" },
    { id: 4, service: "Lawrence", message: "How can I book?" },
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
      const newMessage = { id: bookingChat.length + 1, service: "You", message: message };
      setBookingChat([...bookingChat, newMessage]); // Add new message to booking chat
      setMessage(""); // Clear input after sending
    }
  };

  const filteredChatHistory = chatHistory.filter(chat =>
    chat.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.message.toLowerCase().includes(searchTerm.toLowerCase())
  ); 

  return (
    <div className="app">
      <SideNav />

      <div className="container">
        <header>
          <h2>Chat</h2>
          <div className="profile">
            <Menu_Profile/>
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
                filteredChatHistory.map(chat => (
                  <div key={chat.id} className="chat-item">
                    <div className="service-name">{chat.service}</div>
                    <p>{chat.message}</p>
                  </div>
                ))
              ) : (
                <p>No messages found.</p> 
              )}
            </div>
          </div>
          <div className="booking-chat">
            <div className="chat-display">
              {bookingChat.map(chat => (
                <div key={chat.id} className={`chat-message ${chat.service === "You" ? "client" : "provider"}`}>
                  <div className="service-name">{chat.service}</div>
                  <p>{chat.message}</p>
                </div>
              ))}
            </div>
            <div className="message-input">
              <FiPlus className="icon" /> {/* Add file icon */}
              <AiOutlinePicture className="icon" /> {/* Add image icon */}
              <input 
                type="text" 
                placeholder="Type your message here..." 
                value={message}
                onChange={(e) => setMessage(e.target.value)} 
              />
              <button onClick={handleSendMessage}>
                <BsFillChatFill /> {/* Chat icon */}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
