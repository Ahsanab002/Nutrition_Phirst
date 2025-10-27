import { useEffect } from 'react';
import { imageService } from '@/services/imageService';

export function useImagePreloading(imagePaths: string[]) {
  useEffect(() => {
    // Preload all specified images
    imagePaths.forEach(path => {
      imageService.preloadImage(path);
    });
  }, [imagePaths]);
}