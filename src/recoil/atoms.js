import { atom } from "recoil";

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
