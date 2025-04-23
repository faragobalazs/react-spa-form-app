import React, { useState } from "react";
import { useFormik } from "formik";
import { nanoid } from "nanoid";
import { writeFormData } from "../utils/formDataStorage";

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

// Form
function AddNewPage() {
  const [currentId, setCurrentId] = useState(() => nanoid());

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      birthDate: "",
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      const newEntry = {
        id: currentId,
        ...values,
      };
      writeFormData(newEntry);
      alert(
        "Data saved to localStorage:\n" + JSON.stringify(newEntry, null, 2)
      );
      resetForm();
      setCurrentId(nanoid());
    },
  });

  return (
    <div className="main-content">
      <h1>Add New Page</h1>
      <form onSubmit={formik.handleSubmit} className="user-form">
        {/* ID */}
        <div className="form-group">
          {" "}
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
          />
          {formik.touched.birthDate && formik.errors.birthDate ? (
            <div className="error">{formik.errors.birthDate}</div>
          ) : null}
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={!formik.isValid || formik.isSubmitting}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddNewPage;
