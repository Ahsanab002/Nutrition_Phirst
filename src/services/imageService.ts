interface ImageConfig {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png' | 'original';
}

class ImageService {
  private readonly defaultConfig: ImageConfig = {
    quality: 85,
    format: 'webp'
  };

  // Convert local image path to CDN URL (you can replace this with your actual CDN URL pattern)
  private getCdnUrl(path: string): string {
    // Remove leading slash if present
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    
    // For now, we'll serve from the local path, but you can replace this with your CDN URL
    // Example CDN URL pattern: return `https://your-cdn.com/${cleanPath}`;
    return `/${cleanPath}`;
  }

  // Generate srcSet for responsive images
  public generateSrcSet(path: string, widths: number[], quality?: number): string {
    return widths
      .map(width => {
        const url = this.getOptimizedImageUrl(path, { width, quality });
        return `${url} ${width}w`;
      })
      .join(', ');
  }

  // Get optimized image URL with transformations
  public getOptimizedImageUrl(path: string, config: ImageConfig = {}): string {
    const settings = { ...this.defaultConfig, ...config };
    const cdnUrl = this.getCdnUrl(path);

    // Here you would typically add transformation parameters to your CDN URL
    // For now, we'll return the CDN URL as is
    return cdnUrl;
  }

  // Preload critical images
  public preloadImage(path: string): void {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = this.getOptimizedImageUrl(path);
    document.head.appendChild(link);
  }

  // Get placeholder blur data URL (simplified version)
  public getPlaceholderUrl(path: string): string {
    // In a real implementation, you would generate a tiny blur placeholder
    // For now, return a light gray color
    return 'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==';
  }

  // Get next-gen format with fallback
  public getImageWithFallback(path: string, quality?: number): { src: string; fallback: string } {
    return {
      src: this.getOptimizedImageUrl(path, { format: 'webp', quality }),
      fallback: this.getOptimizedImageUrl(path, { format: 'jpeg', quality })
    };
  }
}

export const imageService = new ImageService();