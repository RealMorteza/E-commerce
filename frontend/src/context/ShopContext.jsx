import React, { createContext, useState, useEffect } from "react";
import Products from "../components/Assets/Products";

export const ShopContext = createContext(null);

const ShopContextProvider = ({ children }) => {
  const [productList, setProductList] = useState(() => {
    const stored = localStorage.getItem("productList");
    return stored ? JSON.parse(stored) : Products;
  });

  const initialCart = JSON.parse(localStorage.getItem("cartItems")) || {};
  const [cartItems, setCartItems] = useState(initialCart);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("productList", JSON.stringify(productList));
  }, [productList]);

  const addToCart = (productId) => {
    setCartItems((prev) => ({
      ...prev,
      [productId]: prev[productId] ? prev[productId] + 1 : 1,
    }));
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      if (updated[productId] > 1) updated[productId] -= 1;
      else delete updated[productId];
      return updated;
    });
  };

  const deleteFromCart = (productId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      delete updated[productId];
      return updated;
    });
  };

  const getCartTotal = () => {
    if (!Array.isArray(productList)) return 0;

    return productList.reduce((total, product) => {
      const quantity = cartItems[product.id] || 0;
      const price = Number(product?.price || 0);
      return total + quantity * price;
    }, 0);
  };

  const getTotalItems = () => {
    return Object.values(cartItems).reduce((a, b) => a + b, 0);
  };


  const deleteProduct = (id) => {
    setProductList((prev) => prev.filter((item) => item.id !== id));
  };


  const contextValue = {
    productList,
    setProductList,
    cartItems,
    addToCart,
    removeFromCart,
    deleteFromCart,
    getCartTotal,
    getTotalItems,
    deleteProduct, 
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
