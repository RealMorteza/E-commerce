import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import './CSS/Account.css';

const Account = () => {
  const { user, logout } = useContext(UserContext);
  const { getTotalItems } = useContext(ShopContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // اگر هنوز لاگین نیست کاربر، چیزی رندر نکن
  if (!user) return null;

  return (
    <div className="account-page">
      <h2>سلام، {user.name} 👋</h2>
      <p>تعداد محصولات در سبد خرید: {getTotalItems()} عدد</p>
      <div className="logout-button">
        <button onClick={logout}>خروج از حساب</button>
      </div>
    </div>
  );
};

export default Account;
