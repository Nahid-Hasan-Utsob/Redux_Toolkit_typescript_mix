import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { fetchProducts } from '../api/productsApi';
import ProductCard from '../components/ProductCard';
import CategoryList from '../components/CategoryList';

const Shop: React.FC = () => {
  // 🔹 Fetch products from API


const { data } = useQuery({
  queryKey: ['products'],  // 🔹 array of key
  queryFn: fetchProducts,   // 🔹 function to fetch data
});


  // 🔹 URL query params for category + sort
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') || null;
  const selectedSort = searchParams.get('sort') || 'Price: Low to High';

  // 🔹 Get categories sorted alphabetically
  const categories = useMemo(() => {
    if (!data) return [] as string[];
    return Array.from(new Set(data.map((p) => p.category))).sort((a, b) => a.localeCompare(b));
  }, [data]);

  // 🔹 Filter products by category
  const filtered = useMemo(() => {
    if (!data) return [];
    return selectedCategory ? data.filter(p => p.category === selectedCategory) : data;
  }, [data, selectedCategory]);

  // 🔹 Sort products based on selectedSort
  const sortedProducts = useMemo(() => {
    const products = [...filtered];
    switch (selectedSort) {
      case 'Price: Low to High':
        return products.sort((a, b) => a.price - b.price);
      case 'Price: High to Low':
        return products.sort((a, b) => b.price - a.price);
      case 'Name: A-Z':
        return products.sort((a, b) => a.title.localeCompare(b.title));
      case 'Name: Z-A':
        return products.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return products;
    }
  }, [filtered, selectedSort]);

  // 🔹 Handle category change
  const handleCategoryChange = (category: string | null) => {
    if (category) searchParams.set('category', category);
    else searchParams.delete('category');
    setSearchParams(searchParams);
  };

  // 🔹 Handle sort change
  const handleSortChange = (sort: string) => {
    searchParams.set('sort', sort);
    setSearchParams(searchParams);
  };

  return (
    <div style={{ display: 'flex', gap: 20 }}>
      {/* 🔹 Left: Category + Sort */}
      <aside style={{ width: 200 }}>
        <CategoryList
          categories={categories}
          selected={selectedCategory}
          onSelect={handleCategoryChange}
          sortOption={selectedSort}
          onSortChange={handleSortChange}
        />
      </aside>

      {/* 🔹 Right: Product List */}
      <section style={{ flex: 1 }}>
        <h2>{selectedCategory ? `${selectedCategory} Products` : 'All Products'}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {sortedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Shop;
