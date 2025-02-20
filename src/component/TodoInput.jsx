

const TodoInput = () => {
  return (
    <div className="flex gap-2 justify-center">
      <input type="text" placeholder="Enter your task" className="border border-second px-3 py-1 rounded" />
      <button className="btn bg-gradient-to-r from-main to-second text-white">Add Task</button>
    </div>
  );
};

export default TodoInput;