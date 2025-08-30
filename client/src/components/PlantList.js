import React, { useEffect, useState } from "react";
import axios from "axios";
import PlantCard from "./PlantCard";
import './PlantStyles.css';
const PlantList = ({ searchQuery, categoryFilter, sortOption }) => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPlants = async () => {
      setLoading(true);
      setError("");

      try {
        // Build URL
        let url = `https://plant-catalog-1.onrender.com/api/plants?search=${searchQuery || ""}`;
        if (categoryFilter && categoryFilter.length > 0) {
          url += `&category=${categoryFilter.join(",")}`;
        }

        const { data } = await axios.get(url);

        // Sort
        const sortedData = [...data];
        switch (sortOption) {
          case "priceAsc":
            sortedData.sort((a, b) => a.price - b.price);
            break;
          case "priceDesc":
            sortedData.sort((a, b) => b.price - a.price);
            break;
          case "nameAsc":
            sortedData.sort((a, b) => a.name.localeCompare(b.name));
            break;
          case "nameDesc":
            sortedData.sort((a, b) => b.name.localeCompare(a.name));
            break;
          default:
            break;
        }

        setPlants(sortedData);
      } catch {
        setError("Failed to fetch plants.");
      }

      setLoading(false);
    };

    fetchPlants();
  }, [searchQuery, categoryFilter, sortOption]);

  if (loading) return <p>Loading plants...</p>;
  if (error) return <p>{error}</p>;
  if (!plants.length) return <p>No plants found.</p>;

  return (
    <div
      className="plant-list"
      style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "15px" }}
    >
      {plants.map((plant) => (
        <PlantCard key={plant._id} plant={plant} />
      ))}
    </div>
  );
};

export default PlantList;
