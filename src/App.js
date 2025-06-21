import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import image from './assets/logo.png'
import { 
  faHome, 
  faUser, 
  faEnvelope,
  faPhone, 
  faMapMarkerAlt 
} from '@fortawesome/free-solid-svg-icons';
import { 
  faInstagram, 
  faTwitter, 
  faFacebook, 
  faPinterest, 
  faYoutube 
} from '@fortawesome/free-brands-svg-icons';

import Destinations from './components/Destinations';
import Booking from './components/Booking';
import Contact from './components/Contact';
import Packages from './components/Packages';
import Signup from './components/Signup';
import Login from './components/Login';

import Home from './components/Home';
import Certifiedguide from './components/Certifiedguide';


const App = () => {
  return (
    <Router>
        <nav className="navbar">
   
      <div className="logo">
     
             <img src={image} alt="TripVibe Logo" style={{ height: '52px', marginLeft: '-30px', width:'60px' }} />
        <span className="logo-text">TripVibe</span>
      </div>
      
      <ul className="nav-links">
        <li><Link to="/" className="nav-link">Home</Link></li>
      
        <li><Link to="/packages" className="nav-link">Packages</Link></li>
        <li><Link to="/booking" className="nav-link">Booking</Link></li>
        <li><Link to="/certifiedguide" className="nav-link">Certified guide</Link></li>
        <li><Link to="/contact" className="nav-link">Contact</Link></li>
        <div className="auth-buttons">
         <Link to="/signup" className="login-btn" >Signup</Link>  <Link to="/login" className="login-btn">Login</Link>
         
        </div>
      </ul>
    </nav>
      <div className="App">
     
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/certifiedguide" element={<Certifiedguide />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        
      </div>
    </Router>
   
  );
};

export default App;