import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


const ResetPasswordPage = () => {
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 

    const handleReset = async () => {
        try {
            await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`,
            { password });
        alert('Password reset successfull');
        navigate('/login');
        } catch (error) {
           console.error('Password reset failed', error);
            alert('Failed to reset password');
        }
    };
    return (
        <div>
            <h2>Reset Password</h2>
            <input
                type="password"
                placeholder='Enter new password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button onClick={handleReset}>Reset Password</button>
        </div>
    )
}

export default ResetPasswordPage
