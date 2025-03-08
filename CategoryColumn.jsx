import { useDrop } from "react-dnd";
import DraggableRecipe from "./DraggableRecipe";

const CategoryColumn = ({ category, recipes, moveRecipe }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "RECIPE",
    drop: (item) => moveRecipe(item.id, category), // Now using item.id instead of index
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className="category-column"
      style={{
        backgroundColor: isOver ? "lightblue" : "#f4f4f4",
      }}
    >
      <h3>{category}</h3>
      {recipes.map((recipe) => (
        <DraggableRecipe key={recipe._id} id={recipe._id} recipe={recipe} moveRecipe={moveRecipe} />
      ))}
    </div>
  );
};

export default CategoryColumn;
