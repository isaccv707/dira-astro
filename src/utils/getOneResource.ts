

/**
 * Función genérica para obtener un recurso único por su slug o ID.
 * @param endpoint El recurso (ej: 'studies', 'posts')
 * @param slug El identificador del recurso
 */

import { API_URL } from "../constants/apiUrl";

export async function getOneResource<T>(endpoint: string, param: string): Promise<T | null> {
    if (!param || param.trim() === "") return null;
    const base = API_URL.endsWith("/") ? API_URL : `${API_URL}/`;
    const url = new URL(`${endpoint}/${param}`, base);
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