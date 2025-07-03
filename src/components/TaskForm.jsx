import React, { useState, useEffect } from "react";

export default function TaskForm({ initialData, onSubmit, onCancel }) {
  const [title, setTitle] = useState(initialData.title);
  const [description, setDescription] = useState(initialData.description);

  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onCancel();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onCancel]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title: title.trim(), description: description.trim() });
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 grid place-items-center"
      onClick={onCancel}
    >
      <div
        className="bg-white w-full max-w-lg rounded-lg p-6 shadow"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold mb-4">
          {initialData.id ? "Edit Task" : "New Task"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            required
            value={title}
            placeholder="Title *"
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
          <textarea
            value={description}
            placeholder="Description (optional)"
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded px-3 py-2 h-28 resize-none focus:outline-none focus:ring focus:ring-blue-300"
          />
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              className="btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button className="btn-primary">
              {initialData.id ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
