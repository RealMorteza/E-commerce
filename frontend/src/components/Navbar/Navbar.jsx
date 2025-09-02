import React, { useContext, useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import logo_pic from '../Assets/General-images/main-logo.png';
import cart_icon from '../Assets/General-images/cart-icon.png';
import { ShopContext } from '../../context/ShopContext';

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalItems } = useContext(ShopContext);

  return (
    <div className='Navbar'>
      <nav>
        <div className="nav-right">
          <img src={logo_pic} alt="لوگو" />
        </div>

        <div className="nav-center">
          <ul>
            <li onClick={() => { setMenu("Home") }}>
              <Link to='/product-manager'></Link>
            </li>
            <li>
              <span>محصولات</span>
              <ul>
                <li onClick={() => { setMenu("t-shirt") }}>
                  <Link to='/t-shirt'>تیشرت</Link>
                </li>
                <li onClick={() => { setMenu("shirt") }}>
                  <Link to='/shirt'>پیراهن</Link>
                </li>
                <li onClick={() => { setMenu("pants") }}>
                  <Link to='/pants'>شلوار</Link>
                </li>
              </ul>

            </li>
            <li onClick={() => { setMenu("Home") }}>
              <Link to='/'>خانه</Link>
            </li>

          </ul>
        </div>

        <div className="nav-left">
          <Link to='/login'><button>حساب کاربری</button></Link>
          <Link to='/cart' className="cart-link">
            <img src={cart_icon} alt="سبد خرید" />
            {getTotalItems() > 0 && (
              <span className="cart-badge">{getTotalItems()}</span>
            )}
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
