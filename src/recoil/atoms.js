import { atom } from "recoil";

// Atom for storing all records
export const recordsState = atom({
  key: "recordsState",
  default: [],
});

// Atom for storing the current record being edited
export const currentRecordState = atom({
  key: "currentRecordState",
  default: null,
});

// Atom for storing loading state
export const loadingState = atom({
  key: "loadingState",
  default: false,
});

// Atom for storing error state
export const errorState = atom({
  key: "errorState",
  default: null,
});
