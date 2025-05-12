import { selector } from "recoil";
import { recordsState, currentRecordState } from "./atoms";

// Selector for getting a record by ID
export const getRecordById = selector({
  key: "getRecordById",
  get: ({ get }) => {
    const records = get(recordsState);
    const currentRecord = get(currentRecordState);

    if (currentRecord?.id) {
      return records.find((record) => record.id === currentRecord.id) || null;
    }
    return null;
  },
});

// Selector for getting sorted records
export const sortedRecordsState = selector({
  key: "sortedRecordsState",
  get: ({ get }) => {
    const records = get(recordsState);
    return [...records].sort((a, b) => {
      // Sort by last name, then first name
      const lastNameCompare = a.lastName.localeCompare(b.lastName);
      if (lastNameCompare !== 0) return lastNameCompare;
      return a.firstName.localeCompare(b.firstName);
    });
  },
});

// Selector for getting filtered records
export const filteredRecordsState = selector({
  key: "filteredRecordsState",
  get: ({ get }) => {
    const records = get(recordsState);
    // You can add filtering logic here
    return records;
  },
});
