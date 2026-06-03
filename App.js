import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === "") return;

    if (editId) {
      setTasks(
        tasks.map((t) =>
          t.id === editId ? { ...t, text: task } : t
        )
      );
      setEditId(null);
    } else {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text: task,
          completed: false,
        },
      ]);
    }

    setTask("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const editTask = (id) => {
    const selected = tasks.find((t) => t.id === id);
    setTask(selected.text);
    setEditId(id);
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id
          ? { ...t, completed: !t.completed }
          : t
      )
    );
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "Completed") return t.completed;
    if (filter === "Pending") return !t.completed;
    return true;
  });

  return (
    <div className="container">
      <h1>Todo List</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button onClick={addTask}>
          {editId ? "Update" : "Add"}
        </button>
      </div>

      <div className="filters">
        <button onClick={() => setFilter("All")}>
          All
        </button>

        <button onClick={() => setFilter("Completed")}>
          Completed
        </button>

        <button onClick={() => setFilter("Pending")}>
          Pending
        </button>
      </div>

      <ul>
        {filteredTasks.map((t) => (
          <li key={t.id}>
            <span
              style={{
                textDecoration: t.completed
                  ? "line-through"
                  : "none",
              }}
            >
              {t.text}
            </span>

            <div>
              <button
                onClick={() => toggleComplete(t.id)}
              >
                ✓
              </button>

              <button
                onClick={() => editTask(t.id)}
              >
                Edit
              </button>

              <button
                onClick={() => deleteTask(t.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;