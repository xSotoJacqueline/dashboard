import { useEffect, useLayoutEffect, useCallback, useMemo } from 'react';
import { useDarkMode } from 'usehooks-ts';

export const useTheme = () => {
  const { isDarkMode, toggle, enable, disable, set } = useDarkMode({ 
    defaultValue: true, 
    initializeWithValue: false 
  });

  const memoizedIsDarkMode = useMemo(() => isDarkMode, [isDarkMode]);

  useLayoutEffect(() => {
    try {
      const savedTheme = localStorage.getItem('usehooks-ts-dark-mode');
      if (savedTheme !== null) {
        set(savedTheme === 'true');
      }
    } catch (error) {
      console.warn('Failed to read theme from localStorage:', error);
    }
  }, [set]);

  const applyTheme = useCallback((darkMode: boolean) => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [set]);

  const toggleWithTransition = useCallback(() => {
    if (!document.startViewTransition) {
      toggle();
      return;
    }
    document.startViewTransition(() => {
      toggle();
    });
  }, [toggle]);

  useEffect(() => {
    applyTheme(memoizedIsDarkMode);
  }, [memoizedIsDarkMode, applyTheme]);

  return {
    isDarkMode: memoizedIsDarkMode,
    toggle: toggleWithTransition,
    enable,
    disable,
    set,
  };
};