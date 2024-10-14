import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Authentication/Register';
import Login from './Authentication/Login';
import Home from './Home/Home';
import Bookings from './Bookings/Bookings';
import Client from './Client/Client';
import Userlocation from './Userlocation';
import Chats from './Chats/Chats';
import Feed from './Feed/Feed';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="home" element={<Home />} />
        <Route path="bookings" element={<Bookings />} /> 
        <Route path="client" element={<Client />} /> 
        <Route path="/userloc" element={<Userlocation />} /> 
        <Route path="/chats" element={<Chats />} />
        <Route path="/feed" element={<Feed/>} />
      </Routes>
    </Router>
  );
}

export default App;
