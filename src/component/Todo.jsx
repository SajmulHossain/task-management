import { closestCorners, DndContext } from "@dnd-kit/core";
import { useState } from "react";
import Column from "./Column";
import { arrayMove } from "@dnd-kit/sortable";
import { Link } from "react-router-dom";

const initialTasks = [
  { id: 1, title: "Bhat khaite hobe", status: "to-do" },
  { id: 2, title: "Bhat khacci", status: "in_progress" },
  { id: 3, title: "Bhat khaici", status: "done" },
];

const columns = [
  {status: 'to-do', title: 'To-Do'},
  {status: 'in_progress', title: 'In Progress'},
  {status: 'done', title: 'Done'}
]

const Todo = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || !over) return;

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === active.id ? { ...task, status: over.id } : task
      )
    );
  };

  return (
    <section className="section mt-8 /">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg">Todo Board:</h3>
        <div>
          <Link
            to="/add-task"
            className="btn bg-gradient-to-r from-main to-second text-white"
          >
            Add Task
          </Link>
        </div>
      </div>
      <DndContext  onDragEnd={handleDragEnd}>
        <div className="flex space-x-4 mt-4">
          {/* {Object.keys(columns).map((columnId) => (
            <Column
              key={columnId}
              id={columnId}
              title={columns[columnId].name}
              color={columns[columnId].color}
              tasks={tasks.filter((task) => task.status === columnId)}
            />
          ))} */}

          {
            columns.map(column => <Column tasks={tasks.filter(task => task?.status === column.status)} column={column} key={column?.status} />)
          }
        </div>
      </DndContext>
    </section>
  );
};

export default Todo;


