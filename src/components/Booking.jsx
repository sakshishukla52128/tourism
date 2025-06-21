import React, { useState, useEffect } from 'react';
import './Booking.css';
const Booking = () => {
  // Main form state
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    packageType: 'Budget',
    duration: '3 Days',
    travelers: 1,
    name: '',
    email: '',
    phone: '',
  });

  // Traveler names for tickets
  const [travelerNames, setTravelerNames] = useState(['']);

  // Feature toggles
  const [features, setFeatures] = useState({
    flight: false,
    hotel: false,
    weather: false,
    transportation: false,
    reviews: false,
  });

  // Flight details
  const [flightDetails, setFlightDetails] = useState({
    from: '',
    to: '',
    airline: '',
    departure: '',
    return: '',
    flightNumber: '',
    class: 'Economy',
  });

  // Hotel details
  const [hotelDetails, setHotelDetails] = useState({
    budget: '',
    rating: '3',
    checkIn: '',
    checkOut: '',
    selectedHotel: '',
  });

  // Transportation options
  const [transportation, setTransportation] = useState({
    needCar: false,
    carType: '4 Seater',
    needTrain: false,
    trainClass: 'Sleeper',
  });

  // Weather data
  const [weather, setWeather] = useState(null);
  
  // Reviews
  const [reviews, setReviews] = useState([]);
  
  // Hotel suggestions
  const [hotelSuggestions, setHotelSuggestions] = useState([]);
  
  // Flight ticket
  const [flightTicket, setFlightTicket] = useState(null);
  
  // Train ticket
  const [trainTicket, setTrainTicket] = useState(null);
  
  // UI state
  const [showReceipt, setShowReceipt] = useState(false);
  const [activeTab, setActiveTab] = useState('booking');

  // Package options
  const packageOptions = {
    'Family': '5 Days',
    'Honeymoon': '7 Days',
    'Adventure': '4 Days',
    'Budget': '3 Days'
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Auto-update duration based on package
    if (name === 'packageType') {
      setFormData(prev => ({
        ...prev,
        duration: packageOptions[value]
      }));
    }

    // Update traveler names array when count changes
    if (name === 'travelers') {
      const count = parseInt(value) || 1;
      const newNames = [...travelerNames];
      if (count > travelerNames.length) {
        while (newNames.length < count) {
          newNames.push('');
        }
      } else {
        newNames.length = count;
      }
      setTravelerNames(newNames);
    }
  };

  // Handle traveler name changes
  const handleTravelerNameChange = (index, value) => {
    const newNames = [...travelerNames];
    newNames[index] = value;
    setTravelerNames(newNames);
  };

  // Fetch data when destination changes
  useEffect(() => {
    if (formData.destination) {
      // Simulate API calls
      setTimeout(() => {
        // Weather API
        setWeather({
          temp: '28°C',
          condition: 'Rainy',
          humidity: '75%',
          forecast: [
            { day: 'Day 1', high: '30°C', low: '25°C', condition: 'Partly Cloudy' },
            { day: 'Day 2', high: '29°C', low: '24°C', condition: 'Scattered Showers' },
            { day: 'Day 3', high: '31°C', low: '26°C', condition: 'Sunny' }
          ]
        });

        // Reviews API
        setReviews([
          { author: 'Rahul', rating: 5, comment: 'Amazing place with great views!' },
          { author: 'Priya', rating: 4, comment: 'Loved the local cuisine.' },
          { author: 'Amit', rating: 3, comment: 'Good but crowded in peak season.' }
        ]);

        // Hotel API
        setHotelSuggestions([
          { id: 1, name: 'Taj Palace', rating: 5, price: '₹12,000/night', amenities: 'Pool, Spa, WiFi' },
          { id: 2, name: 'Hyatt Regency', rating: 4, price: '₹8,500/night', amenities: 'Breakfast, Gym, WiFi' },
          { id: 3, name: 'Ibis Budget', rating: 3, price: '₹3,200/night', amenities: 'WiFi, AC' }
        ]);
      }, 500);
    }
  }, [formData.destination]);

  // Toggle features
  const toggleFeature = (feature) => {
    setFeatures(prev => ({
      ...prev,
      [feature]: !prev[feature]
    }));
  };

  // Generate flight ticket
  const generateFlightTicket = () => {
    // In real app, this would come from flight booking API
    const ticket = {
      bookingId: 'FL' + Math.floor(Math.random() * 1000000),
      from: flightDetails.from || 'Delhi',
      to: flightDetails.to || formData.destination,
      date: flightDetails.departure || formData.startDate,
      returnDate: flightDetails.return || formData.endDate,
      flightNumber: flightDetails.flightNumber || '6E' + Math.floor(Math.random() * 1000),
      airline: flightDetails.airline || 'IndiGo',
      class: flightDetails.class,
      travelers: travelerNames.filter(name => name.trim() !== ''),
      price: `₹${Math.floor(Math.random() * 5000) + 3000}`,
      departureTime: '09:45 AM',
      arrivalTime: '12:30 PM',
      duration: '2h 45m'
    };
    setFlightTicket(ticket);
    setActiveTab('flightTicket');
  };

  // Generate train ticket
  const generateTrainTicket = () => {
    const ticket = {
      bookingId: 'TR' + Math.floor(Math.random() * 1000000),
      from: 'Delhi',
      to: formData.destination,
      date: formData.startDate,
      class: transportation.trainClass,
      travelers: travelerNames.filter(name => name.trim() !== ''),
      price: `₹${Math.floor(Math.random() * 2000) + 500}`,
      departureTime: '08:30 PM',
      arrivalTime: '06:15 AM',
      duration: '9h 45m',
      trainNumber: '123' + Math.floor(Math.random() * 10),
      trainName: 'Rajdhani Express'
    };
    setTrainTicket(ticket);
    setActiveTab('trainTicket');
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowReceipt(true);
    setActiveTab('receipt');
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      destination: '',
      startDate: '',
      endDate: '',
      packageType: 'Budget',
      duration: '3 Days',
      travelers: 1,
      name: '',
      email: '',
      phone: '',
    });
    setTravelerNames(['']);
    setFeatures({
      flight: false,
      hotel: false,
      weather: false,
      transportation: false,
      reviews: false,
    });
    setFlightTicket(null);
    setTrainTicket(null);
    setShowReceipt(false);
    setActiveTab('booking');
  };

  return (
    <div className="booking-container">
      <div className="tabs">
        <button 
          className={activeTab === 'booking' ? 'active' : ''}
          onClick={() => setActiveTab('booking')}
        >
          Booking Form
        </button>
        {flightTicket && (
          <button 
            className={activeTab === 'flightTicket' ? 'active' : ''}
            onClick={() => setActiveTab('flightTicket')}
          >
            Flight Ticket
          </button>
        )}
        {trainTicket && (
          <button 
            className={activeTab === 'trainTicket' ? 'active' : ''}
            onClick={() => setActiveTab('trainTicket')}
          >
            Train Ticket
          </button>
        )}
        {showReceipt && (
          <button 
            className={activeTab === 'receipt' ? 'active' : ''}
            onClick={() => setActiveTab('receipt')}
          >
            Booking Receipt
          </button>
        )}
      </div>

      {activeTab === 'booking' && (
        <form onSubmit={handleSubmit} className="booking-form">
          <h1>Plan Your Trip</h1>
          
          {/* Destination & Dates */}
          <div className="form-section">
            <h2>Destination & Dates</h2>
            <div className="form-group">
              <label>Select Destination</label>
              <input 
                type="text" 
                name="destination" 
                value={formData.destination}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Start Date</label>
                <input 
                  type="date" 
                  name="startDate" 
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>End Date</label>
                <input 
                  type="date" 
                  name="endDate" 
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          
          {/* Travelers Information */}
          <div className="form-section">
            <h2>Travelers Information</h2>
            <div className="form-group">
              <label>Number of Travelers</label>
              <select 
                name="travelers" 
                value={formData.travelers}
                onChange={handleChange}
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            {travelerNames.map((name, index) => (
              <div key={index} className="form-group">
                <label>Traveler {index + 1} Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => handleTravelerNameChange(index, e.target.value)}
                  required
                />
              </div>
            ))}
          </div>
          
          {/* Choose Package */}
          <div className="form-section">
            <h2>Choose Package</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Package Type</label>
                <select 
                  name="packageType" 
                  value={formData.packageType}
                  onChange={handleChange}
                >
                  <option value="Family">Family</option>
                  <option value="Honeymoon">Honeymoon</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Budget">Budget</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Duration</label>
                <input 
                  type="text" 
                  name="duration" 
                  value={formData.duration}
                  readOnly
                />
              </div>
            </div>
          </div>
          
          {/* Add-on Options */}
          <div className="form-section">
            <h2>Add-on Options</h2>
            
            {/* Flight Booking */}
            <div className="feature-toggle">
              <label>
                <input 
                  type="checkbox" 
                  checked={features.flight}
                  onChange={() => toggleFeature('flight')}
                />
                ✈️ Flight Booking
              </label>
              
              {features.flight && (
                <div className="feature-details">
                  <div className="form-row">
                    <div className="form-group">
                      <label>From</label>
                      <input 
                        type="text" 
                        value={flightDetails.from}
                        onChange={(e) => setFlightDetails({...flightDetails, from: e.target.value})}
                        placeholder="City or Airport"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>To</label>
                      <input 
                        type="text" 
                        value={flightDetails.to}
                        onChange={(e) => setFlightDetails({...flightDetails, to: e.target.value})}
                        placeholder="City or Airport"
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Departure Date</label>
                      <input 
                        type="date" 
                        value={flightDetails.departure}
                        onChange={(e) => setFlightDetails({...flightDetails, departure: e.target.value})}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Return Date</label>
                      <input 
                        type="date" 
                        value={flightDetails.return}
                        onChange={(e) => setFlightDetails({...flightDetails, return: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Airline Preference</label>
                      <select 
                        value={flightDetails.airline}
                        onChange={(e) => setFlightDetails({...flightDetails, airline: e.target.value})}
                      >
                        <option value="">Any</option>
                        <option value="IndiGo">IndiGo</option>
                        <option value="Air India">Air India</option>
                        <option value="SpiceJet">SpiceJet</option>
                        <option value="Vistara">Vistara</option>
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label>Class</label>
                      <select 
                        value={flightDetails.class}
                        onChange={(e) => setFlightDetails({...flightDetails, class: e.target.value})}
                      >
                        <option value="Economy">Economy</option>
                        <option value="Premium Economy">Premium Economy</option>
                        <option value="Business">Business</option>
                        <option value="First">First Class</option>
                      </select>
                    </div>
                  </div>
                  
                  <button 
                    type="button" 
                    className="search-btn"
                    onClick={generateFlightTicket}
                  >
                    Book Flight & Generate Ticket
                  </button>
                </div>
              )}
            </div>
            
            {/* Hotel Booking */}
            <div className="feature-toggle">
              <label>
                <input 
                  type="checkbox" 
                  checked={features.hotel}
                  onChange={() => toggleFeature('hotel')}
                />
                🏨 Hotel Booking
              </label>
              
              {features.hotel && (
                <div className="feature-details">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Budget (per night)</label>
                      <select 
                        value={hotelDetails.budget}
                        onChange={(e) => setHotelDetails({...hotelDetails, budget: e.target.value})}
                      >
                        <option value="">Any</option>
                        <option value="Under ₹2000">Under ₹2000</option>
                        <option value="₹2000-₹5000">₹2000-₹5000</option>
                        <option value="₹5000-₹10000">₹5000-₹10000</option>
                        <option value="Above ₹10000">Above ₹10000</option>
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label>Star Rating</label>
                      <select 
                        value={hotelDetails.rating}
                        onChange={(e) => setHotelDetails({...hotelDetails, rating: e.target.value})}
                      >
                        <option value="3">3 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="5">5 Stars</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Check-in Date</label>
                      <input 
                        type="date" 
                        value={hotelDetails.checkIn}
                        onChange={(e) => setHotelDetails({...hotelDetails, checkIn: e.target.value})}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Check-out Date</label>
                      <input 
                        type="date" 
                        value={hotelDetails.checkOut}
                        onChange={(e) => setHotelDetails({...hotelDetails, checkOut: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  {hotelSuggestions.length > 0 && (
                    <div className="hotel-suggestions">
                      <h3>Suggested Hotels in {formData.destination}</h3>
                      <div className="hotel-list">
                        {hotelSuggestions.map(hotel => (
                          <div 
                            key={hotel.id} 
                            className={`hotel-card ${hotelDetails.selectedHotel === hotel.name ? 'selected' : ''}`}
                            onClick={() => setHotelDetails({...hotelDetails, selectedHotel: hotel.name})}
                          >
                            <h4>{hotel.name}</h4>
                            <div className="rating">{'★'.repeat(hotel.rating)}{'☆'.repeat(5 - hotel.rating)}</div>
                            <div className="price">{hotel.price}</div>
                            <div className="amenities">{hotel.amenities}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {hotelDetails.selectedHotel && (
                    <div className="hotel-confirmation">
                      <p>Selected: <strong>{hotelDetails.selectedHotel}</strong></p>
                      <button type="button" className="book-btn">
                        Book Now
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Transportation Options */}
            <div className="feature-toggle">
              <label>
                <input 
                  type="checkbox" 
                  checked={features.transportation}
                  onChange={() => toggleFeature('transportation')}
                />
                🚗 Transportation
              </label>
              
              {features.transportation && (
                <div className="feature-details">
                  <div className="form-group">
                    <label>
                      <input 
                        type="checkbox" 
                        checked={transportation.needCar}
                        onChange={(e) => setTransportation({...transportation, needCar: e.target.checked})}
                      />
                      Need Car at Destination
                    </label>
                    
                    {transportation.needCar && (
                      <div className="sub-options">
                        <label>Car Type</label>
                        <select
                          value={transportation.carType}
                          onChange={(e) => setTransportation({...transportation, carType: e.target.value})}
                        >
                          <option value="4 Seater">4 Seater Sedan</option>
                          <option value="6 Seater">6 Seater SUV</option>
                          <option value="Luxury">Luxury Car</option>
                        </select>
                      </div>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <label>
                      <input 
                        type="checkbox" 
                        checked={transportation.needTrain}
                        onChange={(e) => setTransportation({...transportation, needTrain: e.target.checked})}
                      />
                      Book Train Tickets
                    </label>
                    
                    {transportation.needTrain && (
                      <div className="sub-options">
                        <label>Train Class</label>
                        <select
                          value={transportation.trainClass}
                          onChange={(e) => setTransportation({...transportation, trainClass: e.target.value})}
                        >
                          <option value="Sleeper">Sleeper Class</option>
                          <option value="3AC">3 Tier AC</option>
                          <option value="2AC">2 Tier AC</option>
                          <option value="1AC">1st Class AC</option>
                        </select>
                        
                        <button 
                          type="button" 
                          className="book-btn"
                          onClick={generateTrainTicket}
                        >
                          Generate Train Ticket
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {/* Weather Info */}
            <div className="feature-toggle">
              <label>
                <input 
                  type="checkbox" 
                  checked={features.weather}
                  onChange={() => toggleFeature('weather')}
                />
                🌤️ Weather Info
              </label>
              
              {features.weather && weather && (
                <div className="feature-details weather-info">
                  <h3>Weather Forecast for {formData.destination}</h3>
                  <div className="current-weather">
                    <p><strong>Current:</strong> {weather.temp}, {weather.condition}</p>
                    <p><strong>Humidity:</strong> {weather.humidity}</p>
                  </div>
                  
                  <div className="forecast">
                    <h4>3-Day Forecast:</h4>
                    {weather.forecast.map((day, index) => (
                      <div key={index} className="forecast-day">
                        <p><strong>{day.day}:</strong> {day.high}/{day.low}, {day.condition}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Reviews */}

          </div>
          
          {/* Contact Information */}
          <div className="form-section">
            <h2>Contact Information</h2>
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Phone</label>
                <input 
                  type="tel" 
                  name="phone" 
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          
          <button type="submit" className="submit-btn">
            Complete Booking
          </button>
        </form>
      )}

      {activeTab === 'flightTicket' && flightTicket && (
        <div className="ticket">
          <h1>Flight Ticket</h1>
          <div className="ticket-details">
            <div className="ticket-header">
              <div className="airline">{flightTicket.airline}</div>
              <div className="booking-id">Booking ID: {flightTicket.bookingId}</div>
            </div>
            
            <div className="flight-info">
              <div className="from">
                <div className="city">{flightTicket.from}</div>
                <div className="time">{flightTicket.departureTime}</div>
                <div className="date">{flightTicket.date}</div>
              </div>
              
              <div className="duration">
                <div className="flight-duration">{flightTicket.duration}</div>
                <div className="flight-icon">✈️</div>
              </div>
              
              <div className="to">
                <div className="city">{flightTicket.to}</div>
                <div className="time">{flightTicket.arrivalTime}</div>
                <div className="date">{flightTicket.date}</div>
              </div>
            </div>
            
            <div className="flight-number">
              Flight: {flightTicket.flightNumber} | Class: {flightTicket.class}
            </div>
            
            <div className="travelers">
              <h3>Passengers:</h3>
              {flightTicket.travelers.map((name, index) => (
                <div key={index} className="passenger">
                  <span className="passenger-number">{index + 1}.</span>
                  <span className="passenger-name">{name}</span>
                      <span className="passenger-age">{}</span>
                </div>
              ))}
            </div>
            
            <div className="price">
              Total Price: {flightTicket.price}
            </div>
            
            <div className="barcode">
              <div className="barcode-image">⎸⎹⎸⎹⎸⎹⎸⎹⎸⎹⎸⎹⎸⎹⎸⎹⎸⎹</div>
              <div className="barcode-number">{flightTicket.bookingId}</div>
            </div>
          </div>
          
          <div className="ticket-actions">
            <button onClick={() => window.print()} className="print-btn">
              Print Ticket
            </button>
            <button onClick={() => setActiveTab('booking')} className="back-btn">
              Back to Booking
            </button>
          </div>
        </div>
      )}

      {activeTab === 'trainTicket' && trainTicket && (
        <div className="ticket">
          <h1>Train Ticket</h1>
          <div className="ticket-details">
            <div className="ticket-header">
              <div className="train">{trainTicket.trainName}</div>
              <div className="booking-id">Booking ID: {trainTicket.bookingId}</div>
            </div>
            
            <div className="train-info">
              <div className="from">
                <div className="city">Delhi</div>
                <div className="time">{trainTicket.departureTime}</div>
                <div className="date">{trainTicket.date}</div>
              </div>
              
              <div className="duration">
                <div className="train-duration">{trainTicket.duration}</div>
                <div className="train-icon">🚂</div>
              </div>
              
              <div className="to">
                <div className="city">{formData.destination}</div>
                <div className="time">{trainTicket.arrivalTime}</div>
                <div className="date">{trainTicket.date}</div>
              </div>
            </div>
            
            <div className="train-number">
              Train: {trainTicket.trainName} ({trainTicket.trainNumber}) | Class: {trainTicket.class}
            </div>
            
            <div className="travelers">
              <h3>Passengers:</h3>
              {trainTicket.travelers.map((name, index) => (
                <div key={index} className="passenger">
                  <span className="passenger-number">{index + 1}.</span>
                  <span className="passenger-name">{name}</span>
                </div>
              ))}
            </div>
            
            <div className="price">
              Total Price: {trainTicket.price}
            </div>
            
            <div className="barcode">
              <div className="barcode-image">⎸⎹⎸⎹⎸⎹⎸⎹⎸⎹⎸⎹⎸⎹⎸⎹⎸⎹</div>
              <div className="barcode-number">{trainTicket.bookingId}</div>
            </div>
          </div>
          
          <div className="ticket-actions">
            <button onClick={() => window.print()} className="print-btn">
              Print Ticket
            </button>
            <button onClick={() => setActiveTab('booking')} className="back-btn">
              Back to Booking
            </button>
          </div>
        </div>
      )}

      {activeTab === 'receipt' && showReceipt && (
        <div className="receipt">
          <h1>Booking Confirmation</h1>
          <div className="receipt-details">
            <h2>Your Trip Details</h2>
            <p><strong>Destination:</strong> {formData.destination}</p>
            <p><strong>Travel Dates:</strong> {formData.startDate} to {formData.endDate}</p>
            <p><strong>Package:</strong> {formData.packageType} ({formData.duration})</p>
            <p><strong>Travelers:</strong> {formData.travelers}</p>
            
            {features.flight && flightTicket && (
              <>
                <h3>Flight Details</h3>
                <p><strong>Airline:</strong> {flightTicket.airline}</p>
                <p><strong>Flight Number:</strong> {flightTicket.flightNumber}</p>
                <p><strong>From:</strong> {flightTicket.from} at {flightTicket.departureTime}</p>
                <p><strong>To:</strong> {flightTicket.to} at {flightTicket.arrivalTime}</p>
                <p><strong>Class:</strong> {flightTicket.class}</p>
                <p><strong>Price:</strong> {flightTicket.price}</p>
              </>
            )}
            
            {features.hotel && hotelDetails.selectedHotel && (
              <>
                <h3>Hotel Booking</h3>
                <p><strong>Hotel:</strong> {hotelDetails.selectedHotel}</p>
                <p><strong>Check-in:</strong> {hotelDetails.checkIn}</p>
                <p><strong>Check-out:</strong> {hotelDetails.checkOut}</p>
                <p><strong>Rating:</strong> {hotelDetails.rating} Stars</p>
                <p><strong>Budget:</strong> {hotelDetails.budget || 'Flexible'}</p>
              </>
            )}
            
            {features.transportation && (
              <>
                <h3>Transportation</h3>
                {transportation.needCar && (
                  <p><strong>Car Rental:</strong> {transportation.carType}</p>
                )}
                {transportation.needTrain && trainTicket && (
                  <>
                    <p><strong>Train:</strong> {trainTicket.trainName} ({trainTicket.trainNumber})</p>
                    <p><strong>Class:</strong> {trainTicket.class}</p>
                    <p><strong>Price:</strong> {trainTicket.price}</p>
                  </>
                )}
              </>
            )}
            
            <h3>Contact Information</h3>
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Phone:</strong> {formData.phone}</p>
          </div>
          
          <div className="receipt-actions">
            <button onClick={() => window.print()} className="print-btn">
              Print Receipt
            </button>
            <button onClick={resetForm} className="new-booking-btn">
              Create New Booking
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;