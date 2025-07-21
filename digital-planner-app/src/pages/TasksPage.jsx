import React, { useState } from "react";
import useTasks from "../hooks/useTasks";
import "../styles/tasks.css";

const TasksPage = () => {
  const { tasks, addTask, deleteTask, updateTask, loading } = useTasks();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");

  const handleAddTask = (e) => {
    e.preventDefault();
    addTask({ title, description, dueDate, priority });
    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("Medium");
  };

  const handleToggleComplete = (task) => {
    updateTask(task.id, { completed: !task.completed });
  };

  const handleDelete = (id) => {
    deleteTask(id);
  };

  return (
    <div className="tasks-container">
      <h2>Task Manager</h2>
      <form className="task-form" onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button type="submit">Add Task</button>
      </form>

      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={task.completed ? "completed-task" : ""}
            >
              <div className="task-info">
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p>Due: {task.dueDate}</p>
                <p>Priority: {task.priority}</p>
              </div>
              <div className="task-actions">
                <button onClick={() => handleToggleComplete(task)}>
                  {task.completed ? "Mark Incomplete" : "Mark Complete"}
                </button>
                <button onClick={() => handleDelete(task.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TasksPage;
