import { useEffect, useState } from "react";
import { fetchRecipes } from "./api";

function App() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes().then((data) => setRecipes(data));
  }, []);

  return (
    <div>
      <h1>Recipe List</h1>
      <ul>
        {recipes.map((recipe, index) => (
          <li key={index}>{recipe.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
