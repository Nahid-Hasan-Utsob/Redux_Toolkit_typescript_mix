// Redux Toolkit slice: ekhane cart state manage hobe.
// Banglish comment: "Ekhane Redux Toolkit use korchi - cart add/remove/clear er jonno"
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';


export interface CartItem {
id: string;
title: string;
price: number;
quantity: number;
}


interface CartState {
items: CartItem[];
}


const initialState: CartState = { items: [] };


const cartSlice = createSlice({
name: 'cart',
initialState,
reducers: {
addToCart(state, action: PayloadAction<{ id: string; title: string; price: number }>) {
const { id, title, price } = action.payload;
const existing = state.items.find((it) => it.id === id);
if (existing) {
existing.quantity += 1;
} else {
state.items.push({ id, title, price, quantity: 1 });
}
},
removeFromCart(state, action: PayloadAction<string>) {
state.items = state.items.filter((it) => it.id !== action.payload);
},
clearCart(state) {
state.items = [];
}
}
});


export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;