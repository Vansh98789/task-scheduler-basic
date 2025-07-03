import React from "react";

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  return (
    <li
      className={`relative border rounded-lg p-4 transition
        ${task.completed ? "opacity-60 line-through" : ""}`}
    >
      <label className="flex items-center gap-2 font-medium">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="h-4 w-4 accent-blue-600"
        />
        <span>{task.title}</span>
      </label>

      {task.description && (
        <p className="text-sm text-slate-600 mt-1">{task.description}</p>
      )}

      <small className="text-xs text-slate-500 block mt-2">
        Created&nbsp;
        {new Date(task.createdAt).toLocaleString(undefined, {
          dateStyle: "short",
          timeStyle: "short",
        })}
      </small>

      <div className="absolute right-2 top-2 flex gap-1">
        <button
          className="text-sm hover:text-blue-600"
          onClick={() => onEdit(task)}
        >
          ✏️
        </button>
        <button
          className="text-sm hover:text-red-600"
          onClick={() =>
            window.confirm("Delete this task?") && onDelete(task.id)
          }
        >
          🗑️
        </button>
      </div>
    </li>
  );
}
