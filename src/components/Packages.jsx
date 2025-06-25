import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCheckCircle, FaClock, FaMoneyBillWave, FaReceipt, FaMapMarkerAlt, FaCalendarAlt, FaPhone, FaInfoCircle } from 'react-icons/fa';
import './Package.css';

// API base URL - change this in production
const API_BASE_URL = 'http://localhost:5000';

const Packages = () => {
  const [bookings, setBookings] = useState([]);
  const [refunds, setRefunds] = useState([]);
  const [callRequests, setCallRequests] = useState([]);
  const [cancellationReason, setCancellationReason] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [validationError, setValidationError] = useState('');

  // Fetch bookings and call requests
  useEffect(() => {
    // Fetch mock bookings (replace with actual API call)
    const mockBookings = [
      {
        id: 'pay_QIPAz3IZe9bpxj',
        date: '2023-06-25T16:31:00',
        amount: 5600,
        status: 'authorized',
        destination: 'Goa Beach Resort',
        tripDate: '2023-07-15',
        travelers: 2,
        receiptUrl: '#',
        phone: '+91 9999 999999',
        email: 'customer@example.com'
      },
      {
        id: 'pay_2KJHs83kLmNopq',
        date: '2023-06-28T10:15:00',
        amount: 7200,
        status: 'authorized',
        destination: 'Himalayan Trek',
        tripDate: '2023-08-10',
        travelers: 4,
        receiptUrl: '#',
        phone: '+91 8888 888888',
        email: 'user@example.com'
      }
    ];
    setBookings(mockBookings);
    setRefunds([]);

    // Fetch call requests from MongoDB
    const fetchCallRequests = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/cancellation-requests`);
        const formattedRequests = response.data.map(request => ({
          id: request._id,
          paymentId: request.paymentId,
          date: request.createdAt,
          status: request.status,
          reason: request.reason,
          contactNumber: request.contactNumber
        }));
        setCallRequests(formattedRequests);
      } catch (error) {
        console.error('Error fetching call requests:', error);
      }
    };

    fetchCallRequests();
  }, []);

  const handleCallRequest = async () => {
    if (!selectedBooking) return;
    
    // Validation
    if (!contactNumber) {
      setValidationError('Please provide a contact number');
      return;
    }
    
    const phoneRegex = /^[0-9]{10,15}$/;
    const cleanedNumber = contactNumber.replace(/\D/g, '');
    if (!phoneRegex.test(cleanedNumber)) {
      setValidationError('Please enter a valid phone number');
      return;
    }
    
    setIsProcessing(true);
    setValidationError('');
    
    try {
      const response = await axios.post(`${API_BASE_URL}/api/cancellation-requests`, {
        paymentId: selectedBooking.id,
        destination: selectedBooking.destination,
        contactNumber: contactNumber,
        reason: cancellationReason || "Not specified"
      });

      // Create new call request for local state
      const newRequest = {
        id: response.data._id,
        paymentId: selectedBooking.id,
        date: response.data.createdAt,
        status: 'pending',
        reason: cancellationReason || "Not specified",
        contactNumber: contactNumber
      };
      
      setCallRequests([newRequest, ...callRequests]);
      setShowSuccess(true);
      setCancellationReason('');
      setContactNumber('');
      
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  return (
    <div className="cancellation-container">
      {/* Header */}
      <div className="cancellation-header">
        <h1>Trip Cancellation</h1>
        <p>For cancellations, please follow our procedure below</p>
      </div>

      <div className="content-grid">
        {/* Left Column - Booking List */}
        <div className="booking-list-section">
          <h2><FaCalendarAlt /> Your Upcoming Trips</h2>
          
          {bookings.length > 0 ? (
            bookings.map(booking => (
              <div 
                key={booking.id} 
                className={`booking-card ${selectedBooking?.id === booking.id ? 'selected' : ''}`}
                onClick={() => {
                  setSelectedBooking(booking);
                  setContactNumber(booking.phone);
                }}
              >
                <div className="booking-destination">
                  <FaMapMarkerAlt /> {booking.destination}
                </div>
                <div className="booking-details">
                  <div><FaCalendarAlt /> {new Date(booking.tripDate).toLocaleDateString()}</div>
                  <div>👥 {booking.travelers} traveler{booking.travelers > 1 ? 's' : ''}</div>
                  <div>₹{booking.amount.toLocaleString('en-IN')}</div>
                </div>
                <div className={`booking-status ${booking.status}`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </div>
                <a href={booking.receiptUrl} className="receipt-link">
                  <FaReceipt /> Receipt
                </a>
              </div>
            ))
          ) : (
            <div className="no-bookings">
              <p>No upcoming trips found</p>
              <button className="secondary-btn">View Past Bookings</button>
            </div>
          )}
        </div>

        {/* Right Column - Cancellation Form */}
        <div className="cancellation-form-section">
          {selectedBooking ? (
            <>
              <h2><FaMoneyBillWave /> Cancel Booking</h2>
              
              <div className="selected-booking">
                <h3>{selectedBooking.destination}</h3>
                <p><FaCalendarAlt /> {new Date(selectedBooking.tripDate).toLocaleDateString()}</p>
                <p>₹{selectedBooking.amount.toLocaleString('en-IN')}</p>
                <p className="payment-id">Payment ID: {selectedBooking.id}</p>
              </div>

              <div className="process-steps">
                <h4><FaInfoCircle /> Cancellation Process</h4>
                <div className="step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <strong>Request Cancellation</strong>
                    <p>Fill the form below to initiate cancellation</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <strong>Verification Call</strong>
                    <p>Our executive will call you for verification</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <strong>Refund Processing</strong>
                    <p>Refund will be processed within 5-7 business days</p>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Contact Number <span className="required">*</span></label>
                <input
                  type="tel"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  placeholder="Enter phone number for callback"
                  className={validationError && !contactNumber ? 'error' : ''}
                />
                {validationError && !contactNumber && (
                  <p className="error-message">{validationError}</p>
                )}
              </div>

              <div className="form-group">
                <label>Reason for Cancellation (Optional)</label>
                <textarea
                  value={cancellationReason}
                  onChange={(e) => setCancellationReason(e.target.value)}
                  placeholder="Please let us know why you're cancelling..."
                />
                <p className="help-text">Your feedback helps us improve our services</p>
              </div>

              <div className="cancellation-policy">
                <h4><FaInfoCircle /> Cancellation Policy</h4>
                <ul>
                  <li>Full refund if cancelled 15+ days before trip</li>
                  <li>50% refund if cancelled 7-14 days before trip</li>
                  <li>No refund for cancellations within 7 days of trip</li>
                </ul>
                <p className="policy-note">
                  <strong>Note:</strong> Refund amount will be calculated based on your trip date.
                </p>
              </div>

              <button
                onClick={handleCallRequest}
                disabled={isProcessing}
                className={isProcessing ? 'processing' : ''}
              >
                {isProcessing ? (
                  <>
                    <FaClock className="spin" /> Processing Request...
                  </>
                ) : (
                  'Request Cancellation Call'
                )}
              </button>
            </>
          ) : (
            <div className="no-booking-selected">
              <div className="info-icon">
                <FaInfoCircle />
              </div>
              <h3>Select a booking to cancel</h3>
              <p>Click on any upcoming trip from the list to view cancellation options</p>
              <div className="support-info">
                <h4>Need immediate assistance?</h4>
                <p><FaPhone /> Call us at <strong>+91 77159 52128</strong></p>
                <p>Available 24/7 for urgent cancellations</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* History Sections */}
      <div className="history-sections">
        {/* Call Request History */}
        <div className="history-section">
          <h2>Call Request History</h2>
          {callRequests.length > 0 ? (
            <table className="history-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Destination</th>
                  <th>Contact</th>
                  <th>Reason</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {callRequests.map(request => {
                  const booking = bookings.find(b => b.id === request.paymentId);
                  return (
                    <tr key={request.id}>
                      <td>{formatDate(request.date)}</td>
                      <td>{booking?.destination || 'N/A'}</td>
                      <td>{request.contactNumber}</td>
                      <td>{request.reason}</td>
                      <td className={`status ${request.status}`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p className="no-history">No call requests yet</p>
          )}
        </div>

        {/* Refund History */}
        <div className="history-section">
          <h2>Refund History</h2>
          {refunds.length > 0 ? (
            <table className="history-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Destination</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {refunds.map(refund => {
                  const booking = bookings.find(b => b.id === refund.paymentId);
                  return (
                    <tr key={refund.id}>
                      <td>{formatDate(refund.date)}</td>
                      <td>{booking?.destination || 'N/A'}</td>
                      <td>₹{refund.amount.toLocaleString('en-IN')}</td>
                      <td className={`status ${refund.status}`}>
                        {refund.status.charAt(0).toUpperCase() + refund.status.slice(1)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p className="no-history">No refunds processed yet</p>
          )}
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="sweet-message-overlay">
          <div className="sweet-message-box">
            <FaCheckCircle className="success-icon" />
            <h3>Request Received Successfully!</h3>
            <div className="success-details">
              <p>We've received your cancellation request for:</p>
              <p className="destination"><strong>{selectedBooking?.destination}</strong></p>
              <p>Our executive will call you shortly at:</p>
              <p className="contact-number"><strong>{contactNumber}</strong></p>
            </div>
            <div className="success-note">
              <p><strong>Important Information:</strong></p>
              <ul>
                <li>Please keep your Payment ID <strong>{selectedBooking?.id}</strong> ready</li>
                <li>Our call will come from <strong>+91 77159 52128</strong></li>
                <li>Standard calling hours are 9 AM to 8 PM IST</li>
                <li>Check your email <strong>{selectedBooking?.email}</strong> for confirmation</li>
              </ul>
            </div>
            <button 
              onClick={() => {
                setShowSuccess(false);
                setSelectedBooking(null);
              }}
              className="close-button"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Packages;