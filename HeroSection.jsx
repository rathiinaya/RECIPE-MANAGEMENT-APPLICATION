import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HeroSection.css";

const HeroSection = () => {
  const navigate = useNavigate();

  // Function to fetch a random recipe
  const fetchRandomRecipe = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/recipes/random");
      const data = await response.json();

      if (data && data._id) {
        navigate(`/recipe/${data._id}`);
      } else {
        alert("No random recipe found.");
      }
    } catch (error) {
      console.error("Error fetching random recipe:", error);
      alert("Failed to load a random recipe. Please try again!");
    }
  };

  return (
    <section className="hero">

      <div className="hero-content">
        <h1>Your All-in-One Recipe Manager & Planner</h1>
        <p>Discover, add, organize, and cook delicious meals</p>

        {/* Buttons Section */}
        <div className="hero-buttons">
          <button onClick={fetchRandomRecipe} className="btn btn-secondary">
            Surprise Me!
          </button>

          <Link to="/add-recipe">
            <button className="btn btn-outline">+ Add Recipe</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
