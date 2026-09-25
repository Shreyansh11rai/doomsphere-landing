import { env } from "@/env/env";
import axios, { AxiosError } from "axios";
import type { ApiResponse } from "@/types/api";

class HttpClientError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "HttpClientError";
  }
}

const client = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: env.apiTimeoutMs,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

async function request<TResponse, TPayload extends object>(
  endpoint: string,
  payload: TPayload,
): Promise<ApiResponse<TResponse>> {
  try {
    const response = await client.post<ApiResponse<TResponse>>(
      endpoint,
      payload,
    );
    if (response.data.success === false) {
      throw new HttpClientError(response.data.message ?? "Request failed.");
    }
    return response.data;
  } catch (error) {
    if (error instanceof HttpClientError) throw error;
    if (error instanceof AxiosError && error.response?.data?.message) {
      throw new HttpClientError(error.response.data.message);
    }
    if (error instanceof AxiosError && error.code === "ECONNABORTED") {
      throw new HttpClientError("Request timed out.");
    }
    throw new HttpClientError("Unexpected request error.");
  }
}

export const httpClient = {
  post: <TResponse, TPayload extends object>(
    endpoint: string,
    payload: TPayload,
  ) => request<TResponse, TPayload>(endpoint, payload),
};
