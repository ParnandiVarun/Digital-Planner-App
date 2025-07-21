// /src/pages/Dashboard.jsx

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { db } from "../api/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import "../styles/dashboard.css";

const Dashboard = () => {
  const { user } = useAuthContext();
  const [taskCount, setTaskCount] = useState(0);
  const [journalCount, setJournalCount] = useState(0);
  const [goalCount, setGoalCount] = useState(0);
  const [habitCount, setHabitCount] = useState(0);

  useEffect(() => {
    if (!user) return;

    const fetchCounts = async () => {
      const tasksSnapshot = await getDocs(
        collection(db, "users", user.uid, "tasks")
      );
      setTaskCount(tasksSnapshot.size);

      const journalsSnapshot = await getDocs(
        collection(db, "users", user.uid, "journals")
      );
      setJournalCount(journalsSnapshot.size);

      const goalsSnapshot = await getDocs(
        collection(db, "users", user.uid, "goals")
      );
      setGoalCount(goalsSnapshot.size);

      const habitsSnapshot = await getDocs(
        collection(db, "users", user.uid, "habits")
      );
      setHabitCount(habitsSnapshot.size);
    };

    fetchCounts();
  }, [user]);

  return (
    <div className="dashboard-container">
      <h2>✨ Welcome back, {user?.email.split("@")[0]}</h2>

      <div className="dashboard-grid">
        <Link to="/tasks" className="dashboard-card">
          <h3>Tasks</h3>
          <p>
            You have <strong>{taskCount}</strong> tasks
          </p>
        </Link>

        <Link to="/calendar" className="dashboard-card">
          <h3>Calendar</h3>
          <p>View your upcoming events</p>
        </Link>

        <Link to="/journal" className="dashboard-card">
          <h3>Journal</h3>
          <p>
            <strong>{journalCount}</strong> journal entries
          </p>
        </Link>

        <Link to="/goals" className="dashboard-card">
          <h3>Goals</h3>
          <p>
            Tracking <strong>{goalCount}</strong> goals
          </p>
        </Link>

        <Link to="/habits" className="dashboard-card">
          <h3>Habit Tracker</h3>
          <p>
            Monitoring <strong>{habitCount}</strong> habits
          </p>
        </Link>
        <Link to="/notifications" className="dashboard-card">
          <h3>Notifications 🔔</h3>
          <p>Check your notifications</p>
        </Link>

        <Link to="/settings" className="dashboard-card">
          <h3>Settings</h3>
          <p>Customize your preferences</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
