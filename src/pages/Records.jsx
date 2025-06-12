import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
import { deleteItem } from "../api/api";
import { sortedRecordsSelector } from "../recoil/selectors";

function Records() {
  const navigate = useNavigate();
  const entriesLoadable = useRecoilValueLoadable(sortedRecordsSelector);

  const handleEditClick = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (idToDelete) => {
    await deleteItem(idToDelete);
  };

  // Suspense: throw promise if loading, throw error if error
  if (entriesLoadable.state === "loading") throw entriesLoadable.contents;
  if (entriesLoadable.state === "hasError") throw entriesLoadable.contents;

  const entries = entriesLoadable.contents;

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
