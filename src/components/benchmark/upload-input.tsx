import { type ChangeEvent, useRef } from 'react';

import { CheckIcon, Eye, FileText, Trash2Icon, X } from 'lucide-react';

import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

import { useCsvFilesStore } from '@/lib/store-csv';

export interface CSVFile {
  file: File;
  content: string[][];
  headers: string[];
  id: string;
  rowCount: number;
  columnCount: number;
}

type InputCSVProps = {
  onUpload?: (file: File | null) => void;
  uploadFilesVoid?: (file: File) => void;
  onMultipleUpload?: (files: File[]) => void;
  multiple: boolean;
  isSubmitting: boolean;
};

export default function CsvUploadInput({
  onUpload,
  onMultipleUpload,
  multiple,
  isSubmitting,
}: InputCSVProps) {
  
  const { csvFiles, addCsvFiles, removeCsvFile, clearCsvFiles } = useCsvFilesStore();

  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newCSVFiles: CSVFile[] = [];

    Array.from(files).forEach((file) => {
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          const parsedData = parseCSV(content);
          const headers = parsedData[0] || [];
          const dataRows = parsedData.slice(1);

          if (onUpload) {
            onUpload(file);
          } 

          newCSVFiles.push({
            file,
            content: dataRows,
            headers,
            id: Math.random().toString(36).substr(2, 9),
            rowCount: dataRows.length,
            columnCount: headers.length,
          });

          if (newCSVFiles.length === files.length) {
            addCsvFiles(newCSVFiles);
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

const removeFile = (id: string) => {
  removeCsvFile(id);
  if (fileInputRef.current) {
    fileInputRef.current.value = '';
  }
};

  const clearAll = () => {
    clearCsvFiles();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-80 space-y-4">
      <div className="space-y-2">
        <div className="flex items-center sm:flex-row flex-col justify-center gap-2 w-full">
          <Button
            type="button"
            variant="outline"
            disabled={isSubmitting}
            onClick={triggerFileInput}
            className={`flex items-center bg-transparent text-foreground font-normal w-full sm:w-fit ${csvFiles.length > 0 ? 'justify-between' : 'justify-center'}`}
          >
            {csvFiles.length < 1 && <span className="">Seleccionar Archivos</span>}
            {csvFiles.length > 0 && <Badge variant="secondary">{csvFiles.length} {csvFiles.length === 1 ? 'archivo' : 'archivos'}</Badge>}
          </Button>

          {csvFiles.length > 0 && (
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button disabled={isSubmitting} variant="outline" className="p-3">
                    <Eye className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align='center' className="w-[90cqw] sm:w-[600px] mx-5">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Vista previa de archivos</h4>
                      <Badge variant="secondary" className='text-white'>
                        {csvFiles.length} {csvFiles.length === 1 ? 'archivo' : 'archivos'}
                      </Badge>
                    </div>
                    <div className="max-h-96 space-y-4 overflow-y-auto">
                      {csvFiles.map((csvFile) => (
                        <div key={csvFile.id} className="space-y-2 rounded-lg border p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              <span className="max-w-[200px] truncate text-sm font-medium">
                                {csvFile.file.name.slice(0, 20) || 'Archivo CSV'}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="default" className="text-xs text-white">
                                {csvFile.columnCount} columnas
                              </Badge>
                              <button
                                onClick={() => removeFile(csvFile.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          </div>

                          <div className="overflow-hidden rounded border">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  {csvFile.headers.slice(0, 4).map((header, index) => (
                                    <TableHead key={index} className="text-xs font-medium">
                                      {header || `Columna ${index + 1}`}
                                    </TableHead>
                                  ))}
                                  {csvFile.headers.length > 4 && (
                                    <TableHead className="text-muted-foreground text-xs">
                                      +{csvFile.headers.length - 4} más
                                    </TableHead>
                                  )}
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {csvFile.content.slice(0, 3).map((row, rowIndex) => (
                                  <TableRow key={rowIndex}>
                                    {row.slice(0, 4).map((cell, cellIndex) => (
                                      <TableCell
                                        key={cellIndex}
                                        className="max-w-[100px] truncate text-xs"
                                      >
                                        {cell || '-'}
                                      </TableCell>
                                    ))}
                                    {row.length > 4 && (
                                      <TableCell className="text-muted-foreground text-xs">
                                        ...
                                      </TableCell>
                                    )}
                                  </TableRow>
                                ))}
                                {csvFile.content.length > 3 && (
                                  <TableRow>
                                    <TableCell
                                      colSpan={Math.min(csvFile.headers.length, 5)}
                                      className="text-muted-foreground text-center text-xs"
                                    >
                                      ...
                                    </TableCell>
                                  </TableRow>
                                )}
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <Button
                variant="outline"
                onClick={clearAll}
                disabled={isSubmitting}
                size={'default'}
                className="bg-transparent p-3 text-red-600 hover:text-red-700"
              >
                <Trash2Icon className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                disabled={isSubmitting || csvFiles.length === 0}
                onClick={() => {
                    onMultipleUpload?.(csvFiles.map(f => f.file))
                    if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                    }
                }}
                size={'default'}
                className="text-foreground bg-transparent p-3"
              >
                <CheckIcon className={`h-4 w-4`} />
              </Button>
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          disabled={isSubmitting}
          type="file"
          multiple={multiple}
          accept=".csv,text/csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .xlsx, .xls"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
}
