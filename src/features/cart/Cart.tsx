import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store';
import {  increaseQuantity, decreaseQuantity, removeFromCart, clearCart } from './cartSlice';

// 🔹 Cart component
// - Local Storage support
// - Quantity +/- button
// - Delete button
// - Place Order button
const Cart: React.FC = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  // 🔹 Total price calculation
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // 🔹 Place order handler
  const handlePlaceOrder = () => {
    if (items.length === 0) return alert('Cart is empty');
    alert('Order placed successfully!');
    dispatch(clearCart()); // 🔹 Clear cart after order
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Cart Items</h2>

      {/* 🔹 Empty cart */}
      {items.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <div>
          <ul>
            {items.map((item) => (
              <li key={item.id} style={{ marginBottom: 15 }}>
                {/* 🔹 Product info */}
                <span>{item.title} - ${item.price} x {item.quantity}</span>

                {/* 🔹 Increase quantity */}
                <button
                  onClick={() => dispatch(increaseQuantity(item.id))}
                  style={{ marginLeft: 10 }}
                >
                  +
                </button>

                {/* 🔹 Decrease quantity (minimum 1) */}
                <button
                  onClick={() => dispatch(decreaseQuantity(item.id))}
                  style={{ marginLeft: 5 }}
                >
                  -
                </button>

                {/* 🔹 Delete single product */}
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  style={{ marginLeft: 5, color: 'red' }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>

          {/* 🔹 Total */}
          <h3>Total: ${total.toFixed(2)}</h3>

          {/* 🔹 Place order button */}
          <button
            onClick={handlePlaceOrder}
            style={{ padding: '10px 20px', marginTop: 10 }}
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
