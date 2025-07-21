// /src/pages/SettingsPage.jsx

import React from "react";
import useTheme from "../hooks/useTheme";
import CardContainer from "../components/CardContainer";
import "../styles/settings.css";

const SettingsPage = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <CardContainer title="⚙️ Settings">
      <div className="settings-container">
        <section className="settings-section">
          <h3>Appearance</h3>
          <p>Current Theme: {theme}</p>
          <button onClick={toggleTheme} className="theme-toggle-btn">
            Toggle {theme === "light" ? "Dark" : "Light"} Mode
          </button>
        </section>

        {/* For future: add profile/account sections here */}
      </div>
    </CardContainer>
  );
};

export default SettingsPage;
