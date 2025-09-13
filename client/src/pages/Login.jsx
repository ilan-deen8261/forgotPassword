import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // prevent form default submit behavior

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      console.log(response)
      alert('Login successful');
      navigate('/home'); // redirect after login
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
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Enter Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Login</button>
      </form>

      <Link to="/forgot-password" style={{ color: 'blue' }}>
        Forgot Password?
      </Link>
    </div>
  );
};

export default Login;
