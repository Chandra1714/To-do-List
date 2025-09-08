import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ isLoggedIn, onLogout }) => {
  return (
    <nav className="navbar">
      <h1>My Task App</h1>
      <div className="navbar-links">
        {!isLoggedIn ? (
          <>
            <Link to="/">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link to="/tasks">Tasks</Link>
            <button onClick={onLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
