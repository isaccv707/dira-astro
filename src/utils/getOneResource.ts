

/**
 * Función genérica para obtener un recurso único por su slug o ID.
 * @param endpoint El recurso (ej: 'studies', 'posts')
 * @param slug El identificador del recurso
 * @param params Query params opcionales (ej: { branchId })
 */

import { API_URL } from "../constants/apiUrl";

type ResourceParams = Record<string, string | number | undefined | null>;

export async function getOneResource<T>(
    endpoint: string,
    param: string,
    params: ResourceParams = {},
): Promise<T | null> {
    if (!param || param.trim() === "") return null;
    const base = API_URL.endsWith("/") ? API_URL : `${API_URL}/`;
    const url = new URL(`${endpoint}/${param}`, base);
    for (const [key, value] of Object.entries(params)) {
        if (value !== undefined && value !== null && value !== "") {
            url.searchParams.set(key, String(value));
        }
    }
    try {
        const response = await fetch(url.toString());
        if (response.status === 404) {
            return null;
        }
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return await response.json() as T;
    } catch (error) {
        console.error(`[API Error] ${endpoint}:`, error);
        return null;
    }
}