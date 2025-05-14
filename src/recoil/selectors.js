import { selector, selectorFamily } from "recoil";
import { getItemById, getAllItems } from "../api/api";

// Selector for getting a record by ID
export const getRecordById = selectorFamily({
  key: "getRecordById",
  get: (id) => async () => {
    if (!id) return null;

    try {
      const result = await getItemById(id);
      return result.data || null;
    } catch {
      throw new Error("Failed to fetch entry");
    }
  },
});

// Selector for getting sorted records
export const sortedRecordsState = selector({
  key: "sortedRecordsState",
  get: async () => {
    try {
      const result = await getAllItems();
      const records = result.data || [];
      return [...records].sort((a, b) => {
        // Sort by last name, then first name
        const lastNameCompare = a.lastName.localeCompare(b.lastName);
        if (lastNameCompare !== 0) return lastNameCompare;
        return a.firstName.localeCompare(b.firstName);
      });
    } catch {
      throw new Error("Failed to fetch records");
    }
  },
});

// Selector for getting filtered records
export const filteredRecordsState = selector({
  key: "filteredRecordsState",
  get: async () => {
    try {
      const result = await getAllItems();
      return result.data || [];
    } catch {
      throw new Error("Failed to fetch records");
    }
  },
});
