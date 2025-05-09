import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Records() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch("/api/entries");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || "Failed to fetch entries");
      }
      setEntries(result.data || []);
      setError(null);
    } catch (error) {
      console.error("Error fetching entries:", error);
      setError(error.message);
      setEntries([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditClick = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (idToDelete) => {
    try {
      const response = await fetch(`/api/entries/${idToDelete}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || "Failed to delete entry");
      }
      setEntries((prevEntries) =>
        prevEntries.filter((entry) => entry.id !== idToDelete)
      );
      setError(null);
    } catch (error) {
      console.error("Error deleting entry:", error);
      setError(error.message);
    }
  };

  return (
    <div className="main-content">
      <h1>Records Overview</h1>

      {error && <div className="error-message">Error: {error}</div>}

      {!error && entries.length === 0 ? (
        <p>No entries found.</p>
      ) : (
        <div className="entries-container">
          {entries.map((entry) => (
            <div key={entry.id} className="entry-item">
              <div className="entry-details">
                <p>
                  <strong>ID:</strong> {entry.id}
                </p>
                <p>
                  <strong>First Name:</strong> {entry.firstName}
                </p>
                <p>
                  <strong>Last Name:</strong> {entry.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {entry.email}
                </p>
                <p>
                  <strong>Birth Date:</strong> {entry.birthDate}
                </p>
              </div>
              <div className="entry-actions">
                <button
                  onClick={() => handleEditClick(entry.id)}
                  className="button edit-button"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(entry.id)}
                  className="button delete-button"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Records;
