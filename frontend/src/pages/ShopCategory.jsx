import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import Item from '../components/item/item';
import './CSS/ShopCategory.css'

export const ShopCategory = (props) => {
  const {Products} = useContext(ShopContext)
  return (
    <div className='shop-category'>
      <img className='Category-banner' src={props.banner} />
      <div className="Category-products">
        {Products.map((item, i) => {

          if (props.category===item.category) {
            return <Item key={i} id={item.id} name={item.name} image={item.image} />
          }
          else {
            return null;
          }
        })}
      </div>
    </div>

  )
}

export default ShopCategory;