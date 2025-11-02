// TypeScript file: ekhane product-gulo dummy data hishebe ache.
// React Query diye fetch kora simulation korbo (local array theke promise return kore).


export interface Product {
id: string;
title: string;
description: string;
price: number;
category: string;
image?: string;
}


export const products: Product[] = [
{ id: 'p1', title: 'Red Shirt', description: 'Comfortable red shirt', price: 29.99, category: 'Clothing', image: '' },
{ id: 'p2', title: 'Blue Jeans', description: 'Stylish blue jeans', price: 49.99, category: 'Clothing', image: '' },
{ id: 'p3', title: 'Coffee Mug', description: 'Ceramic mug', price: 9.99, category: 'Home', image: '' },
{ id: 'p4', title: 'Desk Lamp', description: 'LED desk lamp', price: 19.99, category: 'Home', image: '' },
{ id: 'p5', title: 'Running Shoes', description: 'Lightweight shoes', price: 69.99, category: 'Footwear', image: '' },
{ id: 'p6', title: 'Sandals', description: 'Comfort sandals', price: 24.99, category: 'Footwear', image: '' }
];