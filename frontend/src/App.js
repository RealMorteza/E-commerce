import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './pages/Shop';
import ShopCategory from './pages/ShopCategory';
import LoginSignup from './pages/LoginSignup';
import Cart from './pages/Cart';
import Product from './pages/Product';
import men_collection_banner from './components/Assets/General-images/Formal-collection-banner.jpeg';
import semi_formal_banner from './components/Assets/General-images/Semi-Formal-banner.jpeg';

function App() {
  return (

    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/men' element={<ShopCategory banner={men_collection_banner} category="men" />} />
          <Route path='/women' element={<ShopCategory banner={semi_formal_banner} category="women" />} />
          <Route path='/kids' element={<ShopCategory category="kid" />} />

          <Route path='/product' element={<Product />} />
          { <Route path='/product/:productId' element={<Product />} /> }

          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<LoginSignup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
