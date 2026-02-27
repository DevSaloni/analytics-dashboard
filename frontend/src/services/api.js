import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // backend URL
});

// Attach JWT token if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getSales = (params) => API.get("/sales", { params });

export const login = (data) => API.post("/auth/login", data);
export const register = (data) => API.post("/auth/register", data);