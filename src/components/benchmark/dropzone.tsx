import { type ReactNode } from 'react';

import { FileIcon } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';
import { megabytesToBytes } from '@/lib/unit-convertions';
import { cn } from '@/lib/utils';
import { useCsvFilesStore } from '@/lib/store-csv';
import type { CSVFile } from './csv-input';

export interface DocumentDropZoneWrapperProps {
  children: ReactNode;
  className?: string;
  isSubmitting: boolean;

}

export const DocumentDropZoneWrapper = ({ children, className, isSubmitting }: DocumentDropZoneWrapperProps) => {
  const { addCsvFiles } = useCsvFilesStore();
    
  const MAX_DOCUMENT_SIZE_MB = 50;

  const onFileDrop = async (files: File[]) => {

    const parseCSV = (content: string): string[][] => {
        const lines = content.split('\n').filter((line) => line.trim() !== '');
        return lines.map((line) => {
        const result: string[] = [];
        let current = '';
        let inQuotes = false;

        for (let i = 0; i < line.length; i++) {
            const char = line[i];

            if (char === '"') {
            inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
            } else {
            current += char;
            }
        }

        result.push(current.trim());
        return result;
        });
    };

    const newCSVFiles: CSVFile[] = [];

    Array.from(files).forEach((file) => {
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          const parsedData = parseCSV(content);
          const headers = parsedData[0] || [];
          const dataRows = parsedData.slice(1);

          newCSVFiles.push({
            file,
            content: dataRows,
            headers,
            id: Math.random().toString(36).substr(2, 9),
            rowCount: dataRows.length,
            columnCount: headers.length,
          });

          if (newCSVFiles.length === files.length) {
            addCsvFiles(newCSVFiles); // Use store method instead of setCsvFiles
          }
        };
        reader.readAsText(file);
      }else{
          addCsvFiles([{
          file: file,
          content: [],
          headers: [],
          id: file.name + '-' + Date.now(),
          rowCount: 0,
          columnCount: 0,
          }]);
        }
    });
  };
  const onFileDropRejected = () => {
    console.log('File drop rejected');
    toast.error("Error al procesar el archivo. Asegúrate de que sea un archivo válido.");
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
        'application/vnd.ms-excel': ['.xls'],
        'text/csv': ['.csv'],
    },
    disabled: isSubmitting,
    multiple: true,
    maxSize: megabytesToBytes(MAX_DOCUMENT_SIZE_MB),
    onDrop: (acceptedFiles) => {
      if (acceptedFiles) {
        void onFileDrop(acceptedFiles);
      }
    },
    onDropRejected: () => {
      void onFileDropRejected();
    },
    noClick: true,
    noDragEventsBubbling: true,
  });

  return (
    <div {...getRootProps()} className={cn('relative min-h-fit h-full py-3 w-full border-2 border-dashed rounded-xl border-foreground flex flex-col gap-3 justify-center items-center', className)}>
      <input disabled={isSubmitting} {...getInputProps()} />
      <FileIcon className="text-primary" size={24}/>
      <div className='flex flex-col items-center justify-center w-full h-fit'>
        <h2 className='text-base text-center sm:text-xl font-bold'>Arrastra archivos de Excel aquí</h2>
        <span className='text-sm text-muted-foreground'>Formatos soportados: .xlsx, .xls, .csv</span>
      </div>
     
      {children}

      {isDragActive && (
        <div className="bg-muted/60 h-full w-full backdrop-blur-[4px] absolute inset-0 z-50">
          <div className="pointer-events-none flex h-full w-full flex-col items-center justify-center">
            <h2 className="text-foreground text-2xl font-semibold">
              Suelta tus archivos aquí
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};
