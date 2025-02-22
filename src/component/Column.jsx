/* eslint-disable react/prop-types */
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import Task from "./Task";
import { useDroppable } from "@dnd-kit/core";

const Column = ({tasks, column}) => {
  const {setNodeRef} = useDroppable({
    id: column.status
  })
  return (
    <div ref={setNodeRef} className="flex w-full lg:max-w-full min-h-40 max-w-96 flex-col gap-2 bg-second/10 p-4 rounded">
      <h3 className="bg-second/15 w-fit px-4 py-1 font-bold">{column?.title}</h3>
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {tasks.map((task) => (
          <Task key={task._id} task={task} />
        ))}
      </SortableContext>
    </div>
  );
};

export default Column;