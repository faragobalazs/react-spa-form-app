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
    return <div className="text-center mt-4">No records found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Records</h1>
      <div className="grid gap-4">
        {records.map((record) => (
          <div key={record._id} className="border p-4 rounded shadow">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Name:</p>
                <p>
                  {record.firstName} {record.lastName}
                </p>
              </div>
              <div>
                <p className="font-semibold">Email:</p>
                <p>{record.email}</p>
              </div>
              <div>
                <p className="font-semibold">Birth Date:</p>
                <p>{new Date(record.birthDate).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleEdit(record._id)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(record._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
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
