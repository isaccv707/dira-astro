interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

export const DEFAULT_CACHE_TTL_MS = 5 * 60 * 1000;

// A plain in-memory Map is enough here: on the server it's one process
// (Node standalone adapter) so entries are shared across every visitor's
// request until they expire; on the client it's scoped to the tab's module
// instance. No eviction/max-size — this site's realistic key cardinality
// (a handful of branches/pages/search terms) never grows unbounded.
export function createTtlCache<T>(ttlMs: number = DEFAULT_CACHE_TTL_MS) {
  const store = new Map<string, CacheEntry<T>>();

  return {
    get(key: string): T | undefined {
      const entry = store.get(key);
      if (!entry || entry.expiresAt <= Date.now()) return undefined;
      return entry.data;
    },
    getStale(key: string): T | undefined {
      return store.get(key)?.data;
    },
    set(key: string, data: T): void {
      store.set(key, { data, expiresAt: Date.now() + ttlMs });
    },
  };
}
