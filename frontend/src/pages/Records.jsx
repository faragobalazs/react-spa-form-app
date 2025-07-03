import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { recordsRequestIdAtom } from "../recoil/atoms";
import { sortedRecordsSelector } from "../recoil/selectors";
import { recordApi } from "../api/recordApi";
import { useNavigate } from "react-router-dom";

const Records = () => {
  const records = useRecoilValue(sortedRecordsSelector);
  const setRecordsRequestId = useSetRecoilState(recordsRequestIdAtom);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await recordApi.deleteRecord(id);
        // Trigger refresh by incrementing request ID
        setRecordsRequestId((id) => id + 1);
      } catch (error) {
        console.error("Error deleting record:", error);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  if (records.length === 0) {
    return <div className="no-records">No records found</div>;
  }

  return (
    <div className="records-container">
      <h1 className="records-title">Records</h1>
      <div className="records-grid">
        {records.map((record) => (
          <div key={record._id} className="record-card">
            <div className="record-fields">
              <div>
                <p className="record-label">Name:</p>
                <p className="record-value">
                  {record.firstName} {record.lastName}
                </p>
              </div>
              <div>
                <p className="record-label">Email:</p>
                <p className="record-value">{record.email}</p>
              </div>
              <div>
                <p className="record-label">Birth Date:</p>
                <p className="record-value">
                  {new Date(record.birthDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="record-actions">
              <button
                onClick={() => handleEdit(record._id)}
                className="record-edit-btn"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(record._id)}
                className="record-delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Records;
