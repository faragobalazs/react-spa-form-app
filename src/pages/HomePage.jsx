// Imports
import React from "react";

// Component Definition
function HomePage({ editPageId }) {
  //JSX Rendering
  return (
    <div className="main-content">
      <h1> Hello, Jordan!</h1>
      <p>This is the Home Page.</p>
      <p>
        The Edit Page's ID: <strong>{editPageId}</strong>
      </p>
    </div>
  );
}

// Export Component
export default HomePage;
