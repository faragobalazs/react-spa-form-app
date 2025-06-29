import React, { useState } from "react";
import { useFormik } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { formValidationSchema } from "../schemas/formValidation";
import InputField from "../components/InputField";
import { recordApi } from "../api/recordApi";
import { recordsRequestIdAtom } from "../recoil/atoms";
import { recordSelectorFamily } from "../recoil/selectors";

// Helper function to format date for HTML date input
const formatDateForInput = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

function CreateEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  // Destructure API functions for cleaner code
  const { createRecord, updateRecord } = recordApi;

  // Recoil state
  const recordLoadable = useRecoilValueLoadable(recordSelectorFamily(id));
  const setRecordsRequestId = useSetRecoilState(recordsRequestIdAtom);

  // Local state for success message
  const [success, setSuccess] = useState(false);

  // Suspense: throw promise if loading, throw error if not found
  let initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
  };
  if (isEditing) {
    if (recordLoadable.state === "loading") throw recordLoadable.contents;
    if (recordLoadable.state === "hasError") throw recordLoadable.contents;
    if (recordLoadable.state === "hasValue") {
      if (!recordLoadable.contents) throw new Error("Entry not found");
      const record = recordLoadable.contents;
      initialValues = {
        firstName: record.firstName || "",
        lastName: record.lastName || "",
        email: record.email || "",
        birthDate: formatDateForInput(record.birthDate),
      };
    }
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: formValidationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSuccess(false);
      try {
        if (isEditing) {
          await updateRecord(id, values);
          setRecordsRequestId((id) => id + 1);
          navigate("/records");
        } else {
          const result = await createRecord(values);
          if (result.success) {
            setSuccess(true);
            setRecordsRequestId((id) => id + 1);
            resetForm();
          }
        }
      } catch (error) {
        console.error("Form submission error:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="main-content">
      <h1>{isEditing ? "Edit Entry" : "Add New Entry"}</h1>

      {success && (
        <div className="success-message">Data successfully saved</div>
      )}

      <form onSubmit={formik.handleSubmit} className="user-form">
        <div className="form-row">
          <InputField label="First Name" name="firstName" formik={formik} />
          <InputField label="Last Name" name="lastName" formik={formik} />
        </div>

        <div className="form-row">
          <InputField
            label="Email Address"
            name="email"
            type="email"
            formik={formik}
          />
          <InputField
            label="Birth Date"
            name="birthDate"
            type="date"
            formik={formik}
          />
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="button save-button"
            disabled={!formik.isValid || formik.isSubmitting}
          >
            {formik.isSubmitting
              ? "Submitting..."
              : isEditing
              ? "Save"
              : "Submit"}
          </button>
          {isEditing && (
            <button
              type="button"
              className="button cancel-button"
              onClick={() => navigate("/records")}
              disabled={formik.isSubmitting}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default CreateEditPage;
