import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "./RecipeOrganizer.css"; // Ensure you have styles for UI

const initialRecipes = [
  { id: "1", title: "Pasta" },
  { id: "2", title: "Salad" },
  { id: "3", title: "Pizza" }, // Added another item for better drag testing
];

const RecipeOrganizer = () => {
  const [recipes, setRecipes] = useState(initialRecipes);

  const handleDragEnd = (result) => {
    if (!result.destination) return; // Exit if dropped outside
    if (result.source.index === result.destination.index) return; // Exit if dropped at the same position

    const newOrder = [...recipes];
    const [movedItem] = newOrder.splice(result.source.index, 1);
    newOrder.splice(result.destination.index, 0, movedItem);
    setRecipes(newOrder);
  };

  return (
    <div className="recipe-organizer">
      <h2>Organize Recipes</h2>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="recipes">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="recipe-list">
              {recipes.map((recipe, index) => (
                <Draggable key={recipe.id} draggableId={recipe.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="recipe-card"
                    >
                      {recipe.title}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default RecipeOrganizer;
