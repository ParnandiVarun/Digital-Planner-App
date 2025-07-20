import React, { useState } from "react";
import useTasks from "../hooks/useTasks";
import CardContainer from "../components/CardContainer";
import EntryCard from "../components/EntryCard";
import "../styles/tasks.css";

const TasksPage = () => {
  const { tasks, addTask, deleteTask, updateTask, loading } = useTasks();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");

  const handleAddTask = (e) => {
    e.preventDefault();
    addTask({ title, description, dueDate, priority, completed: false });
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
    <CardContainer title="Task Manager">
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
      ) : tasks.length === 0 ? (
        <p>No tasks added yet.</p>
      ) : (
        <div className="task-list">
          {tasks.map((task) => (
            <EntryCard
              key={task.id}
              title={task.title}
              description={`${task.description || ""} | Priority: ${
                task.priority
              }`}
              date={task.dueDate}
              isCompleted={task.completed}
              onMarkDone={() => handleToggleComplete(task)}
              onDelete={() => handleDelete(task.id)}
            />
          ))}
        </div>
      )}
    </CardContainer>
  );
};

export default TasksPage;
