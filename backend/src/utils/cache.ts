// Simple shared in-memory cache used across controllers
type CacheEntry = { data: any; timestamp: number };

export const cache = new Map<string, CacheEntry>();

export const CACHE_TTL = {
  PRODUCTS: 5 * 60 * 1000, // 5 minutes
  CATEGORIES: 30 * 60 * 1000 // 30 minutes
};

export const getCache = (key: string) => cache.get(key);
export const setCache = (key: string, data: any) => cache.set(key, { data, timestamp: Date.now() });
export const deleteCacheKey = (key: string) => cache.delete(key);

export const clearCachePrefix = (prefix: string) => {
  for (const key of Array.from(cache.keys())) {
    if (key.startsWith(prefix)) cache.delete(key);
  }
};

export default cache;
