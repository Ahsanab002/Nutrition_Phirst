import React, { useState } from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  placeholderColor?: string;
}

export const OptimizedImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  placeholderColor = '#f3f4f6',
  ...props
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setError(true);
    setIsLoading(false);
  };

  const placeholderStyle = {
    backgroundColor: placeholderColor,
  };

  return (
    <div className="relative w-full h-full">
      {/* Placeholder */}
      {isLoading && (
        <div
          className="absolute inset-0"
          style={placeholderStyle}
          aria-hidden="true"
        />
      )}

      {/* Actual Image */}
      <img
        src={error ? '/placeholder.svg' : src}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
        decoding="async"
        width={width}
        height={height}
        {...props}
      />
    </div>
  );
};