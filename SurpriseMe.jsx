import { useNavigate } from "react-router-dom";

const SurpriseMeButton = () => {
  const navigate = useNavigate();

  const fetchRandomRecipe = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/recipes/random"); // Ensure API is correct
      if (!response.ok) throw new Error("Failed to fetch random recipe");

      const data = await response.json();
      if (data?._id) {
        navigate(`/recipe/${data._id}`); // Navigate to the recipe details page
      } else {
        alert("No random recipe found.");
      }
    } catch (error) {
      console.error("Error fetching random recipe:", error);
      alert("Failed to load a random recipe. Please try again!");
    }
  };

  return (
    <button onClick={fetchRandomRecipe} className="surprise-me-btn">
      Surprise Me
    </button>
  );
};

export default SurpriseMeButton;
