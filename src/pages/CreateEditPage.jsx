import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    let mounted = true;

    if (id) {
      const fetchEntry = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/api/entries/${id}`);
          const result = await response.json();
          if (result.data && mounted) {
            setEntry(result.data);
            formik.setValues({
              id: result.data.id,
              firstName: result.data.firstName,
              lastName: result.data.lastName,
              email: result.data.email,
              birthDate: result.data.birthDate,
            });
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

  const formik = useFormik({
    enableReinitialize: false,
    initialValues: {
      id: nanoid(),
      firstName: "",
      lastName: "",
      email: "",
      birthDate: "",
    },
    validationSchema: formValidationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitStatus(null);
      setError(null);

      try {
        const url = id
          ? `${API_BASE_URL}/api/entries/${id}`
          : `${API_BASE_URL}/api/save-form`;
        const method = id ? "PUT" : "POST";

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

        if (id) {
          setEntry(result.data);
          navigate("/records");
        } else {
          setSubmitStatus({
            type: "success",
            message: "Data saved successfully!",
          });
          resetForm({ values: { ...formik.initialValues, id: nanoid() } });
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
  if (id && !entry) return <div className="main-content">Entry not found</div>;

  return (
    <div className="main-content">
      <h1>{id ? "Edit Entry" : "Add New Entry"}</h1>

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
            {formik.isSubmitting ? "Submitting..." : id ? "Save" : "Submit"}
          </button>
          {id && (
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
