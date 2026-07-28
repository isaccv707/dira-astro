

/**
 * Función genérica para obtener un recurso único por su slug o ID.
 * @param endpoint El recurso (ej: 'studies', 'posts')
 * @param slug El identificador del recurso
 * @param params Query params opcionales (ej: { branchId })
 */

import { API_URL } from "../constants/apiUrl";
import { createTtlCache } from "./ttlCache";

type ResourceParams = Record<string, string | number | undefined | null>;

// Keyed by endpoint+slug+params, shared across every resource type this is
// called with (posts, studies, services detail pages) — these are the most
// SEO-sensitive routes (unique per-slug URLs, crawled repeatedly), so
// caching them protects both TTFB and backend load.
const resourceCache = createTtlCache<unknown>();

export async function getOneResource<T>(
    endpoint: string,
    param: string,
    params: ResourceParams = {},
): Promise<T | null> {
    if (!param || param.trim() === "") return null;

    const cacheKey = `${endpoint}/${param}?${JSON.stringify(params)}`;
    const cached = resourceCache.get(cacheKey);
    if (cached !== undefined) return cached as T | null;

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
            resourceCache.set(cacheKey, null);
            return null;
        }
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json() as T;
        resourceCache.set(cacheKey, data);
        return data;
    } catch (error) {
        console.error(`[API Error] ${endpoint}:`, error);
        const stale = resourceCache.getStale(cacheKey);
        return (stale as T | null | undefined) ?? null;
    }
}
