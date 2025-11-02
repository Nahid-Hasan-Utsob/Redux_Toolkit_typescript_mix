import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api/productsApi';
import ProductCard from '../components/ProductCard';
import CategoryList from '../components/CategoryList';


// Shop page: left e category list, right e filtered product list.
// Category click korle right side show korbe oi category products.


const Shop: React.FC = () => {
const { data } = useQuery({
  queryKey: ['products'],   // object property
  queryFn: fetchProducts,   // object property
});

const [selected, setSelected] = useState<string | null>(null);


const categories = useMemo(() => {
if (!data) return [] as string[];
return Array.from(new Set(data.map((d) => d.category)));
}, [data]);


const filtered = useMemo(() => {
if (!data) return [];
return selected ? data.filter((p) => p.category === selected) : data;
}, [data, selected]);


return (
<div style={{ display: 'flex', gap: 20 }}>
<aside style={{ width: 200 }}>
<CategoryList categories={categories} selected={selected} onSelect={setSelected} />
</aside>


<section style={{ flex: 1 }}>
<h2>{selected ? `${selected} Products` : 'All Products'}</h2>
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
{filtered.map((p) => (
<ProductCard key={p.id} product={p} />
))}
</div>
</section>
</div>
);
};


export default Shop;