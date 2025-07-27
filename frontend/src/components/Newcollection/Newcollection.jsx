import React from 'react';
import Products from '../Assets/Products';
import Item from '../item/item';
import './Newcollection.css'

export const NewCollection = () => {
  return (
    <div className='NewCollection'>
      <h1> جدید ترین دسته بندی </h1>
      <hr />
      <div className="NewCollection-scroll">
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

export default NewCollection;