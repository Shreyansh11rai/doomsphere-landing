type EnvConfig = {
  apiBaseUrl: string;
  apiTimeoutMs: number;
};

const rawApiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const rawTimeout = Number(process.env.NEXT_PUBLIC_API_TIMEOUT_MS);

if (!rawApiBaseUrl || !rawTimeout) {
  throw new Error("Env missing");
}

export const Env: EnvConfig = {
  apiBaseUrl: rawApiBaseUrl,
  apiTimeoutMs: Number.isFinite(rawTimeout) ? rawTimeout : 6000,
};
