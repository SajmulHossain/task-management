/* eslint-disable react/prop-types */

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Task = ({id, title}) => {
  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id})
  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }
  return (
    <div className="bg-main/10 text-main px-3 py-2 rounded" ref={setNodeRef} {...attributes} {...listeners} style={style}>
      <h3 className="font-semibold">{title}</h3>
    </div>
  );
};

export default Task;