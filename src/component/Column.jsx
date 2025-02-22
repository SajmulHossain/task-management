/* eslint-disable react/prop-types */
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import Task from "./Task";
import { useDroppable } from "@dnd-kit/core";

const Column = ({ tasks, column, isPending, mutateAsync }) => {
  const { setNodeRef } = useDroppable({
    id: column.status,
  });
  return (
    <div
      ref={setNodeRef}
      className="flex w-full min-h-40 flex-col gap-2 bg-second/10 p-4 rounded"
    >
      <h3 className="bg-second/15 w-fit px-4 py-1 font-bold border-b-4 border-second">
        {column?.title}
      </h3>
      <hr className="text-main" />
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {tasks.map((task) => (
          <Task
            key={task._id}
            mutateAsync={mutateAsync}
            isPending={isPending}
            task={task}
          />
        ))}
      </SortableContext>
    </div>
  );
};

export default Column;