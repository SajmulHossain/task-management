import { DndContext } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import Column from "./Column";
import { Link } from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth";

// const initialTasks = [
//   { id: 1, title: "Bhat khaite hobe", status: "to-do" },
//   { id: 2, title: "Bhat khacci", status: "in_progress" },
//   { id: 3, title: "Bhat khaici", status: "done" },
// ];

const columns = [
  { status: "to-do", title: "To-Do" },
  { status: "in_progress", title: "In Progress" },
  { status: "done", title: "Done" },
];

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    axios.get(`http://localhost:3000/tasks/${user?.email}`)
    .then(({data}) => {
      console.log(data);
      setTasks(data);
    })
    .catch(err => console.log(err))
  },[user?.email])

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id;
    const newCategory = over.id;

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, category: newCategory } : task
      )
    );

    try {
      await axios.patch(`http://localhost:3000/tasks/${taskId}`, {category: newCategory})
    } catch(err) {
      console.log(err);
    }
  };

  return (
    <section className="section mt-8">
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
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4 mt-4 flex-col lg:flex-row">
          {columns.map((column) => (
            <Column
              tasks={tasks.filter((task) => task?.category === column.status)}
              column={column}
              key={column?.status}
            />
          ))}
        </div>
      </DndContext>
    </section>
  );
};

export default Todo;
