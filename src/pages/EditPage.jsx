import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useParams, useNavigate } from "react-router-dom";

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

function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const response = await fetch(`/api/entries/${id}`);
        const result = await response.json();
        if (result.data) {
          setEntry(result.data);
        } else {
          setError("Entry not found");
        }
      } catch {
        setError("Failed to fetch entry");
      } finally {
        setLoading(false);
      }
    };

    fetchEntry();
  }, [id]);

  const formik = useFormik({
    initialValues: {
      id: entry?.id || "",
      firstName: entry?.firstName || "",
      lastName: entry?.lastName || "",
      email: entry?.email || "",
      birthDate: entry?.birthDate || "",
    },
    enableReinitialize: true,
    validate: validateEdit,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await fetch(`/api/entries/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        const result = await response.json();
        if (result.data) {
          setEntry(result.data);
          navigate("/records");
        }
      } catch {
        setError("Failed to update entry");
      } finally {
        setSubmitting(false);
      }
    },
  });

  if (loading) return <div className="main-content">Loading...</div>;
  if (error) return <div className="main-content">{error}</div>;
  if (!entry) return <div className="main-content">Entry not found</div>;

  return (
    <div className="main-content">
      <h1>Edit Entry</h1>
      <form onSubmit={formik.handleSubmit} className="edit-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
              disabled={formik.isSubmitting}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <div className="error">{formik.errors.firstName}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
              disabled={formik.isSubmitting}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <div className="error">{formik.errors.lastName}</div>
            )}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              disabled={formik.isSubmitting}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="error">{formik.errors.email}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="birthDate">Birth Date</label>
            <input
              id="birthDate"
              name="birthDate"
              type="date"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.birthDate}
              disabled={formik.isSubmitting}
            />
            {formik.touched.birthDate && formik.errors.birthDate && (
              <div className="error">{formik.errors.birthDate}</div>
            )}
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
            onClick={() => navigate("/records")}
            disabled={formik.isSubmitting}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPage;
