import React, { Suspense, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Loader } from "./components/Loader";
import { ErrorBoundary } from "./components/ErrorBoundary";
import ThemeSwitcher from "./components/ThemeSwitcher";

import "./App.css";
import HomePage from "./pages/HomePage";
import CreateEditPage from "./pages/CreateEditPage";
import Records from "./pages/Records";
import { Spinner as SpinnerPage } from "./pages/Spinner";

function App() {
  const [theme, setTheme] = useState(() => {
    // Get theme from localStorage or default to 'dark'
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    // Apply theme to body and save to localStorage
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <Router>
      <div className={`app-container ${theme}`}>
        <div className="navbar-container">
          <nav>
            <div className="buttons-container">
              <Link to="/" className="nav-button">
                Home
              </Link>
              <Link to="/records" className="nav-button">
                Records
              </Link>
              <Link to="/add" className="nav-button">
                Add New
              </Link>
              <Link to="/spinner" className="nav-button">
                BB-8
              </Link>
            </div>
            <ThemeSwitcher theme={theme} onToggle={toggleTheme} />
          </nav>
        </div>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/records"
              element={
                <Suspense fallback={<Loader />}>
                  <Records />
                </Suspense>
              }
            />
            <Route path="/add" element={<CreateEditPage />} />
            <Route
              path="/edit/:id"
              element={
                <Suspense fallback={<Loader />}>
                  <CreateEditPage />
                </Suspense>
              }
            />
            <Route
              path="/spinner"
              element={
                <ErrorBoundary>
                  <SpinnerPage />
                </ErrorBoundary>
              }
            />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </div>
        <footer className="footer">
          <div className="footer-content">
            <p>&copy; 2025</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
