// React Query use korar jonno data fetch wrapper.
// Ekhane async function return kore local products array - real API er moto behave korbe.
import { products, type Product } from '../data/products';


export const fetchProducts = async (): Promise<Product[]> => {
// React Query expects a promise - ekhane 300ms delay diya simulate korechi.
await new Promise((res) => setTimeout(res, 300));
return products;
};


export const fetchProductById = async (id: string): Promise<Product | undefined> => {
await new Promise((res) => setTimeout(res, 200));
return products.find((p) => p.id === id);
};
