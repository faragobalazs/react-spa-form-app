import axios from "axios";

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    console.log("Request config:", config); // Debug log
    return config;
  },
  (error) => {
    console.error("Request error:", error); // Debug log
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response data:", response.data); // Debug log
    return response.data;
  },
  (error) => {
    // Handle errors globally
    console.error("Response error:", error.response || error); // Debug log
    const errorMessage =
      error.response?.data?.message || error.message || "Something went wrong";
    return Promise.reject(new Error(errorMessage));
  }
);

export default axiosInstance;
