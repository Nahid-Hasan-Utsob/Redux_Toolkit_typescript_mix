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