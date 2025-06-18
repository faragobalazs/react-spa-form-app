import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Loader } from "./components/Loader";
import { ErrorBoundary } from "./components/ErrorBoundary";

import "./App.css";
import HomePage from "./pages/HomePage";
import CreateEditPage from "./pages/CreateEditPage";
import Records from "./pages/Records";
import { Spinner as SpinnerPage } from "./pages/Spinner";

function App() {
  return (
    <Router>
      <div className="app-container">
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
                Spinner
              </Link>
            </div>
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
      </div>
    </Router>
  );
}

export default App;
