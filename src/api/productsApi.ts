import type { Product } from '../data/products';

export const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch('https://fakestoreapi.com/products'); // real API
  if (!res.ok) throw new Error('Network response was not ok');
  return res.json();
};

export const fetchProductById = async (id: string): Promise<Product> => {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) throw new Error('Product not found');
  return res.json();
};
