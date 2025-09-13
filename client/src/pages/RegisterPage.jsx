import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/register', { email, password });
      alert('User registered');
      navigate('/login');
    } catch (error) {
      console.error('Registration failed', error);
      alert('Failed to register');
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Create an Account</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}
        className="register-form"
      >
        <label htmlFor="email" className="register-label">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="register-input"
        />

        <label htmlFor="password" className="register-label">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="register-input"
        />

        <button type="submit" className="register-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
