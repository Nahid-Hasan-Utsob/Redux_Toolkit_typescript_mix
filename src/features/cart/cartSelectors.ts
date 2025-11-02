import type { RootState } from '../../store';


export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartCount = (state: RootState) => state.cart.items.reduce((s, it) => s + it.quantity, 0);
export const selectCartTotal = (state: RootState) => state.cart.items.reduce((s, it) => s + it.price * it.quantity, 0);