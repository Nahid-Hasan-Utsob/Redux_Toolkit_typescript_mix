import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProductById } from '../api/productsApi';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';


// ProductDetails: route parameter use kora hocche (React Router DOM) - product id niye details show kore.


const ProductDetails: React.FC = () => {
const { id } = useParams<{ id: string }>();
const { data, isLoading } = useQuery(['product', id], () => fetchProductById(id!));
const dispatch = useDispatch();


if (isLoading) return <div>Loading...</div>;
if (!data) return <div>Product not found</div>;


const handleAdd = () => {
dispatch(addToCart({ id: data.id, title: data.title, price: data.price }));
};


return (
<div>
<h2>{data.title}</h2>
<p>Category: {data.category}</p>
<p>{data.description}</p>
<p>Price: ${data.price}</p>
<button onClick={handleAdd}>Add to cart</button>
</div>
);
};


export default ProductDetails;