import axios from "axios";

export type FormattedApiError = {
  code?: string;
  fields?: Record<string, string[]>;
  status: number;
  message: string;
};

function formatApiError(error: unknown): FormattedApiError {
  if (axios.isAxiosError(error)) {
    const response = error.response;
    const body = response?.data as
      | { code?: string; fields?: Record<string, string[]>; message?: string }
      | undefined;

    return {
      code: body?.code,
      fields: body?.fields,
      status: response?.status ?? 0,
      message: body?.message ?? error.message,
    };
  }

  return {
    status: 0,
    message: error instanceof Error ? error.message : "Something went wrong",
  };
}

function throwFormattedApiError(error: unknown): never {
  throw formatApiError(error);
}

export const requestData = <T>(request: Promise<unknown>) =>
  request.catch(throwFormattedApiError) as Promise<T>;
