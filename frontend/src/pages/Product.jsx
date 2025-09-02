// src/pages/product.jsx
import React, { useContext, useMemo } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useParams, Link } from 'react-router-dom';
import ProductPage from '../components/ProductPage/ProductPage';

const Product = () => {
  const { productList, productsLoading, productsError } = useContext(ShopContext);
  const { productId } = useParams();

  // محصول متناظر با id
  const product = useMemo(() => {
    if (!Array.isArray(productList)) return null;
    const idNum = Number(productId);
    return productList.find((item) => item.id === idNum);
  }, [productList, productId]);

  // حالت لودینگ
  if (productsLoading) {
    return (
      <div style={{ padding: '2rem' }}>
        <p>در حال بارگذاری محصول...</p>
      </div>
    );
  }

  // حالت خطا در گرفتن لیست
  if (productsError) {
    return (
      <div style={{ padding: '2rem' }}>
        <p>خطا در دریافت اطلاعات محصول:</p>
        <pre style={{ direction: 'ltr', background: '#f6f6f6', padding: '.75rem', borderRadius: 8 }}>
          {productsError}
        </pre>
        <Link to="/" style={{ color: '#1976d2' }}>بازگشت به فروشگاه</Link>
      </div>
    );
  }

  // اگر محصول پیدا نشد
  if (!product) {
    return (
      <div style={{ padding: '2rem' }}>
        <p>محصول مورد نظر یافت نشد.</p>
        <Link to="/" style={{ color: '#1976d2' }}>بازگشت به فروشگاه</Link>
      </div>
    );
  }

  // نمایش صفحهٔ محصول
  return (
    <div>
      <ProductPage product={product} />
    </div>
  );
};

export default Product;
