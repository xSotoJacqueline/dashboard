import { useEffect, useCallback } from 'react';
import { useDarkMode } from 'usehooks-ts';

export const useTheme = () => {
  const { isDarkMode, toggle, enable, disable, set } = useDarkMode({ 
    defaultValue: true, 
    initializeWithValue: false 
  });

  const applyTheme = useCallback((darkMode: boolean) => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

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
    applyTheme(isDarkMode);
  }, [isDarkMode, applyTheme]);

  return {
    isDarkMode,
    toggle: toggleWithTransition,
    enable,
    disable,
    set,
  };
};