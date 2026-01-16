import axios from "axios";
const VITE_API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: VITE_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (error?.response?.status === 401 && !original?._retry) {
      original._retry = true;
      try {
        await api.post("/auth/refresh");
        return api(original);
      } catch {
      }
    }
    return Promise.reject(error);
  }
);
