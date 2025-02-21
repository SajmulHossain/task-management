/* eslint-disable react/prop-types */
import { horizontalListSortingStrategy, rectSwappingStrategy, SortableContext } from "@dnd-kit/sortable";
import Task from "./Task";

const Column = ({tasks}) => {
  return (
    <div className="flex flex-col gap-2 bg-second/10 p-4 rounded">
      <SortableContext items={tasks} strategy={CountQueuingStrategy}>
        {tasks.map((task) => (
          <Task key={task.id} id={task?.id} title={task?.title} />
        ))}
      </SortableContext>
    </div>
  );
};

export default Column;