import React, { useState } from "react";
import { useFormik } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { formValidationSchema } from "../schemas/formValidation";
import InputTextField from "../components/InputTextField";
import InputCalendarField from "../components/InputCalendarField";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Message } from "primereact/message";
import { recordApi } from "../api/recordApi";
import { recordsRequestIdAtom } from "../recoil/atoms";
import { recordSelectorFamily } from "../recoil/selectors";

function CreateEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  // Use useRecoilValue directly
  const record = useRecoilValue(recordSelectorFamily(id));
  const setRecordsRequestId = useSetRecoilState(recordsRequestIdAtom);
  const { createRecord, updateRecord } = recordApi;
  const [success, setSuccess] = useState(false);

  // Unified initialValues, using record for both create and edit
  const initialValues = {
    firstName: record?.firstName ?? "",
    lastName: record?.lastName ?? "",
    email: record?.email ?? "",
    birthDate: record?.birthDate ?? "",
  };

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
    <div className="flex justify-content-center align-items-center min-h-screen p-4">
      <Card className="w-full max-w-4xl shadow-3 add-entry-card">
        <div className="flex flex-column gap-4">
          <div className="flex align-items-center gap-2">
            <i
              className={`pi ${
                isEditing ? "pi-pencil" : "pi-plus"
              } text-2xl text-primary`}
            ></i>
            <h1 className="text-3xl font-bold text-900 m-0">
              {isEditing ? "Edit Entry" : "Add New Entry"}
            </h1>
          </div>

          {success && (
            <Message
              severity="success"
              text="Data successfully saved"
              className="w-full"
            />
          )}

          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-column gap-4"
          >
            <div className="grid">
              <div className="col-12 md:col-6">
                <InputTextField
                  label="First Name"
                  name="firstName"
                  formik={formik}
                  placeholder="Enter your first name"
                  variant="outlined"
                />
              </div>
              <div className="col-12 md:col-6">
                <InputTextField
                  label="Last Name"
                  name="lastName"
                  formik={formik}
                  placeholder="Enter your last name"
                  variant="outlined"
                />
              </div>
            </div>

            <div className="grid">
              <div className="col-12 md:col-6">
                <InputTextField
                  label="Email Address"
                  name="email"
                  formik={formik}
                  placeholder="Enter your email address"
                  variant="outlined"
                />
              </div>
              <div className="col-12 md:col-6">
                <InputCalendarField
                  label="Birth Date"
                  name="birthDate"
                  formik={formik}
                  placeholder="Select your birth date"
                  variant="outlined"
                  showIcon={true}
                  dateFormat="dd/mm/yy"
                />
              </div>
            </div>

            <div className="flex justify-content-end gap-3 pt-3 border-top-1 surface-border">
              {isEditing && (
                <Button
                  type="button"
                  label="Cancel"
                  icon="pi pi-times"
                  severity="secondary"
                  outlined
                  onClick={() => navigate("/records")}
                  disabled={formik.isSubmitting}
                />
              )}
              <Button
                type="submit"
                label={
                  formik.isSubmitting
                    ? "Submitting..."
                    : isEditing
                    ? "Save Changes"
                    : "Submit"
                }
                icon={
                  formik.isSubmitting
                    ? "pi pi-spinner pi-spin"
                    : isEditing
                    ? "pi pi-check"
                    : "pi pi-send"
                }
                disabled={!formik.isValid || formik.isSubmitting}
                loading={formik.isSubmitting}
              />
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}

export default CreateEditPage;
