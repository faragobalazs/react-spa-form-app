import axios from "axios";

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add auth token here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    console.log("Request config:", config);
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response data:", response.data);
    return response.data;
  },
  (error) => {
    // Handle errors globally
    console.error("Response error:", error.response || error);
    const errorMessage =
      error.response?.data?.message || error.message || "Something went wrong";
    return Promise.reject(new Error(errorMessage));
  }
);

export default axiosInstance;
