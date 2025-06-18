import { atom } from "recoil";
import { recordApi } from "../api/recordApi";

// Records atom
export const recordsState = atom({
  key: "recordsState",
  default: [],
  effects: [
    ({ setSelf }) => {
      const loadRecords = async () => {
        try {
          const records = await recordApi.getAllRecords();
          setSelf(records);
        } catch (error) {
          console.error("Error loading records:", error);
          setSelf([]);
        }
      };
      loadRecords();
    },
  ],
});

// Selected record atom
export const selectedRecordState = atom({
  key: "selectedRecordState",
  default: null,
});

// Loading state atom
export const loadingState = atom({
  key: "loadingState",
  default: false,
});

// Error state atom
export const errorState = atom({
  key: "errorState",
  default: null,
});

// Atom for forcing records refresh
export const recordsRequestIdAtom = atom({
  key: "recordsRequestIdAtom",
  default: 0,
});
