/* eslint-disable react/prop-types */

import { useDraggable } from "@dnd-kit/core";
import { format } from "date-fns";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Cruding from "./Cruding";

const Task = ({ task, isPending, mutateAsync }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id.toString(),
    data: { category: task?.category },
  });
  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition: !transform ? "transform 0.2s ease" : undefined,
    touchAction: 'none'
  };

  const handleDelete = async () => {
   await mutateAsync(task?._id);
  }
  return (
    <div
      className="bg-main/10 cursor-grab relative text-main px-3 py-2 rounded"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      <h3 className="font-semibold">{task.title}</h3>
      {task?.description && (
        <p className="text-main/90 mt-1 text-sm">{task.description}</p>
      )}

      <p className="mt-4">
        <span className="text-black">Last Updated: </span>
        <span className="text-second font-semibold">
          {format(new Date(task?.timeStamp), "dd MMMM yyyy, HH:mm:ss")}
        </span>
      </p>

      <div className="absolute top-4 right-4 flex gap-4">
        <Link to={`/task/update/${task?._id}`}>
          <CiEdit className="text-second" size={24} />
        </Link>
        <button title="Double Tap To Delete" className="cursor-pointer" onClick={handleDelete}>
          {isPending ? <Cruding /> : <MdDelete color="red" size={24} />}
        </button>
      </div>
    </div>
  );
};

export default Task;