import React from "react";
import { Loader } from "../components/Loader";
import "./Spinner.css";

let resolved = false;
const promise = new Promise((resolve) =>
  setTimeout(() => {
    resolved = true;
    resolve();
  }, 2000)
);

export function Spinner() {
  if (!resolved) throw promise;
  return <Loader inline />;
}
