import React from "react";

const InputField = ({
  label,
  name,
  type = "text",
  formik,
  disabled = false,
  className = "",
}) => {
  return (
    <div className={`form-group ${className}`}>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[name]}
        disabled={disabled || formik.isSubmitting}
      />
      {formik.touched[name] && formik.errors[name] && (
        <div className="error">{formik.errors[name]}</div>
      )}
    </div>
  );
};

export default InputField;
