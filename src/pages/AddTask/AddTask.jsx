import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import Cruding from "../../component/Cruding";
import { useMutation } from "@tanstack/react-query";

const AddTask = () => {
  const [error, setError] = useState();

  const {isPending, mutateAsync} = useMutation({
    mutationKey: ['tasks'],
    mutationFn: async(data) => {
         axios.post("http://localhost:3000/tasks", data).then(({ data }) => {
           if (data?.insertedId) {
             toast.success("Task Successfully added!");
           } else {
             toast.error("Something Went Wrong!");
           }
         });
    } 
  })

  const handleAddTask = e => {
    e.preventDefault();

    const form = e.target;

    const title = form.title.value;
    const description = form.description.value;

    if(!title) {
      return setError('You must write your title.');
    }

    const data = {
      title,
      description,
      timeStamp: new Date(),
      category: 'to-do'
    }
    
   try {
    mutateAsync(data);
   } catch (err) {
    console.log(err);
   }


    
  }
  return (
    <section className="section mt-6">
      <div className="max-w-[600px] mx-auto border border-main p-4 rounded backdrop-blur-lg bg-main/10">
        <form onSubmit={handleAddTask}>
          <h3 className="text-center font-semibold uppercase text-xl">
            Add Task
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
                name="title"
                placeholder="Enter your task"
                className="border border-second px-3 py-1 rounded"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                name="description"
                placeholder="Description (Optional)"
                id="description"
                className="border border-second px-3 py-1 rounded"
              />
            </div>
            <button
              type="submit"
              disabled={isPending}
              className="btn bg-gradient-to-r disabled:bg-gray-500 from-main to-second text-white"
            >
              Add Task {isPending && <Cruding />}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddTask;
