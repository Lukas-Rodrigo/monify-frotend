import { env } from "@/env";
import axios from "axios";

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
});

if (env.VITE_ENABLE_API_DELAY) {
  api.interceptors.request.use(async (config) => {
    await new Promise((response) => setTimeout(response, 2000));

    return config;
  });
}
