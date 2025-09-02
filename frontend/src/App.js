import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './pages/Shop';
import ShopCategory from './pages/ShopCategory';
import LoginSignup from './pages/LoginSignup';
import Cart from './pages/Cart';
import Product from './pages/Product';
import ProductManager from './pages/ProductManager';
import Account from './pages/Account';
import AddProduct from './components/AddProduct/AddProduct.jsx';
import shirt_banner from './components/Assets/General-images/shirt-banner.jpeg';
import pants_banner from './components/Assets/General-images/pants-banner.jpeg';
import t_shirt_banner from './components/Assets/General-images/t-shirt-banner.jpeg';

function App() {
  return (

    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/cart" element={<Cart />} />

          <Route path='/t-shirt' element={<ShopCategory banner={t_shirt_banner} category="t-shirt" />} />
          <Route path='/shirt' element={<ShopCategory banner={shirt_banner} category="shirt" />} />
          <Route path='/pants' element={<ShopCategory banner={pants_banner} category="pants" />} />

          <Route path='/product' element={<Product />} />
          {<Route path='/product/:productId' element={<Product />} />}

          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<LoginSignup />} />
          <Route path="/pm" element={<ProductManager />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
