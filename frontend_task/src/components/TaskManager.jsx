import React, { useEffect, useState } from 'react';
import Taskinput from './Taskinput';
import TaskOutput from './TaskOutput';
import axios from 'axios';
import "./TaskManager.css";

const TaskManager = ({ onLogout }) => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first");
        return;
      }
      const response = await axios.get("http://localhost:3000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const onAddTask = (task) => {
    if (!task || !task.title || !task.title.trim()) return;
    setTasks((prev) => [task, ...prev]);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:3000/api/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  const handleToggle = async (id) => {
    const token = localStorage.getItem("token");
    const current = tasks.find((t) => t._id === id);
    if (!current) return;
    const res = await axios.put(
      `http://localhost:3000/api/tasks/${id}`,
      { completed: !current.completed },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setTasks((prev) => prev.map((t) => (t._id === id ? res.data : t)));
  };

  return (
    <div className="task-page">
      <div className="task-section input-panel">
        <Taskinput addTask={onAddTask} />
      </div>
      <div className="task-section output-panel">
        <TaskOutput task={tasks} onToggle={handleToggle} onDelete={handleDelete} />
      </div>

      <button
        className="logout-btn"
        onClick={() => {
          localStorage.removeItem("token");
          if (onLogout) onLogout();
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default TaskManager;
