import React, { useState, useEffect } from 'react';

export interface EnhancedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  placeholderColor?: string;
  priority?: boolean;
  blur?: boolean;
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
  placeholderColor = '#f3f4f6',
  blur = false,
  loading: userLoading,
  decoding: userDecoding,
  ...props
}: EnhancedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setError(false);
  }, [src]);

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
      {isLoading && blur && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${src})`,
            backgroundColor: placeholderColor,
            filter: 'blur(20px)',
            transform: 'scale(1.1)',
          }}
          aria-hidden="true"
        />
      )}

      {/* Main Image */}
      <picture>
        {/* We keep picture for future use */}
        <source type="image/webp" srcSet={src} />

        <img
          src={error ? '/placeholder.svg' : src}
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
