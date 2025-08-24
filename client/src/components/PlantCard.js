import React from "react";
import './PlantStyles.css';
const PlantCard = ({ plant }) => {
  return (
    <div className="plant-card">
      <h3>{plant.name}</h3>
      <p>Price: ₹{plant.price}</p>
      <p>
        Categories: {plant.categories.join(", ")}
      </p>
      <p>Stock: {plant.inStock ? "Yes" : "No"}</p>
    </div>
  );
};

export default PlantCard;
