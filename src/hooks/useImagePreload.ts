import { useEffect } from 'react';

export const useImagePreload = (imagePaths: string[]) => {
  useEffect(() => {
    // Create an array of image objects to preload
    const imageObjects = imagePaths.map(path => {
      const img = new Image();
      img.src = path;
      return img;
    });

    // Cleanup function
    return () => {
      imageObjects.forEach(img => {
        img.src = ''; // Clear the source to cancel any pending loads
      });
    };
  }, [imagePaths]);
};