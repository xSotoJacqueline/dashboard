import { createFileRoute } from '@tanstack/react-router'
import CsvUploadInput from "@/components/benchmark/upload-input"
import { DocumentDropZoneWrapper } from "@/components/benchmark/dropzone";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from 'sonner';
import { useCsvFilesStore } from "@/lib/store-csv";
import CardFiles from '@/components/benchmark/card-files';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ErrorPage from '@/components/errorPage';
import { useSidebar } from '@/components/ui/sidebar';
import type { BenchmarkSearch } from '@/types/search-types';
import { xApiKey } from '@/queryOptions/queryOptions';

export const Route = createFileRoute('/dashboard/benchmark')({
  validateSearch: (search: Record<string, unknown>): BenchmarkSearch => {
    return {
      page: Number(search?.page ?? 0),
    }
  },
  component: RouteComponent,
  errorComponent: ({error}) => <ErrorPage error={error.message} />,
})

function RouteComponent() {

  const { clearCsvFiles } = useCsvFilesStore();
  const queryClient = useQueryClient()
  const { isMobile } = useSidebar();
  const { mutate, isPending  } = useMutation({
      mutationKey: ['uploadCsvFiles'],
      mutationFn: async (files: File[]) => {
        const formdata = new FormData();
        files.forEach((file) => {
          formdata.append('files', file);
        });
  
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
        const res = await fetch(`${API_BASE_URL}/benchmark/many`, {
          method: 'POST',
          body: formdata,
          headers: { 'x-api-key': xApiKey }
        });
        if (!res.ok) {
          throw new Error('Failed to delete benchmark key');
        }
        return res.json();
      },
      onSuccess: () => {
        toast.success('Archivos subidos correctamente',{ className: "mt-8 sm:mt-0", position: isMobile ? "top-center" : "bottom-right" });
        clearCsvFiles();
        queryClient.invalidateQueries({ queryKey: ['benchmarkKeys'] });
      },
      onError: (error) => {
        toast.error(`Error al subir archivos: ${error.message}`, { position: isMobile ? "top-center" : "bottom-right" });
      },
  
  });

  const handleCsvUpload = (files: File[]) => {
    mutate(files);
  };
  return (
    <div className="w-full flex flex-col gap-6 rounded-lg text-black h-full">
      <Card className="w-full h-fit">
        <CardHeader className="gap-0 space-y-0 pb-0">
          <CardTitle className="text-xl font-bold">Subir Documentos</CardTitle>
          <CardDescription className="text-foreground text-base">Arrastra o selecciona archivos de Excel o haz clic para seleccionar</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col h-full py-0">
            <DocumentDropZoneWrapper isSubmitting={isPending}>
                <CsvUploadInput multiple={true} onMultipleUpload={handleCsvUpload} isSubmitting={isPending} />
            </DocumentDropZoneWrapper>
        </CardContent>
      </Card>

      <CardFiles />

    </div>
  )
}
