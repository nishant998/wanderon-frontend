import { api } from "./client";

export type SafeUser = {
  sub: string;
  email: string;
  username?: string;
};

export async function registerApi(data: {
  email: string;
  username: string;
  password: string;
}) {
  const res = await api.post("/auth/register", data);
  return res.data;
}

export async function loginApi(data: { email: string; password: string }) {
  const res = await api.post("/auth/login", data);
  return res.data;
}

export async function meApi() {
  const res = await api.get("/auth/me");
  return res.data; 
}

export async function logoutApi() {
  const res = await api.post("/auth/logout");
  return res.data;
}
