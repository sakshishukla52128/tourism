import { useState, useEffect, useRef } from 'react';
import './Destinations.css';

const Destinations = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [showPackages, setShowPackages] = useState(false);
  const containerRef = useRef(null);

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
        description: "Experience the beauty of this amazing destination with breathtaking views, local culture, and unforgettable memories.",
        packages: generateRandomPackages()
      }));
      setPlaces(prev => [...prev, ...newPlaces]);
    } catch (error) {
      console.error("Error fetching places:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateRandomFacilities = () => {
    const allFacilities = [
      "Luxury Stay", "Airport Transfer", "Free WiFi",
      "Swimming Pool", "Guided Tours", "Breakfast Included",
      "Spa", "Adventure Activities", "24/7 Support"
    ];
    return allFacilities.sort(() => 0.5 - Math.random()).slice(0, 5);
  };

  const generateRandomAttractions = () => {
    const attractions = [
      "Historical Sites", "Beaches", "Mountain Views",
      "Local Cuisine", "Wildlife Safari", "Nightlife",
      "Shopping", "Cultural Shows", "Water Sports"
    ];
    return attractions.sort(() => 0.5 - Math.random()).slice(0, 3);
  };

  const generateRandomPackages = () => {
    return [
      {
        name: "Basic Package",
        price: Math.floor(Math.random() * 500) + 200,
        duration: "3D/2N",
        includes: ["Accommodation", "Breakfast", "City Tour"],
        bestFor: "Budget travelers"
      },
      {
        name: "Standard Package",
        price: Math.floor(Math.random() * 800) + 500,
        duration: "5D/4N",
        includes: ["4-star Hotel", "All Meals", "Guided Tours", "Airport Transfer"],
        bestFor: "Couples & Families"
      },
      {
        name: "Premium Package",
        price: Math.floor(Math.random() * 1500) + 1000,
        duration: "7D/6N",
        includes: ["Luxury Resort", "All Meals + Drinks", "Private Guide", "VIP Transfers", "Spa Credits"],
        bestFor: "Luxury seekers"
      }
    ];
  };

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

  useEffect(() => {
    fetchPlaces();
  }, [page, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPlaces([]);
    setPage(1);
  };

  const speakAboutPlace = (place) => {
    stopSpeaking();
    const description = `
      Welcome to ${place.name}. 
      This destination is located in ${place.location}.
      You can enjoy facilities like ${place.facilities.join(", ")}.
      Top attractions include ${place.attractions.join(", ")}.
      ${place.description}
    `;
    const utterance = new SpeechSynthesisUtterance(description);
    utterance.lang = 'en-US';
    utterance.rate = 0.85;
    speechSynthesis.speak(utterance);
    setIsSpeaking(true);
    setPaused(false);
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
    setPaused(false);
  };

  const pauseSpeaking = () => {
    speechSynthesis.pause();
    setPaused(true);
  };

  const resumeSpeaking = () => {
    speechSynthesis.resume();
    setPaused(false);
  };

  return (
    <div className="explore-now-container">
      <h1>Discover Your Dream Destination</h1>
      <p className="subtitle">Explore breathtaking locations and find perfect travel packages</p>

      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          placeholder="Search places (e.g., Paris, Beach, Mountain...)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="places-grid">
        {places.map((place) => (
          <div key={place.id} className="place-card">
            <div className="card-image-container">
              <img
                src={place.image}
                alt={place.name}
                onClick={() => {
                  setSelectedPlace(place);
                  speakAboutPlace(place);
                }}
              />
              <div className="price-badge">
                From ${Math.min(...place.packages.map(p => p.price))}
              </div>
            </div>
            <div className="place-info">
              <h3>{place.name}</h3>
              <p className="location">📍 {place.location}</p>
              <div className="facilities-preview">
                {place.facilities.slice(0, 3).map((facility, i) => (
                  <span key={i} className="facility-tag">✓ {facility}</span>
                ))}
              </div>
              <button
                className="view-details-btn"
                onClick={() => {
                  setSelectedPlace(place);
                  speakAboutPlace(place);
                }}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {loading && <div className="loading">Loading more destinations...</div>}
      <div ref={containerRef} style={{ height: '10px' }}></div>

      {selectedPlace && (
        <div className="modal-overlay">
          <div className="place-modal">
            <button
              className="close-modal"
              onClick={() => {
                stopSpeaking();
                setSelectedPlace(null);
                setShowPackages(false);
              }}
            >
              &times;
            </button>

            <img src={selectedPlace.image} alt={selectedPlace.name} />

            <div className="modal-content">
              <h2>{selectedPlace.name}</h2>
              <p className="location">📍 {selectedPlace.location}</p>

              <div className="modal-tabs">
                <button 
                  className={!showPackages ? "active-tab" : ""}
                  onClick={() => setShowPackages(false)}
                >
                  Overview
                </button>
                <button  className={showPackages ? "active-tab" : ""} onClick={() => setShowPackages(true)} >
                  Packages
                </button>
              </div>

              {!showPackages ? (
                <>
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
                </>
              ) : (
                <div className="packages-container">
                  <h3>Available Packages</h3>
                  <div className="packages-grid">
                    {selectedPlace.packages.map((pkg, index) => (
                      <div key={index} className="package-card">
                        <div className="package-header">
                          <h4>{pkg.name}</h4>
                          <div className="package-price">${pkg.price}</div>
                        </div>
                        <div className="package-duration">{pkg.duration}</div>
                        <div className="package-includes">
                          <h5>Includes:</h5>
                          <ul>
                            {pkg.includes.map((item, i) => (
                              <li key={i}>✓ {item}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="package-best-for">
                          Best for: {pkg.bestFor}
                        </div>
                     <a href="Booking">  <button className="package-book-btn">
                          Book Now
                        </button></a> 
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="modal-actions">
                <button className="contact-btn" onClick={() => window.location.href = 'Contact'}>
                  Contact to Enquiry
                </button>
                <button className="book-now-btn" onClick={() => window.location.href = 'Booking'}>
                  Booking Now
                </button>
              </div>
            </div>

            <div className="gemini-box">
              <h3>🧠 AI Voice Guide</h3>
              <p>Click play to hear about this destination</p>
              {isSpeaking && (
                <div className="voice-control-row">
                  {!paused ? (
                    <button className="voice-btn pause" onClick={pauseSpeaking}>
                      ⏸ Pause
                    </button>
                  ) : (
                    <button className="voice-btn resume" onClick={resumeSpeaking}>
                      ▶️ Resume
                    </button>
                  )}
                  <button className="voice-btn stop" onClick={stopSpeaking}>
                    🔇 Stop
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Destinations;