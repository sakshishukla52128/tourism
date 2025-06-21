import React, { useState } from 'react';
import './Destinations.css';

const Destinations = () => {
  // Sample destination data
  const [destinations, setDestinations] = useState([
    {
      id: 1,
      name: 'Goa',
      country: 'India',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      description: 'Famous for its pristine beaches, vibrant nightlife, and Portuguese heritage architecture.',
      bestTime: 'November to February',
      attractions: ['Baga Beach', 'Fort Aguada', 'Dudhsagar Falls', 'Anjuna Flea Market'],
      duration: '3-5 Days',
      type: 'Beach'
    },
    {
      id: 2,
      name: 'Manali',
      country: 'India',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      description: 'Nestled in the Himalayas, known for its snow-capped mountains and adventure sports.',
      bestTime: 'October to June',
      attractions: ['Rohtang Pass', 'Solang Valley', 'Hadimba Temple', 'Old Manali'],
      duration: '4-6 Days',
      type: 'Hill Station'
    },
    {
      id: 3,
      name: 'Dubai',
      country: 'UAE',
      image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      description: 'Ultra-modern city with luxury shopping, futuristic architecture and lively nightlife.',
      bestTime: 'November to March',
      attractions: ['Burj Khalifa', 'Palm Jumeirah', 'Desert Safari', 'Dubai Mall'],
      duration: '5-7 Days',
      type: 'Urban'
    },
    {
      id: 4,
      name: 'Paris',
      country: 'France',
      image: 'https://images.unsplash.com/photo-1503917988258-f87a78e3c995?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      description: 'The romantic city of lights, famous for its art, fashion, gastronomy and culture.',
      bestTime: 'April to June, September to November',
      attractions: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame Cathedral', 'Champs-Élysées'],
      duration: '4-7 Days',
      type: 'Historical'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedCountry, setSelectedCountry] = useState('All');

  // Get unique types and countries for filters
  const types = ['All', ...new Set(destinations.map(d => d.type))];
  const countries = ['All', ...new Set(destinations.map(d => d.country))];

  // Filter destinations based on search and filters
  const filteredDestinations = destinations.filter(destination => {
    const matchesSearch = destination.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         destination.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || destination.type === selectedType;
    const matchesCountry = selectedCountry === 'All' || destination.country === selectedCountry;
    
    return matchesSearch && matchesType && matchesCountry;
  });

  return (
    <div className="destinations-page">
      <div className="destinations-header">
        <h1>Explore Destinations</h1>
        <p>Discover your next adventure</p>
      </div>

      {/* Search and Filters */}
      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search destinations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <i className="fas fa-search"></i>
        </div>

        <div className="filter-dropdowns">
          <select 
            value={selectedType} 
            onChange={(e) => setSelectedType(e.target.value)}
          >
            {types.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          <select 
            value={selectedCountry} 
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Destination Cards */}
      <div className="destinations-grid">
        {filteredDestinations.length > 0 ? (
          filteredDestinations.map(destination => (
            <DestinationCard key={destination.id} destination={destination} />
          ))
        ) : (
          <div className="no-results">
            <h3>No destinations found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Destination Card Component
const DestinationCard = ({ destination }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`destination-card ${expanded ? 'expanded' : ''}`}>
      <div 
        className="card-image"
        style={{ backgroundImage: `url(${destination.image})` }}
      >
        <div className="card-overlay">
          <h3>{destination.name}</h3>
          <p>{destination.country}</p>
        </div>
      </div>
      
      <div className="card-content">
        <div className="card-meta">
          <span><i className="fas fa-calendar-alt"></i> {destination.bestTime}</span>
          <span><i className="fas fa-clock"></i> {destination.duration}</span>
          <span><i className="fas fa-tag"></i> {destination.type}</span>
        </div>
        
        <p className="description">{destination.description}</p>
        
        {expanded && (
          <div className="expanded-content">
            <h4>Top Attractions:</h4>
            <ul>
              {destination.attractions.map((attraction, index) => (
                <li key={index}>{attraction}</li>
              ))}
            </ul>
          </div>
        )}
        
        <button 
          className="toggle-btn"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Show Less' : 'Explore More'}
        </button>
      </div>
      
    </div>
  );
};

export default Destinations;