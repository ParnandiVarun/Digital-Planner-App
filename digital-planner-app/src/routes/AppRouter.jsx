import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import CalendarPage from "../pages/CalendarPage";
import TasksPage from "../pages/TasksPage";
import JournalPage from "../pages/JournalPage";
import GoalsPage from "../pages/GoalsPage";
import SettingsPage from "../pages/SettingsPage";
import PrivateRoute from "./PrivateRoute";
import HabitTrackerPage from "../pages/HabitTrackerPage";
import Sidebar from "../components/Sidebar";
import Layout from "../components/Layout.jsx";
import NotificationPage from "../pages/NotificationPage";

const AppRouter = () => {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ marginLeft: "220px", width: "100%" }}>
          <Routes>
            <Route path="/" element={<Layout />} />
            <Route index element={<Navigate to="/dashboard" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/tasks"
              element={
                <PrivateRoute>
                  <TasksPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/calendar"
              element={
                <PrivateRoute>
                  <CalendarPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/journal"
              element={
                <PrivateRoute>
                  <JournalPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/goals"
              element={
                <PrivateRoute>
                  <GoalsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/habits"
              element={
                <PrivateRoute>
                  <HabitTrackerPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <PrivateRoute>
                  <NotificationPage />
                </PrivateRoute>
              }
            />

            <Route
              path="/settings"
              element={
                <PrivateRoute>
                  <SettingsPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default AppRouter;
