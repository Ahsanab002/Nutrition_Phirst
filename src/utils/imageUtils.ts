// Image optimization utilities
export const getOptimizedImageUrl = (
  originalUrl: string, 
  width?: number, 
  height?: number,
  quality?: number
): string => {
  // If it's already a full URL or placeholder, return as is
  if (originalUrl.startsWith('http') || originalUrl.startsWith('/placeholder')) {
    return originalUrl;
  }

  // For backend images, construct optimized URL
  const baseUrl = 'http://localhost:5000';
  const encodedPath = encodeURI(originalUrl);
  
  // If width or quality are provided, use the resize endpoint
  if (width || quality) {
    return `${baseUrl}/img/resize?path=${encodedPath}&w=${width || ''}&q=${quality || ''}`;
  }

  // Otherwise return the original image path
  if (originalUrl.startsWith('/')) {
    return `${baseUrl}${encodedPath}`;
  }

  return `${baseUrl}/images/${encodedPath}`;
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