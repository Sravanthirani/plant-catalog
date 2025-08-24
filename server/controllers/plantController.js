const Plant = require("../models/Plant");

// GET all plants
// GET all plants
const getPlants = async (req, res) => {
  try {
    const { search, category } = req.query;

    let query = {};
    if (search) {
      query.name = { $regex: search, $options: "i" }; // case-insensitive search
    }

    if (category) {
      // convert query string into array (if multiple categories are selected)
      const categoriesArray = Array.isArray(category) ? category : category.split(",");

      // ✅ AND condition: plant must include *all* selected categories
      query.categories = { $all: categoriesArray };
    }

    const plants = await Plant.find(query);
    res.status(200).json(plants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// POST add a new plant
const addPlant = async (req, res) => {
  try {
    const { name, price, categories, inStock } = req.body;

    if (!name || !price || !categories) {
      return res.status(400).json({ error: "Please fill all required fields" });
    }

    const plant = new Plant({ name, price, categories, inStock });
    const saved = await plant.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getPlants, addPlant };
