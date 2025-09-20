import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      console.log(response);
      alert('Login successful');
      navigate('/home');
    } catch (error) {
      console.error('Login failed', error);
      if (error.response && error.response.data) {
        alert(`Login failed: ${error.response.data}`);
      } else {
        alert('Failed to login. Please try again.');
      }
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Welcome Back 👋</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="login-input"
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input"
        />
        <button type="submit" className="login-btn">Login</button>
      </form>

      <Link to="/forgot-password" className="forgot-link">
        Forgot Password?
      </Link>
    </div>
  );
};

export default Login;
