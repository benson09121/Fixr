import React, { useState, useEffect } from "react";
import "../css/chat.css";
import { FaUserCircle, FaEllipsisV } from "react-icons/fa"; 
import { BsFillChatFill } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import { AiOutlinePicture } from "react-icons/ai";
import Chat_Sidenav from "../SideNav/Chat_Sidenav";
import Navbar from "../Navbar/Navbar";
import Menu_Profile from "../Profile_Menu/Menu_Profile";
import { useCookies } from "react-cookie";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import { useLocation } from 'react-router-dom';

export default function Chat() {
  const location = useLocation(); // Call useLocation before using the location variable
  const [cookies] = useCookies(['account_token']);
  const [userInfo, setUserInfo] = useState({
    name: "",
    phone: "",
    account: "",
  });
  const [userID, setUserID] = useState();
  const [workerInfo, setWorkerInfo] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeConversation, setActiveConversation] = useState(null);
  const [input, setInput] = useState("");
  const [ws, setWs] = useState(null);
  const [chatHistory, setChatHistory] = useState([]); 
  const [bookingChat, setBookingChat] = useState([]); 
  const [otherUserID, setOtherUserID] = useState(location.state?.otherUserID || null); 
  const [selectedUserName, setSelectedUserName] = useState(location.state?.selectedUserName || ""); 

  useEffect(() => {
    const token = cookies.account_token;
    if (token) {
      const decoded = jwtDecode(token);
      setUserID(decoded.user_id);
    }
  }, [cookies.account_token]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => {
      console.log("Connected to WebSocket server.");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "chatHistory") {
        setChatHistory(data.conversations);
      } else if (data.type === "messages") {
        setBookingChat(data.messages); 
      } else {
        setBookingChat((prevMessages) => [...prevMessages, data]);
      }
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    if (userID && ws && location.state?.otherUserID) {
      const fetchConversation = async () => {
        const conversationId = await checkOrCreateConversation(userID, location.state.otherUserID);
        setActiveConversation(conversationId);
        ws.send(JSON.stringify({ type: "getMessages", conversation_id: conversationId }));
      };
      fetchConversation();
    }
  }, [userID, ws, location.state?.otherUserID]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get(`http://localhost/FIXR/API/getConversations.php?user_id=${userID}`);
        setChatHistory(response.data.conversations);
        console.log(response.data.conversations);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    if (userID) {
      fetchConversations();
    }
  }, [userID]);

  const checkOrCreateConversation = async (user1_id, user2_id) => {
    try {
      const response = await axios.post("http://localhost/FIXR/API/checkOrCreateConversation.php", {
        user1_id,
        user2_id
      });
      return response.data.conversation_id;
    } catch (error) {
      console.error("Error checking or creating conversation:", error);
    }
  };

  const sendMessage = async () => {
    if (ws && input.trim()) {
      let conversationId = activeConversation;
      if (!conversationId) {
        conversationId = await checkOrCreateConversation(userID, otherUserID);
        setActiveConversation(conversationId);
      }
      const message = { sender_id: userID, message_text: input, conversation_id: conversationId };
      ws.send(JSON.stringify(message));
      setBookingChat((prevMessages) => [...prevMessages, message]);
      setInput("");
    }
  };

  const selectConversation = (conversationId) => {
    setActiveConversation(conversationId);

    if (ws) {
      ws.send(JSON.stringify({ type: "getMessages", conversation_id: conversationId }));
    }

    const selectedChat = chatHistory.find(chat => chat.conversation_id === conversationId);
    if (selectedChat) {
      const otherUserId = selectedChat.user1_id === userID ? selectedChat.user2_id : selectedChat.user1_id;
      setOtherUserID(otherUserId);
      const otherUserName = selectedChat.user1_id === userID ? `${selectedChat.user2_first_name} ${selectedChat.user2_last_name}` : `${selectedChat.user1_first_name} ${selectedChat.user1_last_name}`;
      setSelectedUserName(otherUserName);
    }
  };

  const filteredChatHistory = chatHistory.filter(
    (chat) =>
      chat.user1_first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.user1_last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.user2_first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.user2_last_name.toLowerCase().includes(searchTerm.toLowerCase())
  );


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

  return (
    <>
      <Navbar />
      <div className="customApp">
      <Chat_Sidenav
          picture="/pics/user.png"
          name={userInfo.name}
          number={userInfo.phone}
          class={userInfo.account}
        />
        <div className="customChatContainer">
          <header>
            <h2 className="customServChat">Chat</h2>
            <div className="customServName">  
              <h2>{selectedUserName}   <i class="fa-solid fa-circle" ></i> <span className="customStatusOnline">Online</span> </h2> 
              <div>
                  <h4>Barangay Name, Cavite City</h4>
              </div>
           </div>
              <FaEllipsisV className="customOptionsIcon" /> 
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
                    <div key={chat.conversation_id} className="customChatItem" onClick={() => selectConversation(chat.conversation_id)}>
                      <FaUserCircle className="customAvatarIcon" />
                      <div className="customChatDetails">
                        <div className="customChatHeader">
                          <div className="customServiceName">
                            {chat.user1_id === userID ? `${chat.user2_first_name} ${chat.user2_last_name}` : `${chat.user1_first_name} ${chat.user1_last_name}`}
                          </div>
                          <div className="customTime">{chat.updated_at}</div> 
                        </div>
                        <p>{chat.user1_id === userID ? chat.user2_role : chat.user1_role}</p>
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
                    key={chat.messages_id}
                    className={`customChatMessage ${
                      chat.sender_id === userID ? "customClient" : "customProvider"
                    }`}
                  >
                    <div className="customServiceName">{chat.sender_id === userID ? "You" : chat.sender_name}</div>
                    <p>{chat.message_text}</p>
                  </div>
                ))} 
              </div>

              <div className="customMessageInput">
                <FiPlus className="customIcon" />
                <AiOutlinePicture className="customIcon" />
                <input
                  type="text"
                  placeholder="Type your message here..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button onClick={sendMessage}>
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