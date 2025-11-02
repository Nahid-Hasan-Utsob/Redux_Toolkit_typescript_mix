import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../src/components/Header';
import Home from '../src/pages/Home';
import Shop from '../src/pages/Shop';
import ProductDetails from '../src/pages/ProductDetails';


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