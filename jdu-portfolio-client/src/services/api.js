import axios from "axios";
import { QueryClient } from "react-query";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BACKEND_URL,
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    config.withCredentials = true;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export default api;
