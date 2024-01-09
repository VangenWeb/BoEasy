import { type DraggableLocation } from "react-beautiful-dnd";

export const onChange = (
  source: DraggableLocation,
  destination: DraggableLocation,
) => {
  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return true;
  }
  return false;
};
