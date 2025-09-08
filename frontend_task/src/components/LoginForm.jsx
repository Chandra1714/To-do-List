import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validateInputs = () => {
    if (!/^[a-zA-Z0-9]{3,}$/.test(username)) {
      setError("Username must be at least 3 characters, letters/numbers only.");
      return false;
    }
    if (password.length < 6 || !/[0-9!@#$%^&*]/.test(password)) {
      setError("Password must be at least 6 characters and include a number or symbol.");
      return false;
    }
    setError("");
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        username,
        password,
      });
      localStorage.setItem("token", res.data.token);
      alert("Login successful");
      onLogin?.();
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="login-container fade-in">
      <h2>Login</h2>
      {error && <p className="error-msg">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
