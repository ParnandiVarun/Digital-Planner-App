import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import "../styles/sidebar.css";

const Sidebar = () => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const navItems = [
    { to: "/dashboard", label: "Dashboard", emoji: "📊" },
    { to: "/tasks", label: "Tasks", emoji: "✅" },
    { to: "/calendar", label: "Calendar", emoji: "📅" },
    { to: "/journal", label: "Journal", emoji: "📓" },
    { to: "/goals", label: "Goals", emoji: "🎯" },
    { to: "/habits", label: "Habits", emoji: "🌱" },
    { to: "/notifications", label: "Notifications", emoji: "🔔" },
    { to: "/settings", label: "Settings", emoji: "⚙️" },
  ];

  return (
    <div className="sidebar">
      <h1 className="sidebar-logo">🗓️ Planner</h1>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            to={item.to}
            key={item.to}
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <span className="emoji">{item.emoji}</span> {item.label}
          </NavLink>
        ))}
      </nav>
      <button onClick={handleLogout} className="logout-btn">
        🚪 Logout
      </button>
    </div>
  );
};

export default Sidebar;
