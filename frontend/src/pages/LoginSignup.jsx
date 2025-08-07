// LoginSignup.jsx
import React, { useContext, useState } from 'react';
import './CSS/LoginSignup.css'; 
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
  const { login } = useContext(UserContext);
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (name.trim()) {
      login(name);
      navigate('/account');
    }
  };

  return (
    <div className="loginSignup-section">
      <div className="container">
        <h2>{isLoginMode ? 'ورود' : 'ثبت نام'}</h2>

        {!isLoginMode && (
          <>
            <input
              type="text"
              placeholder="نام شما"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="ایمیل"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="رمز عبور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn" onClick={handleSubmit}>ادامه</button>

            <div className="login-text">
              حساب کاربری دارید؟{' '}
              <span className="link" onClick={() => setIsLoginMode(true)}>ورود</span>
            </div>

          </>
        )}
        {isLoginMode && (
          <>
            <input
              type="text"
              placeholder="نام کاربری"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button className="btn" onClick={handleSubmit}>ورود</button>

            <div className="login-text">
              حساب کاربری ندارید؟{' '}
              <span className="link" onClick={() => setIsLoginMode(false)}>ثبت‌نام</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
