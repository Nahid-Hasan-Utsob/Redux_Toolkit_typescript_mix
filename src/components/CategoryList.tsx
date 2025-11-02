import React from 'react';

// 🔹 Props define kora hocche je CategoryList component ki ki receive korbe
interface Props {
  categories: string[]; // 🔹 Shop page theke sob category list
  selected?: string | null; // 🔹 Currently selected category (optional)
  onSelect: (c: string | null) => void; // 🔹 Parent ke bole kon category select hoyeche
  sortOption: string; // 🔹 Currently selected sort option
  onSortChange: (s: string) => void; // 🔹 Parent ke bole kon sort select hoyeche
}

// 🔹 Functional component CategoryList
const CategoryList: React.FC<Props> = ({ categories, selected, onSelect, sortOption, onSortChange }) => {
  // 🔹 Categories alphabetically sort kora jate UI te always sorted show hoy
  const sortedCategories = [...categories].sort((a, b) => a.localeCompare(b));

  // 🔹 Sorting options joto possible, dropdown e show korar jonno
  const sortingOptions = ['Price: Low to High', 'Price: High to Low', 'Name: A-Z', 'Name: Z-A'];

  return (
    <div>
      {/* 🔹 Category Section */}
      <h4>Categories</h4>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {/* 🔹 "All" button always top e thakbe */}
        <li key="all">
          <button
            onClick={() => onSelect(null)} // 🔹 Click korle parent ke notify kore "All" select
            style={{ fontWeight: selected === null ? 'bold' : 'normal' }} // 🔹 Selected category bold
          >
            All
          </button>
        </li>

        {/* 🔹 Sorted categories loop kore render kora */}
        {sortedCategories.map((c) => (
          <li key={c}>
            <button
              onClick={() => onSelect(c)} // 🔹 Click korle parent ke notify kore oi category select
              style={{ fontWeight: selected === c ? 'bold' : 'normal' }} // 🔹 Bold for selected category
            >
              {c}
            </button>
          </li>
        ))}
      </ul>

      {/* 🔹 Sorting Section */}
      <h4>Sort Products</h4>
      <select
        value={sortOption} // 🔹 Current selected sort option
        onChange={(e) => onSortChange(e.target.value)} // 🔹 Parent ke notify kore kon sort option select
        style={{ width: '100%', padding: '5px', marginTop: '10px' }}
      >
        {/* 🔹 Loop kore sob sorting options render */}
        {sortingOptions.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

// 🔹 Export kore diche jate parent component import kore use korte pare
export default CategoryList;
