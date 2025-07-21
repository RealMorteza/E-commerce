import React from 'react';
import './item.css'

const Item = ({ name, image, price }) => {
  return (
    <div className="item-card">
      <img src={image} alt={name} className="item-image" />
      <h3 className="item-name">{name}</h3>
      <div className="price">
        <p className="item-price"> {price}  </p>
        <p> تومان </p>
      </div>
    </div>
  );
};

export default Item;