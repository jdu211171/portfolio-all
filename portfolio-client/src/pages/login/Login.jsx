import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss';
import logo from '../../assets/logo.png'; // Update the actual file name
import universityImage from '../../assets/university.png'; // Update the actual file name

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
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
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <img src={logo} alt="Logo" className="logo" />
        <h2>おかえりなさい</h2>
        <p>情報をご入力ください!</p>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="remember-me">
            <input type="checkbox" id="remember" name="remember" />
            <label htmlFor="remember">保存</label>
          </div>
          <div className="forgot-password">
            <a href="/">パスワードをお忘れですか</a>
          </div>
          <button type="submit">ログイン</button>
        </form>
      </div>
      <div className="login-image">
        <img src={universityImage} alt="University" />
      </div>
    </div>
  );
};

export default Login;
