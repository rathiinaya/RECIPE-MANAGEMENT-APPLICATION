import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addRecipe } from "../api"; // Import API call function
import "./RecipeForm.css"; // Import CSS for styling

const RecipeForm = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !instructions.trim()) {
      setError("Title and instructions are required!");
      return;
    }

    try {
      await addRecipe({ title, ingredients, instructions });
      navigate("/"); // Redirect to homepage after successful submission
    } catch (err) {
      console.error("Error adding recipe:", err);
      setError("Failed to create recipe. Please try again!");
    }
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const addIngredientField = () => {
    setIngredients([...ingredients, ""]);
  };

  const removeIngredientField = (index) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="recipe-form-container">
      <h2>New Recipe</h2>
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="recipe-form">
        <input
          type="text"
          placeholder="Recipe Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="input-field"
        />

        <h4>Ingredients</h4>
        {ingredients.map((ingredient, index) => (
          <div key={index} className="ingredient-field">
            <input
              type="text"
              placeholder={`Ingredient ${index + 1}`}
              value={ingredient}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
              className="input-field"
            />
            {ingredients.length > 1 && (
              <button type="button" onClick={() => removeIngredientField(index)} className="remove-btn">
                ❌
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addIngredientField} className="add-btn">
          ➕ Add Ingredient
        </button>

        <textarea
          placeholder="Instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          required
          className="textarea-field"
        />

        <button type="submit" className="btn btn-primary">Create Recipe</button>
      </form>
    </div>
  );
};

export default RecipeForm;
