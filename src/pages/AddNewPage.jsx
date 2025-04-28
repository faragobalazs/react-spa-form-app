// Imports
import React, { useState } from "react";
import { useFormik } from "formik";
import { nanoid } from "nanoid";

// Validation
const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "Required";
  }
  if (!values.lastName) {
    errors.lastName = "Required";
  }
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.birthDate) {
    errors.birthDate = "Required";
  }
  return errors;
};

// Component Definition & State Management
function AddNewPage() {
  const [currentId, setCurrentId] = useState(() => nanoid());
  const [submitStatus, setSubmitStatus] = useState(null);

  // Formik Configuration
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      birthDate: "",
    },
    validate,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      setSubmitStatus(null);
      const newEntry = {
        id: currentId,
        ...values,
      };

      try {
        const response = await fetch("/api/save-form", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newEntry),
        });

        if (!response.ok) {
          let errorData = { message: `HTTP error! status: ${response.status}` };
          try {
            errorData = await response.json();
          } catch (parseError) {}
          throw new Error(
            errorData.message || `HTTP error! status: ${response.status}`
          );
        }

        setSubmitStatus({
          type: "success",
          message: "Data saved successfully!",
        });
        resetForm();
        setCurrentId(nanoid());
      } catch (error) {
        setSubmitStatus({
          type: "error",
          message: `Failed to save data: ${error.message}`,
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  // JSX Rendering
  return (
    <div className="main-content">
      <h1>Add New Page</h1>

      {submitStatus && (
        <div className={`submit-status ${submitStatus.type}`}>
          {submitStatus.message}
        </div>
      )}

      <form onSubmit={formik.handleSubmit} className="user-form">
        <div className="form-group">
          <label>Generated ID</label>
          <p>{currentId}</p>
        </div>

        {/* First Name */}
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
          {formik.touched.firstName && formik.errors.firstName ? (
            <div className="error">{formik.errors.firstName}</div>
          ) : null}
        </div>

        {/* Last Name */}
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
          {formik.touched.lastName && formik.errors.lastName ? (
            <div className="error">{formik.errors.lastName}</div>
          ) : null}
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            disabled={formik.isSubmitting}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
        </div>

        {/* Birth Date */}
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
          {formik.touched.birthDate && formik.errors.birthDate ? (
            <div className="error">{formik.errors.birthDate}</div>
          ) : null}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!formik.isValid || formik.isSubmitting}
          className="add-new-submit-button"
        >
          {formik.isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

// Export Component
export default AddNewPage;
