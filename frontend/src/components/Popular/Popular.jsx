import React from 'react';
import Products from '../Assets/Products';
import Item from '../item/item';
import './Popular.css';

export const Popular = () => {
  const popularProducts = Products.slice(0, 5);

  return (
    <div className="Popular">
      <h1> محصولات محبوب </h1>
      <hr />
      <div className="popular-scroll">
        {popularProducts.map((product) => (
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
