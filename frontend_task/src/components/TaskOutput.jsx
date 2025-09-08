import React from 'react';
import './TaskOutput.css'

const TaskOutput = ({ task, onToggle, onDelete }) => {
  if (!Array.isArray(task)) {
    return <p>Invalid</p>;
  }
  return (
    <div className="task-output">
      <h2>Added List is</h2>
      {task.length === 0 ? (
        <h4>No task added yet</h4>
      ) : (
        <ol>
          {task.map((item) => (
            <li key={item._id} style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <span
                style={{
                  textDecoration: item.completed ? "line-through" : "none",
                  color: item.completed ? "blue" : "black"
                }}
              >
                {item.title}
              </span>
              <div className="button-group">
                <button type="button" onClick={() => onToggle(item._id)}>
                  {item.completed ? "Mark Incomplete" : "Mark Complete"}
                </button>
                <button type="button" onClick={() => onDelete(item._id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default TaskOutput;
