import React, { useState, useEffect, useCallback } from "react";
import Login from "./components/Login";
import TaskFilter from "./components/TaskFilter";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import {
  loadUsername,
  saveUsername,
  loadTasks,
  saveTasks,
} from "./utils/localStorage";

/* Shape: { id, title, description, completed, createdAt } */
const emptyTask = { title: "", description: "" };

export default function App() {
  /* -------- state -------- */
  const [username, setUsername] = useState(loadUsername());
  const [tasks, setTasks] = useState(loadTasks());
  const [filter, setFilter] = useState("all");          // all | completed | pending
  const [editingTask, setEditingTask] = useState(null); // null = add mode
  const [showForm, setShowForm] = useState(false);

  /* -------- persistence -------- */
  useEffect(() => saveTasks(tasks), [tasks]);
  useEffect(() => saveUsername(username), [username]);

  /* -------- task helpers -------- */
  const addOrUpdateTask = useCallback(
    (taskData) => {
      if (editingTask) {
        // update
        setTasks((prev) =>
          prev.map((t) =>
            t.id === editingTask.id ? { ...t, ...taskData } : t,
          ),
        );
      } else {
        // add
        setTasks((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            ...taskData,
            completed: false,
            createdAt: Date.now(),
          },
        ]);
      }
      setShowForm(false);
      setEditingTask(null);
    },
    [editingTask],
  );

  const toggleComplete = (id) =>
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t,
      ),
    );

  const deleteTask = (id) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));

  /* -------- derived list -------- */
  const visibleTasks = tasks.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    return true;
  });

  /* -------- render -------- */
  if (!username) return <Login onLogin={setUsername} />;

  return (
    <div className="max-w-3xl mx-auto px-4 pt-8">
      {/* header */}
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Hello, {username} 👋</h1>
        <button
          className="btn-primary"
          onClick={() => {
            setUsername("");
            setTasks([]);
            localStorage.clear();
          }}
        >
          Log Out
        </button>
      </header>

      <TaskFilter
        filter={filter}
        counts={{
          all: tasks.length,
          completed: tasks.filter((t) => t.completed).length,
          pending: tasks.filter((t) => !t.completed).length,
        }}
        onChange={setFilter}
      />

      <TaskList
        tasks={visibleTasks}
        onToggle={toggleComplete}
        onDelete={deleteTask}
        onEdit={(t) => {
          setEditingTask(t);
          setShowForm(true);
        }}
      />

      {/* floating add button */}
      <button
        className="fixed bottom-4 right-4 bg-blue-600 text-white text-3xl p-3 rounded-full shadow-lg hover:bg-blue-700"
        onClick={() => {
          setEditingTask(null);
          setShowForm(true);
        }}
      >
        +
      </button>

      {showForm && (
        <TaskForm
          initialData={editingTask ?? emptyTask}
          onSubmit={addOrUpdateTask}
          onCancel={() => {
            setShowForm(false);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
}
