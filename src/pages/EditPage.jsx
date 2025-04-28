import React, { useState, useEffect, useCallback } from "react";
import { useFormik } from "formik";

const validateEdit = (values) => {
  const errors = {};
  if (!values.firstName) errors.firstName = "Required";
  if (!values.lastName) errors.lastName = "Required";
  if (!values.email) errors.email = "Required";
  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
    errors.email = "Invalid email address";
  if (!values.birthDate) errors.birthDate = "Required";
  return errors;
};

function InlineEditForm({ entry, onSave, onCancel }) {
  const formik = useFormik({
    initialValues: {
      firstName: entry.firstName,
      lastName: entry.lastName,
      email: entry.email,
      birthDate: entry.birthDate,
    },
    validate: validateEdit,
    onSubmit: (values, { setSubmitting }) => {
      onSave(entry.id, values);
      setSubmitting(false);
    },
    enableReinitialize: true,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="inline-edit-form">
      <div className="form-row">
        <div className="form-group inline">
          <label htmlFor={`firstName-${entry.id}`}>First Name</label>
          <input
            id={`firstName-${entry.id}`}
            name="firstName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            disabled={formik.isSubmitting}
          />
        </div>
        <div className="form-group inline">
          <label htmlFor={`lastName-${entry.id}`}>Last Name</label>
          <input
            id={`lastName-${entry.id}`}
            name="lastName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
            disabled={formik.isSubmitting}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group inline">
          <label htmlFor={`email-${entry.id}`}>Email</label>
          <input
            id={`email-${entry.id}`}
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            disabled={formik.isSubmitting}
          />
        </div>
        <div className="form-group inline">
          <label htmlFor={`birthDate-${entry.id}`}>Birth Date</label>
          <input
            id={`birthDate-${entry.id}`}
            name="birthDate"
            type="date"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.birthDate}
            disabled={formik.isSubmitting}
          />
        </div>
      </div>

      <div className="form-actions">
        <button
          type="submit"
          className="button save-button"
          disabled={!formik.isValid || formik.isSubmitting}
        >
          Save
        </button>
        <button
          type="button"
          className="button cancel-button"
          onClick={onCancel}
          disabled={formik.isSubmitting}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function EditPage() {
  const [entries, setEntries] = useState([]);
  const [editingEntryId, setEditingEntryId] = useState(null);

  const fetchData = useCallback(async () => {
    setEditingEntryId(null);
    const response = await fetch("/api/entries");
    const result = await response.json();
    setEntries(result.data || []);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleEditClick = (id) => {
    setEditingEntryId(id);
  };

  const handleCancelEdit = () => {
    setEditingEntryId(null);
  };

  const handleSaveEdit = async (idToUpdate, updatedData) => {
    const response = await fetch(`/api/entries/${idToUpdate}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    const result = await response.json();
    setEntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry.id === idToUpdate ? { ...entry, ...result.data } : entry
      )
    );
    setEditingEntryId(null);
  };

  const handleDelete = async (idToDelete) => {
    if (editingEntryId === idToDelete) {
      setEditingEntryId(null);
    }
    await fetch(`/api/entries/${idToDelete}`, { method: "DELETE" });
    setEntries((prevEntries) =>
      prevEntries.filter((entry) => entry.id !== idToDelete)
    );
  };

  return (
    <div className="main-content">
      <h1>Edit Entries</h1>

      {entries.length === 0 ? (
        <p>No entries found.</p>
      ) : (
        <div className="entries-container">
          {" "}
          {entries.map((entry) => (
            <div
              key={entry.id}
              className={`entry-item ${
                editingEntryId === entry.id ? "editing" : ""
              }`}
            >
              {editingEntryId === entry.id ? (
                <InlineEditForm
                  entry={entry}
                  onSave={handleSaveEdit}
                  onCancel={handleCancelEdit}
                />
              ) : (
                <>
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
                      disabled={editingEntryId !== null}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="button delete-button"
                      disabled={editingEntryId !== null}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EditPage;
