import React, { useState, useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';
import './AddProduct.css';

const AddProduct = () => {
  const { productList, setProductList } = useContext(ShopContext);

  const [newProduct, setNewProduct] = useState({
    id: productList.length + 1,
    name: '',
    price: '',
    category: 'men',
    description: '',
    full_description: '',
    image: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) {
      alert('لطفاً نام و قیمت را وارد کنید.');
      return;
    }

    setProductList([...productList, { ...newProduct, id: Date.now() }]);
    alert(' محصول با موفقیت اضافه شد! ✅ ');
    setNewProduct({
      id: '',
      name: '',
      price: '',
      category: 'men',
      description: '',
      full_description: '',
      image: ''
    });
  };

  return (
    <div className="add-product-page">
      <h2>افزودن محصول جدید</h2>
      <div className="add-form">
        <input type="text" name="name" placeholder="نام محصول" value={newProduct.name} onChange={handleChange} />
        <input type="text" name="price" placeholder="قیمت" value={newProduct.price} onChange={handleChange} />
        <select name="category" value={newProduct.category} onChange={handleChange}>
          <option value="men">مردانه</option>
          <option value="women">زنانه</option>
          <option value="kids">بچه‌گانه</option>
        </select>
        <input type="text" name="image" placeholder="لینک عکس (اختیاری)" value={newProduct.image} onChange={handleChange} />
        <textarea name="description" placeholder="توضیح کوتاه" value={newProduct.description} onChange={handleChange}></textarea>
        <textarea name="full_description" placeholder="توضیحات تکمیلی" value={newProduct.full_description} onChange={handleChange}></textarea>
        <button onClick={handleAddProduct}>افزودن محصول</button>
      </div>
    </div>
  );
};

export default AddProduct;
