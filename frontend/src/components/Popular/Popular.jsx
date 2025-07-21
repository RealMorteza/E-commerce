import React from 'react';
import Products from '../Assets/Products';
import Item from '../item/item';
import './Popular.css'

export const Popular = () => {
  return (
    <div className='Popular'>
      <h1> محصولات محبوب </h1>
      <hr />
      <div className="popular-scroll">
        {Products.map((product) => (
          <div className="scroll-item" key={product.id}>
            <Item
              id={product.id}
              name={product.name}
              image={product.image}
              price={product.price}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Popular;