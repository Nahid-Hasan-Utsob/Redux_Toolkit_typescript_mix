import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartCount } from '../features/cart/cartSelectors';
import type { RootState } from '../store';


// Header: ekhane shop name ache - React Router Link use kore '/shop' e jay.
// Header e cart count Redux Toolkit theke select kore dekhano hocche.


const Header: React.FC = () => {
const count = useSelector((state: RootState) => selectCartCount(state));


return (
<header style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px', borderBottom: '1px solid #ddd' }}>
<div>
{/* React Router DOM er Link - click korle Shop page open hobe */}
<Link to="/shop" style={{ textDecoration: 'none', color: 'black' }}>
<h2>My Shop</h2>
</Link>
</div>


<div>
{/* Cart info - Redux Toolkit state theke */}
<span>Cart: {count} item(s)</span>
</div>
</header>
);
};


export default Header;