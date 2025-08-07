export type ApiConfig = {
  baseUrl: string;
};

let config: ApiConfig = {
  baseUrl: ''
};

export function initApi(cfg?: Partial<ApiConfig>) {
  config = { ...config, ...cfg };
}

export async function get(path: string) {
  const url = config.baseUrl ? new URL(path, config.baseUrl).toString() : path;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}
