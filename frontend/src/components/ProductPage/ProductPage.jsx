import React, { useContext, useState } from 'react';
import './ProductPage.css';
import { ShopContext } from '../../context/ShopContext';

const ProductPage = ({ product }) => {
    const { addToCart } = useContext(ShopContext);


    const [mainImage, setMainImage] = useState(product.image);

    const translateCategory = (cat) => {
        switch (cat) {
            case "t-shirt":
                return "تیشرت";
            case "shirt":
                return "پیراهن";
            case "pants":
                return "شلوار";
            default:
                return "نامشخص";
        }
    };

    const thumbnails = [product.image, product.image2, product.image3, product.sizing_image].filter(Boolean);

    return (
        <div className="product-container">
            <div className="gallery">
                <div className="thumbnails">
                    {thumbnails.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`thumb-${index}`}
                            onClick={() => setMainImage(img)}
                            className={mainImage === img ? 'active-thumbnail' : ''}
                        />
                    ))}
                </div>
                <div className="main-image">
                    <img src={mainImage} alt="main" />
                </div>
            </div>

            <div className="product-details">
                <h1>{product.name}</h1>
                <div className="rating">★★★★☆ (122)</div>


                <p className="description">
                    {product.description?.trim()
                        ? product.description
                        : "توضیحاتی برای این محصول وارد نشده است."}
                </p>
                <div className="price"><span>{product.price.toLocaleString()}</span></div>
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
                    <p><span> شناسه محصول: </span> {product.id}</p>
                </div>
            </div>

            <div className="full-description">
                <h3> توضیحات تکمیلی </h3>
                <p>{product.full_description}</p>
            </div>
        </div>
    );
};

export default ProductPage;
