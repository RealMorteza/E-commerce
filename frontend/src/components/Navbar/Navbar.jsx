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
          <span>فروشگاه من</span>
        </div>

        <div className="nav-center">
          <ul>
            <li onClick={() => { setMenu("Home") }}>
              <Link to='/'>خانه</Link>
            </li>
            <li>
              <span>محصولات</span>
              <ul>
                <li onClick={() => { setMenu("men") }}>
                  <Link to='/men'>مردانه</Link>
                </li>
                <li onClick={() => { setMenu("women") }}>
                  <Link to='/women'>زنانه</Link>
                </li>
                <li onClick={() => { setMenu("kid") }}>
                  <Link to='/kid'>بچه گانه</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="nav-left">
          <Link to='/login'><button>ورود</button></Link>
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
