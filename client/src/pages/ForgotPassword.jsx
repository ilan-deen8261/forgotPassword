import axios from 'axios';
import React, { useState } from 'react';

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
      alert('If user exists, reset email shall be sent');
      setEmail('');
    } catch (err) {
      console.error('Error during forgot password request:', err);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <input
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
      />
      <br />
      <button onClick={handleForgot} disabled={loading}>
        {loading ? 'Sending...' : 'Send Reset Link'}
      </button>
    </div>
  );
};

export default ForgotPassword;
