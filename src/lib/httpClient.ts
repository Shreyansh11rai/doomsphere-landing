import { Env } from "@/config/env.config";
import axios, { AxiosError, type AxiosResponse } from "axios";
import { toast } from "sonner";

type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
  code?: string;
  fields?: Record<string, string[]>;
};

export const api = axios.create({
  baseURL: Env.apiBaseUrl,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (response: AxiosResponse<ApiResponse<unknown>>) => {
    if (!response.data.success) {
      return Promise.reject(
        new AxiosError(
          response.data.message ?? "Request failed",
          undefined,
          response.config,
          response.request,
          response,
        ),
      );
    }
    return response.data.data as never;
  },
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      if (status && status >= 500) {
        toast("Something went wrong on our side");
      }
    }

    return Promise.reject(error);
  },
);

api.interceptors.request.use(
  (req) => {
    return req;
  },
  (req) => {
    return req;
  },
);
