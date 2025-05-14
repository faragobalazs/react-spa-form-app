import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import { useRecoilState, useRecoilValue } from "recoil";
import { formValidationSchema } from "../schemas/formValidation";
import InputField from "../components/InputField";
import { createItem, updateItem } from "../api/api";
import { loadingState, errorState } from "../recoil/atoms";
import { getRecordById } from "../recoil/selectors";

const initialFormValues = {
  id: nanoid(),
  firstName: "",
  lastName: "",
  email: "",
  birthDate: "",
};

function CreateEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  // Recoil state
  const [loading, setLoading] = useRecoilState(loadingState);
  const [error, setError] = useRecoilState(errorState);
  const record = useRecoilValue(getRecordById(id));

  useEffect(() => {
    if (record) {
      setLoading(false);
    }
  }, [record, setLoading]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: record || initialFormValues,
    validationSchema: formValidationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setError(null);

      try {
        if (isEditing) {
          await updateItem(id, values);
          navigate("/records");
        } else {
          const result = await createItem(values);
          if (result.success) {
            setError({ type: "success", message: "Data successfully saved" });
            resetForm();
            //navigate("/records");
          } else {
            throw new Error(result.error || "Failed to save data");
          }
        }
      } catch (error) {
        setError({
          type: "error",
          message: `Failed to ${id ? "update" : "save"} data: ${error.message}`,
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  if (loading) return <div className="main-content">Loading...</div>;
  if (error?.type === "error")
    return <div className="main-content">{error.message}</div>;
  if (isEditing && !record)
    return <div className="main-content">Entry not found</div>;

  return (
    <div className="main-content">
      <h1>{isEditing ? "Edit Entry" : "Add New Entry"}</h1>

      {error?.type === "success" && (
        <div className="success-message">{error.message}</div>
      )}

      <form onSubmit={formik.handleSubmit} className="user-form">
        <div className="form-group">
          <label>ID</label>
          <p>{formik.values.id}</p>
        </div>

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
