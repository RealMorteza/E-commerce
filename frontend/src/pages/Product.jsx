import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useParams } from 'react-router-dom';
import ProductPage from '../components/ProductPage/ProductPage';

const Product = () => {
  const { productList } = useContext(ShopContext); // ❗️اصلاح این خط
  const { productId } = useParams();

  if (!productList) return <p>در حال بارگذاری محصول...</p>;

  const product = productList.find((item) => item.id === Number(productId));

  if (!product) return <p>محصول مورد نظر یافت نشد.</p>;

  return (
    <div>
      <ProductPage product={product} />
    </div>
  );
};

export default Product;
