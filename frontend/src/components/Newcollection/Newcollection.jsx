// src/components/NewCollection/NewCollection.jsx
import React, { useContext, useMemo } from 'react';
import { ShopContext } from '../../context/ShopContext'; // ← در صورت نیاز مسیر را اصلاح کن
import Item from '../item/item';
import './Newcollection.css';

const NewCollection = () => {
  const { productList, productsLoading, productsError } = useContext(ShopContext);

  // فقط محصولاتی که تگ "new" دارند (چه به صورت رشته در `tag` چه در آرایه‌ی `tags`)
  const newProducts = useMemo(() => {
    if (!Array.isArray(productList)) return [];
    return productList.filter(
      (p) => p?.tag === 'new' || (Array.isArray(p?.tags) && p.tags.includes('new'))
    );
  }, [productList]);

  return (
    <div className="NewCollection">
      <h1>جدیدترین محصولات</h1>
      <hr />

      {productsLoading && <p>در حال بارگذاری...</p>}
      {productsError && <p>خطا در دریافت محصولات</p>}

      {!productsLoading && !productsError && newProducts.length === 0 && (
        <p>محصول «جدید» یافت نشد.</p>
      )}

      {!productsLoading && !productsError && newProducts.length > 0 && (
        <div className="NewCollection-scroll">
          {newProducts.map((product) => (
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

export default NewCollection;
