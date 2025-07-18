import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import logo_pic from '../Assets/General-images/main-logo.png';
import cart_icon from '../Assets/General-images/cart-icon.png';


const Navbar = () => {

    const [menu, setMenu] = useState("shop");
    return (
        <div className='Navbar'>
            <nav>
                <div class="nav-right">
                    <img src={logo_pic} alt="لوگو" />
                    <span>فروشگاه من</span>
                </div>

                <div class="nav-center">
                    <ul>
                        <li onClick={() => { setMenu("Home") }}> <Link to='/'> خانه </Link> {menu === "/"} </li>
                        <li>
                            <a href="#">محصولات</a>
                            <ul>
                                <li onClick={() => { setMenu("men") }}><Link to='men' >مردانه  </Link> {menu === "men"}  </li>
                                <li onClick={() => { setMenu("women") }}><Link to='women' > زنانه  </Link> {menu === "women"}</li>
                                <li onClick={() => { setMenu("kid") }}><Link to='kid' > بچه گانه  </Link> {menu === "kid"}</li>
                            </ul>
                        </li>
                    </ul>
                </div>

                <div class="nav-left">
                    <Link to='/login'><button>ورود</button></Link>
                    <Link to='/cart'> <img src={cart_icon} /> </Link>
                    <div class="cart">
                        <span class="cart-badge">2</span>
                    </div>
                </div>
            </nav>
        </div >

    )

}
export default Navbar 