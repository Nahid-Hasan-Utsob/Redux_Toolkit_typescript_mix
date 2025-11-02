import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartCount } from '../features/cart/cartSelectors';
import type { RootState } from '../store';

// 🧭 Header component — shop name, home link, and cart info দেখাবে
const Header: React.FC = () => {
  // 🧮 Redux state থেকে cart item count নিয়ে আসা
  const count = useSelector((state: RootState) => selectCartCount(state));

  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px 20px',
        borderBottom: '1px solid #ddd',
        alignItems: 'center',
      }}
    >
      <div style={{ display: 'flex', gap: '15px' }}>
        {/* 🏠 Home page link */}
        <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
          <h2>Home</h2>
        </Link>

        {/* 🛍️ Shop page link */}
        <Link to="/shop" style={{ textDecoration: 'none', color: 'black' }}>
          <h2>My Shop</h2>
        </Link>
      </div>

      {/* 🛒 Cart link — এখন click করলে /cart পেজে যাবে */}
      <Link
        to="/cart"
        style={{
          textDecoration: 'none',
          color: 'black',
          fontWeight: 'bold',
          border: '1px solid #ddd',
          padding: '6px 12px',
          borderRadius: '8px',
        }}
      >
        Cart 🛒: {count} item{count !== 1 ? 's' : ''}
      </Link>
    </header>
  );
};

export default Header;
