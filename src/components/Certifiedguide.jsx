import React, { useState } from 'react';
import './Certifiedguide.css';

const Certifiedguide = () => {
  
  const guides = [
    {
      id: 1,
      name: "Anoop Adhikary",
      shortDesc: "Namastey! I am a tour guide & facilitator since 35+ years...",
      fullDesc: "Namastey! I am a tour guide & facilitator since 35+ years. I am a nature lover, a wanderer, I love to explore, I have a keen interest in spirituality, Art, Music, History, Heritage, Sports, Crafts etc. I have an undying and ever growing passion for my job and I believe in creating memories that are worth reminiscing!",
      experience: "35 Years",
      age: "56 Years",
      languages: ["English", "Hindi", "French", "Spanish", "Bengali"],
      price: "₹2200 (1-5 Person, Full Day)",
      address: "B 20 Shivalsya, Sihkatibadi Colony, Goverdhan Vilas, Udalpur, Rajasthan. Pin code= 313002",
      workingCities: [
        "Dwarika", "Chennai", "Jaipur", "Varanasi", "Rameswaram", "Darjeeling",
        "Puri", "Delhi", "Mumbai", "Agra", "Kolkata", "Bengaluru", "Kochi"
      ],
      email: "anoop@example.com",
      mobile: "+91 XXXXXX0720",
      dob: "Jun 2, 1967",
      gender: "Male",
      image: "https://media.gettyimages.com/id/1307385045/photo/close-up-of-indian-mature-men-stock-photo.jpg?s=612x612&w=gi&k=20&c=7D4bv7hfOkZpnZhqWFAMcg8POCcN2M5bm0gZ_hrPQHE="
    },
    {
      id: 2,
      name: "Joyce Xavier",
      shortDesc: "Certified tour guide with incredible India Tour Guide certification...",
      fullDesc: "My name is Joyce, and I am certified tour guide and holder of incredible India Tour Guide certification (ITG the most coveted) of the Ministry of Tourism, Government of India. I specialize in South Indian tours with deep knowledge of local culture and traditions.",
      experience: "15 Years",
      age: "42 Years",
      languages: ["English", "Hindi", "Malayalam", "Tamil"],
      price: "₹1800 (1-4 Person, Full Day)",
      address: "Kochi, Kerala",
      workingCities: ["Kochi", "Munnar", "Alleppey", "Kovalam", "Thekkady"],
      email: "joyce@example.com",
      mobile: "+91 XXXXXX1234",
      dob: "Mar 15, 1980",
      gender: "Female",
      image: "https://media.gettyimages.com/id/1440945691/photo/smiling-middle-aged-man-enjoying-relaxing-time-at-home.jpg?s=612x612&w=gi&k=20&c=nBi7nG8W8lj1tpZ3xJB1aN26jEybtASFpbLMZbMaFuA="
    },
    {
      id: 3,
      name: "Rajesh Kumar",
      shortDesc: "Expert in North Indian heritage sites with 12 years experience...",
      fullDesc: "I specialize in North Indian heritage tours including the Golden Triangle circuit. My tours focus on the rich history and architectural marvels of Rajasthan, Delhi, and Agra. I'm fluent in multiple languages and can customize tours as per your interests.",
      experience: "12 Years",
      age: "38 Years",
      languages: ["English", "Hindi", "Punjabi"],
      price: "₹2000 (1-6 Person, Full Day)",
      address: "Jaipur, Rajasthan",
      workingCities: ["Jaipur", "Delhi", "Agra", "Udaipur", "Jaisalmer", "Amritsar"],
      email: "rajesh@example.com",
      mobile: "+91 XXXXXX5678",
      dob: "Aug 10, 1984",
      gender: "Male",
      image: "https://media.gettyimages.com/id/944138400/photo/indian-young-man-in-london-expressing-positive-emotion.jpg?s=612x612&w=gi&k=20&c=jfguMh7Rw5mzWi1RU3veS0XB0sUD7EuE4lH_WyhuLcc="
    },
    {
      id: 4,
      name: "Priya Sharma",
      shortDesc: "Female tour guide specializing in spiritual journeys...",
      fullDesc: "I specialize in spiritual tours to Varanasi, Rishikesh, Haridwar and other sacred destinations. My tours combine spirituality with cultural insights. I'm particularly good at arranging special access to temples and spiritual events.",
      experience: "8 Years",
      age: "34 Years",
      languages: ["English", "Hindi", "Sanskrit"],
      price: "₹2500 (1-4 Person, Full Day)",
      address: "Varanasi, Uttar Pradesh",
      workingCities: ["Varanasi", "Rishikesh", "Haridwar", "Ayodhya", "Mathura"],
      email: "priya@example.com",
      mobile: "+91 XXXXXX9012",
      dob: "Nov 22, 1988",
      gender: "Female",
      image: "https://www.shutterstock.com/image-photo/portrait-middle-eastern-israel-girl-260nw-2471121641.jpg"
    },
    {
      id: 5,
      name: "Amit Patel",
      shortDesc: "Adventure tour specialist with focus on Himalayas...",
      fullDesc: "I'm an adventure specialist with extensive experience in Himalayan treks and adventure tours. Certified in wilderness first aid and high altitude safety. I can arrange everything from easy nature walks to challenging treks in the Himalayas.",
      experience: "10 Years",
      age: "36 Years",
      languages: ["English", "Hindi", "Nepali"],
      price: "₹3000 (1-5 Person, Full Day)",
      address: "Dehradun, Uttarakhand",
      workingCities: ["Dehradun", "Manali", "Leh", "Shimla", "Rishikesh"],
      email: "amit@example.com",
      mobile: "+91 XXXXXX3456",
      dob: "Feb 14, 1986",
      gender: "Male",
      image: "https://images.segmind.com/outputs/754ab895-9d9e-4b07-95eb-a4f3427f8f2a.jpg"
    },
    {
      id: 6,
      name: "Sunita Devi",
      shortDesc: "Cultural expert focusing on Rajasthan's folk traditions...",
      fullDesc: "I specialize in cultural tours of Rajasthan with focus on folk traditions, music, dance and crafts. I can arrange special interactions with local artisans and cultural performances. My tours provide deep insight into Rajasthan's living traditions.",
      experience: "7 Years",
      age: "32 Years",
      languages: ["English", "Hindi", "Rajasthani"],
      price: "₹2300 (1-4 Person, Full Day)",
      address: "Jodhpur, Rajasthan",
      workingCities: ["Jodhpur", "Udaipur", "Jaisalmer", "Bikaner", "Pushkar"],
      email: "sunita@example.com",
      mobile: "+91 XXXXXX7890",
      dob: "Jul 8, 1990",
      gender: "Female",
      image: "https://d1v0ynld5x949x.cloudfront.net/Images/15569/10457365_image.jpg"
    },
    {
      id: 7,
      name: "Vikram Singh",
      shortDesc: "Wildlife safari expert with photography skills...",
      fullDesc: "I'm a wildlife enthusiast and certified naturalist with extensive knowledge of India's national parks and wildlife. I can help spot and identify wildlife, and provide photography tips. My tours focus on responsible wildlife tourism.",
      experience: "9 Years",
      age: "40 Years",
      languages: ["English", "Hindi"],
      price: "₹2800 (1-4 Person, Full Day)",
      address: "Nagpur, Maharashtra",
      workingCities: ["Nagpur", "Bandhavgarh", "Kanha", "Pench", "Ranthambore"],
      email: "vikram@example.com",
      mobile: "+91 XXXXXX2345",
      dob: "Apr 5, 1982",
      gender: "Male",
      image: "https://thumbs.dreamstime.com/b/smiling-indian-man-office-business-people-concept-happy-127222548.jpg"
    },
     {
      id: 8,
      name: "manav yadav",
      shortDesc: "Wildlife safari expert with photography skills...",
      fullDesc: "With roots spanning from Rajasthan's desert villages to Kolkata's intellectual salons, I don't just show places - I resurrect their soul. My tours feature exclusive interactions with Thar Desert folk musicians, private manuscript viewings at Jaipur's City Palace archives, and moonlit storytelling sessions where history comes alive through generations-old oral traditions.",
      experience: "9 Years",
      age: "45 Years",
      languages: ["English", "Hindi","Marathi","Franch"],
      price: "₹3000 (1-4 Person, Full Day)",
      address: "Nagpur, Maharashtra",
      workingCities: ["Nagpur", "Bandhavgarh", "Kanha", "Pench", "Ranthambore"],
      email: "Manav1423@gmail.com",
      mobile: "+91 8736212345",
      dob: "Apr 1, 1980",
      gender: "Male",
      image: "https://www.shutterstock.com/image-photo/confident-middle-aged-business-man-260nw-2412368207.jpg"
    },
     {
      id: 9,
      name: "Vikash sharma",
      shortDesc: "Wildlife safari expert with photography skills...",
      fullDesc: "My Portuguese-Indian heritage allows me to reveal Goa beyond beaches - through its shipbuilding history, forgotten lighthouse keepers' tales, and secret spice routes. Experience fishing with Koli communities at dawn, decode colonial-era nautical maps, and dine in 400-year-old saltwater mansions where every dish tells a migration story.",
      experience: "13 Years",
      age: "52Years",
      languages: ["English", "Hindi","Gujarati"],
      price: "₹2800 (1-4 Person, Full Day)",
      address: "Nagpur, Maharashtra",
      workingCities: ["Nagpur", "Bandhavgarh", "Kanha", "Pench", "Ranthambore"],
      email: "vikram@example.com",
      mobile: "+91 9473212345",
      dob: "january 1, 1973",
      gender: "Male",
      image: "https://t4.ftcdn.net/jpg/05/01/85/77/360_F_501857743_cJmOeVEXcULn6Nj4b7nCUZx2GqXcU50b.jpg"
    },
     {
      id: 10,
      name: "Sakshi Shukla",
      shortDesc: "Wildlife safari expert with photography skills...",
      fullDesc: "Trained in Vastu Shastra and Gothic architecture, I transform monument visits into 4D experiences. At Fatehpur Sikri, we'll reconstruct Akbar's court using AR technology; in Jaipur, we'll measure the Pink City's proportions using 18th-century brass instruments from my antique collection.",
      experience: "9 Years",
      age: "25 Years",
      languages: ["English", "Hindi"],
      price: "₹2800 (1-4 Person, Full Day)",
      address: "Nagpur, Maharashtra",
      workingCities: ["Nagpur", "Bandhavgarh", "Kanha", "Pench", "Ranthambore"],
      email: "Sakshishukla00507@gmail.com",
      mobile: "+91 7568922345",
      dob: "15july, 1999",
      gender: "Female",
      image: "https://media.gettyimages.com/id/1190367451/photo/law-student-standing-at-entrance-to-university-building.jpg?s=612x612&w=gi&k=20&c=v5Wg3ufSwIovemil5tKKXZINoHYuZ9yuu71d96Gb-4A="
    },
     {
      id:11 ,
      name: "Aman Gupta",
      shortDesc: "Architectural detective decoding hidden mathematical magic in Mughal monuments.",
      fullDesc: "My pilgrimages reveal hidden mathematical perfection - from Varanasi's temple alignments with celestial bodies to Khajuraho's fractal patterns. Participate in ancient measurement rituals using sacred threads, decode temple wall puzzles that were medieval teaching tools, and experience sound healing in precisely calibrated stepwells.",
      experience: "12 Years",
      age: "55Years",
      languages: ["English", "Hindi"],
      price: "₹2800 (1-4 Person, Full Day)",
      address: "UP, Ayodhya",
      workingCities: ["Nagpur", "Bandhavgarh", "Kanha", "Pench", "Ranthambore"],
      email: "Aman00123@gmail.com.com",
      mobile: "+91 7865432345",
      dob: "8August , 1975",
      gender: "Male",
      image: "https://thumbs.dreamstime.com/b/busy-serious-middle-aged-business-man-working-laptop-office-writing-notes-professional-executive-manager-old-wearing-suit-381280096.jpg"
    },
     {
      id: 12,
      name: "Suraj bagera",
      shortDesc: "Goa's maritime historian revealing secret spice routes and colonial-era sailor traditions.",
      fullDesc: "I'm a wildlife enthusiast and certified naturalist with extensive knowledge of India's national parks and wildlife. I can help spot and identify wildlife, and provide photography tips. My tours focus on responsible wildlife tourism.",
      experience: "15 Years",
      age: "50 Years",
      languages: ["English", "Hindi","Tamil","Marathi","Spanish"],
      price: "₹3500 (1-6 Person, Full Day)",
      address: "Rajesthan,Jaipur",
      workingCities: ["All over india ,nepal,Japan,Rashiya"],
      email: "vikram@example.com",
      mobile: "+91 4923872345",
      dob: "Apr 5, 1982",
      gender: "Male",
      image: "https://thumbs.dreamstime.com/b/reading-digital-tablet-computer-portrait-middle-aged-indian-man-home-41653035.jpg"
    },
     {
      id: 13,
      name: "Anubhav",
      shortDesc:"Astro-photographer capturing celestial wonders over desert forts.",
      fullDesc: "Beyond spotting tigers, we'll capture India's soundscape - from Nilgiri langur alarm calls to Western Ghats' ultrasonic bat frequencies. Using professional recording gear, create your own audio documentary while learning to interpret jungle symphonies like tribal trackers do.",
      experience: "15 Years",
      age: "49Years",
      languages: ["English", "Hindi","Spanish","Russian","Bengali"],
      price: "₹3300 (1-6 Person, Full Day)",
      address: "Delhi",
      workingCities: ["Nagpur", "Bandhavgarh", "Kanha", "Pench", "Ranthambore"],
      email: "Anubhav123@example.com",
      mobile: "+91 829172345",
      dob: "Apr 5, 1982",
      gender: "Male",
      image: "  https://www.shutterstock.com/image-photo/portrait-smiling-man-indian-origin-260nw-1862064466.jpg"
    },
     {
      id: 14,
      name: "tushar Bhatia ",
      shortDesc: "Wildlife safari expert with photography skills...",
      fullDesc: "I'm a wildlife enthusiast and certified naturalist with extensive knowledge of India's national parks and wildlife. I can help spot and identify wildlife, and provide photography tips. My tours focus on responsible wildlife tourism.",
      experience: "9 Years",
      age: "38 Years",
      languages: ["English", "Hindi","Marathi","Tamil","Gujrati","Panjabi","Franch"],
      price: "₹2800 (1-4 Person, Full Day)",
      address: "Madhyapradesh,Bhopal",
      workingCities: ["Nagpur", "Bandhavgarh", "Kanha", "Pench", "Ranthambore","Bhopal","Bihar","UK","London","Goa"],
      email: "Tushar123@gmail.com",
      mobile: "+91874652345",
      dob: "1 october, 1987",
      gender: "Male",
      image: "https://previews.123rf.com/images/gorodenkoff/gorodenkoff2007/gorodenkoff200701518/152431910-portrait-of-handsome-professional-indian-man-working-at-his-desk-using-personal-computer-and.jpg"
    },
     {
      id: 15,
      name: "Manoj Bhatiya",
      shortDesc: "Wildlife safari expert with photography skills...",
      fullDesc: "I've co-designed tours with disability advocates across India - featuring tactile museum replicas, sign-language interpreted performances, and wheelchair-friendly heritage routes. Experience adapted adventure activities like paragliding and jungle safaris.",
      experience: "15 Years",
      age: "58 Years",
      languages: ["English", "Hindi"],
      price: "₹2800 (1-4 Person, Full Day)",
      address: "Kochi",
      workingCities: ["Nagpur", "Bandhavgarh", "Kanha", "Pench", "Ranthambore","China","Japan","Nepal"],
      email: "Bhatiya0053@gmail.com",
      mobile: "+916534723459",
      dob: "12June, 1963",
      gender: "Male",
      image: "https://www.shutterstock.com/image-photo/happy-middle-aged-50-years-260nw-2423464833.jpg"
    },
  ];

  const [selectedGuide, setSelectedGuide] = useState(null);
  const [hiredGuide, setHiredGuide] = useState(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const handleViewDetails = (guide) => {
    setSelectedGuide(guide);
    setAcceptedTerms(false);
    window.scrollTo(0, 0); // Scroll to top when viewing details
  };

  const handleHire = (guide) => {
    if (!acceptedTerms) {
      alert("Please accept the terms and conditions before hiring a guide.");
      return;
    }
    setHiredGuide(guide);
    setTimeout(() => {
      setHiredGuide(null); // Hide confirmation after 5 seconds
    }, 5000);
    alert(`You have hired ${guide.name} for ${guide.price}. We will contact you within 12 hours to finalize your trip details.`);
  };

  const handleBackToList = () => {
    setSelectedGuide(null);
  };

  const toggleTermsModal = () => {
    setShowTermsModal(!showTermsModal);
  };

  const renderTermsAndConditions = () => (
    <div className="terms-content">
      <h3>Terms and Conditions for Hiring a Guide</h3>
      <ol>
        <li>
          <strong>Booking Confirmation:</strong>
          <ul>
            <li>Your booking is confirmed only after you receive a confirmation email/call from our team.</li>
            <li>Full payment details will be shared during confirmation.</li>
          </ul>
        </li>
        <li>
          <strong>Cancellation Policy:</strong>
          <ul>
            <li>Cancellations made 48+ hours before: Full refund</li>
            <li>Cancellations made 24-48 hours before: 50% refund</li>
            <li>Cancellations made less than 24 hours before: No refund</li>
          </ul>
        </li>
        <li>
          <strong>Guide Responsibilities:</strong>
          <ul>
            <li>Guides will provide services for 8 hours/day as per itinerary</li>
            <li>Guides are not responsible for personal belongings</li>
            <li>Guides may refuse service if safety concerns arise</li>
          </ul>
        </li>
        <li>
          <strong>Payment:</strong>
          <ul>
            <li>20% advance required for confirmation</li>
            <li>Balance to be paid directly to guide on first day</li>
            <li>Additional expenses (transport, entrance fees etc.) are extra</li>
          </ul>
        </li>
        <li>
          <strong>Code of Conduct:</strong>
          <ul>
            <li>Respect local customs and traditions</li>
            <li>No illegal activities permitted</li>
            <li>Guide has right to terminate service for misconduct</li>
          </ul>
        </li>
      </ol>
      <p>By proceeding, you agree to these terms and conditions.</p>
    </div>
  );

  return (
    <div className="guide-listing-container">
      {/* Terms and Conditions Modal */}
      {showTermsModal && (
        <div className="terms-modal">
          <div className="terms-modal-content">
            <button className="close-modal" onClick={toggleTermsModal}>
              &times;
            </button>
            {renderTermsAndConditions()}
            <button 
              className="agree-btn"
              onClick={() => {
                setAcceptedTerms(true);
                toggleTermsModal();
              }}
            >
              I Agree to These Terms
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      {!selectedGuide ? (
        <>
          <header className="guide-header">
            <h1>Government-Certified Guides - Safe & Insightful Travels</h1>
            <p className="subtitle">Browse our verified guides with complete transparency</p>
          </header>

          <div className="guides-list">
            {guides.map((guide) => (
              <div key={guide.id} className="guide-card">
                <div className="guide-image-container">
                  <img 
                    src={guide.image} 
                    alt={guide.name} 
                    className="guide-image"
                    loading="lazy"
                  />
                  <div className="experience-badge">
                    {guide.experience} Experience
                  </div>
                </div>
                
                <div className="guide-card-content">
                  <h2>{guide.name}</h2>
                  <p className="short-desc">{guide.shortDesc}</p>
                  
                  <div className="guide-meta">
                    <span className="age-lang">
                      <strong>Age:</strong> {guide.age} | 
                      <strong> Languages:</strong> {guide.languages.slice(0, 2).join(", ")}
                      {guide.languages.length > 2 && " + more"}
                    </span>
                  </div>
                  
                  <div className="price-section">
                    <strong>{guide.price}</strong>
                  </div>
                  
                  <button 
                    className="view-details-btn"
                    onClick={() => handleViewDetails(guide)}
                  >
                    VIEW DETAILS
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="guide-detail-view">
          <button className="back-btn" onClick={handleBackToList}>
            &larr; Back to All Guides
          </button>
          
          <div className="guide-profile-header">
            <div className="guide-main-image">
              <img 
                src={selectedGuide.image} 
                alt={selectedGuide.name}
                className="profile-image"
              />
            </div>
            
            <div className="guide-profile-info">
              <h1>{selectedGuide.name}</h1>
              <div className="rating-badge">
                <span className="stars">★★★★★</span>
                <span className="rating-text">Certified Guide</span>
              </div>
              
              <div className="price-cta-section">
                <div className="price-display">
                  <span className="price">{selectedGuide.price}</span>
                  <span className="price-note">per day (1-5 people)</span>
                </div>
                
                <div className="action-buttons">
                  <button 
                    className="contact-btn"
                    onClick={() => alert(`Contact ${selectedGuide.name} at ${selectedGuide.mobile}`)}
                  >
                    CONTACT GUIDE
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="guide-details-sections">
            <section className="about-section">
              <h1>About This Guide</h1>
              <p>{selectedGuide.fullDesc}</p>
            </section>
            
            <div className="details-columns">
              <section className="personal-details">
                <h3>Personal Details</h3>
                <ul>
                  <li><strong>Email:</strong> {selectedGuide.email}</li>
                  <li><strong>Mobile:</strong> {selectedGuide.mobile}</li>
                  <li><strong>Location:</strong> {selectedGuide.address}</li>
                  <li><strong>Gender:</strong> {selectedGuide.gender}</li>
                </ul>
              </section>
              
              <section className="professional-details">
                <h3>Professional Details</h3>
                <ul>
                  <li><strong>Experience:</strong> {selectedGuide.experience}</li>
                  <li><strong>Age:</strong> {selectedGuide.age}</li>
                  <li>
                    <strong>Languages:</strong> 
                    <div className="language-tags">
                      {selectedGuide.languages.map((lang, index) => (
                        <span key={index} className="language-tag">{lang}</span>
                      ))}
                    </div>
                  </li>
                </ul>
              </section>
            </div>
            
            <section className="working-cities">
              <h3>Areas of Operation</h3>
              <div className="cities-grid">
                {selectedGuide.workingCities.map((city, index) => (
                  <span key={index} className="city-tag">{city}</span>
                ))}
              </div>
            </section>
          </div>
          
          <div className="booking-section">
            <div className="terms-acceptance">
              <label className="terms-checkbox">
                <input 
                  type="checkbox" 
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                />
                <span className="checkmark"></span>
                I agree to the <span className="terms-link" onClick={toggleTermsModal}>
                  Terms and Conditions
                </span>
              </label>
            </div>
            
            <button 
              className={`hire-btn ${acceptedTerms ? '' : 'disabled'}`}
              onClick={() => handleHire(selectedGuide)}
              disabled={!acceptedTerms}
            >
              {acceptedTerms ? (
                'CONFIRM BOOKING'
              ) : (
                'PLEASE ACCEPT TERMS TO BOOK'
              )}
            </button>
          </div>
        </div>
      )}
      
      {/* Booking Confirmation Banner */}
      {hiredGuide && (
        <div className="confirmation-banner slide-up">
          <div className="confirmation-content">
            <span className="tick-icon">✓</span>
            <div>
              <h4>Booking Confirmed!</h4>
              <p>You have hired {hiredGuide.name} for {hiredGuide.price}</p>
            </div>
            <button 
              className="close-banner"
              onClick={() => setHiredGuide(null)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certifiedguide;