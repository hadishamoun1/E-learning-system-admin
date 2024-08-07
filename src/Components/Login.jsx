import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, loginFailure } from '../slices/authSlice';
import './styles/login.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const error = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      const { token } = data;

      dispatch(loginSuccess(token));
      window.location.href = '/dashboard'; // Replace with your desired route
    } catch (err) {
      dispatch(loginFailure(err.message));
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
