import { readData } from "./readData.js";
import { overwriteData } from "./overwriteData.js";

export const deleteData = async (idToDelete) => {
  let currentData = [];
  currentData = await readData();
  if (!Array.isArray(currentData)) {
    currentData = [];
  }

  const initialLength = currentData.length;
  const filteredData = currentData.filter((entry) => entry.id !== idToDelete);

  if (filteredData.length === initialLength) {
    return false;
  }
  await overwriteData(filteredData);
  return true;
};
