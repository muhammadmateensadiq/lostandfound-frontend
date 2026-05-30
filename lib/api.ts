import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    // Only try refresh for expired tokens
    if (
      error.response?.status === 401 &&
      !original._retry &&
      !original.url.includes("/api/accounts/auth/login/") &&
      !original.url.includes("/accounts/auth/refresh/")
    ) {
      original._retry = true;

      try {
        await api.post("/accounts/auth/refresh/");
        return api(original);
      } catch (refreshError) {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("auth:logout"));
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;