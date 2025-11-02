import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import type { Product } from '../data/products';


// ProductCard: ekta product card component. TypeScript props interface use kora.
// Add to Cart button Redux Toolkit er action call kore.


interface Props {
product: Product;
}


const ProductCard: React.FC<Props> = ({ product }) => {
const dispatch = useDispatch();


const handleAdd = () => {
dispatch(addToCart({ id: product.id, title: product.title, price: product.price }));
};


return (
<div style={{ border: '1px solid #ddd', padding: 10, borderRadius: 6 }}>
<Link to={`/product/${product.id}`}>
<h3>{product.title}</h3>
</Link>
<p>{product.category} - ${product.price}</p>
<button onClick={handleAdd}>Add to cart</button>
</div>
);
};


export default ProductCard;