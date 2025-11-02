import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';


// App.tsx: React Router DOM diye routing define kora hocche.
const App: React.FC = () => {
return (
<div>
<Header />
<main style={{ padding: 20 }}>
<Routes>
<Route path="/" element={<Home />} />
<Route path="/shop" element={<Shop />} />
<Route path="/product/:id" element={<ProductDetails />} />
</Routes>
</main>
</div>
);
};


export default App;