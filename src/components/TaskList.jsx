import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, ...handlers }) {
  if (tasks.length === 0)
    return (
      <p className="text-center text-slate-500 py-6">No tasks here 🤖</p>
    );

  return (
    <ul className="grid gap-4">
      {tasks.map((t) => (
        <TaskItem key={t.id} task={t} {...handlers} />
      ))}
    </ul>
  );
}
