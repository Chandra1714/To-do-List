import React, { useState } from 'react';
import axios from 'axios';
import './TaskInput.css';

const Taskinput = ({ addTask }) => {
  const [task, setTask] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:3000/api/tasks",
        { title: task }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      addTask(res.data);
      setTask("");
      console.log("Task added");
    } catch (error) {
      console.error("Error occurred:", error.response?.data || error.message);
      if (error.response?.status === 401) alert("Please login again.");
    }
  };

  return (
    <div className="task-input">
      <form onSubmit={handleSubmit}>
        <h2>Simple Add List</h2><br /><br />
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add item List"
        />
        <br /><br />
        <button>ADD</button>
      </form>
    </div>
  );
};

export default Taskinput;
