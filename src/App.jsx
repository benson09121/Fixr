import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Register from "./Authentication/Register";
import Login from "./Authentication/Login";
import Home from "./Home/Home";
import Bookings from "./Bookings/Bookings";
import Client from "./Client/Client";
import Userlocation from "./Userlocation";
import Chats from "./Chats/Chats";
import Feed from "./Feed/Feed";
import Update_Profile from "./Update_Profile/Update_Profile";
import About_Us from "./About_Us/About_Us";
import AdminLogin from "./Admin/AdminLogin";
import AdminLayout from "./Admin/AdminLayout";
import AdminDashboard from "./Admin/dashboard/Dashboard";
import ClientLayout from "./Client/ClientLayout";
import Service_Booking from './Service_Booking/Service_Booking';
import WorkerLayout from "./Home/WorkerLayout";
import Client_Cards from "./Client/Client_Cards";
import Client_Forms from "./Client/Client_Forms";



function App() {
  return (
    <Router>
      <Routes>
        {/* Authentication */}
        <Route path="/" element={<Navigate to="/client/login" />} />
        <Route path="/client" element={<Navigate to="/client/login" />} />
        <Route path='/clientform' element={<Client_Forms />} />
        <Route path="client" element={<ClientLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="home" element={<Client />} />
          <Route path="profile" element={<Update_Profile />} />
          <Route path="aboutus" element={<About_Us />} />
        </Route>
        <Route path="/chats" element={<Chats />} /> 
        {/* Service Provider */}
        <Route path="worker" element={<WorkerLayout />} >
        <Route path="home" element={<Home />} />
        
        </Route> 
        <Route path="/servicebooking" element={<Service_Booking/>} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/userloc" element={<Userlocation />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/admin" element={<Navigate to="/admin/login" />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="login" element={<AdminLogin />} />
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
