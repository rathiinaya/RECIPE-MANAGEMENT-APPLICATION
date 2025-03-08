const express = require("express");
const Recipe = require("../models/Recipe");
const router = express.Router();

// GET all recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new recipe
router.post("/", async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body);
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT to update a recipe
router.put("/:id", async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedRecipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET a random recipe
router.get("/random", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    if (recipes.length === 0) return res.status(404).json({ message: "No recipes found" });
    const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
    res.json(randomRecipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
