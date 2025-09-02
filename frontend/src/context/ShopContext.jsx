import React, { createContext, useEffect, useMemo, useState } from "react";

export const ShopContext = createContext(null);

// اگر خواستی بعداً از env بیاد، اینو تغییر بده
const API_BASE = "http://localhost:3001/api";

const ShopContextProvider = ({ children }) => {
  // ------------------ Products (Server-backed) ------------------
  const [productList, setProductList] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState(null);

  // خواندن محصولات از سرور
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        setProductsLoading(true);
        setProductsError(null);
        const res = await fetch(`${API_BASE}/products`);
        if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
        const data = await res.json();
        if (!cancelled) setProductList(Array.isArray(data) ? data : []);
      } catch (err) {
        if (!cancelled) setProductsError(err.message || "خطا در دریافت محصولات");
        console.error(err);
      } finally {
        if (!cancelled) setProductsLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, []);

  // افزودن محصول (Server)
  const addProduct = async (payload) => {
    // payload نمونه: { name, category, price, image, image2, image3, sizing_image, description, full_description, tag }
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

  // ویرایش/به‌روزرسانی محصول (Server)
  const updateProduct = async (id, patch) => {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      throw new Error(`به‌روزرسانی محصول ناموفق بود: ${res.status} ${txt}`);
    }
    const updated = await res.json();
    setProductList((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    return updated;
  };

  // حذف محصول (Server)
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

  // سینک سبد خرید با localStorage
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
    updateProduct,
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
