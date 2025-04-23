const STORAGE_KEY = "formData";

export const readFormData = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  try {
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error parsing form data from localStorage:", error);
    return [];
  }
};

export const writeFormData = (newEntry) => {
  try {
    const existingData = readFormData();
    const updatedData = [...existingData, newEntry];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
  } catch (error) {
    console.error("Error writing form data to localStorage:", error);
  }
};
