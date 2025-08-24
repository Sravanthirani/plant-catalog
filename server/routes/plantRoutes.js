const express = require("express");
const { getPlants, addPlant } = require("../controllers/plantController");
const router = express.Router();
const Plant = require("../models/Plant"); 

// Routes
router.get("/", getPlants);
router.post("/", addPlant);

module.exports = router;
