// Imports
import React, { useMemo } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router";
import { nanoid } from "nanoid";

import "./App.css";
import HomePage from "./pages/HomePage";
import AddNewPage from "./pages/AddNewPage";
import EditPage from "./pages/EditPage";

// Helper Function
const getEditPageId = () => {
  const storageKey = "getEditPageId";
  let storeId = localStorage.getItem(storageKey);

  if (!storeId) {
    storeId = nanoid(5);
    localStorage.setItem(storageKey, storeId);
  }
  return storeId;
};

// Main Application
function App() {
  const editPageId = useMemo(() => getEditPageId(), []);

  // Render Logic & Router Setup
  return (
    <Router>
      <div className="navbar-container">
        <nav>
          <div className="buttons-container">
            <Link to="/" className="nav-button">
              Home
            </Link>
            <Link to="/add" className="nav-button">
              Add New Page
            </Link>
            <Link to={`/${editPageId}`} className="nav-button">
              Edit Page
            </Link>
          </div>
        </nav>

        {/* Route Views*/}
        <div className="main-content">
          <Routes>
            <Route path="/add" element={<AddNewPage />} />
            <Route path={`/${editPageId}`} element={<EditPage />} />
            <Route path="/" element={<HomePage editPageId={editPageId} />} />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

// Export Component
export default App;
