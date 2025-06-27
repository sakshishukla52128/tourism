import { useState, useEffect, useRef } from 'react';
import './Destinations.css';

const Destinations = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlace, setSelectedPlace] = useState(null);
  const containerRef = useRef(null);

  // Fetch places from Unsplash API
  const fetchPlaces = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${searchQuery || 'travel'}&page=${page}&per_page=12&client_id=G6ZH4HnzRG3mSCd7WJv09xr-NEQJgVi-fH6CG8qMFIc`
      );
      const data = await response.json();
      
      const newPlaces = data.results.map(item => ({
        id: item.id,
        name: item.alt_description || "Beautiful Destination",
        image: item.urls.regular,
        location: item.user.location || "Exotic Location",
        facilities: generateRandomFacilities(),
        attractions: generateRandomAttractions(),
        description: "Experience the beauty of this amazing destination with our exclusive tour packages."
      }));
      
      setPlaces(prev => [...prev, ...newPlaces]);
    } catch (error) {
      console.error("Error fetching places:", error);
    } finally {
      setLoading(false);
    }
  };

  // Generate random facilities for demo
  const generateRandomFacilities = () => {
    const allFacilities = [
      "Luxury Stay", "Airport Transfer", "Free WiFi", 
      "Swimming Pool", "Guided Tours", "Breakfast Included",
      "Spa", "Adventure Activities", "24/7 Support"
    ];
    return allFacilities.sort(() => 0.5 - Math.random()).slice(0, 5);
  };

  // Generate random attractions for demo
  const generateRandomAttractions = () => {
    const attractions = [
      "Historical Sites", "Beaches", "Mountain Views",
      "Local Cuisine", "Wildlife Safari", "Nightlife",
      "Shopping", "Cultural Shows", "Water Sports"
    ];
    return attractions.sort(() => 0.5 - Math.random()).slice(0, 3);
  };

  // Handle scroll for infinite loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage(prev => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [loading]);

  // Fetch data when page or search changes
  useEffect(() => {
    fetchPlaces();
  }, [page, searchQuery]);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    setPlaces([]);
    setPage(1);
  };

  return (
    <div className="explore-now-container">
      <h1>Discover Your Dream Destination</h1>
      
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          placeholder="Search places (e.g., Paris, Beach, Mountain...)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {/* Places Grid */}
      <div className="places-grid">
        {places.map((place) => (
          <div key={place.id} className="place-card">
            <img 
              src={place.image} 
              alt={place.name} 
              onClick={() => setSelectedPlace(place)}
            />
            <div className="place-info">
              <h3>{place.name}</h3>
              <p className="location">📍 {place.location}</p>
              <button 
                className="view-details-btn"
                onClick={() => setSelectedPlace(place)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Loading Indicator */}
      {loading && <div className="loading">Loading more destinations...</div>}
      <div ref={containerRef} style={{ height: '10px' }}></div>

      {/* Details Modal */}
      {selectedPlace && (
        <div className="modal-overlay">
          <div className="place-modal">
            <button 
              className="close-modal"
              onClick={() => setSelectedPlace(null)}
            >
              &times;
            </button>
            
            <img src={selectedPlace.image} alt={selectedPlace.name} />
            
            <div className="modal-content">
              <h2>{selectedPlace.name}</h2>
              <p className="location">📍 {selectedPlace.location}</p>
              
              <div className="details-section">
                <h3>About This Place</h3>
                <p>{selectedPlace.description}</p>
              </div>
              
              <div className="details-section">
                <h3>Facilities</h3>
                <ul>
                  {selectedPlace.facilities.map((facility, i) => (
                    <li key={i}>✓ {facility}</li>
                  ))}
                </ul>
              </div>
              
              <div className="details-section">
                <h3>Main Attractions</h3>
                <ul>
                  {selectedPlace.attractions.map((attraction, i) => (
                    <li key={i}>🌟 {attraction}</li>
                  ))}
                </ul>
              </div>
              
              <div className="modal-actions">
                <a 
                  href="#contact" 
                  className="nav-link"
                >
        <a href="Contact">   <button className="book-now-btn">
                    Contact to Enquiry
                  </button>  </a> 
                </a>
                <a
                  href={`https://wa.me/91YOUR_NUMBER?text=Hi! I'm interested in ${selectedPlace.name} package`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                 <a href="Booking"> <button className="whatsapp-btn">
                   Booking Now
                  </button></a>
             
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Destinations;