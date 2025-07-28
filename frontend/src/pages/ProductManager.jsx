import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import './CSS/ProductManager.css'; 

const ProductManager = () => {
  const { productList, deleteProduct } = useContext(ShopContext);
  const navigate = useNavigate();

  return (
    <div className="product-manager">
      <div className="product-manager-header">
        <h2>مدیریت محصولات</h2>
        <button className="add-btn" onClick={() => navigate('/add-product')}>
          افزودن محصول جدید
        </button>
      </div>

      {productList.length === 0 ? (
        <p>هیچ محصولی ثبت نشده است.</p>
      ) : (
        <div className="product-list">
          {productList.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} />
              <div className="info">
                <h4>{product.name}</h4>
                <p>دسته: {product.category}</p>
                <p>قیمت: {product.price} تومان</p>
              </div>
              <button
                className="delete-btn"
                onClick={() => {
                  if (window.confirm('آیا از حذف این محصول مطمئن هستید؟')) {
                    deleteProduct(product.id);
                  }
                }}
              >
                حذف
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductManager;
