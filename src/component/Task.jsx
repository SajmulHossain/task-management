/* eslint-disable react/prop-types */

import { useDraggable } from "@dnd-kit/core";

const Task = ({task}) => {
  
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: task._id.toString(),
    data: {category: task?.category}
  })
  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition: !transform ? "transform 0.2s ease" : undefined,
  };
  return (
    <div className="bg-main/10 cursor-grab text-main px-3 py-2 rounded" ref={setNodeRef} {...attributes} {...listeners} style={style}>
      <h3 className="font-semibold">{task.title}</h3>
    </div>
  );
};

export default Task;