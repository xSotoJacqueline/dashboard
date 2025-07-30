import * as React from 'react';

import type { Table } from '@tanstack/react-table';
import { AnimatePresence, type Transition, type Variants, motion } from 'framer-motion';

import {
  Download,
  Trash2,
} from 'lucide-react';

import { toast as sonnertoast, useSonner } from 'sonner';
import { toast } from 'sonner';

import { exportTableToCSV } from '@/lib/export';
import {
  DataTableActionBar,
  DataTableActionBarSelection,
} from './data-table-action-bar';
import { Separator } from '@radix-ui/react-separator';

interface DataTablePaginationProps<TData extends { id: number }>
  extends React.ComponentProps<'div'> {
  table: Table<TData>;
  loading: boolean;
  download?: boolean;
  onMultipleDownload?: (ids: number[]) => Promise<void>;
  onMultipleDelete?: (ids: number[]) => Promise<void>;
}

export function TableActionBar<TData extends { id: number }>({
  table,
  download,
  onMultipleDelete,
}: DataTablePaginationProps<TData>) {
  const { toasts } = useSonner();

  function removeAllToasts() {
    toasts.forEach((t) => toast.dismiss(t.id));
  }

  const rows = table.getFilteredSelectedRowModel().rows;

  const [isPending, startTransition] = React.useTransition();
  const [isDownloading, setIsDownloading] = React.useState(false);

  const isOperationPending = React.useMemo(() => {
    return isDownloading || isPending;
  }, [isDownloading, isPending]);


  const BUTTON_MOTION_CONFIG = {
    initial: 'rest',
    whileHover: 'hover',
    whileTap: 'tap',
    variants: {
      rest: { maxWidth: '32px' },
      hover: {
        maxWidth: '140px',
        transition: { type: 'spring', stiffness: 200, damping: 35, delay: 0.15 },
      },
      disabled: { maxWidth: '32px' },
      tap: { scale: 0.95 },
    },
    transition: { type: 'spring', stiffness: 250, damping: 25 },
  } as const;

  const LABEL_VARIANTS: Variants = {
    rest: { opacity: 0, x: 4 },
    hover: { opacity: 1, x: 0, visibility: 'visible' },
    tap: { opacity: 1, x: 0, visibility: 'visible' },
  };

  const LABEL_TRANSITION: Transition = {
    type: 'spring',
    stiffness: 200,
    damping: 25,
  };


  async function handleDownload() {
    const files = "await getFiles()"
    if (files) {
      "await downloadAnyFileMultiple({ multipleFiles: files });"
    }
  }

  const handleMultipleDelete = () => {
    try {
      const ids = rows.map((row) => row.original.id);
      console.log('Deleting IDs:', ids);
      if (onMultipleDelete) {
        setIsDownloading(true);
        toast.promise(onMultipleDelete(ids), {
          loading: (`Deleting records...`),
          success: () => {
            setIsDownloading(false);
            return (`Records deleted successfully`);
          },
          error: () => {
            setIsDownloading(false);
            return (`Error deleting records`);
          },
          position: 'bottom-center',
          className: 'mb-16',
        });
      }
    } catch (error) {
      toast.error((`Error deleting records`));
      console.error('Error deleting record:', error);
    }
  };

  const onTaskExport = React.useCallback(() => {
    startTransition(() => {
      exportTableToCSV(table, {
        excludeColumns: ['select', 'actions'],
        onlySelected: true,
      });
    });
  }, [table]);


  return (
    <DataTableActionBar className="z-[10] min-h-[57px]" table={table} visible={rows.length > 0}>
      <div className="flex flex-col items-center gap-1.5 sm:flex-row">
        <AnimatePresence mode="wait">
          {rows.length > 0 && (
            <motion.div
              layout
              layoutRoot
              initial="hidden"
              animate="visible"
              exit="exit"
              className="mx-auto flex flex-wrap items-center space-x-2 overflow-hidden sm:flex-nowrap"
              style={{ originX: 0 }}
            >
              <motion.div layout  className="flex-shrink-0">
                <Separator
                  orientation="vertical"
                  className="hidden data-[orientation=vertical]:h-5 sm:block"
                />
              </motion.div>
              <motion.div layout className="flex-shrink-0">
                <DataTableActionBarSelection table={table} />
              </motion.div>
             {onMultipleDelete && (
                  <motion.div layout className="flex-shrink-0">
                    <Separator
                      orientation="vertical"
                      className="hidden data-[orientation=vertical]:h-5 sm:block"
                    />
                  </motion.div>
                )}

                <motion.div layout className="flex-shrink-0">
                  <motion.button
                    {...BUTTON_MOTION_CONFIG}
                    className={`flex h-8 w-auto items-center gap-2 overflow-hidden whitespace-nowrap rounded-md bg-destructive p-2 ${isOperationPending ? 'cursor-not-allowed text-red-500 opacity-50 dark:!text-red-200' : 'text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60'}`}
                    aria-label="Reject"
                    disabled={isOperationPending}
                    onClick={() => {
                      removeAllToasts();
                      sonnertoast.warning('Esta acción sera permanente', {
                        description: 'Estas seguro que quieres eliminar estos registros?',
                        action: {
                          label: 'Eliminar',
                          onClick: () => handleMultipleDelete(),
                        },
                        className: 'mb-16',
                        position: 'bottom-center',
                        closeButton: true,
                      });
                    }}
                  >
                    <Trash2 size={16} className="shrink-0" />
                    <motion.span
                      variants={LABEL_VARIANTS}
                      transition={LABEL_TRANSITION}
                      className="invisible text-sm"
                    >
                      Eliminar
                    </motion.span>
                  </motion.button>
                </motion.div>

                <motion.div layout className="flex-shrink-0">
                  <motion.button
                    {...BUTTON_MOTION_CONFIG}
                    className={`bg-secondary/90 ${isOperationPending ? '!text-foreground cursor-not-allowed' : ''} hover:bg-secondary text-foreground flex h-8 w-auto items-center gap-2 overflow-hidden whitespace-nowrap rounded-sm p-2`}
                    aria-label="Reject"
                    disabled={isOperationPending}
                    onClick={
                      download
                        ? () => {
                            setIsDownloading(true);
                            toast.promise(handleDownload(), {
                              loading: (`Downloading files...`),
                              success: () => {
                                setIsDownloading(false);
                                return (`Files downloaded successfully`);
                              },
                              error: () => {
                                setIsDownloading(false);
                                return (`Error downloading files`);
                              },
                              position: 'bottom-center',
                              className: 'mb-16',
                            });
                          }
                        : onTaskExport
                    }
                  >
                    <Download size={16} className="shrink-0" />
                    <motion.span
                      variants={LABEL_VARIANTS}
                      transition={LABEL_TRANSITION}
                      className="invisible text-sm"
                    >
                      {download ? (`Download`) : (`Export`)}
                    </motion.span>
                  </motion.button>
                </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DataTableActionBar>
  );
}
