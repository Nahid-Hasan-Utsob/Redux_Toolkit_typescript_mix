import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api/productsApi';
import ProductCard from '../components/ProductCard';
import CategoryList from '../components/CategoryList';

// Shop page: left side category list, right side filtered + sorted product list

const Shop: React.FC = () => {
  // 🔹 Category select state
  const [selected, setSelected] = useState<string | null>(null);
  
  // 🔹 Sort option state
  const [sortOption, setSortOption] = useState<string>('Price: Low to High');

  // 🔹 Fetch products from API using React Query
  const { data, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  if (isLoading) return <div>Loading products...</div>;
  if (isError) return <div>Error loading products</div>;

  // 🔹 Extract unique categories from data
  const categories = useMemo(() => {
    if (!data) return [] as string[];
    return Array.from(new Set(data.map((p) => p.category)));
  }, [data]);

  // 🔹 Filter products by selected category + apply sorting
  const filtered = useMemo(() => {
    if (!data) return [];

    // 1️⃣ Filter by category
    let result = selected ? data.filter(p => p.category === selected) : data;

    // 2️⃣ Apply sorting
    switch (sortOption) {
      case 'Price: Low to High':
        result = result.slice().sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        result = result.slice().sort((a, b) => b.price - a.price);
        break;
      case 'Name: A-Z':
        result = result.slice().sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'Name: Z-A':
        result = result.slice().sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    return result;
  }, [data, selected, sortOption]);

  return (
    <div style={{ display: 'flex', gap: 20 }}>
      {/* 🔹 Left side: Category + Sorting component */}
      <aside style={{ width: 200 }}>
        <CategoryList
          categories={categories}
          selected={selected}
          onSelect={setSelected} // 🔹 update selected category
          sortOption={sortOption}
          onSortChange={setSortOption} // 🔹 update selected sort
        />
      </aside>

      {/* 🔹 Right side: Product cards */}
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
