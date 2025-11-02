import type { Product } from './apiType';

// সব product fetch
export const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch('https://fakestoreapi.com/products');
  if (!res.ok) throw new Error('Network response was not ok');
  return res.json();
};

// একটার product fetch
export const fetchProductById = async (id: number): Promise<Product> => {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) throw new Error('Product not found');
  return res.json();
};
