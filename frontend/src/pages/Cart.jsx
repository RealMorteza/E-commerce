import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import './CSS/Cart.css';

const Cart = () => {
  const { cartItems, productList, addToCart, removeFromCart } = useContext(ShopContext);

  const total = Array.isArray(productList)
    ? productList.reduce((acc, product) => {
        const qty = cartItems[product.id] || 0;
        const price = Number(product.price || 0);
        return acc + qty * price;
      }, 0)
    : 0;

  return (
    <div className="cart-page">
      <h2>🛒 سبد خرید شما</h2>

      {Object.keys(cartItems).length === 0 ? (
        <p className="empty-cart">سبد خرید شما خالی است.</p>
      ) : (
        <div className="cart-items">
          {productList.map((product) => {
            const qty = cartItems[product.id];
            if (!qty) return null;
            const price = Number(product.price || 0);
            return (
              <div className="cart-item" key={product.id}>
                <img src={product.image} alt={product.name} />
                <div className="item-info">
                  <h4>{product.name}</h4>
                  <p>قیمت تکی: {price} تومان</p>
                  <div className="item-controls">
                    <button onClick={() => removeFromCart(product.id)}>-</button>
                    <span>{qty}</span>
                    <button onClick={() => addToCart(product.id)}>+</button>
                  </div>
                  <p className="item-total">مجموع: {qty * price} تومان</p>
                </div>
              </div>
            );
          })}
          <div className="cart-summary">
            <h3>جمع کل: {total.toLocaleString()} تومان</h3>
            <button className="checkout-btn">ادامه فرایند خرید</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
