import { atom } from "recoil";

// Atom for storing loading state
export const loadingAtom = atom({
  key: "loadingAtom",
  default: false,
});

// Atom for storing error state
export const errorAtom = atom({
  key: "errorAtom",
  default: null,
});

// Atom for forcing records refresh
export const recordsRequestIdAtom = atom({
  key: "recordsRequestIdAtom",
  default: 0,
});
