/* eslint-disable react/prop-types */
import { SortableContext } from "@dnd-kit/sortable";
import Task from "./Task";

const Column = ({tasks, column}) => {
  return (
    <div className="flex flex-col gap-2 bg-second/10 p-4 rounded">
      <h3>{column?.title}</h3>
      <SortableContext items={tasks} strategy={CountQueuingStrategy}>
        {tasks.map((task) => (
          <Task key={task.id} id={task?.id} title={task?.title} />
        ))}
      </SortableContext>
    </div>
  );
};

export default Column;