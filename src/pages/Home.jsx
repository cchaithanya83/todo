import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleEnter = () => {
    navigate("/todo");
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-100">
      <h1 className="text-7xl">ToDo List</h1>
      <button
        className="px-4 py-2 bg-green-500 rounded-xl shadow-md shadow-black mt-10"
        onClick={handleEnter}
      >
        Enter
      </button>
    </div>
  );
}

export default Home;
