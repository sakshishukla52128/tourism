import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { QRCodeSVG as QRCode } from 'qrcode.react';
import './Booking.css';
const Booking = () => {
  // Main form state
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    packageType: 'Family',
    duration: 7,
    travelers: 1,
    travelerInfo: {
      name: '',
      email: '',
      phone: '',
      address: ''
    },
    addons: {
      flight: false,
      hotel: false,
      car: false,
      train: false
    }
  });

  // Flight booking state
  const [flightData, setFlightData] = useState({
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
    class: 'Economy',
    selectedFlight: null,
    availableFlights: []
  });

  // Hotel booking state
  const [hotelData, setHotelData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    budget: 'Medium',
    starRating: 3,
    selectedHotel: null,
    availableHotels: []
  });

  // Car rental state
  const [carData, setCarData] = useState({
    pickupDate: '',
    dropoffDate: '',
    carType: '4-seater',
    selectedCar: null,
    availableCars: []
  });

  // Train booking state
  const [trainData, setTrainData] = useState({
    from: '',
    to: '',
    travelDate: '',
    passengers: 1,
    class: 'Sleeper',
    selectedTrain: null,
    availableTrains: []
  });

  // Weather state
  const [weather, setWeather] = useState(null);
  // Payment state
  const [payment, setPayment] = useState({
    amount: 0,
    status: 'pending',
    razorpayOrderId: null,
    receipt: null
  });
  // UI state
  const [currentStep, setCurrentStep] = useState(1);
  const [showReceipt, setShowReceipt] = useState(false);

  // Calculate total amount
  useEffect(() => {
    let total = 0;
    
    // Base package price
    switch(formData.packageType) {
      case 'Family': total += 500 * formData.travelers; break;
      case 'Honeymoon': total += 800 * 2; break;
      case 'Adventure': total += 600 * formData.travelers; break;
      case 'Budget': total += 300 * formData.travelers; break;
      default: total += 400 * formData.travelers;
    }
    
    // Flight cost
    if (formData.addons.flight && flightData.selectedFlight) {
      total += flightData.selectedFlight.price * flightData.passengers;
    }
    
    // Hotel cost
    if (formData.addons.hotel && hotelData.selectedHotel) {
      const nights = Math.ceil((new Date(hotelData.checkOut) - new Date(hotelData.checkIn)) / (1000 * 60 * 60 * 24));
      total += hotelData.selectedHotel.price * nights;
    }
    
    // Car cost
    if (formData.addons.car && carData.selectedCar) {
      const days = Math.ceil((new Date(carData.dropoffDate) - new Date(carData.pickupDate)) / (1000 * 60 * 60 * 24));
      total += carData.selectedCar.price * days;
    }
    
    // Train cost
    if (formData.addons.train && trainData.selectedTrain) {
      total += trainData.selectedTrain.price * trainData.passengers;
    }
    
    setPayment(prev => ({ ...prev, amount: total }));
  }, [formData, flightData, hotelData, carData, trainData]);

  // Fetch weather when destination changes
  useEffect(() => {
    if (formData.destination) {
      fetchWeather(formData.destination);
    }
  }, [formData.destination]);

  // Fetch available flights when flight search criteria changes
  useEffect(() => {
    if (formData.addons.flight && flightData.from && flightData.to && flightData.departureDate) {
      fetchFlights();
    }
  }, [flightData.from, flightData.to, flightData.departureDate, flightData.returnDate, flightData.class]);

  // Fetch available hotels when hotel search criteria changes
  useEffect(() => {
    if (formData.addons.hotel && formData.destination && hotelData.checkIn && hotelData.checkOut) {
      fetchHotels();
    }
  }, [formData.destination, hotelData.checkIn, hotelData.checkOut, hotelData.budget, hotelData.starRating]);

  // Fetch available cars when car search criteria changes
  useEffect(() => {
    if (formData.addons.car && formData.destination && carData.pickupDate) {
      fetchCars();
    }
  }, [formData.destination, carData.pickupDate, carData.dropoffDate, carData.carType]);

  // Fetch available trains when train search criteria changes
  useEffect(() => {
    if (formData.addons.train && trainData.from && trainData.to && trainData.travelDate) {
      fetchTrains();
    }
  }, [trainData.from, trainData.to, trainData.travelDate, trainData.class]);

  const fetchWeather = async (city) => {
    try {
      // Using OpenWeatherMap API (you'll need to get your own API key)
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=YOUR_WEATHER_API_KEY`
      );
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather:", error);
      // Fallback dummy data
      setWeather({
        weather: [{ description: "Sunny" }],
        main: { temp: 28, humidity: 65 },
        wind: { speed: 5 }
      });
    }
  };

  const fetchFlights = async () => {
    // In a real app, this would call your backend which calls flight API
    // Here we'll use dummy data
    const dummyFlights = [
      {
        id: 1,
        airline: "IndiGo",
        flightNumber: "6E-123",
        departure: "08:00",
        arrival: "10:30",
        duration: "2h 30m",
        price: 5000,
        seatsAvailable: 20
      },
      {
        id: 2,
        airline: "Air India",
        flightNumber: "AI-456",
        departure: "12:00",
        arrival: "14:15",
        duration: "2h 15m",
        price: 6500,
        seatsAvailable: 15
      },
      {
        id: 3,
        airline: "Vistara",
        flightNumber: "UK-789",
        departure: "16:30",
        arrival: "19:00",
        duration: "2h 30m",
        price: 7500,
        seatsAvailable: 10
      }
    ];
    setFlightData(prev => ({ ...prev, availableFlights: dummyFlights }));
  };

  const fetchHotels = async () => {
    // Dummy hotel data based on destination
    const dummyHotels = [
      {
        id: 1,
        name: `${formData.destination} Grand Hotel`,
        rating: 4,
        price: 3500,
        amenities: ["Pool", "Spa", "Restaurant"],
        roomsAvailable: 10
      },
      {
        id: 2,
        name: `${formData.destination} Plaza`,
        rating: 3,
        price: 2500,
        amenities: ["Restaurant", "WiFi"],
        roomsAvailable: 15
      },
      {
        id: 3,
        name: `${formData.destination} Budget Inn`,
        rating: 2,
        price: 1500,
        amenities: ["WiFi"],
        roomsAvailable: 20
      }
    ];
    setHotelData(prev => ({ ...prev, availableHotels: dummyHotels }));
  };

  const fetchCars = async () => {
    // Dummy car data
    const dummyCars = [
      {
        id: 1,
        model: "Toyota Innova",
        type: "6-seater",
        price: 2000,
        available: true
      },
      {
        id: 2,
        model: "Maruti Suzuki Swift",
        type: "4-seater",
        price: 1500,
        available: true
      },
      {
        id: 3,
        model: "Hyundai Creta",
        type: "5-seater",
        price: 1800,
        available: true
      }
    ];
    setCarData(prev => ({ ...prev, availableCars: dummyCars }));
  };

  const fetchTrains = async () => {
    // Dummy train data
    const dummyTrains = [
      {
        id: 1,
        name: "Rajdhani Express",
        number: "12345",
        departure: "08:00",
        arrival: "16:00",
        duration: "8h",
        price: 1200,
        seatsAvailable: 50
      },
      {
        id: 2,
        name: "Shatabdi Express",
        number: "54321",
        departure: "14:00",
        arrival: "20:30",
        duration: "6h 30m",
        price: 1500,
        seatsAvailable: 40
      }
    ];
    setTrainData(prev => ({ ...prev, availableTrains: dummyTrains }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTravelerInfoChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      travelerInfo: {
        ...prev.travelerInfo,
        [name]: value
      }
    }));
  };

  const handleAddonChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      addons: {
        ...prev.addons,
        [name]: checked
      }
    }));
  };

  const handleFlightInputChange = (e) => {
    const { name, value } = e.target;
    setFlightData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleHotelInputChange = (e) => {
    const { name, value } = e.target;
    setHotelData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCarInputChange = (e) => {
    const { name, value } = e.target;
    setCarData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTrainInputChange = (e) => {
    const { name, value } = e.target;
    setTrainData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const selectFlight = (flight) => {
    setFlightData(prev => ({ ...prev, selectedFlight: flight }));
  };

  const selectHotel = (hotel) => {
    setHotelData(prev => ({ ...prev, selectedHotel: hotel }));
  };

  const selectCar = (car) => {
    setCarData(prev => ({ ...prev, selectedCar: car }));
  };

  const selectTrain = (train) => {
    setTrainData(prev => ({ ...prev, selectedTrain: train }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // In a real app, you would send this data to your backend
    console.log("Booking submitted:", {
      formData,
      flightData,
      hotelData,
      carData,
      trainData
    });
    
    // Generate Razorpay order
    await initPayment();
  };

  const initPayment = () => {
    const options = {
      key: "rzp_test_yP3BDk7SSyJpG2",
      amount: payment.amount * 100, // Razorpay expects amount in paise
      currency: "INR",
      name: "Travel Booking",
      description: "Tour Package Payment",
      order_id: payment.razorpayOrderId,
      handler: async (response) => {
        try {
          // Verify payment on your backend in a real app
          setPayment(prev => ({
            ...prev,
            status: 'completed',
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature
          }));
          
          // Generate receipt
          generateReceipt();
        } catch (err) {
          console.error(err);
        }
      },
      theme: {
        color: "#3399cc"
      }
    };
    
    // In a real app, you would first create an order on your backend
    // For demo, we'll just generate a random order ID
    const orderId = `order_${Math.random().toString(36).substr(2, 9)}`;
    setPayment(prev => ({ ...prev, razorpayOrderId: orderId }));
    
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const generateReceipt = () => {
    const receipt = {
      bookingId: `BOOK-${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
      date: new Date().toLocaleDateString(),
      traveler: formData.travelerInfo.name,
      destination: formData.destination,
      package: formData.packageType,
      duration: `${formData.duration} days`,
      travelers: formData.travelers,
      totalAmount: payment.amount,
      flight: formData.addons.flight ? flightData.selectedFlight : null,
      hotel: formData.addons.hotel ? hotelData.selectedHotel : null,
      car: formData.addons.car ? carData.selectedCar : null,
      train: formData.addons.train ? trainData.selectedTrain : null
    };
    
    setPayment(prev => ({ ...prev, receipt }));
    setShowReceipt(true);
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="booking-step">
            <h2>Destination & Dates</h2>
            <div className="form-group">
              <label>Destination</label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                required
              />
            </div>
            
            {weather && (
              <div className="weather-info">
                <h3>Weather in {formData.destination}</h3>
                <p>Condition: {weather.weather[0].description}</p>
                <p>Temperature: {weather.main.temp}°C</p>
                <p>Humidity: {weather.main.humidity}%</p>
              </div>
            )}
            
            <div className="form-group">
              <label>Package Type</label>
              <select
                name="packageType"
                value={formData.packageType}
                onChange={handleInputChange}
              >
                <option value="Family">Family Package</option>
                <option value="Honeymoon">Honeymoon Package</option>
                <option value="Adventure">Adventure Package</option>
                <option value="Budget">Budget Package</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Duration (days)</label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                min="1"
              />
            </div>
            
            <div className="form-group">
              <label>Number of Travelers</label>
              <input
                type="number"
                name="travelers"
                value={formData.travelers}
                onChange={handleInputChange}
                min="1"
              />
            </div>
            
            <div className="addons">
              <h3>Add-on Services</h3>
              
              <label className="checkbox">
                <input
                  type="checkbox"
                  name="flight"
                  checked={formData.addons.flight}
                  onChange={handleAddonChange}
                />
                Flight Booking
              </label>
              
              <label className="checkbox">
                <input
                  type="checkbox"
                  name="hotel"
                  checked={formData.addons.hotel}
                  onChange={handleAddonChange}
                />
                Hotel Booking
              </label>
              
              <label className="checkbox">
                <input
                  type="checkbox"
                  name="car"
                  checked={formData.addons.car}
                  onChange={handleAddonChange}
                />
                Car Rental
              </label>
              
              <label className="checkbox">
                <input
                  type="checkbox"
                  name="train"
                  checked={formData.addons.train}
                  onChange={handleAddonChange}
                />
                Train Booking
              </label>
            </div>
            
            <button type="button" onClick={nextStep} className="next-btn" style={{width:'25%'}}>
              Next
            </button>
          </div>
        );
      
      case 2:
        return (
          <div className="booking-step">
            <h2>Add-on Services Details</h2>
            
            {formData.addons.flight && (
              <div className="addon-section">
                <h3>Flight Booking</h3>
                
                <div className="form-group">
                  <label>From</label>
                  <input
                    type="text"
                    name="from"
                    value={flightData.from}
                    onChange={handleFlightInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>To</label>
                  <input
                    type="text"
                    name="to"
                    value={flightData.to}
                    onChange={handleFlightInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Departure Date</label>
                  <input
                    type="date"
                    name="departureDate"
                    value={flightData.departureDate}
                    onChange={handleFlightInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Return Date (if round trip)</label>
                  <input
                    type="date"
                    name="returnDate"
                    value={flightData.returnDate}
                    onChange={handleFlightInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label>Passengers</label>
                  <input
                    type="number"
                    name="passengers"
                    value={flightData.passengers}
                    onChange={handleFlightInputChange}
                    min="1"
                    max={formData.travelers}
                  />
                </div>
                
                <div className="form-group">
                  <label>Class</label>
                  <select
                    name="class"
                    value={flightData.class}
                    onChange={handleFlightInputChange}
                  >
                    <option value="Economy">Economy</option>
                    <option value="Business">Business</option>
                    <option value="First">First Class</option>
                  </select>
                </div>
                
                {flightData.availableFlights.length > 0 && (
                  <div className="flight-options">
                    <h4>Available Flights</h4>
                    {flightData.availableFlights.map(flight => (
                      <div 
                        key={flight.id} 
                        className={`flight-option ${flightData.selectedFlight?.id === flight.id ? 'selected' : ''}`}
                        onClick={() => selectFlight(flight)}
                      >
                        <div className="flight-airline">{flight.airline}</div>
                        <div className="flight-number">{flight.flightNumber}</div>
                        <div className="flight-time">
                          {flight.departure} - {flight.arrival} ({flight.duration})
                        </div>
                        <div className="flight-price">₹{flight.price}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {formData.addons.hotel && (
              <div className="addon-section">
                <h3>Hotel Booking</h3>
                
                <div className="form-group">
                  <label>Check-in Date</label>
                  <input
                    type="date"
                    name="checkIn"
                    value={hotelData.checkIn}
                    onChange={handleHotelInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Check-out Date</label>
                  <input
                    type="date"
                    name="checkOut"
                    value={hotelData.checkOut}
                    onChange={handleHotelInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Guests</label>
                  <input
                    type="number"
                    name="guests"
                    value={hotelData.guests}
                    onChange={handleHotelInputChange}
                    min="1"
                    max={formData.travelers}
                  />
                </div>
                
                <div className="form-group">
                  <label>Budget</label>
                  <select
                    name="budget"
                    value={hotelData.budget}
                    onChange={handleHotelInputChange}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Star Rating</label>
                  <select
                    name="starRating"
                    value={hotelData.starRating}
                    onChange={handleHotelInputChange}
                  >
                    <option value="1">1 Star</option>
                    <option value="2">2 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="5">5 Stars</option>
                  </select>
                </div>
                
                {hotelData.availableHotels.length > 0 && (
                  <div className="hotel-options">
                    <h4>Available Hotels</h4>
                    {hotelData.availableHotels.map(hotel => (
                      <div 
                        key={hotel.id} 
                        className={`hotel-option ${hotelData.selectedHotel?.id === hotel.id ? 'selected' : ''}`}
                        onClick={() => selectHotel(hotel)}
                      >
                        <div className="hotel-name">{hotel.name}</div>
                        <div className="hotel-rating">{"★".repeat(hotel.rating)}</div>
                        <div className="hotel-price">₹{hotel.price}/night</div>
                        <div className="hotel-amenities">
                          {hotel.amenities.join(", ")}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {formData.addons.car && (
              <div className="addon-section">
                <h3>Car Rental</h3>
                
                <div className="form-group">
                  <label>Pickup Date</label>
                  <input
                    type="date"
                    name="pickupDate"
                    value={carData.pickupDate}
                    onChange={handleCarInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Drop-off Date</label>
                  <input
                    type="date"
                    name="dropoffDate"
                    value={carData.dropoffDate}
                    onChange={handleCarInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Car Type</label>
                  <select
                    name="carType"
                    value={carData.carType}
                    onChange={handleCarInputChange}
                  >
                    <option value="4-seater">4-seater</option>
                    <option value="6-seater">6-seater</option>
                    <option value="SUV">SUV</option>
                    <option value="Luxury">Luxury</option>
                  </select>
                </div>
                
                {carData.availableCars.length > 0 && (
                  <div className="car-options">
                    <h4>Available Cars</h4>
                    {carData.availableCars.map(car => (
                      <div 
                        key={car.id} 
                        className={`car-option ${carData.selectedCar?.id === car.id ? 'selected' : ''}`}
                        onClick={() => selectCar(car)}
                      >
                        <div className="car-model">{car.model}</div>
                        <div className="car-type">{car.type}</div>
                        <div className="car-price">₹{car.price}/day</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {formData.addons.train && (
              <div className="addon-section">
                <h3>Train Booking</h3>
                
                <div className="form-group">
                  <label>From</label>
                  <input
                    type="text"
                    name="from"
                    value={trainData.from}
                    onChange={handleTrainInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>To</label>
                  <input
                    type="text"
                    name="to"
                    value={trainData.to}
                    onChange={handleTrainInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Travel Date</label>
                  <input
                    type="date"
                    name="travelDate"
                    value={trainData.travelDate}
                    onChange={handleTrainInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Passengers</label>
                  <input
                    type="number"
                    name="passengers"
                    value={trainData.passengers}
                    onChange={handleTrainInputChange}
                    min="1"
                    max={formData.travelers}
                  />
                </div>
                
                <div className="form-group">
                  <label>Class</label>
                  <select
                    name="class"
                    value={trainData.class}
                    onChange={handleTrainInputChange}
                  >
                    <option value="Sleeper">Sleeper</option>
                    <option value="3A">AC 3-Tier</option>
                    <option value="2A">AC 2-Tier</option>
                    <option value="1A">AC First Class</option>
                  </select>
                </div>
                
                {trainData.availableTrains.length > 0 && (
                  <div className="train-options">
                    <h4>Available Trains</h4>
                    {trainData.availableTrains.map(train => (
                      <div 
                        key={train.id} 
                        className={`train-option ${trainData.selectedTrain?.id === train.id ? 'selected' : ''}`}
                        onClick={() => selectTrain(train)}
                      >
                        <div className="train-name">{train.name}</div>
                        <div className="train-number">{train.number}</div>
                        <div className="train-time">
                          {train.departure} - {train.arrival} ({train.duration})
                        </div>
                        <div className="train-price">₹{train.price}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            <div className="navigation-buttons">
              <button type="button" onClick={prevStep} className="prev-btn" style={{width:"40%"}}>
                Previous
              </button>
              <button type="button" onClick={nextStep} className="next-btn" style={{width:"40%"}}>
                Next
              </button>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="booking-step">
            <h2>Traveler Information</h2>
            
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.travelerInfo.name}
                onChange={handleTravelerInfoChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.travelerInfo.email}
                onChange={handleTravelerInfoChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.travelerInfo.phone}
                onChange={handleTravelerInfoChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Address</label>
              <textarea
                name="address"
                value={formData.travelerInfo.address}
                onChange={handleTravelerInfoChange}
                required
              />
            </div>
            
            <div className="payment-summary">
              <h3>Payment Summary</h3>
              <p>Package: {formData.packageType} (₹{formData.packageType === 'Family' ? 500 * formData.travelers : 
                formData.packageType === 'Honeymoon' ? 800 * 2 : 
                formData.packageType === 'Adventure' ? 600 * formData.travelers : 
                300 * formData.travelers})</p>
              
              {formData.addons.flight && flightData.selectedFlight && (
                <p>Flight: {flightData.selectedFlight.airline} (₹{flightData.selectedFlight.price * flightData.passengers})</p>
              )}
              
              {formData.addons.hotel && hotelData.selectedHotel && (
                <p>Hotel: {hotelData.selectedHotel.name} (₹{
                  hotelData.selectedHotel.price * 
                  Math.ceil((new Date(hotelData.checkOut) - new Date(hotelData.checkIn)) / (1000 * 60 * 60 * 24))
                })</p>
              )}
              
              {formData.addons.car && carData.selectedCar && (
                <p>Car: {carData.selectedCar.model} (₹{
                  carData.selectedCar.price * 
                  Math.ceil((new Date(carData.dropoffDate) - new Date(carData.pickupDate)) / (1000 * 60 * 60 * 24))
                })</p>
              )}
              
              {formData.addons.train && trainData.selectedTrain && (
                <p>Train: {trainData.selectedTrain.name} (₹{trainData.selectedTrain.price * trainData.passengers})</p>
              )}
              
              <h4>Total: ₹{payment.amount}</h4>
            </div>
            
            <div className="navigation-buttons">
              <button type="button" onClick={prevStep} className="prev-btn"  style={{width:"35%"}}>
                Previous
              </button>
              <button type="submit" className="submit-btn" style={{width:"35%"}}>
                Confirm Booking
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const renderReceipt = () => {
    if (!payment.receipt) return null;
    
    return (
      <div className="receipt">
        <h2>Booking Confirmed!</h2>
        <div className="receipt-id">Booking ID: {payment.receipt.bookingId}</div>
        <div className="receipt-date">Date: {payment.receipt.date}</div>
        
        <div className="receipt-section">
          <h3>Traveler Information</h3>
          <p>Name: {formData.travelerInfo.name}</p>
          <p>Email: {formData.travelerInfo.email}</p>
          <p>Phone: {formData.travelerInfo.phone}</p>
        </div>
        
        <div className="receipt-section">
          <h3>Package Details</h3>
          <p>Destination: {formData.destination}</p>
          <p>Package Type: {formData.packageType}</p>
          <p>Duration: {formData.duration} days</p>
          <p>Travelers: {formData.travelers}</p>
        </div>
        
        {formData.addons.flight && payment.receipt.flight && (
          <div className="receipt-section">
            <h3>Flight Ticket</h3>
            <div className="ticket">
              <div className="ticket-header">
                <div className="airline">{payment.receipt.flight.airline}</div>
                <div className="flight-number">{payment.receipt.flight.flightNumber}</div>
              </div>
              <div className="ticket-body">
                <div className="from-to">
                  <div className="departure">
                    <div className="city">{flightData.from}</div>
                    <div className="time">{payment.receipt.flight.departure}</div>
                  </div>
                  <div className="arrow">→</div>
                  <div className="arrival">
                    <div className="city">{flightData.to}</div>
                    <div className="time">{payment.receipt.flight.arrival}</div>
                  </div>
                </div>
                <div className="passenger">
                  Passenger: {formData.travelerInfo.name}
                </div>
                <div className="ticket-footer">
                  <div className="barcode">
                    <QRCode 
                      value={`FLIGHT-${payment.receipt.bookingId}`} 
                      size={80} 
                    />
                  </div>
                  <div className="price">
                    Price: ₹{payment.receipt.flight.price}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {formData.addons.hotel && payment.receipt.hotel && (
          <div className="receipt-section">
            <h3>Hotel Booking</h3>
            <p>Hotel: {payment.receipt.hotel.name}</p>
            <p>Check-in: {hotelData.checkIn}</p>
            <p>Check-out: {hotelData.checkOut}</p>
            <p>Guests: {hotelData.guests}</p>
            <p>Price: ₹{payment.receipt.hotel.price}</p>
          </div>
        )}
        
        {formData.addons.car && payment.receipt.car && (
          <div className="receipt-section">
            <h3>Car Rental</h3>
            <p>Car Model: {payment.receipt.car.model}</p>
            <p>Type: {payment.receipt.car.type}</p>
            <p>Pickup: {carData.pickupDate}</p>
            <p>Drop-off: {carData.dropoffDate}</p>
            <p>Price: ₹{payment.receipt.car.price}</p>
          </div>
        )}
        
        {formData.addons.train && payment.receipt.train && (
          <div className="receipt-section">
            <h3>Train Ticket</h3>
            <div className="ticket">
              <div className="ticket-header">
                <div className="train-name">{payment.receipt.train.name}</div>
                <div className="train-number">{payment.receipt.train.number}</div>
              </div>
              <div className="ticket-body">
                <div className="from-to">
                  <div className="departure">
                    <div className="city">{trainData.from}</div>
                    <div className="time">{payment.receipt.train.departure}</div>
                  </div>
                  <div className="arrow">→</div>
                  <div className="arrival">
                    <div className="city">{trainData.to}</div>
                    <div className="time">{payment.receipt.train.arrival}</div>
                  </div>
                </div>
                <div className="passenger">
                  Passenger: {formData.travelerInfo.name}
                </div>
                <div className="ticket-footer">
                  <div className="barcode">
                    <QRCode 
                      value={`TRAIN-${payment.receipt.bookingId}`} 
                      size={80} 
                    />
                  </div>
                  <div className="price">
                    Price: ₹{payment.receipt.train.price}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="receipt-section total">
          <h3>Payment Summary</h3>
          <p>Total Amount: ₹{payment.receipt.totalAmount}</p>
          <p>Payment Status: {payment.status === 'completed' ? 'Paid' : 'Pending'}</p>
          {payment.razorpayPaymentId && (
            <p>Transaction ID: {payment.razorpayPaymentId}</p>
          )}
        </div>
        
        <div className="payment-qr">
          <h3>Payment QR Code</h3>
          <QRCode 
            value={`upi://pay?pa=yourmerchant@upi&pn=Travel%20Booking&am=${payment.amount}&tn=Booking%20${payment.receipt.bookingId}`} 
            size={128} 
          />
          <p>Scan to pay again</p>
        </div>
        
        <button 
          className="print-btn" 
          onClick={() => window.print()}
        >
          Print Receipt
        </button>
      </div>
    );
  };

  return (
    <div className="booking-container">
      {!showReceipt ? (
        <form onSubmit={handleSubmit}>
          <div className="booking-header">
            <h1>Book Your Travel Package</h1>
            <div className="progress-bar">
              <div className={`progress-step ${currentStep >= 1 ? 'active' : ''}`}>
                <span>1</span>
                <p>Package Details</p>
              </div>
              <div className={`progress-step ${currentStep >= 2 ? 'active' : ''}`}>
                <span>2</span>
                <p>Add-ons</p>
              </div>
              <div className={`progress-step ${currentStep >= 3 ? 'active' : ''}`}>
                <span>3</span>
                <p>Traveler Info</p>
              </div>
            </div>
          </div>
          
          {renderStep()}
        </form>
      ) : (
        renderReceipt()
      )}
    </div>
  );
};

export default Booking;