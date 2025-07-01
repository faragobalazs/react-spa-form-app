import React from "react";
import { InputText } from "primereact/inputtext";

const InputTextField = ({
  label,
  name,
  formik,
  disabled = false,
  className = "",
  placeholder = "",
  keyfilter,
  variant = "outlined",
  size = "normal", // "small", "normal", "large"
}) => {
  const getSizeClass = () => {
    switch (size) {
      case "small":
        return "p-inputtext-sm";
      case "large":
        return "p-inputtext-lg";
      default:
        return "";
    }
  };

  return (
    <div className={`flex flex-column gap-2 ${className}`}>
      <label htmlFor={name}>{label}</label>
      <InputText
        id={name}
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        disabled={disabled || formik.isSubmitting}
        placeholder={placeholder}
        keyfilter={keyfilter}
        variant={variant}
        className={`${getSizeClass()} ${
          formik.touched[name] && formik.errors[name] ? "p-invalid" : ""
        }`}
        aria-describedby={
          formik.touched[name] && formik.errors[name]
            ? `${name}-error`
            : undefined
        }
      />
      {formik.touched[name] && formik.errors[name] && (
        <small id={`${name}-error`} className="p-error">
          {formik.errors[name]}
        </small>
      )}
    </div>
  );
};

export default InputTextField;
