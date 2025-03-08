import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./HeroSection";  
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";
import RecipeForm from "./components/RecipeForm";
import RecipeOrganizer from "./components/RecipeOrganizer";
import "./App.css";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HeroSection />} /> {/* Hero Section only as route */}
        <Route path="/recipes" element={<RecipeList />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/add-recipe" element={<RecipeForm />} />
        <Route path="/organizer" element={<RecipeOrganizer />} />
      </Routes>
    </>
  );
};

export default App;
