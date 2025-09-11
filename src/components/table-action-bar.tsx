import * as React from 'react';
import type { Table } from '@tanstack/react-table';
import { AnimatePresence, type Transition, type Variants, motion } from 'framer-motion';
import {
  Download,
  Trash2,
  CheckIcon,
  XIcon,
} from 'lucide-react';
import { toast, useSonner } from 'sonner';
import {
  DataTableActionBar,
  DataTableActionBarSelection,
} from './data-table-action-bar';
import { Separator } from '@radix-ui/react-separator';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import JSZip from 'jszip';
import { xApiKey } from '@/queryOptions/queryOptions';

interface DataTablePaginationProps<TData extends { id: number, url: string, name: string }>
  extends React.ComponentProps<'div'> {
  table: Table<TData>;
  loading: boolean;
  download?: boolean;
  isMobile: boolean;
  onMultipleDownload?: (ids: number[]) => Promise<void>;
  onMultipleDelete?: (ids: number[]) => Promise<void>;
}

const CONTAINER_VARIANTS: Variants = {
  hidden: {
    opacity: 0,
    width: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    width: 'auto',
    scale: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
      width: {
        duration: 0.3,
      },
      scale: {
        duration: 0.2,
      },
    },
  },
  exit: {
    opacity: 0,
    width: 0,
    scale: 0.8,
    transition: {
      duration: 0.2,
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
};

const ITEM_VARIANTS: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.1,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    x: -20,
    scale: 0.9,
    transition: {
      duration: 0.2,
    },
  },
};

  const BUTTON_MOTION_CONFIG = {
    initial: 'rest',
    whileHover: 'hover',
    whileTap: 'tap',
    variants: {
      rest: { maxWidth: 32 },
      hover: {
        maxWidth: 140,
        transition: { type: 'spring', stiffness: 200, damping: 35, delay: 0.15 },
      },
      disabled: { maxWidth: 32 },
      tap: { scale: 0.95 },
    },
    transition: { type: 'spring', stiffness: 250, damping: 25 },
  } as const;


export function TableActionBar<TData extends { id: number, url: string, name: string }>({
  table,
  isMobile,
}: DataTablePaginationProps<TData>) {
  const { toasts } = useSonner();
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const [downloading, setDownloading] = React.useState(false);
  function removeAllToasts() {
    toasts.forEach((t) => toast.dismiss(t.id));
  }
  const queryClient = useQueryClient()
    const rows = table.getFilteredSelectedRowModel().rows;

  const { mutate, isPending  } = useMutation({
    mutationFn: async (ids: number[]) => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/benchmark/delete-many/`, {
        method: 'DELETE',
        body: JSON.stringify({ ids }),
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': xApiKey
        },
      });
      if (!res.ok) {
        throw new Error('Failed to delete benchmark key');
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success('Archivos eliminados correctamente', { className: `${isMobile ? "mt-8" : ""}`, position: isMobile ? "top-center" : "top-right" });
      queryClient.invalidateQueries({ queryKey: ['benchmarkKeys'] });
      table.resetRowSelection();
    },
    onError: (error) => {
      toast.error(`Error al eliminar archivos: ${error.message}`, { className: `${isMobile ? "mt-8" : ""}`, position: isMobile ? "top-center" : "bottom-right" });
    },
    onSettled: () => {
      setShowConfirmation(false);
    }

  });

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

type letFiles = {
  title: string;
  data: Blob;
};



  async function handleDownload() {
    try{
    const filesToPush: letFiles[] = [];

    const files = rows.map((row) => row.original);

    for (const file of files) {
      const title = file.name || file.url.split('/').pop() || 'document';
      const response = await fetch(file.url, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`Failed to get file "${file.id}", failed with status code ${response.status}`);
      }

      const buffer = await response.arrayBuffer();

      const binaryData = new Uint8Array(buffer);

            let contentType = '';

      if (!contentType && title) {
        const extension = title.split('.').pop()?.toLowerCase();
        contentType = getMimeTypeFromExtension(extension);
      }

      if (!contentType) {
        contentType = 'application/octet-stream';
      }

      const blob = new Blob([binaryData], {
        type: contentType,
      });

      filesToPush.push({
        title: title,
        data: blob,
      });
    }
    const zip = new JSZip();
    for (const file of filesToPush) {
      zip.file(file.title, file.data);
    }
    const zipContent = await zip.generateAsync({ type: 'blob' });
    if (zipContent) {
      const blob = new Blob([zipContent], { type: 'application/zip' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `Archivos-${Date.now()}.zip`;
      link.click();
    }else{
      throw new Error('Failed to create zip file');
    }
    }catch(error){
      throw error;
    }

  }


  const handleMultipleDelete = () => {
    try {
      const ids = rows.map((row) => row.original.id);
      mutate(ids);
    } catch (error) {
      toast.error((`Error deleting records`));
      console.error('Error deleting record:', error);
    }
  };

  return (
    <DataTableActionBar className="min-h-[57px]" table={table} visible={rows.length > 0}>
      <div className="flex flex-row items-center gap-1.5">
        <AnimatePresence mode="wait">
          {rows.length > 0 && (
            <motion.div
              layout
              layoutRoot
              initial="hidden"
              animate="visible"
              exit="exit"
              className="mx-auto flex items-center space-x-2 overflow-hidden flex-nowrap"
              style={{ originX: 0 }}
            >

              <motion.div layout className="flex-shrink-0">
                <DataTableActionBarSelection table={table} isLoading={isPending || showConfirmation || downloading} />
              </motion.div>

                {/* boton para exportar */}
                <motion.div layout className="flex-shrink-0">
                  <motion.button
                    {...BUTTON_MOTION_CONFIG}
                    className={`bg-secondary/90 ${(isPending || showConfirmation || downloading) ? 'cursor-not-allowed text-foreground/80 opacity-50' : ' cursor-pointer text-foreground'} hover:bg-secondary  flex h-8 w-auto items-center gap-2 overflow-hidden whitespace-nowrap rounded-sm p-2`}
                    aria-label="Reject"
                    disabled={isPending || showConfirmation || downloading}
                    onClick={() => {
                      setDownloading(true);
                      toast.promise(handleDownload(), {
                        success: 'Archivos descargados correctamente',
                        error: 'Error al descargar archivos',
                        loading: 'Descargando archivos...',
                        finally: () => setDownloading(false),
                      });
                    }}
                  >
                    <Download size={16} className="shrink-0" />
                    <motion.span
                      variants={LABEL_VARIANTS}
                      transition={LABEL_TRANSITION}
                      className="invisible text-sm"
                    >
                      Descargar
                    </motion.span>
                  </motion.button>
                </motion.div>

                {/* boton para eliminar */}
                <motion.div layout className="flex-shrink-0">
                  <motion.button
                    className={`flex h-8 w-auto cursor-pointer items-center gap-2 overflow-hidden whitespace-nowrap rounded-md bg-destructive p-2 ${isPending || showConfirmation || downloading ? 'cursor-not-allowed text-red-500 opacity-50 dark:!text-red-200' : 'text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60'}`}
                    aria-label="Reject"
                    disabled={isPending || showConfirmation || downloading}
                    onClick={() => {
                      setShowConfirmation(!showConfirmation);
                    }}
                  >
                    <Trash2 size={16} className="shrink-0" />
                  </motion.button>
                </motion.div>

                {/* botones para confirmar o cancelar */}
                <AnimatePresence mode="wait">
                  {showConfirmation && (
                    <motion.div
                      layout
                      layoutRoot
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={CONTAINER_VARIANTS}
                      className="mx-auto flex items-center space-x-2 overflow-hidden flex-nowrap"
                      style={{ originX: 0 }}
                    >
                      <motion.div layout variants={ITEM_VARIANTS} className="flex-shrink-0">
                        <Separator
                          orientation="vertical"
                          className=" data-[orientation=vertical]:h-6 rounded-full border-[1px] "
                        />
                      </motion.div>
                      <motion.div layout variants={ITEM_VARIANTS} className="flex-shrink-0">
                        <motion.button
                          {...BUTTON_MOTION_CONFIG}
                          className={`flex h-8 w-auto cursor-pointer items-center gap-2 overflow-hidden whitespace-nowrap rounded-lg bg-destructive/80 hover:bg-destructive p-2 ${isPending ? 'cursor-not-allowed opacity-50' : 'text-white'}`}
                          aria-label="Reject"
                          disabled={isPending}
                          onClick={() => {
                            removeAllToasts();
                            handleMultipleDelete();
                          }}
                        >
                          <CheckIcon size={16} className="shrink-0" />
                          <motion.span
                            variants={LABEL_VARIANTS}
                            transition={LABEL_TRANSITION}
                            className="invisible text-sm"
                          >
                            Confirmar
                          </motion.span>
                        </motion.button>
                      </motion.div>
                      <motion.div layout variants={ITEM_VARIANTS} className="flex-shrink-0">
                        <motion.button
                          {...BUTTON_MOTION_CONFIG}
                          className={`bg-secondary/90 cursor-pointer ${isPending ? '!text-foreground cursor-not-allowed' : ''} hover:bg-secondary text-foreground flex h-8 w-auto items-center gap-2 overflow-hidden whitespace-nowrap rounded-sm p-2`}
                          aria-label="Reject"
                          disabled={isPending}
                          onClick={() => {
                            setShowConfirmation(false);
                            removeAllToasts();
                          }}
                        >
                          <XIcon size={16} className="shrink-0" />
                          <motion.span
                            variants={LABEL_VARIANTS}
                            transition={LABEL_TRANSITION}
                            className="invisible text-sm"
                          >
                            Cancelar
                          </motion.span>
                        </motion.button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DataTableActionBar>
  );
}

const getMimeTypeFromExtension = (extension?: string): string => {
  if (!extension) return 'application/octet-stream';

  const mimeTypes: Record<string, string> = {
    // Documents
    pdf: 'application/pdf',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ppt: 'application/vnd.ms-powerpoint',
    pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    txt: 'text/plain',
    rtf: 'application/rtf',

    // Images
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    svg: 'image/svg+xml',
    bmp: 'image/bmp',
    webp: 'image/webp',

    // Audio
    mp3: 'audio/mpeg',
    wav: 'audio/wav',
    ogg: 'audio/ogg',
    flac: 'audio/flac',

    // Video
    mp4: 'video/mp4',
    avi: 'video/x-msvideo',
    mov: 'video/quicktime',
    wmv: 'video/x-ms-wmv',

    // Archives
    zip: 'application/zip',
    rar: 'application/vnd.rar',
    '7z': 'application/x-7z-compressed',
    tar: 'application/x-tar',
    gz: 'application/gzip',

    // Code files
    html: 'text/html',
    css: 'text/css',
    js: 'text/javascript',
    json: 'application/json',
    xml: 'application/xml',
    csv: 'text/csv',
  };

  return mimeTypes[extension] || 'application/octet-stream';
};