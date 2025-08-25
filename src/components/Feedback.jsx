import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Feedback.css';

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [improvement, setImprovement] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming you have a backend endpoint to save the feedback
      await axios.post('http://localhost:5000/api/feedback', {
        rating,
        improvement,
      });
      setMessage('Thank you for your feedback!');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      setMessage('There was an error submitting your feedback. Please try again.');
      console.error('Feedback submission error:', error);
    }
  };

  return (
    <div className="feedback-container">
      <form onSubmit={handleSubmit} className="feedback-form">
        <h2>Feedback</h2>
        <p>We would love to hear your thoughts about our website.</p>
        
        <div className="form-group">
          <label>How would you rate your overall experience?</label>
          <div className="rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={star <= rating ? 'star-filled' : 'star-empty'}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="improvement">What can we do to improve?</label>
          <textarea
            id="improvement"
            value={improvement}
            onChange={(e) => setImprovement(e.target.value)}
            placeholder="Tell us how we can improve..."
            rows="5"
          ></textarea>
        </div>
        
        <button type="submit" className="submit-btn">Submit Feedback</button>
        
        {message && <p className="feedback-message">{message}</p>}
      </form>
    </div>
  );
};

export default Feedback;
