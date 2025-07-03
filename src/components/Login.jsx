import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) onLogin(name.trim());
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Task Tracker</h2>
      <form
        onSubmit={handleSubmit}
        className="flex gap-3 w-full max-w-sm"
      >
        <input
          className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className="btn-primary disabled:opacity-40"
          disabled={!name.trim()}
        >
          Login
        </button>
      </form>
    </div>
  );
}
