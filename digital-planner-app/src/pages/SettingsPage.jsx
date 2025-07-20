import React from "react";
import useTheme from "../hooks/useTheme";

const SettingsPage = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <div className="theme-toggle">
        <p>Current Theme: {theme}</p>
        <button onClick={toggleTheme}>
          Toggle {theme === "light" ? "Dark" : "Light"} Mode
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
