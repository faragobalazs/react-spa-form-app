import { atom } from "recoil";

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
