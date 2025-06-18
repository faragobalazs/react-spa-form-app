import axiosInstance from "./axiosInstance";

// Create (POST) request
export const createItem = async (data) => {
  try {
    console.log("Creating item with data:", data); // Debug log
    const response = await axiosInstance.post("/save-form", data);
    console.log("Create response:", response); // Debug log
    return response;
  } catch (error) {
    console.error("Create item error:", error.response || error);
    throw error;
  }
};

// Read (GET) requests
export const getAllItems = async () => {
  try {
    const response = await axiosInstance.get("/entries");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return response;
  } catch (error) {
    console.error("Get all items error:", error.response || error);
    throw error;
  }
};

export const getItemById = async (id) => {
  try {
    const response = await axiosInstance.get(`/entries/${id}`);
    return response;
  } catch (error) {
    console.error("Get item by id error:", error.response || error);
    throw error;
  }
};

// Update (PUT) request
export const updateItem = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/entries/${id}`, data);
    return response;
  } catch (error) {
    console.error("Update item error:", error.response || error);
    throw error;
  }
};

// Delete (DELETE) request
export const deleteItem = async (id) => {
  try {
    const response = await axiosInstance.delete(`/entries/${id}`);
    return response;
  } catch (error) {
    console.error("Delete item error:", error.response || error);
    throw error;
  }
};
