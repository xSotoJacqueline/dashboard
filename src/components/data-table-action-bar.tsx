import * as React from 'react';

import NumberFlow from '@number-flow/react';
import type { Table } from '@tanstack/react-table';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader, X } from 'lucide-react';
import * as ReactDOM from 'react-dom';

import { cn } from '../lib/utils';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

interface DataTableActionBarProps<TData> extends React.ComponentProps<typeof motion.div> {
  table: Table<TData>;
  visible?: boolean;
  container?: Element | DocumentFragment | null;
}

function DataTableActionBar<TData>({
  table,
  visible: visibleProp,
  container: containerProp,
  children,
  className,
  ...props
}: DataTableActionBarProps<TData>) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        table.toggleAllRowsSelected(false);
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [table]);

  const container = containerProp ?? (mounted ? globalThis.document?.body : null);

  if (!container) return null;

  const visible = visibleProp ?? table.getFilteredSelectedRowModel().rows.length > 0;

  return ReactDOM.createPortal(
    <AnimatePresence>
      {visible && (
      <motion.div
        role="toolbar"
        aria-orientation="horizontal"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className={cn(
          'dark:bg-foreground text-foreground absolute inset-x-0 bottom-6 z-50 mx-auto flex w-fit flex-wrap items-center justify-center gap-2 rounded-md border bg-background p-2 shadow-sm',
          className,
        )}
        {...props}
      >
        {children}
      </motion.div>
      )}
    </AnimatePresence>,
    container,
  );
}

interface DataTableActionBarActionProps extends React.ComponentProps<typeof Button> {
  tooltip?: string;
  isPending?: boolean;
}

function DataTableActionBarAction({
  size = 'sm',
  tooltip,
  isPending,
  disabled,
  className,
  children,
  ...props
}: DataTableActionBarActionProps) {
  const trigger = (
    <Button
      variant="secondary"
      size={size}
      className={cn(
        'border-secondary bg-secondary/50 hover:bg-secondary/70 gap-1.5 border [&>svg]:size-3.5',
        size === 'icon' ? 'size-7' : 'h-7',
        className,
      )}
      disabled={disabled || isPending}
      {...props}
    >
      {isPending ? <Loader className="animate-spin" /> : children}
    </Button>
  );

  if (!tooltip) return trigger;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{trigger}</TooltipTrigger>
      <TooltipContent
        sideOffset={6}
        className="bg-accent text-foreground z-[100] border font-semibold dark:bg-zinc-900 [&>span]:hidden"
      >
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
}

interface DataTableActionBarSelectionProps<TData> {
  table: Table<TData>;
}

function DataTableActionBarSelection<TData>({ table }: DataTableActionBarSelectionProps<TData>) {
  const onClearSelection = React.useCallback(() => {
    table.toggleAllRowsSelected(false);
  }, [table]);

  return (
    <div className="flex h-8 items-center rounded-md border px-1">
      <span className="flex items-center gap-2 whitespace-nowrap text-xs text-right">
        <NumberFlow className='min-w-4' value={table.getFilteredSelectedRowModel().rows.length} />
        {table.getFilteredSelectedRowModel().rows.length === 1 ? 'Seleccionado' : 'Seleccionados'}
      </span>
      <Separator orientation="vertical" className="ml-2 mr-1 data-[orientation=vertical]:h-4" />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" className="size-5" onClick={onClearSelection}>
            <X className="size-3.5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent
          sideOffset={22}
          className="bg-accent text-foreground flex items-center gap-2 border px-2 py-1 font-semibold dark:bg-zinc-900 [&>span]:hidden"
        >
          <p>Limpiar selección</p>
          <kbd className="bg-background text-foreground shadow-xs select-none rounded border px-1.5 py-px font-mono text-[0.7rem] font-normal">
            <abbr title="Escape" className="no-underline">
              Esc
            </abbr>
          </kbd>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

export { DataTableActionBar, DataTableActionBarAction, DataTableActionBarSelection };
