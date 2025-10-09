// Image optimization utilities

// Use VITE_API_URL at build time, fallback to localhost for local dev
const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');

export const getOptimizedImageUrl = (
  originalUrl: string, 
  width?: number, 
  height?: number,
  quality?: number
): string => {
  // If it's already a full URL or a placeholder path, return as is
  if (!originalUrl) return '/placeholder.svg';
  if (originalUrl.startsWith('http') || originalUrl.startsWith('/placeholder')) {
    return originalUrl;
  }

  // Preserve slashes while encoding spaces and special chars
  const encodedPath = encodeURI(originalUrl);

  // If width or quality are provided, use the resize endpoint
  if (width || quality) {
    return `${API_BASE}/img/resize?path=${encodedPath}&w=${width || ''}&q=${quality || ''}`;
  }

  // If the original path already starts with '/', use it directly
  if (originalUrl.startsWith('/')) {
    return `${API_BASE}${encodedPath}`;
  }

  // Otherwise assume it's a relative path under /images/
  return `${API_BASE}/images/${encodedPath}`;
};

// Generate srcSet for responsive images
export const generateSrcSet = (originalUrl: string): string => {
  const small = getOptimizedImageUrl(originalUrl, 400, undefined, 70);
  const medium = getOptimizedImageUrl(originalUrl, 800, undefined, 80);
  const large = getOptimizedImageUrl(originalUrl, 1200, undefined, 85);
  return `${small} 400w, ${medium} 800w, ${large} 1200w`;
};

// Get thumbnail URL (smaller version for lists)
export const getThumbnailUrl = (originalUrl: string): string => {
  return getOptimizedImageUrl(originalUrl, 400, 300, 70);
};

// Get full-size URL for product details
export const getFullSizeUrl = (originalUrl: string): string => {
  return getOptimizedImageUrl(originalUrl, 800, 600, 90);
};
