
import React, { useContext, useMemo } from 'react';
import { ShopContext } from '../../context/ShopContext';
import Item from '../item/item';
import './Popular.css';

const Popular = () => {
  const { productList, productsLoading, productsError } = useContext(ShopContext);

  const popularProducts = useMemo(() => {
    if (!Array.isArray(productList)) return [];
    return productList.slice(0, 5);
  }, [productList]);

  return (
    <div className="Popular">
      <h1> محصولات محبوب </h1>
      <hr />

      {productsLoading && <p>در حال بارگذاری...</p>}
      {productsError && <p>خطا در دریافت محصولات</p>}
      {!productsLoading && !productsError && popularProducts.length === 0 && (
        <p>محصولی یافت نشد.</p>
      )}

      {!productsLoading && !productsError && popularProducts.length > 0 && (
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
      )}
    </div>
  );
};

export default Popular;
