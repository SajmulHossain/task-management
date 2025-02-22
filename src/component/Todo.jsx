import { DndContext } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import Column from "./Column";
import { Link } from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const columns = [
  { status: "to-do", title: "To-Do" },
  { status: "in_progress", title: "In Progress" },
  { status: "done", title: "Done" },
];

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const { user } = useAuth();

  const fetchTask = () => {
    axios
      .get(
        `https://task-management-server-beryl-pi.vercel.app/tasks/${user?.email}`
      )
      .then(({ data }) => {
        setTasks(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchTask();
  }, []);

  const {mutateAsync, isPending} = useMutation({
    mutationKey: ['task', user?.email],
    mutationFn: async(id) => {
      const {data} = await axios.delete(`http://localhost:3000/task/${id}`)
      if(data?.deletedCount) {
        toast.success('Deleted Successfully!');
        fetchTask();
      } else {
        toast.error('Something Went Wrong!');
      }
    }
  })

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
      await axios.patch(
        `https://task-management-server-beryl-pi.vercel.app/tasks/${taskId}`,
        { category: newCategory }
      );
    } catch (err) {
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
              mutateAsync={mutateAsync}
              isPending={isPending}
              key={column?.status}
            />
          ))}
        </div>
      </DndContext>
    </section>
  );
};

export default Todo;
