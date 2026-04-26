export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

export const DATA_SOURCE = process.env.NEXT_PUBLIC_DATA_SOURCE ?? "api";

export const isMockDataSource = DATA_SOURCE !== "api";
