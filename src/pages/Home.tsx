import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api/productsApi';
import ProductCard from '../components/ProductCard';


// Home page: sob product show kore. React Query diye data fetch kora hocche.


const Home: React.FC = () => {
const { data, isLoading, isError } = useQuery(['products'], fetchProducts);


if (isLoading) return <div>Loading...</div>;
if (isError) return <div>Error loading products</div>;


return (
<div>
<h2>All Products</h2>
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
{data!.map((p) => (
<ProductCard key={p.id} product={p} />
))}
</div>
</div>
);
};


export default Home;