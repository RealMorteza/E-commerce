import React, { useContext } from 'react';
import './ProductPage.css';
import { ShopContext } from '../../context/ShopContext';

const ProductPage = ({ product }) => {
    const { addToCart } = useContext(ShopContext);

    const translateCategory = (cat) => {
        switch (cat) {
            case "men":
                return "مردانه";
            case "women":
                return "زنانه";
            case "kids":
                return "بچه‌گانه";
            default:
                return "نامشخص";
        }
    };

    return (
        <div className="product-container">
            <div className="gallery">
                <div className="thumbnails">
                    <img src={product.image} alt="thumb1" />
                    <img src={product.image} alt="thumb2" />
                    <img src={product.image} alt="thumb3" />
                </div>
                <div className="main-image">
                    <img src={product.image} alt="main" />
                </div>
            </div>

            <div className="product-details">
                <h1>{product.name}</h1>
                <div className="rating">★★★★☆ (122)</div>
                <div className="price"><span>{product.price} تومان</span></div>

                <p className="description">
                    {product.description?.trim()
                        ? product.description
                        : "توضیحاتی برای این محصول وارد نشده است."}
                </p>

                <button
                    onClick={() => {
                        addToCart(product.id);
                        alert('✅ محصول به سبد خرید اضافه شد!');
                    }}
                    className="add-to-cart"
                > افزودن به سبد خرید </button>

                    <div className="meta">
                        <p><span>دسته‌بندی:</span> {translateCategory(product.category)}</p>
                        {product.tags?.length > 0 && (
                            <p><span>تگ‌ها:</span> {product.tags.join("، ")}</p>
                        )}
                    </div>
            </div>
        </div>
    );
};

export default ProductPage;
