import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// 🧩 প্রতিটি কার্ট আইটেমের ধরন
interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

// 🧩 পুরো কার্ট স্টেটের ধরন
interface CartState {
  items: CartItem[];
}

// 🧠 Local Storage থেকে ডেটা লোড
const savedCart = localStorage.getItem('cartItems');
const initialState: CartState = {
  items: savedCart ? JSON.parse(savedCart) : [], // ✅ সবসময় items array থাকবে
};

// 🛒 Cart Slice তৈরি
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // ➕ নতুন আইটেম যোগ করা
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (!exists) {
        state.items.push({ ...action.payload, quantity: 1 });
        localStorage.setItem('cartItems', JSON.stringify(state.items));
      }
    },

    // 🔼 Quantity বাড়ানো
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) {
        item.quantity += 1;
        localStorage.setItem('cartItems', JSON.stringify(state.items));
      }
    },

    // 🔽 Quantity কমানো (১ এর নিচে নামবে না)
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        localStorage.setItem('cartItems', JSON.stringify(state.items));
      }
    },

    // ❌ নির্দিষ্ট আইটেম মুছে ফেলা
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(i => i.id !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },

    // 🧹 পুরো কার্ট ক্লিয়ার (Place Order এর পর)
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem('cartItems');
    },
  },
});

// 🔹 Action ও Reducer এক্সপোর্ট
export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
