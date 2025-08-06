import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import image from './assets/logo.png';



import { 
  faHome, 
  faUser, 
  faEnvelope,
  faPhone, 
  faMapMarkerAlt,
  faBars,
  faTimes,
  faUserCheck,
  faCalendarCheck,
  faMoneyBillWave
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
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
    const storedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    setBookings(storedBookings);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    window.location.href = '/';
  };

  const addBooking = (booking) => {
    const newBookings = [...bookings, booking];
    setBookings(newBookings);
    localStorage.setItem('bookings', JSON.stringify(newBookings));
  };

  const cancelBooking = (bookingId) => {
    const newBookings = bookings.filter((booking) => booking.bookingId !== bookingId);
    setBookings(newBookings);
    localStorage.setItem('bookings', JSON.stringify(newBookings));
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home isAuthenticated={isAuthenticated} />} />
          <Route path="/destinations" element={<Destinations onDestinationsLoad={setDestinations} isAuthenticated={isAuthenticated} />} />
          <Route path="/packages" element={<Packages bookings={bookings} cancelBooking={cancelBooking} />} />
          <Route path="/booking" element={<Booking addBooking={addBooking} destinations={destinations} />} />
          <Route path="/certifiedguide" element={<Certifiedguide />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/tourism" element={<Home isAuthenticated={isAuthenticated} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </div>
    </Router>
  );
};

const Navbar = ({ isAuthenticated, handleLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={image} alt="TripVibe Logo" className="logo-img" />
        <span className="logo-text">TripVibe</span>
      </div>
      
      {/* Mobile menu toggle button */}
      <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
        <FontAwesomeIcon 
          icon={isMobileMenuOpen ? faTimes : faBars} 
          className="menu-icon"
        />
      </div>
      
      {/* Navigation links */}
      <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
        <li>
          <Link to="/" className="nav-link" onClick={closeMobileMenu}>
            <FontAwesomeIcon icon={faHome} className="nav-icon" />
            Home
          </Link>
        </li>
        
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/booking" className="nav-link" onClick={closeMobileMenu}>
<FontAwesomeIcon icon={faCalendarCheck} className="nav-icon" />
                Booking
              </Link>
            </li>
            <li>
              <Link to="/certifiedguide" className="nav-link" onClick={closeMobileMenu}>
              <FontAwesomeIcon icon={faUserCheck} className="nav-icon" />
                Certified Guide
              </Link>
            </li>
            <li>
              <Link to="/contact" className="nav-link" onClick={closeMobileMenu}>
                <FontAwesomeIcon icon={faEnvelope} className="nav-icon" />
               Enquire Now
              </Link>
            </li>
            <li>
              <Link to="/packages" className="nav-link" onClick={closeMobileMenu}>
              <FontAwesomeIcon icon={faMoneyBillWave} className="nav-icon" />
                Refund
              </Link>
            </li>
            <div className="auth-buttons">
              <button 
                onClick={() => {
                  handleLogout();
                  closeMobileMenu();
                }} 
                className="logout-btn"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <div className="auth-buttons">
            <Link 
              to="/signup" 
              className="signup-btn" 
              onClick={closeMobileMenu}
            >
              Sign Up
            </Link>
            <Link 
              to="/login" 
              className="login-btn" 
              onClick={closeMobileMenu}
            >
              Login
            </Link>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default App;