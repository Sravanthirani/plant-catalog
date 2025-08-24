import React, { useState } from "react";
import './PlantStyles.css';
const categoriesList = ["Indoor", "Outdoor", "Succulent", "Air Purifying", "Home Decor", "Medicinal"];

const Filter = ({ onSearchChange, onCategoryChange }) => {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    onSearchChange(e.target.value); // ✅ only inside event
  };

  const handleCategoryToggle = (category) => {
    let updatedCategories;
    if (selectedCategories.includes(category)) {
      updatedCategories = selectedCategories.filter((c) => c !== category);
    } else {
      updatedCategories = [...selectedCategories, category];
    }
    setSelectedCategories(updatedCategories);
    onCategoryChange(updatedCategories); // ✅ only inside event
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search plants..."
        value={search}
        onChange={handleSearch}
      />

      <div>
        {categoriesList.map((category) => (
          <label key={category}>
            <input
              type="checkbox"
              value={category}
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryToggle(category)}
            />
            {category}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Filter;
