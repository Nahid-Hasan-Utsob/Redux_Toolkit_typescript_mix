import React from 'react';


interface Props {
categories: string[];
selected?: string | null;
onSelect: (c: string | null) => void;
}


// CategoryList: Shop page er bam dike category list. Click korle parent component ke notify kore.


const CategoryList: React.FC<Props> = ({ categories, selected, onSelect }) => {
return (
<div>
<h4>Categories</h4>
<ul style={{ listStyle: 'none', padding: 0 }}>
<li key="all">
<button onClick={() => onSelect(null)} style={{ fontWeight: selected === null ? 'bold' : 'normal' }}>
All
</button>
</li>
{categories.map((c) => (
<li key={c}>
<button onClick={() => onSelect(c)} style={{ fontWeight: selected === c ? 'bold' : 'normal' }}>
{c}
</button>
</li>
))}
</ul>
</div>
);
};


export default CategoryList;