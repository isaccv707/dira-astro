import { API_URL } from "../constants/apiUrl";

type ApiGetParams = Record<string, string | number | undefined | null>;

export async function apiGet<T>(
  path: string,
  params: ApiGetParams = {},
): Promise<T | null> {
  const url = new URL(`${API_URL}${path}`);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  }

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status === 404) return null;

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(errorBody?.message || `Error ${response.status} en ${path}`);
  }

  return response.json();
}
