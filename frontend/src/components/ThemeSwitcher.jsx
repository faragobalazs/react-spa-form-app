import React from "react";
import "./ThemeSwitcher.css";

const ThemeSwitcher = ({ theme, onToggle }) => {
  return (
    <button
      className="theme-switcher"
      onClick={onToggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      {theme === "dark" ? (
        <i className="pi pi-sun" />
      ) : (
        <i className="pi pi-moon" />
      )}
    </button>
  );
};

export default ThemeSwitcher;
