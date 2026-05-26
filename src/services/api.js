import axios from "axios";

const API_BASE_URL = "https://bhagyalaxmifertilizers.up.railway.app";

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token && !config.url.startsWith("/auth/login")) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const imageUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${API_BASE_URL}${path}`;
};

export default api;