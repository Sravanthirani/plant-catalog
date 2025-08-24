const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Plant = require("./models/Plant");
const plants = require("./data/plants");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected");
    await Plant.deleteMany(); // clear previous
    await Plant.insertMany(plants);
    console.log("Plants seeded successfully");
    process.exit();
  })
  .catch(err => console.error(err));
