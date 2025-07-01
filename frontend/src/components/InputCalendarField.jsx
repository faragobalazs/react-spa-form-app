import React from "react";
import { Calendar } from "primereact/calendar";

const InputCalendarField = ({
  label,
  name,
  formik,
  disabled = false,
  className = "",
  placeholder = "",
  dateFormat = "dd/mm/yy",
  showIcon = true,
  showButtonBar = false,
  minDate,
  maxDate,
  variant = "outlined",
  size = "normal", // "small", "normal", "large"
  showTime = false,
  timeOnly = false,
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
      <Calendar
        id={name}
        name={name}
        value={formik.values[name]}
        onChange={(e) => formik.setFieldValue(name, e.value)}
        onBlur={formik.handleBlur}
        disabled={disabled || formik.isSubmitting}
        placeholder={placeholder}
        dateFormat={dateFormat}
        showIcon={showIcon}
        showButtonBar={showButtonBar}
        minDate={minDate}
        maxDate={maxDate}
        variant={variant}
        showTime={showTime}
        timeOnly={timeOnly}
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

export default InputCalendarField;
