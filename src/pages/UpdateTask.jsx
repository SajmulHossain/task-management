import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cruding from "../component/Cruding";
import Loading from "../component/Loading";
import toast from "react-hot-toast";

const UpdateTask = () => {
  const { user } = useAuth();
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const {isLoading, data:task={}} = useQuery({
    queryKey: ["task", id],
    queryFn: async () => {
      const { data } = await axios(`https://task-management-server-beryl-pi.vercel.app/task/${id}`);
      return data;
    },
  });

  const {mutateAsync, isPending} = useMutation({
    mutationKey: ['task', id],
    mutationFn: async(updatedData) => {
      const { data } = await axios.put(`http://localhost:3000/task/${id}`, updatedData);
      if(data?.modifiedCount) {
        toast.success("Updated Successfully!");
        navigate('/');
      } else {
        toast.error("Something Went Wrong!");
      }
    }
  })

  

  const handleUpdateTask = (e) => {
    e.preventDefault();

    setError("");

    const form = e.target;

    const title = form.title.value;
    const description = form.description.value;

    if (!title) {
      return setError("You must write your title.");
    }

    const data = {
      title,
      author: user?.email,
      description,
      timeStamp: new Date(),
      category: task?.category,
    };

    try {
      mutateAsync(data);
    } catch(err) {
      console.log(err);
    }
  };

  if(isLoading) {
    return <Loading />
  }

  return (
    <section className="section mt-6">
      <div className="max-w-[600px] mx-auto border border-main p-4 rounded backdrop-blur-lg bg-main/10">
        <form onSubmit={handleUpdateTask}>
          <h3 className="text-center font-semibold uppercase text-xl">
            Update Task
          </h3>
          {error && <p className="text-red-600 text-lg text-center">{error}</p>}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-semibold" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                id="title"
                defaultValue={task?.title}
                name="title"
                placeholder="Enter your task"
                className="border border-second px-3 py-1 rounded"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="description">Description</label>
              <textarea
                type="text"
                name="description"
                placeholder="Description (Optional)"
                defaultValue={task?.description}
                id="description"
                className="border h-40 border-second px-3 py-1 rounded"
              />
            </div>
            <button
              type="submit"
              disabled={isPending}
              className="btn bg-gradient-to-r disabled:bg-gray-500 from-main to-second text-white"
            >
              Update Task {isPending && <Cruding />}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdateTask;
