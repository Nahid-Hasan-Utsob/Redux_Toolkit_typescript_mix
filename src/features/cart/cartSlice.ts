import { createSlice } from '@reduxjs/toolkit'; // 🔹 runtime function
import type { PayloadAction } from '@reduxjs/toolkit'; // 🔹 type only



interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

// 🔹 Local Storage theke initial state load
const savedCart = localStorage.getItem('cartItems');
const initialState: CartState = savedCart ? JSON.parse(savedCart) : { items: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      // 🔹 Same product already thakle add korbe na (only 1 copy)
      const exists = state.items.find(item => item.id === action.payload.id);
      if (!exists) {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      // 🔹 Local Storage update
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      // 🔹 Quantity 1 er niche jabe na
      const item = state.items.find(i => i.id === action.payload);
      if (item) item.quantity += 1;
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        localStorage.setItem('cartItems', JSON.stringify(state.items));
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(i => i.id !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem('cartItems');
    },
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
