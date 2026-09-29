type EnvConfig = {
  apiBaseUrl: string;
  apiTimeoutMs: number;
  loggerLevel: string;
};

const rawApiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const loggerLevel = process.env.NEXT_PUBLIC_LOGGER_LEVEL;
const rawTimeout = Number(process.env.NEXT_PUBLIC_API_TIMEOUT_MS);

if (!rawApiBaseUrl || !rawTimeout || !loggerLevel) {
  throw new Error("Env missing");
}

export const Env: EnvConfig = {
  apiBaseUrl: rawApiBaseUrl,
  loggerLevel,
  apiTimeoutMs: Number.isFinite(rawTimeout) ? rawTimeout : 6000,
};
