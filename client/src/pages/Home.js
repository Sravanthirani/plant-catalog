import React, { useState } from "react";
import Filter from "../components/Filter";
import PlantList from "../components/PlantList";
import '../index.css'

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [sortOption, setSortOption] = useState("");

  return (
    <div className="home-container">
      {/* Main Content */}
      <div className="home-content">
        {/* Page Title */}
        <h1 className="home-title">Mini Plant Store</h1>

        {/* Filter Section */}
        <div className="filter-section">
          <Filter
            onSearchChange={setSearchQuery}
            onCategoryChange={setCategoryFilter}
            onSortChange={setSortOption}
          />
        </div>

        {/* Plant List */}
        <PlantList
          searchQuery={searchQuery}
          categoryFilter={categoryFilter}
          sortOption={sortOption}
        />
      </div>
    </div>
  );
};

export default Home;
