import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

const Signup = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [otpSent, setOtpSent] = useState(false); // ✅ OTP step
  const [otp, setOtp] = useState('');
  const [userLocation, setUserLocation] = useState(null);

  const navigate = useNavigate();

  // ✅ Fetch user location on component load
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Geolocation error:', error);
          setUserLocation({ lat: 28.6139, lng: 77.2090 }); // Default: New Delhi
        }
      );
    } else {
      setUserLocation({ lat: 28.6139, lng: 77.2090 });
    }
  }, []);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // ✅ Validate form fields
  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('⚠️ All fields are required');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('⚠️ Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      setError('⚠️ Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  // ✅ Handle signup (send OTP)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        location: userLocation
      });

      if (response.data.success) {
        setOtpSent(true); // ✅ Show OTP field now
      }
    } catch (err) {
      setError(err.response?.data?.message || '❌ Registration failed. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Handle OTP Verification
  const handleVerifyOtp = async () => {
    if (!otp) {
      setError('⚠️ Please enter the OTP sent to your email');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/verify-otp', {
        email: formData.email,
        otp
      });

      if (response.data.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/login'); // ✅ Redirect after success
        }, 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || '❌ OTP verification failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container signup-page">
      <div className="auth-form">
        <div className="form-header">
          <h2>Join Our Travel Community</h2>
          <p>Create your account to explore amazing destinations</p>
        </div>

        {success ? (
          <div className="success-message">
            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
              <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
              <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
            <h3>🎉 Registration Successful!</h3>
            <p>Redirecting to login page...</p>
          </div>
        ) : (
          <>
            {error && <div className="error-message">{error}</div>}

            {!otpSent ? (
              // ✅ Signup Form (Before OTP)
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                  />
                  <span className="input-icon">👤</span>
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    required
                  />
                  <span className="input-icon">✉️</span>
                </div>

                <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password (min 6 characters)"
                    required
                  />
                  <span className="input-icon">🔒</span>
                </div>

                <div className="form-group">
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    required
                  />
                  <span className="input-icon">🔒</span>
                </div>

                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner"></span> Creating Account...
                    </>
                  ) : (
                    'Sign Up Now'
                  )}
                </button>
              </form>
            ) : (
              // ✅ OTP Input Section (After Signup)
              <div className="otp-section">
                <h3>Enter OTP sent to <b>{formData.email}</b></h3>
                <input 
                  type="text" 
                  value={otp} 
                  onChange={(e) => setOtp(e.target.value)} 
                  placeholder="Enter OTP here"
                />
                <button onClick={handleVerifyOtp} className="submit-btn" disabled={isLoading}>
                  {isLoading ? 'Verifying...' : 'Verify OTP'}
                </button>
              </div>
            )}

            {!otpSent && (
              <div className="auth-footer">
                <p>Already have an account? <Link to="/login">Login here</Link></p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Signup;
