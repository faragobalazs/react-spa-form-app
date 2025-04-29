import React, { useMemo } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./App.css";
import HomePage from "./pages/HomePage";
import AddNewPage from "./pages/AddNewPage";
import EditPage from "./pages/EditPage";

function App() {
  return (
    <Router>
      <div className="app-container">
        {" "}
        <div className="navbar-container">
          <nav>
            <div className="buttons-container">
              <Link to="/" className="nav-button">
                Home
              </Link>
              <Link to="/add" className="nav-button">
                Add New
              </Link>
            </div>
          </nav>
        </div>
        <div className="main-content">
          <Routes>
            <Route path="/add" element={<AddNewPage />} />
            <Route path="/edit/:id" element={<EditPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
