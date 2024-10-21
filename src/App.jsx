import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Home from './Home/Home';
import Bookings from './Bookings/Bookings';
import Client from './Client/Client';
import Userlocation from './Userlocation';
import Chats from './Chats/Chats';
import Feed from './Feed/Feed';
import Update_Profile from './Update_Profile/Update_Profile';
import Admin_Home from './Admin/Admin_Home';
import Admin_ManageUser from './Admin/Admin_ManageUser';
import Test from './Home/Test';
import About_Us from './About_Us/About_Us';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/bookings" element={<Bookings />} /> 
        <Route path="/client" element={<Client />} /> 
        <Route path="/userloc" element={<Userlocation />} /> 
        <Route path="/chats" element={<Chats />} />
        <Route path="/feed" element={<Feed/>} />
        <Route path="/profile" element={<Update_Profile/>} />
        <Route path="/adminhome" element={<Admin_Home/>} />
        <Route path="/manageuser" element={<Admin_ManageUser/>} />
        <Route path="/test" element={<Test/>} />
        <Route path="/aboutus" element={<About_Us/>} />
      </Routes>
    </Router>
  );
}

export default App;
