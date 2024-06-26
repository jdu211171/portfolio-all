import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import logo from '../../assets/logo.png';
import universityImage from '../../assets/university.png';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles['login-container']}>
      <div className={styles['login-form']}>
        <div className={styles['header-container']}>
          <img src={logo} alt="Logo" className={styles['logo']} />
          <div className={styles['text-container']}>
            <h2>おかえりなさい</h2>
            <p>情報をご入力ください!</p>
          </div>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleLogin}>
          <div className={styles['input-group']}>
            <label>ログイン</label>
            <div className={styles['input-icon']}>
              <BadgeOutlinedIcon />
              <input
                type="email"
                placeholder="ログインをご入力ください"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className={styles['input-group']}>
            <div className={styles['input-icon']}>
              <LockOutlinedIcon />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="パスポートをご入力ください"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {password && (
                <span onClick={togglePasswordVisibility} className={styles['visibility-icon']}>
                  {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                </span>
              )}
            </div>
          </div>
          <div className={styles['remember-me-container']}>
            <div className={styles['remember-me']}>
              <input type="checkbox" id="remember" name="remember" />
              <label htmlFor="remember">保存</label>
            </div>
            <div className={styles['forgot-password']}>
              <a href="#">パスワードをお忘れですか</a>
            </div>
          </div>
          <button type="submit">ログイン</button>
        </form>
      </div>
      <div className={styles['login-image']}>
        <img src={universityImage} alt="University" />
      </div>
    </div>
  );
};

export default Login;
