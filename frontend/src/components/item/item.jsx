import React from 'react';
import './item.css';
import { Link } from 'react-router-dom';

const Item = ({ id, name, image, price }) => {
  return (
    <div className="item-card">
      <Link to={`/product/${id}`}>
        <img src={image} alt={name} className="item-image" />
        <h3 className="item-name">{name}</h3>
        <div className="price">
          <p className="item-price">{price}</p>
        </div>

        <button className='view-button'> مشاهده </button>
      </Link>
    </div>
  );
};

export default Item;
