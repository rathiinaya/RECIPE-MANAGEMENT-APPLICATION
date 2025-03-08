import { useDrag } from "react-dnd";

const DraggableRecipe = ({ recipe, index }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "RECIPE",
    item: { index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="draggable-recipe"
      style={{
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      {recipe.title}
    </div>
  );
};

export default DraggableRecipe;
