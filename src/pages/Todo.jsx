import TodoItem from "../components/TodoItem.jsx";
import { useEffect, useState } from "react";

const API_BASE = "https://todobackend-s9ip.onrender.com/todos";
function Todo() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetch(API_BASE)
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
      });
  }, []);

  const addTodo = () => {
    if (inputValue.trim() === "") return;
    fetch(API_BASE, {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({ text: inputValue }),
    })
      .then((res) => res.json())
      .then((newTodo) => {
        setTodos([...todos, newTodo]);
        setInputValue("");
      });
  };
  const onToggled = (id) => {
    fetch(`${API_BASE}/${id}`, {
      method: "put",
    })
      .then((res) => res.json())
      .then((updatedTodo) =>
        setTodos(
          todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
        )
      );
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-100 overflow-y-auto top-0">
      <h1
        className="text-7xl font-bold "
        style={{ "text-shadow": "2px 2px rgba(19, 18, 18, 0.4)" }}
      >
        Todo List
      </h1>
      <div className="flex flex-row items-center mt-10">
        <input
          type="text"
          value={inputValue}
          placeholder="Add new task..."
          onChange={(e) => setInputValue(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 mr-5 w-full max-w-md"
        />
        <button onClick={addTodo} className="px-4 py-2 bg-green-500 rounded-xl">
          Add
        </button>
      </div>

      <div className="w-full max-w-md mt-8">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggled}
            onDelete={(id) =>
              fetch(`${API_BASE}/${id}`, {
                method: "Delete",
              })
                .then((res) => res.json())
                .then(() => {
                  setTodos(todos.filter((t) => t.id !== id));
                })
            }
          />
        ))}
      </div>
    </div>
  );
}
export default Todo;
