import axios from 'axios';
import React, { useState } from 'react';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  // Simple email validation
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleForgot = async () => {
    if (!validateEmail(email)) {
      alert('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      alert('If user exists, a reset link has been sent to your email.');
      setEmail('');
    } catch (err) {
      console.error('Error during forgot password request:', err);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-container">
      <h2 className="forgot-title">Forgot Password? 🔒</h2>
      <div className="forgot-card">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          className="forgot-input"
        />
        <button 
          onClick={handleForgot} 
          disabled={loading} 
          className="forgot-btn"
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
