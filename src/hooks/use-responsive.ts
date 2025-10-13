'use client';

import { useState, useEffect } from 'react';

export function useMobileDetect() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add event listener
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}

export function useResponsiveValue<T>(
  options: {
    mobile: T;
    tablet?: T;
    desktop: T;
  },
  breakpoints = { tablet: 768, desktop: 1024 }
) {
  const [value, setValue] = useState<T>(options.desktop);

  useEffect(() => {
    const updateValue = () => {
      const width = window.innerWidth;
      if (width < breakpoints.tablet) {
        setValue(options.mobile);
      } else if (width < breakpoints.desktop && options.tablet) {
        setValue(options.tablet);
      } else {
        setValue(options.desktop);
      }
    };

    // Initial update
    updateValue();

    // Add event listener
    window.addEventListener('resize', updateValue);

    // Cleanup
    return () => window.removeEventListener('resize', updateValue);
  }, [options, breakpoints]);

  return value;
}