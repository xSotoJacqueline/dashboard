
import CsvUploadInput from "@/components/benchmark/csv-input"
import { DocumentDropZoneWrapper } from "@/components/benchmark/dropzone";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from 'sonner';
import { FileIcon } from "lucide-react";
import { useCsvFilesStore } from "@/lib/store-csv";

export default function Metricas() {
  const { clearCsvFiles } = useCsvFilesStore();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCsvUpload = (files: File[]) => {
    const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: 'Sonner' }), 2000));
    setIsSubmitting(true);
    toast.promise(promise, {
        loading: 'Cargando...',
        success: () => {
            clearCsvFiles();
            setIsSubmitting(false);
            return `${files.length} ${files.length === 1 ? 'archivo añadido' : 'archivos añadidos'}`;
        },
        error: () =>{
            setIsSubmitting(false);
            return 'Error al añadir archivos';
        }
    });
  };

  return (
    <div className="w-full flex flex-col gap-6 rounded-lg text-black h-full ">
      <Card className="w-full h-full">
        <CardHeader className="gap-0 space-y-0 pb-0">
          <CardTitle className="text-xl font-bold">Subir Documentos</CardTitle>
          <CardDescription className="text-foreground text-base">Arrastra o selecciona archivos de Excel o haz clic para seleccionar</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col h-full py-0">
            <DocumentDropZoneWrapper isSubmitting={isSubmitting}>
                <CsvUploadInput multiple={true} isSubmitting={isSubmitting} onMultipleUpload={handleCsvUpload} />
            </DocumentDropZoneWrapper>
        </CardContent>
      </Card>

      <div className="w-full h-full  flex gap-6">
        <Card className="w-full h-full">
            <CardHeader className="gap-0 space-y-0">
                <CardTitle className="text-xl font-bold flex gap-2">
                    <FileIcon className="text-primary-foliatti" size={24}/>
                    <span>Documentos Subidos</span>
                </CardTitle>
                <CardDescription className="text-foreground text-base">Gestiona tus archivos de benchmark</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
           
            </CardContent>
        </Card>
      </div>
    </div>
  )
}
