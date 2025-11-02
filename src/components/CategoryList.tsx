import React from 'react';

interface Props {
  categories: string[];
  selected?: string | null;
  onSelect: (c: string | null) => void; // 🔹 Parent ke bole kon category select hoyeche
  sortOption: string; // 🔹 Parent theke current sort option receive kore
  onSortChange: (s: string) => void; // 🔹 Parent ke bole kon sort select hoyeche
}

// CategoryList Component
// Shop page er bam dike thakbe
// 1️⃣ Category buttons show korbe
// 2️⃣ Niche sorting options show korbe
// 3️⃣ Category select + sorting select korle parent ke notify korbe

const CategoryList: React.FC<Props> = ({ categories, selected, onSelect, sortOption, onSortChange }) => {

  // 🔹 Categories ke alphabetically sort kora
  // jate UI te always sorted show hoy
  const sortedCategories = [...categories].sort((a, b) => a.localeCompare(b));

  // 🔹 Sorting options joto possible
  const sortingOptions = [
    'Price: Low to High',
    'Price: High to Low',
    'Name: A-Z',
    'Name: Z-A',
  ];

  return (
    <div>
      {/* 🔹 Category Section */}
      <h4>Categories</h4>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {/* 🔹 "All" button always top e thakbe */}
        <li key="all">
          <button
            onClick={() => onSelect(null)} // 🔹 Parent ke bole "sob category select"
            style={{ fontWeight: selected === null ? 'bold' : 'normal' }} // 🔹 Selected category bold
          >
            All
          </button>
        </li>

        {/* 🔹 Sorted categories loop kore render kora */}
        {sortedCategories.map((c) => (
          <li key={c}>
            <button
              onClick={() => onSelect(c)} // 🔹 Parent ke bole kon category select
              style={{ fontWeight: selected === c ? 'bold' : 'normal' }} // 🔹 Bold for selected
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
        onChange={(e) => onSortChange(e.target.value)} // 🔹 Parent ke bole kon sort option select
        style={{ width: '100%', padding: '5px', marginTop: '10px' }}
      >
        {sortingOptions.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryList;
