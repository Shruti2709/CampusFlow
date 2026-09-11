
import axios from "axios";

const defaultUrl = import.meta.env.PROD
  ? "https://campusflow-vhdg.onrender.com/api"
  : "http://localhost:5000/api";

const rawBaseUrl = import.meta.env.VITE_API_URL || defaultUrl;
const baseURL = rawBaseUrl.endsWith("/api") ? rawBaseUrl : `${rawBaseUrl.replace(/\/+$/, "")}/api`;


const api = axios.create({
  baseURL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;