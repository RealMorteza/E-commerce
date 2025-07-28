// LoginSignup.jsx
import React, { useContext, useState } from 'react';
import './CSS/LoginSignup.css'; 
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
  const { login } = useContext(UserContext);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (name.trim()) {
      login(name);
      navigate('/account'); // هدایت به صفحه حساب کاربری
    }
  };

  return (
    <div className="loginSignup-section">
      <div className="container">
        <h2>ثبت نام</h2>
        <input type="text" placeholder="نام شما" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="ایمیل" />
        <input type="password" placeholder="رمز عبور" />
        <button className="btn" onClick={handleSubmit}>ادامه</button>

        <div className="login-text">
          حساب کاربری دارید؟ <a href="#">ورود</a>
        </div>

        <div className="terms">
          <input className="checkbox" type="checkbox" />
          با ادامه، شما با <a href="#">شرایط استفاده</a> و <a href="#">سیاست حفظ حریم خصوصی</a> موافقت می‌کنید.
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
