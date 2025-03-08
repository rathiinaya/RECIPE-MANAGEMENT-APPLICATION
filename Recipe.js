const mongoose = require("mongoose");

// Define Schema
const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: { type: [String], required: true },
  instructions: { type: String, required: true },
  imageUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// Create Model
const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
