import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook that automatically scrolls to the top of the page
 * whenever the route changes. This ensures that when users navigate
 * to a new page via buttons or links, they always start from the top.
 */
export const useScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top whenever the location changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [location.pathname, location.search]);

  // Also provide a manual scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  return { scrollToTop };
};
