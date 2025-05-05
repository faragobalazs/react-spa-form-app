import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Records() {
  const [entries, setEntries] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    const response = await fetch("/api/entries");
    const result = await response.json();
    setEntries(result.data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditClick = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (idToDelete) => {
    await fetch(`/api/entries/${idToDelete}`, { method: "DELETE" });
    setEntries((prevEntries) =>
      prevEntries.filter((entry) => entry.id !== idToDelete)
    );
  };

  return (
    <div className="main-content">
      <h1>Records Overview</h1>

      {entries.length === 0 ? (
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
