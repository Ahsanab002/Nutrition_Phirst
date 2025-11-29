// src/lib/img.ts

// Prefer env, but fall back to your Railway URL if not provided.
const DEFAULT_API = "https://web-production-9e6d4.up.railway.app";

export const API_BASE = (
  (import.meta.env.VITE_API_URL as string) ||
  DEFAULT_API
).replace(/\/+$/, ""); // strip trailing slashes

/** Build a safe absolute URL for images coming as relative paths. */
export function resolveImage(src?: string) {
  if (!src) return "/placeholder.svg";                 // fallback
  if (/^https?:\/\//i.test(src)) return src;           // already absolute
  // If a root-relative path is provided (starts with '/'), treat it as a
  // public/static asset and return it unchanged so the browser loads it
  // from the current origin (e.g. /Banners/banner 15.jpg).
  if (src.startsWith('/')) return encodeURI(src);

  // Otherwise build an absolute URL pointing at the API image host.
  const path = `/${src}`; // ensure leading slash
  return encodeURI(`${API_BASE}${path}`);              // prepend Railway base
}

/** Normalize a srcSet string like: "img1.jpg 1x, /uploads/img2.jpg 2x" */
export function resolveSrcSet(srcSet?: string) {
  if (!srcSet) return undefined;
  return srcSet
    .split(",")
    .map(part => {
      const [url, descriptor] = part.trim().split(/\s+/, 2);
      return `${resolveImage(url)}${descriptor ? " " + descriptor : ""}`;
    })
    .join(", ");
}
