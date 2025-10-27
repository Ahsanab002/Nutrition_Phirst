import React, { useState, useEffect } from 'react';

interface OptimizedBackgroundProps {
  src: string;
  className?: string;
  children?: React.ReactNode;
}

export const OptimizedBackground: React.FC<OptimizedBackgroundProps> = ({
  src,
  className = '',
  children
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setIsLoading(false);
    };
  }, [src]);

  return (
    <div className={`relative ${className}`}>
      {/* Loading placeholder */}
      {isLoading && (
        <div 
          className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse"
          aria-hidden="true"
        />
      )}
      
      {/* Background image */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ backgroundImage: `url('${src}')` }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};