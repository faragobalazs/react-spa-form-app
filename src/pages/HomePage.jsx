import React from "react";

function HomePage({ editPageId }) {
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

export default HomePage;
