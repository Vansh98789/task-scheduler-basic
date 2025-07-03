const USER_KEY = "tt_username";
const TASKS_KEY = "tt_tasks";

export const loadUsername = () => localStorage.getItem(USER_KEY) ?? "";

export const saveUsername = (name) =>
  name
    ? localStorage.setItem(USER_KEY, name)
    : localStorage.removeItem(USER_KEY);

export const loadTasks = () => {
  try {
    return JSON.parse(localStorage.getItem(TASKS_KEY)) ?? [];
  } catch {
    return [];
  }
};

export const saveTasks = (tasks) =>
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
