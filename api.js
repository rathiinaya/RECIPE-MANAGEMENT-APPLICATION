import axios from "axios";

const API_URL = "http://localhost:5001/api/recipes"; // Change if needed

export const getRecipes = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getRecipeById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const addRecipe = async (recipeData) => {
  const response = await axios.post(API_URL, recipeData);
  return response.data;
};

export const getRandomRecipe = async () => {
  const response = await axios.get(`${API_URL}/random`);
  return response.data;
};

export const updateRecipeCategory = async (recipeId, newCategory) => {
  const response = await axios.put(`${API_URL}/${recipeId}`, { category: newCategory });
  return response.data;
};
