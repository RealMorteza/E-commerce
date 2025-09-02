import React, { createContext, useEffect, useMemo, useState } from "react";

export const ShopContext = createContext(null);

const API_BASE = "http://localhost:3001/api";

const ShopContextProvider = ({ children }) => {
  // ------------------ Products (Server-backed) ------------------
  const [productList, setProductList] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState(null);

useEffect(() => {
  setProductsLoading(true);
  setProductsError(null);

  fetch(`${API_BASE}/products`)
    .then((res) => {
      if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
      return res.json();
    })
    .then((data) => setProductList(Array.isArray(data) ? data : []))
    .catch((err) => {
      console.error(err);
      setProductsError(err.message || "خطا در دریافت محصولات");
    })
    .finally(() => setProductsLoading(false));
}, []);


  const addProduct = async (payload) => {
    const res = await fetch(`${API_BASE}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      throw new Error(`افزودن محصول ناموفق بود: ${res.status} ${txt}`);
    }
    const created = await res.json();
    setProductList((prev) => [...prev, created]);
    return created;
  };


  const deleteProduct = async (id) => {
    const res = await fetch(`${API_BASE}/products/${id}`, { method: "DELETE" });
    if (!res.ok && res.status !== 204) {
      const txt = await res.text().catch(() => "");
      throw new Error(`حذف محصول ناموفق بود: ${res.status} ${txt}`);
    }
    setProductList((prev) => prev.filter((p) => p.id !== id));
  };

  // ------------------ Cart (Local per user) ------------------
  const initialCart = useMemo(
    () => JSON.parse(localStorage.getItem("cartItems") || "{}"),
    []
  );
  const [cartItems, setCartItems] = useState(initialCart);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

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

  const contextValue = {
    // Products
    productList,
    productsLoading,
    productsError,
    setProductList,
    addProduct,
    deleteProduct,

    // Cart
    cartItems,
    addToCart,
    removeFromCart,
    deleteFromCart,
    getCartTotal,
    getTotalItems,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
