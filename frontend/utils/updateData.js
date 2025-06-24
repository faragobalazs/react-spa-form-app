import { readData } from "./readData.js";
import { overwriteData } from "./overwriteData.js";

export const updateData = async (idToUpdate, updatedEntryData) => {
  const entryWithId = { ...updatedEntryData, id: idToUpdate };

  let currentData = [];
  currentData = await readData();
  if (!Array.isArray(currentData)) {
    currentData = [];
  }

  let entryFound = false;
  const updatedData = currentData.map((entry) => {
    if (entry.id === idToUpdate) {
      entryFound = true;
      return entryWithId;
    }
    return entry;
  });

  await overwriteData(updatedData);
  return entryWithId;
};
