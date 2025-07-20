import React from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import "../styles/dashboard.css";

const Dashboard = () => {
  const { user } = useAuthContext();

  return (
    <div className="dashboard-container">
      <h2>Welcome, {user?.email}</h2>

      <div className="dashboard-links">
        <Link to="/tasks" className="dashboard-card">
          <h3>Tasks</h3>
          <p>View and manage your to-do lists.</p>
        </Link>

        <Link to="/calendar" className="dashboard-card">
          <h3>Calendar</h3>
          <p>See your upcoming events.</p>
        </Link>

        <Link to="/journal" className="dashboard-card">
          <h3>Journal</h3>
          <p>Write and reflect daily.</p>
        </Link>

        <Link to="/goals" className="dashboard-card">
          <h3>Goals</h3>
          <p>Track your goals and progress.</p>
        </Link>

        <Link to="/habits" className="dashboard-card">
          <h3>Habit Tracker</h3>
          <p>Track your daily habits and streaks.</p>
        </Link>

        <Link to="/settings" className="dashboard-card">
          <h3>Settings</h3>
          <p>Customize your preferences.</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
