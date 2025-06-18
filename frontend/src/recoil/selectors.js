import { selector, selectorFamily } from "recoil";
import { recordApi } from "../api/recordApi";
import { recordsRequestIdAtom } from "./atoms";

// SelectorFamily for getting a record by ID
export const recordSelectorFamily = selectorFamily({
  key: "recordSelectorFamily",
  get: (id) => async () => {
    if (!id) return null;
    try {
      const record = await recordApi.getRecord(id);
      return record;
    } catch (error) {
      console.error("Error fetching record:", error);
      return null;
    }
  },
});

// Selector for getting sorted records
export const sortedRecordsSelector = selector({
  key: "sortedRecordsSelector",
  get: async ({ get }) => {
    get(recordsRequestIdAtom); // depend on request id for refresh
    try {
      const records = await recordApi.getAllRecords();
      return [...records].sort((a, b) => {
        // Sort by last name, then first name
        const lastNameCompare = a.lastName.localeCompare(b.lastName);
        if (lastNameCompare !== 0) return lastNameCompare;
        return a.firstName.localeCompare(b.firstName);
      });
    } catch (error) {
      console.error("Error fetching records:", error);
      return [];
    }
  },
});

// Selector for getting filtered records
export const filteredRecordsSelector = selector({
  key: "filteredRecordsSelector",
  get: async () => {
    try {
      const records = await recordApi.getAllRecords();
      return records;
    } catch (error) {
      console.error("Error fetching records:", error);
      return [];
    }
  },
});
