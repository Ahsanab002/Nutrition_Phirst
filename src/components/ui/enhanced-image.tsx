import React, { useState, useEffect } from 'react';
import { imageService } from '@/services/imageService';

export interface EnhancedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  placeholderColor?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  blur?: boolean;
  srcSet?: string;
  loading?: 'lazy' | 'eager';
  decoding?: 'sync' | 'async' | 'auto';
}

export const EnhancedImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  sizes = '100vw',
  placeholderColor = '#f3f4f6',
  quality = 75,
  blur = false,
  loading: userLoading,
  decoding: userDecoding,
  ...props
}: EnhancedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [blurUrl, setBlurUrl] = useState<string | null>(null);

  // Generate responsive srcSet
  const srcSet = props.srcSet || imageService.generateSrcSet(src, [320, 640, 768, 1024, 1280, 1536], quality);
  const { src: webpSrc, fallback: jpegSrc } = imageService.getImageWithFallback(src, quality);

  useEffect(() => {
    // Reset states when src changes
    setIsLoading(true);
    setError(false);

    // Get blur placeholder if blur effect is enabled
    if (blur) {
      setBlurUrl(imageService.getPlaceholderUrl(src));
    }

    // Preload image if priority is true
    if (priority) {
      imageService.preloadImage(src);
    }
  }, [src, priority, blur]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setError(true);
    setIsLoading(false);
  };

  // Determine loading and decoding strategies
  const loading = userLoading ?? (priority ? 'eager' : 'lazy');
  const decoding = userDecoding ?? (priority ? 'sync' : 'async');

  return (
    <div className="relative w-full h-full">
      {/* Blur Placeholder */}
      {isLoading && blurUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${blurUrl})`,
            backgroundColor: placeholderColor,
            filter: 'blur(20px)',
            transform: 'scale(1.1)',
          }}
          aria-hidden="true"
        />
      )}

      {/* Main Image */}
      <picture>
        {/* WebP version */}
        <source
          type="image/webp"
          srcSet={srcSet}
          sizes={sizes}
        />
        
        {/* Fallback version */}
        <img
          src={error ? '/placeholder.svg' : jpegSrc}
          alt={alt}
          className={`${className} ${
            isLoading ? 'opacity-0' : 'opacity-100'
          } transition-opacity duration-300 ease-in-out`}
          width={width}
          height={height}
          onLoad={handleLoad}
          onError={handleError}
          loading={loading}
          decoding={decoding}
          {...props}
        />
      </picture>
    </div>
  );
};