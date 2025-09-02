
import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import './CSS/ProductManager.css';

window.onload = function () {
  if (window.location.pathname === "/pm") {
    let userInput = prompt("لطفاً متن خود را وارد کنید:");

    if (userInput === "1383") {
      alert("ورود موفقیت‌آمیز بود.");
    } else {

      alert("خطا: مقدار وارد شده اشتباه است.");
      window.location.href = "http://localhost:3000";
    }
  };
}



const ProductManager = () => {
  const {
    productList,
    productsLoading,
    productsError,
    deleteProduct,
  } = useContext(ShopContext);

  const navigate = useNavigate();
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    const ok = window.confirm('آیا از حذف این محصول مطمئن هستید؟');
    if (!ok) return;
    try {
      setDeletingId(id);
      await deleteProduct(id);
    } catch (err) {
      console.error(err);
      alert('حذف محصول ناموفق بود.');
    }
  };

  if (productsLoading) {
    return (
      <div className="product-manager">
        <div className="product-manager-header">
          <h2>مدیریت محصولات</h2>
          <button className="add-btn" onClick={() => navigate('/add-product')}>افزودن محصول جدید</button>
        </div>
        <p>در حال بارگذاری لیست محصولات...</p>
      </div>
    );
  }

  if (productsError) {
    return (
      <div className="product-manager">
        <div className="product-manager-header">
          <h2>مدیریت محصولات</h2>
          <button className="add-btn" onClick={() => navigate('/add-product')}>افزودن محصول جدید</button>
        </div>
        <div className="error-box">
          <p>خطا در دریافت محصولات:</p>
          <pre style={{ direction: 'ltr' }}>{productsError}</pre>
        </div>
      </div>
    );
  }

  return (
    <div className="product-manager">
      <div className="product-manager-header">
        <h2>مدیریت محصولات</h2>
        <button className="add-btn" onClick={() => navigate('/add-product')}>
          افزودن محصول جدید
        </button>
      </div>

      {!Array.isArray(productList) || productList.length === 0 ? (
        <p>هیچ محصولی ثبت نشده است.</p>
      ) : (
        <div className="product-list">
          {productList.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} />
              <div className="info">
                <h4>{product.name}</h4>
                <p>دسته: {product.category}</p>
                <p>قیمت: {Number(product.price || 0).toLocaleString('fa-IR')} تومان</p>
              </div>
              <div className="actions">
                <button
                  className="delete-btn"
                  disabled={deletingId === product.id}
                  onClick={() => handleDelete(product.id)}
                >
                  {deletingId === product.id ? 'حذف...' : 'حذف'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductManager;
