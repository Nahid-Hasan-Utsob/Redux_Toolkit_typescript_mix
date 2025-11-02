# 🛍️ My Shop - React + Redux Toolkit + React Query + TypeScript

## Overview
এই project টি একটি ছোট e-commerce shop এর simulation।  
React, TypeScript, Redux Toolkit এবং React Query ব্যবহার করে বানানো হয়েছে।  
Main features:

- Home page: সব product দেখাবে
- Shop page: category filter + sorting support
- Product details page: একেক product এর details
- Cart: add, quantity increase/decrease, delete, total price
- Local Storage support: page reload e cart persist হবে
- Place order button: cart clear করবে

---

## 🏗 Project Structure

📦src
 ┣ 📂api
 ┃ ┣ 📜apiType.ts
 ┃ ┗ 📜productsApi.ts
 ┣ 📂assets
 ┃ ┗ 📜react.svg
 ┣ 📂components
 ┃ ┣ 📜CategoryList.tsx
 ┃ ┣ 📜Header.tsx
 ┃ ┗ 📜ProductCard.tsx
 ┣ 📂data
 ┣ 📂features
 ┃ ┗ 📂cart
 ┃ ┃ ┣ 📜Cart.tsx
 ┃ ┃ ┣ 📜cartSelectors.ts
 ┃ ┃ ┗ 📜cartSlice.ts
 ┣ 📂pages
 ┃ ┣ 📜Home.tsx
 ┃ ┣ 📜ProductDetails.tsx
 ┃ ┗ 📜Shop.tsx
 ┣ 📜App.css
 ┣ 📜App.tsx
 ┣ 📜index.css
 ┣ 📜main.tsx
 ┗ 📜store.ts



---

## ⚡ Step-by-Step Explanation

### 1️⃣ Redux Toolkit (cartSlice.ts)

- **Purpose:** Cart state manage করা + local storage persist
- **Key points:**
  - `initialState` → localStorage থেকে load হবে, না থাকলে empty array
  - `addToCart` → duplicate prevent, initial quantity 1
  - `increaseQuantity` / `decreaseQuantity` → 1 এর নিচে quantity যাবে না
  - `removeFromCart` → single item delete
  - `clearCart` → place order e call হয়
- **Local Storage:** সব update এর পর sync হয়, page reload e state lose হয় না

**Example snippet:**
```ts
const exists = state.items.find(item => item.id === action.payload.id);
if (!exists) state.items.push({ ...action.payload, quantity: 1 });




Cart Selectors (cartSelectors.ts)
*******************************************
Purpose: Cart state থেকে derived data nite
Selectors:
selectCartItems → sob cart items
selectCartCount → total items quantity
selectCartTotal → total price
Safe access: Optional chaining + fallback value

export const selectCartCount = (state: RootState) =>
  state.cart?.items?.reduce((s, it) => s + it.quantity, 0) || 0;


React Query (Home.tsx, Shop.tsx, ProductDetails.tsx)
*********************************************************
Purpose: API call / data fetch handle করা
Key points:
useQuery(['products'], fetchProducts) → fetch all products
useQuery(['product', id], () => fetchProductById(id)) → single product
isLoading / isError handle করা
React Query Benefits: caching, background fetching, auto re-fetch


Components
*********************************************
ProductCard.tsx
Product display + Add to Cart button
dispatch(addToCart(...)) call করে Redux update করে
CategoryList.tsx
Left side category filter
Click → parent page e selected category update
Sorting support:

const sortedCategories = [...categories].sort();


Header.tsx
Shop Name + Home link
Cart count show
Click on cart → navigate /cart
<Link to="/cart">Cart: {count} item{count !== 1 ? 's' : ''}</Link>



Cart.tsx
******************************************
Features:
Show all cart items
Increase / Decrease quantity (minimum 1)
Delete individual item
Total price
Place order → clears cart
Local Storage synced: reload e data safe
Code snippet:

<button onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
<button onClick={() => dispatch(decreaseQuantity(item.id))}>-</button>
<button onClick={() => dispatch(removeFromCart(item.id))}>Delete</button>



React Router Setup (App.tsx)
************************************************
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/shop" element={<Shop />} />
  <Route path="/product/:id" element={<ProductDetails />} />
  <Route path="/cart" element={<Cart />} />
</Routes>
/ → Home page
/shop → Shop page
/product/:id → Product detail
/cart → Cart page

TypeScript
******************************
Strong typing
Interfaces: CartItem, CartState, Product
Ensures type safety throughout app

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}


Local Storage
************************************
Cart state update hole auto sync
Refresh e cart persist
Place order e cart clear

Next Steps / Improvements
************************************************
Add search bar
Add category + price filter simultaneously
Add mini-cart dropdown in header
Use React Query mutation for real API


Conclusion
************************************************
Project structure clear + scalable
Redux Toolkit for state + localStorage
React Query for async data fetch
TypeScript for type safety
Professional step-by-step modular design



