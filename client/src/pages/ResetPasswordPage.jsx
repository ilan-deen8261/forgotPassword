import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ResetPasswordPage.css'; 

const ResetPasswordPage = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); 

  const handleReset = async () => {
    try {
      await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, { password });
      alert('Password reset successful');
      navigate('/login');
    } catch (error) {
      console.error('Password reset failed', error);
      alert('Failed to reset password');
    }
  };

  return (
    <div className="reset-container">
      <h2 className="reset-title">🔑 Reset Password</h2>
      <div className="reset-card">
        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="reset-input"
          />
          {/* Eye toggle */}
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              fontSize: "18px"
            }}
          >
            {showPassword ? "👁️‍🗨️" : "👁️"}
          </span>
        </div>

        <button onClick={handleReset} className="reset-btn">
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
