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
  srcSet,
  ...props
}: EnhancedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [blurUrl, setBlurUrl] = useState<string | null>(null);

  // ✅ Only normalize relative URLs; keep absolute URLs (Cloudinary) untouched
  const normalizedSrc = src.startsWith('http') ? src : imageService.resolveImage(src);

  // Generate responsive srcSet (normalize each URL)
  const finalSrcSet =
    srcSet
      ? srcSet
          .split(',')
          .map((item) => {
            const [url, size] = item.trim().split(' ');
            const resolvedUrl = url.startsWith('http') ? url : imageService.resolveImage(url);
            return `${resolvedUrl} ${size}`;
          })
          .join(', ')
      : imageService.generateSrcSet(normalizedSrc, [320, 640, 768, 1024, 1280, 1536], quality);

  // Get webp/fallback versions and normalize
  const { src: webpSrcRaw, fallback: jpegSrcRaw } = imageService.getImageWithFallback(normalizedSrc, quality);
  const webpSrc = webpSrcRaw.startsWith('http') ? webpSrcRaw : imageService.resolveImage(webpSrcRaw);
  const jpegSrc = jpegSrcRaw.startsWith('http') ? jpegSrcRaw : imageService.resolveImage(jpegSrcRaw);

  // Blur placeholder
  useEffect(() => {
    setIsLoading(true);
    setError(false);

    if (blur) {
      const raw = imageService.getPlaceholderUrl(normalizedSrc);
      setBlurUrl(raw.startsWith('http') ? raw : imageService.resolveImage(raw));
    }

    if (priority) {
      imageService.preloadImage(normalizedSrc);
    }
  }, [normalizedSrc, priority, blur]);

  const handleLoad = () => setIsLoading(false);
  const handleError = () => {
    setError(true);
    setIsLoading(false);
  };

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
        <source type="image/webp" srcSet={finalSrcSet} sizes={sizes} />

        {/* Fallback JPEG/PNG */}
        <img
          src={error ? '/placeholder.svg' : jpegSrc}
          alt={alt}
          className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300 ease-in-out`}
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

export default EnhancedImage;
