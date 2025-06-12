import { selector, selectorFamily } from "recoil";
import { getItemById, getAllItems } from "../api/api";
import { recordsRequestIdAtom } from "./atoms";

// SelectorFamily for getting a record by ID
export const recordSelectorFamily = selectorFamily({
  key: "recordSelectorFamily",
  get: (id) => async () => {
    if (!id) return null;
    const result = await getItemById(id);
    return result.data || null;
  },
});

// Selector for getting sorted records
export const sortedRecordsSelector = selector({
  key: "sortedRecordsSelector",
  get: async ({ get }) => {
    get(recordsRequestIdAtom); // depend on request id for refresh
    const result = await getAllItems();
    const records = result.data || [];
    return [...records].sort((a, b) => {
      // Sort by last name, then first name
      const lastNameCompare = a.lastName.localeCompare(b.lastName);
      if (lastNameCompare !== 0) return lastNameCompare;
      return a.firstName.localeCompare(b.firstName);
    });
  },
});

// Selector for getting filtered records
export const filteredRecordsSelector = selector({
  key: "filteredRecordsSelector",
  get: async () => {
    const result = await getAllItems();
    return result.data || [];
  },
});
