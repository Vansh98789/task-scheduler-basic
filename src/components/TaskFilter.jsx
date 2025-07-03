import React from "react";

export default function TaskFilter({ filter, counts, onChange }) {
  const tabs = ["all", "completed", "pending"];
  return (
    <nav className="flex gap-2 mb-4">
      {tabs.map((t) => (
        <button
          key={t}
          className={`flex-1 rounded px-3 py-2 text-sm font-medium
            ${filter === t ? "bg-blue-600 text-white" : "bg-white border"}`}
          onClick={() => onChange(t)}
        >
          {t.charAt(0).toUpperCase() + t.slice(1)} ({counts[t]})
        </button>
      ))}
    </nav>
  );
}
