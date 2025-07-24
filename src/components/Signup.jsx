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
  const [step, setStep] = useState(1); // 1 = signup form, 2 = OTP verification
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Only allow numbers
    setOtp(value);
  };

  const validateForm = () => {
    setError('');
    
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return false;
    }
    
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    return true;
  };

  const sendOTP = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/send-otp', {
        email: formData.email
      });
      
      if (response.data.success) {
        setStep(2);
      } else {
        setError(response.data.message || 'Failed to send OTP');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTPAndSignup = async () => {
    setIsLoading(true);
    try {
      // First verify OTP
      const otpResponse = await axios.post('http://localhost:5000/api/auth/verify-otp', {
        email: formData.email,
        otp
      });
      
      if (!otpResponse.data.success) {
        throw new Error(otpResponse.data.message || 'OTP verification failed');
      }
      
      // Then proceed with signup
      const signupResponse = await axios.post('http://localhost:5000/api/auth/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      
      if (signupResponse.data.success) {
        localStorage.setItem('token', signupResponse.data.token);
        setIsAuthenticated(true);
        setSuccess(true);
        setTimeout(() => navigate('/'), 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (step === 1) {
      if (!validateForm()) return;
      await sendOTP();
    } else {
      if (otp.length !== 6) {
        setError('Please enter a valid 6-digit OTP');
        return;
      }
      await verifyOTPAndSignup();
    }
  };

  return (
    <div className="auth-container signup-page">
      <div className="auth-form">
        <div className="form-header">
          <h2>Join Our Travel Community</h2>
          <p>{step === 1 ? 'Create your account to explore amazing destinations' : 'Verify your email address'}</p>
        </div>

        {success ? (
          <div className="success-message">
            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
              <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
              <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
            <h3>Registration Successful!</h3>
            <p>Redirecting to home page...</p>
          </div>
        ) : (
          <>
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit}>
              {step === 1 ? (
                <>
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
                </>
              ) : (
                <div className="otp-container">
                  <p>We've sent a 6-digit OTP to <strong>{formData.email}</strong></p>
                  <div className="form-group">
                    <input
                      type="text"
                      value={otp}
                      onChange={handleOtpChange}
                      placeholder="Enter OTP"
                      maxLength={6}
                      required
                    />
                    <span className="input-icon">🔢</span>
                  </div>
                  <p className="resend-otp">
                    Didn't receive OTP? <button 
                      type="button" 
                      className="resend-btn"
                      onClick={sendOTP}
                      disabled={isLoading}
                    >
                      Resend
                    </button>
                  </p>
                </div>
              )}

              <button 
                type="submit" 
                className="submit-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner"></span> 
                    {step === 1 ? 'Sending OTP...' : 'Verifying...'}
                  </>
                ) : (
                  step === 1 ? 'Send OTP' : 'Complete Registration'
                )}
              </button>

              {step === 2 && (
                <button 
                  type="button" 
                  className="back-btn"
                  onClick={() => {
                    setStep(1);
                    setError('');
                  }}
                  disabled={isLoading}
                >
                  Back
                </button>
              )}
            </form>

            {step === 1 && (
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