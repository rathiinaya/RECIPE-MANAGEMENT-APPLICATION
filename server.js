require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const Recipe = require("./models/recipe");


const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("🚀 Recipe API is running! Visit /api/recipes to fetch recipes.");
});

// ✅ GET All Recipes
app.get("/api/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch recipes" });
  }
});

// ✅ GET Single Recipe by ID
app.get("/api/recipes/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recipe" });
  }
});

// ✅ POST: Add a New Recipe
app.post("/api/recipes", async (req, res) => {
  let { title, ingredients, instructions, imageUrl } = req.body;

  if (!title || !Array.isArray(ingredients) || !instructions) {
    return res.status(400).json({ error: "Invalid input: All fields are required, and ingredients must be an array." });
  }

  try {
    const newRecipe = new Recipe({ title, ingredients, instructions, imageUrl });
    await newRecipe.save();
    res.status(201).json({ message: "Recipe added!", recipe: newRecipe });
  } catch (error) {
    res.status(500).json({ message: "Failed to save recipe" });
  }
});

// ✅ UPDATE Recipe
app.put("/api/recipes/:id", async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRecipe) return res.status(404).json({ message: "Recipe not found" });
    res.json({ message: "Recipe updated", recipe: updatedRecipe });
  } catch (error) {
    res.status(500).json({ message: "Error updating recipe" });
  }
});

// ✅ DELETE Recipe
app.delete("/api/recipes/:id", async (req, res) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!deletedRecipe) return res.status(404).json({ message: "Recipe not found" });
    res.json({ message: "Recipe deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting recipe" });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
