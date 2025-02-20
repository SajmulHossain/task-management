import { RiLoader5Fill } from "react-icons/ri";


const Loading = () => {
  return (
    <div className="flex min-h-screen justify-center items-center">
      <RiLoader5Fill size={60} className="animate-spin text-main" />
    </div>
  );
};

export default Loading;