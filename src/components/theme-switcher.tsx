import { motion } from 'framer-motion';
import { MoonStar, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { cn } from '@/lib/utils';

export const ThemeSwitcher = ({className}:{className?: string}) => {
  const { isDarkMode, toggle } = useTheme();

  return (
    <div className={cn("bg-muted flex items-center justify-center gap-x-1 rounded-sm p-1", className)}>
      <button
        className="text-muted-foreground relative z-10 flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:text-foreground"
        onClick={() => toggle()}
      >
        {!isDarkMode && (
          <motion.div
            className="bg-background absolute inset-0 rounded-full shadow-sm"
            layoutId="selected-theme"
            transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
          />
        )}
        <Sun className="h-5 w-5 z-10" />
      </button>

      <button
        className="text-foreground relative z-10 flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:text-foreground"
        onClick={() => toggle()}
      >
        {isDarkMode && (
          <motion.div
            className="bg-background absolute inset-0 rounded-full shadow-sm"
            layoutId="selected-theme"
            transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
          />
        )}
        <MoonStar className="h-5 w-5 z-10" />
      </button>
    </div>
  );
};