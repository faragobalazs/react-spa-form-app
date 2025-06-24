import axiosInstance from "./axiosInstance";

// API functions
export const recordApi = {
  // Get all records
  getAllRecords: async () => {
    try {
      const response = await axiosInstance.get("/api/records");
      return response;
    } catch (error) {
      console.error("Get all records error:", error);
      throw error;
    }
  },

  // Get single record
  getRecord: async (id) => {
    try {
      const response = await axiosInstance.get(`/api/records/${id}`);
      return response;
    } catch (error) {
      console.error("Get record error:", error);
      throw error;
    }
  },

  // Create new record
  createRecord: async (recordData) => {
    try {
      const response = await axiosInstance.post("/api/records", {
        firstName: recordData.firstName,
        lastName: recordData.lastName,
        email: recordData.email,
        birthDate: recordData.birthDate,
      });
      return { success: true, data: response };
    } catch (error) {
      console.error("Create record error:", error);
      throw error;
    }
  },

  // Update record
  updateRecord: async (id, recordData) => {
    try {
      const response = await axiosInstance.put(`/api/records/${id}`, {
        firstName: recordData.firstName,
        lastName: recordData.lastName,
        email: recordData.email,
        birthDate: recordData.birthDate,
      });
      return response;
    } catch (error) {
      console.error("Update record error:", error);
      throw error;
    }
  },

  // Delete record
  deleteRecord: async (id) => {
    try {
      const response = await axiosInstance.delete(`/api/records/${id}`);
      return response;
    } catch (error) {
      console.error("Delete record error:", error);
      throw error;
    }
  },
};
