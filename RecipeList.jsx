import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRecipes } from "../api";
import "./RecipeList.css"; // Import CSS

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getRecipes()
      .then(setRecipes)
      .catch((err) => {
        console.error("Error fetching recipes:", err);
        setError("Failed to load recipes. Please try again.");
      });
  }, []);

  return (
    <div className="recipe-list-container">
      <h2>Recipe List</h2>

      {error && <p className="error-message">{error}</p>}
      {recipes.length === 0 && !error ? <p>No recipes available.</p> : null}

      <ul className="recipe-list">
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <Link to={`/recipe/${recipe._id}`} className="recipe-link">
              {recipe.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
