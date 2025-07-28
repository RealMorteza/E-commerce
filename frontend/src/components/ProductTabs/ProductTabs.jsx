import React, { useState } from 'react';
import './ProductTabs.css';

const ProductTabs = ({ description, reviews = [] }) => {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div className="product-tabs">
      <div className="tab-headers">
        <button
          className={activeTab === 'description' ? 'active' : ''}
          onClick={() => setActiveTab('description')}
        >
          توضیحات تکمیلی
        </button>
        <button
          className={activeTab === 'reviews' ? 'active' : ''}
          onClick={() => setActiveTab('reviews')}
        >
          نظرات ({reviews.length})
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'description' && (
          <p>{description || 'توضیحاتی برای این محصول وارد نشده است.'}</p>
        )}

        {activeTab === 'reviews' && (
          <div>
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div key={index} className="review">
                  <p>⭐ {review.rating} - {review.comment}</p>
                </div>
              ))
            ) : (
              <p>نظری برای این محصول ثبت نشده است.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;