import { useState, useEffect } from "react";

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  // Load todos from local storage when the app starts
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  }, []);

  // Save todos to local storage when there are changes
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  function addTask() {
    if (!newTodo.trim()) return;
    setTodos((prevTodos) => [...prevTodos, { id: Date.now(), text: newTodo, completed: false }]);
    setNewTodo("");
  }

  function removeTask(id) {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  function completeTask(id) {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          ✅ To-Do List
        </h1>

        <div className="flex gap-2 mb-4">
          <input
            className="flex-1 p-2 border rounded-xl outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Enter your task..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-xl transition"
            onClick={addTask}
          >
            Add
          </button>
        </div>

        <ul className="space-y-2">
          {todos.length === 0 ? (
            <p className="text-gray-500 text-center">No tasks added yet.</p>
          ) : (
            todos.map((todo) => (
              <li
                key={todo.id}
                className={`flex justify-between items-center p-2 rounded-lg ${
                  todo.completed ? "bg-green-100 line-through" : "bg-gray-200"
                }`}
              >
                <span className="flex-1">{todo.text}</span>
                <button
                  className="bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded-md transition"
                  onClick={() => removeTask(todo.id)}
                >
                  🗑️
                </button>
                <button
                  className="bg-indigo-400 hover:bg-indigo-500 text-white px-3 py-1 rounded-md transition"
                  onClick={() => completeTask(todo.id)}
                >
                  {todo.completed ? "Undo" : "✔"}
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
