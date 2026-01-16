import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: VITE_API_URL,
  withCredentials: true,
});

// ------------------ refresh lock + queue ------------------
let isRefreshing = false;
let waiters: Array<(ok: boolean) => void> = [];

function notify(ok: boolean) {
  waiters.forEach((fn) => fn(ok));
  waiters = [];
}

function redirectToLogin() {
  // avoid redirect loop if already on login
  if (window.location.pathname !== "/login") {
    window.location.replace("/login");
  }
}

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const status = error.response?.status;
    const original = error.config as (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined;

    if (!original) return Promise.reject(error);

    const url = original.url || "";

    // ✅ DO NOT try to refresh if the failing request is refresh/login/register/logout
    if (
      url.includes("/auth/refresh") ||
      url.includes("/auth/login") ||
      url.includes("/auth/register") ||
      url.includes("/auth/logout")
    ) {
      if (status === 401) redirectToLogin();
      return Promise.reject(error);
    }

    // handle only 401 and only once per request
    if (status !== 401 || original._retry) {
      return Promise.reject(error);
    }
    original._retry = true;

    // if a refresh is already running, wait for it
    if (isRefreshing) {
      const ok = await new Promise<boolean>((resolve) => waiters.push(resolve));
      if (!ok) {
        redirectToLogin();
        return Promise.reject(error);
      }
      return api(original);
    }

    isRefreshing = true;
    try {
      await api.post("/auth/refresh");
      notify(true);
      return api(original);
    } catch (e) {
      notify(false);
      redirectToLogin();
      return Promise.reject(e);
    } finally {
      isRefreshing = false;
    }
  }
);
