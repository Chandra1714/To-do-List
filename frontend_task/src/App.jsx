import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import TaskManager from "./components/TaskManager";
import "./global.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <div className="page-wrapper">
        <Routes>
          <Route
            path="/"
            element={<LoginForm onLogin={handleLogin} />}
          />
          <Route
            path="/register"
            element={<RegisterForm />}
          />
          <Route
            path="/tasks"
            element={isLoggedIn ? <TaskManager onLogout={handleLogout} /> : <LoginForm onLogin={handleLogin} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
