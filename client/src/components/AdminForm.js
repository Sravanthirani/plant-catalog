import React, { useState } from "react";
import axios from "axios";
import './PlantStyles.css';

const categoriesList = ["Indoor", "Outdoor", "Succulent", "Air Purifying", "Home Decor", "Medicinal", "Other"];

const AddPlant = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [otherCategory, setOtherCategory] = useState("");
  const [inStock, setInStock] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleCategoryToggle = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
      if (category === "Other") setOtherCategory(""); // reset other category
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!name || !price || (selectedCategories.length === 0)) {
      setError("Please fill all fields and select at least one category.");
      return;
    }

    // If "Other" is selected, ensure they typed a category
    let categories = selectedCategories.filter(c => c !== "Other");
    if (selectedCategories.includes("Other")) {
      if (!otherCategory.trim()) {
        setError("Please type a category for 'Other'.");
        return;
      }
      categories.push(otherCategory.trim());
    }

    try {
      const newPlant = { name, price: Number(price), categories, inStock };
      await axios.post("http://localhost:5000/api/plants", newPlant);
      setSuccess("Plant added successfully!");
      setError("");
      // Reset form
      setName("");
      setPrice("");
      setSelectedCategories([]);
      setOtherCategory("");
      setInStock(true);
    } catch (err) {
      setError("Failed to add plant.");
      setSuccess("");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "20px auto", display: "flex", flexDirection: "column", gap: "10px" }}>
      <h2>Add New Plant</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <input
        type="text"
        placeholder="Plant Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <div>
        <p>Select Categories:</p>
        {categoriesList.map((category) => (
          <label key={category} style={{ display: "block", cursor: "pointer" }}>
            <input
              type="checkbox"
              value={category}
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryToggle(category)}
            />
            {category}
          </label>
        ))}
        {selectedCategories.includes("Other") && (
          <input
            type="text"
            placeholder="Type other category"
            value={otherCategory}
            onChange={(e) => setOtherCategory(e.target.value)}
            style={{ marginTop: "5px", padding: "5px", width: "100%" }}
          />
        )}
      </div>

      <label>
        <input
          type="checkbox"
          checked={inStock}
          onChange={() => setInStock(!inStock)}
        />
        Available in Stock
      </label>

      <button type="submit" style={{ padding: "5px 10px" }}>Add Plant</button>
    </form>
  );
};

export default AddPlant;
