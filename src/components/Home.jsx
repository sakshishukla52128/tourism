import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Home.css';


import { Routes, Route } from 'react-router-dom';
import { 
  faInstagram, 
  faTwitter, 
  faFacebook, 
  faPinterest, 
  faYoutube,
  faApple,
  faGooglePlay
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';


const Home = () => {
  return (
    <div className="home-page">
     
      
      {/* Curved Header Section */}
      <header className="header" style={{ backgroundImage: "url('https://videos.pexels.com/video-files/2169880/2169880-uhd_2560_1440_30fps.mp4')" }}>
      
        <div className="overlay-bg"></div>
        <div className="curve"></div>
          <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: '-1',
        }}
      >
        <source src='https://videos.pexels.com/video-files/2169880/2169880-uhd_2560_1440_30fps.mp4' type="video/mp4" />
        Your browser does not support the video tag.
      </video>
        <div className="hero">
          <h1>Discover Your Dream Vacation</h1>
          <p style={{fontSize:'35px',color:'orange'}}>Explore the world's most beautiful places with our expert guides</p>
          
            
   <Link to="/destinations" className="cta-button">Explore Now</Link>
          
          <div className="hero-stats">
            <div className="stat-item">
              <h3> Happy Travelers:</h3> <div className="stat-number">10K+</div>
              <div className="stat-label"></div>
            </div>
            <div className="stat-item">
              <h3> Destinations:</h3><div className="stat-number">500+</div>
            </div>
            <div className="stat-item">
              <h3> Tour Guides:</h3>   <div className="stat-number">50+</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="main-content">
        {/* Popular Destinations */}
        <section className="featured-destinations">
          <h2>Popular Destinations</h2>
          <p className="section-subtitle">Explore our most booked destinations this season</p>
          <div className="destination-grid">
            {[
              { name: "Paris, France", price: "$899", duration: "7 Days, 6 Nights", rating: "★★★★★ (24)", image: "https://images.unsplash.com/photo-1503917988258-f87a78e3c995?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" },
              { name: "Tokyo, Japan", price: "$1299", duration: "10 Days, 9 Nights", rating: "★★★★☆ (32)", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKjegLZZoT53lfQf5fk1FdxTmiQ1e4SJyE-A&s" },
              { name: "New York, USA", price: "$799", duration: "5 Days, 4 Nights", rating: "★★★★★ (18)", image: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" },
              { name: "Bali, Indonesia", price: "$699", duration: "8 Days, 7 Nights", rating: "★★★★★ (29)", image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" }
            ].map((destination, index) => (
              <div className="destination-card" key={index}>
                <div className="card-image" style={{ backgroundImage: `url(${destination.image})` }}>
                  <div className="overlay"></div>
                  <h3>{destination.name}</h3>
                  <div className="price-tag">From {destination.price}</div>
                </div>
                <div className="card-details">
                  <p>{destination.duration}</p>
                  <div className="rating">{destination.rating}</div>
                </div>
              </div>
            ))}
          </div>
          
        </section>

        {/* Why Choose Us */}
        <section className="about-section">
          <div className="about-content">
            <h2>Why Choose TripVibe?</h2>
            <p className="section-subtitle">We make your travel dreams come true</p>
            <p>At TripVibe, we are dedicated to providing you with the best travel experiences. Our team of experts carefully curates each itinerary to ensure you get the most out of your vacation.</p>
            <ul>
              {["10,000+ Satisfied Customers", "500+ Destinations Worldwide", "24/7 Customer Support",
                "Best Price Guarantee", "Customizable Packages", "Eco-friendly Options"].map((item, i) => (
                  <li key={i}>✓ {item}</li>
                ))}
            </ul>
          
          </div>
          <div className="about-image">
            <div className="image-grid">
              <div className="grid-item large" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80')" }}></div>
              <div className="grid-item small" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80')" }}></div>
              <div className="grid-item small" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80')" }}></div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="testimonials">
          <h2>What Our Travelers Say</h2>
          <p className="section-subtitle">Hear from our happy customers</p>
          <div className="testimonial-cards">
            {[
              {
                quote: "The best travel experience I've ever had! Tripvibe took care of everything and we had an amazing time in Bali.",
                author: "Sarah Johnson", location: "Sydney, Australia", image: "https://randomuser.me/api/portraits/women/44.jpg"
              },
              {
                quote: "Everything was perfectly organized. Will travel with Tripvibe again. Their guides are knowledgeable and friendly.",
                author: "Michael Chen", location: "Toronto, Canada", image: "https://randomuser.me/api/portraits/men/32.jpg"
              },
              {
                quote: "The customized Europe package was exactly what we wanted. Flawless execution from start to finish!",
                author: "Priya Patel", location: "London, UK", image: "https://randomuser.me/api/portraits/women/68.jpg"
              }
            ].map((testimonial, index) => (
              <div className="testimonial-card" key={index}>
                <div className="quote-icon">❝</div>
                <div className="quote">{testimonial.quote}</div>
                <div className="author-info">
                  <img src={testimonial.image} alt={testimonial.author} className="author-img" />
                  <div className="author-details">
                    <div className="author">{testimonial.author}</div>
                    <div className="author-location">{testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section className="newsletter">
          <div className="newsletter-content">
            <h2>Get Travel Deals & Updates</h2>
            <p>Subscribe to our newsletter and get exclusive offers and travel inspiration</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Your email address" />
              <button className="primary-button">Subscribe</button>
            </div>
          </div>
          <div className="newsletter-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80')" }}></div>
        </section>

        {/* Travel Tips */}
        <section className="travel-tips">
          <h2>Travel Tips & Guides</h2>
          <p className="section-subtitle">Helpful advice for your next adventure</p>
          <div className="tips-grid">
            {[
              {
                title: "Packing Like a Pro",
                desc: "Learn how to pack efficiently for any trip duration and climate.",
                image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
              },
              {
                title: "Photography Tips",
                desc: "Capture stunning travel photos with these simple techniques.",
                image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
              },
              {
                title: "Budget Travel",
                desc: "How to explore the world without breaking the bank.",
                image: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
              }
            ].map((tip, index) => (
              <div className="tip-card" key={index}>
                <div className="tip-image" style={{ backgroundImage: `url(${tip.image})` }}></div>
                <div className="tip-content">
                  <h3>{tip.title}</h3>
                  <p>{tip.desc}</p>
                  <Link to="/tips" className="read-more">Read More →</Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trending Now */}
        <section className="trending-now">
          <h2>Trending Now</h2>
          <p className="section-subtitle">What travelers are loving this season</p>
          <div className="trending-grid">
            {[
              {
                title: "Mountain Retreats", stat: "+120% interest this month",
                image: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80')"
              },
              {
                title: "Culinary Tours", stat: "+85% bookings increase",
                image: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80')"
              },
              {
                title: "Family Cruises", stat: "+65% more families",
                image: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80')"
              }
            ].map((trend, index) => (
              <div className="trending-item" key={index} style={{ backgroundImage: trend.image }}>
                <h3>{trend.title}</h3>
                <p>{trend.stat}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-curve"></div>
        <div className="footer-content">
          <div className="footer-section about">
            <div className="logo">
           
             <span className="logo-icon"></span> TripVibe 
            </div>
            <p>Making travel dreams come true since 2015. We specialize in creating unforgettable experiences around the globe.</p>
            <div className="social-icons">
              <FontAwesomeIcon icon={faInstagram} style={{ color: '#E1306C', fontSize: '24px', margin: '8px' }} />
              <FontAwesomeIcon icon={faTwitter} style={{ color: '#1DA1F2', fontSize: '24px', margin: '8px' }} />
              <FontAwesomeIcon icon={faFacebook} style={{ color: '#1877F2', fontSize: '24px', margin: '8px' }} />
              <FontAwesomeIcon icon={faPinterest} style={{ color: '#BD081C', fontSize: '24px', margin: '8px' }} />
              <FontAwesomeIcon icon={faYoutube} style={{ color: '#FF0000', fontSize: '24px', margin: '8px' }} />
            </div>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              {["Home", "Destinations", "Packages", "Special Offers", "Booking"].map((link, i) => (
                <li key={i}><Link to={`/${link.toLowerCase().replace(' ', '-')}`}>{link}</Link></li>
              ))}
            </ul>
          </div>
          <div className="footer-section">
            <h3>Support</h3>
            <ul>
              {["About Us", "Contact", "FAQs", "Privacy Policy", "Terms & Conditions"].map((link, i) => (
                <li key={i}><Link to={`/${link.toLowerCase().replace(' ', '-')}`}>{link}</Link></li>
              ))}
            </ul>
          </div>
          <div className="footer-section middle">
            <h3>Payment Methods</h3>
            <div className="payment-methods">
              {["cc-visa", "cc-mastercard", "cc-amex", "cc-paypal", "cc-apple-pay"].map((method, i) => (
                <FontAwesomeIcon key={i} icon={['fab', method]} style={{ fontSize: '24px', margin: '8px' }} />
              ))}
            </div>
            <div className="footer-newsletter">
              <h3>Stay Updated</h3>
              <input type="email" placeholder="Your email" />
              <button className="footer-subscribe">Subscribe</button>
            </div>
            <div className="app-download">
              <h3>Download Our App</h3>
              <div className="app-buttons">
                <button className="app-store">
                  <FontAwesomeIcon icon={faApple} />
                  <span>App Store</span>
                </button>
                <button className="play-store">
                  <FontAwesomeIcon icon={faGooglePlay} />
                  <span>Play Store</span>
                </button>
              </div>
            </div>
          </div>
          <div className="footer-section contact">
            <h3>Contact Us</h3>
            <p><FontAwesomeIcon icon={faEnvelope} /> info@tripvibe.com</p>
            <p><FontAwesomeIcon icon={faPhone} /> +1 (555) 123-4567</p>
            <p><FontAwesomeIcon icon={faMapMarkerAlt} /> 123 Travel Street, Suite 100<br />New York, NY 10001</p>
          </div>
        </div>
        <div className="copyright">
          © 2023 TripVibe. All rights reserved. | Designed with ❤️ for travelers
        </div>
      </footer>
    </div>
  );
};

export default Home;