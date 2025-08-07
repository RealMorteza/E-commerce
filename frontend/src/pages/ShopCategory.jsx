import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Item from '../components/item/item';
import './CSS/ShopCategory.css';

export const ShopCategory = (props) => {
  const { productList } = useContext(ShopContext);

  if (!productList) {
    return <p>در حال بارگذاری محصولات...</p>;
  }
  const categoryTranslations = {
  "t-shirt": "تیشرت",
  "shirt": "پیراهن",
  "pants": "شلوار",
};

const translateCategory = (cat) => {
  return categoryTranslations[cat] || "نامشخص";
};

  return (
    <div className='shop-category'>
      <img className='Category-banner' src={props.banner} alt="بنر دسته‌بندی" />
      <h3 className='Category-name'> <span> دسته بندی</span> {translateCategory(props.category)} </h3>
      <div className="Category-products">
        {productList.map((item) => (
          item.category === props.category ? (
            <Item
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          ) : null
        ))}
      </div>
    </div>
  );
};

export default ShopCategory;
