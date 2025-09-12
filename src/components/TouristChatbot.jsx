import React, { useState } from 'react';

// Backend API endpoint
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

// Add CSS animations
const styles = `
  @keyframes pulse {
    0%, 20% { opacity: 0.2; }
    50% { opacity: 1; }
    80%, 100% { opacity: 0.2; }
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-5px); }
    60% { transform: translateY(-3px); }
  }

  .chat-toggle-btn {
    animation: bounce 2s infinite;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .chat-toggle-btn:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 30px rgba(52, 152, 219, 0.6) !important;
  }
`;

const TouristChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! Ask me anything about tourist places, packages, or travel tips. 🌍✈️' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMsg = { from: 'user', text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    const question = input;
    setInput('');
    setLoading(true);
    
    try {
      // Call your backend API
      const response = await fetch(`${API_BASE_URL}/api/chatbot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question })
      });

      const data = await response.json();
      
      if (data.success) {
        setMessages((msgs) => [...msgs, { from: 'bot', text: data.answer }]);
      } else {
        setMessages((msgs) => [...msgs, { from: 'bot', text: 'Sorry, I could not get an answer. Please try again.' }]);
      }
    } catch (err) {
      console.error('API Error:', err);
      setMessages((msgs) => [...msgs, { from: 'bot', text: 'Error connecting to server. Please check your connection and try again.' }]);
    }
    
    setLoading(false);
  };

  return (
    <>
      <style>{styles}</style>
      
      {/* Chat Toggle Button - Robot Icon with Bounce */}
      {!isOpen && (
        <div 
          className="chat-toggle-btn"
          onClick={() => setIsOpen(true)}
          style={{ 
            position: 'fixed', 
            bottom: 30, 
            right: 30, 
            width: 70, 
            height: 70, 
            background: 'linear-gradient(135deg, #3498db, #2980b9)', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            color: '#fff', 
            fontSize: 32, 
            cursor: 'pointer', 
            zIndex: 1000,
            boxShadow: '0 8px 25px rgba(52, 152, 219, 0.4)',
            border: '3px solid rgba(255,255,255,0.3)'
          }}
        >
          🤖
        </div>
      )}
      
      {/* Chatbot Window - Original Design */}
      {isOpen && (
        <div style={{ 
          position: 'fixed', 
          bottom: 30, 
          right: 30, 
          width: 380, 
          height: 520,
          background: '#fff', 
          borderRadius: 15, 
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)', 
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{ 
            background: 'linear-gradient(135deg, #3498db, #2980b9)', 
            color: '#fff', 
            padding: '15px 20px', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            position: 'relative'
          }}>
            <div style={{ flex: 1, paddingRight: '30px' }}>
              <div style={{ 
                fontSize: 16, 
                fontWeight: 'bold',
                whiteSpace: 'nowrap',
                overflow: 'hidden'
              }}>
                🌍 Tourist Assistant
              </div>
              <div style={{ 
                fontSize: 11, 
                opacity: 0.9,
                whiteSpace: 'nowrap',
                overflow: 'hidden'
              }}>
                Ask me anything about travel!
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              style={{ 
                position: 'absolute',
                top: '6px',
                right: '8px',
                background: 'rgba(255,255,255,0.2)', 
                border: 'none', 
                color: '#fff', 
                fontSize: 16, 
                cursor: 'pointer',
                padding: '6px',
                borderRadius: '50%',
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
              onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
            >
              ✕
            </button>
          </div>
          
          {/* Messages */}
          <div style={{ 
            flex: 1, 
            overflowY: 'auto', 
            padding: '20px', 
            background: '#f8f9fa'
          }}>
            {messages.map((m, i) => (
              <div key={i} style={{ 
                margin: '12px 0', 
                display: 'flex',
                justifyContent: m.from === 'user' ? 'flex-end' : 'flex-start'
              }}>
                <div style={{ 
                  background: m.from === 'user' ? 'linear-gradient(135deg, #3498db, #2980b9)' : '#fff', 
                  color: m.from === 'user' ? '#fff' : '#333',
                  padding: '12px 16px', 
                  borderRadius: m.from === 'user' ? '18px 18px 5px 18px' : '18px 18px 18px 5px', 
                  maxWidth: '75%',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                  fontSize: 14,
                  lineHeight: 1.4
                }}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'flex-start', 
                margin: '12px 0' 
              }}>
                <div style={{ 
                  background: '#fff', 
                  padding: '12px 16px', 
                  borderRadius: '18px 18px 18px 5px',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                  color: '#666',
                  fontSize: 14
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <div style={{ width: 8, height: 8, background: '#3498db', borderRadius: '50%', animation: 'pulse 1.5s infinite' }}></div>
                    <div style={{ width: 8, height: 8, background: '#3498db', borderRadius: '50%', animation: 'pulse 1.5s infinite 0.5s' }}></div>
                    <div style={{ width: 8, height: 8, background: '#3498db', borderRadius: '50%', animation: 'pulse 1.5s infinite 1s' }}></div>
                    <span style={{ marginLeft: 8 }}>Typing...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Input */}
          <form onSubmit={sendMessage} style={{ 
            display: 'flex', 
            padding: '15px 20px',
            background: '#fff',
            borderTop: '1px solid #eee',
            gap: '12px',
            alignItems: 'center'
          }}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your question..."
              style={{ 
                flex: 1, 
                border: '2px solid #e0e0e0', 
                padding: '14px 18px', 
                borderRadius: 25,
                outline: 'none', 
                fontSize: 14,
                transition: 'border-color 0.3s ease',
                minWidth: 0,
                width: '100%'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3498db'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              disabled={loading}
            />
            <button 
              type="submit" 
              style={{ 
                background: 'linear-gradient(135deg, #3498db, #2980b9)', 
                color: '#fff', 
                border: 'none', 
                padding: '10px', 
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: 16,
                transition: 'all 0.3s ease',
                flexShrink: 0,
                width: '42px',
                height: '42px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                marginTop: '-2px'
              }} 
              disabled={loading || !input.trim()}
            >
              ➤
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default TouristChatbot;
