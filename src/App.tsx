import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Header from '../src/components/Header';
import Home from '../src/pages/Home';
import Shop from '../src/pages/Shop';
import ProductDetails from '../src/pages/ProductDetails';
import Cart from './features/cart/Cart';

// 🔹 Layout component - ekhane header thakbe, children render hobe Outlet diye
const Layout: React.FC = () => {
  return (
    <div>
      {/* Header - sob page e dekha jabe */}
      <Header />

      {/* Main content - sob pages er children ekhane render hobe */}
      <main style={{ padding: 20 }}>
        <Outlet />
      </main>
    </div>
  );
};

// 🔹 App.tsx - Routes define kora hocche, Layout er under e sob pages
const App: React.FC = () => {
  return (
    <Routes>
      {/* Layout route */}
      <Route path="/" element={<Layout />}>
        {/* Nested routes - children */}
        <Route index element={<Home />} />          {/* '/' route */}
        <Route path="shop" element={<Shop />} />   {/* '/shop' route */}
        <Route path="product/:id" element={<ProductDetails />} /> {/* '/product/:id' route */}
        <Route path="cart" element={<Cart />} />   {/* '/cart' route */}
      </Route>
    </Routes>
  );
};

export default App;
