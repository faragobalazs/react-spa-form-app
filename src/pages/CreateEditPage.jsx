import React, { useState, useEffect, useMemo } from "react";
import { useFormik } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import { formValidationSchema } from "../schemas/formValidation";
import InputField from "../components/InputField";

const API_BASE_URL = "http://localhost:3001";

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
          const response = await fetch(`${API_BASE_URL}/api/entries/${id}`);
          const result = await response.json();
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
        const url = isEditing
          ? `${API_BASE_URL}/api/entries/${id}`
          : `${API_BASE_URL}/api/save-form`;
        const method = isEditing ? "PUT" : "POST";

        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (isEditing) {
          setEntry(result.data);
          navigate("/records");
        } else {
          setSubmitStatus({
            type: "success",
            message: "Data saved successfully!",
          });
          resetForm();
        }
      } catch (error) {
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
