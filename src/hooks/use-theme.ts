import { useEffect } from 'react';
import { useDarkMode } from 'usehooks-ts';

export const useTheme = () => {
  const { isDarkMode, toggle, enable, disable, set } = useDarkMode({ 
    defaultValue: true, 
    initializeWithValue: false 
  });

  // Aplicar tema al documento desde que se monta el hook
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return {
    isDarkMode,
    toggle,
    enable,
    disable,
    set,
  };
};
