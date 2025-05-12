import React, { useState, useEffect, useMemo } from "react";
import { useFormik } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import { formValidationSchema } from "../schemas/formValidation";
import InputField from "../components/InputField";
import { createItem, getItemById, updateItem } from "../api/api";

function CreateEditPage() {
  console.count("CreateEditPage");
  const { id } = useParams();
  const navigate = useNavigate();
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(id ? true : false);
  const [error, setError] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(null);

  // if id is present, it is an edit page
  const isEditing = !!id;

  useEffect(() => {
    let mounted = true;

    if (isEditing) {
      const fetchEntry = async () => {
        try {
          const result = await getItemById(id);
          if (result.data && mounted) {
            setEntry(result.data);
          } else if (mounted) {
            setError("Entry not found");
          }
        } catch {
          if (mounted) {
            setError("Failed to fetch entry");
          }
        } finally {
          if (mounted) {
            setLoading(false);
          }
        }
      };

      fetchEntry();
    }

    return () => {
      mounted = true;
    };
  }, [id]);

  // for new record id is generated, and when when submitStatus is changed, id is generated again
  const newId = useMemo(() => {
    return nanoid();
  }, [submitStatus]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: entry?.id || newId,
      firstName: entry?.firstName || "",
      lastName: entry?.lastName || "",
      email: entry?.email || "",
      birthDate: entry?.birthDate || "",
    },
    validationSchema: formValidationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitStatus(null);
      setError(null);

      try {
        if (isEditing) {
          const result = await updateItem(id, values);
          setEntry(result.data);
          navigate("/records");
        } else {
          console.log("Submitting new entry:", values); // Debug log
          const result = await createItem(values);
          console.log("Create response:", result); // Debug log

          if (result.success) {
            setSubmitStatus({
              type: "success",
              message: "Data saved successfully!",
            });
            resetForm();
            // Optionally navigate to records page after successful creation
            // navigate("/records");
          } else {
            throw new Error(result.error || "Failed to save data");
          }
        }
      } catch (error) {
        console.error("Form submission error:", error); // Debug log
        setSubmitStatus({
          type: "error",
          message: `Failed to ${id ? "update" : "save"} data: ${error.message}`,
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  if (loading) return <div className="main-content">Loading...</div>;
  if (error) return <div className="main-content">{error}</div>;
  if (isEditing && !entry)
    return <div className="main-content">Entry not found</div>;

  return (
    <div className="main-content">
      <h1>{isEditing ? "Edit Entry" : "Add New Entry"}</h1>

      {submitStatus && (
        <div className={`submit-status ${submitStatus.type}`}>
          {submitStatus.message}
        </div>
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
