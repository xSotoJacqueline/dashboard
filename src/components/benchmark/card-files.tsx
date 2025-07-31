import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileIcon } from "lucide-react";
import { useSuspenseQuery } from '@tanstack/react-query';
import { BenchMarksTable } from "./table";

export interface BenchmarkKey {
  id: number;
  key: string;
  name: string;
  size: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function CardFiles() {

  const {data} = useSuspenseQuery({
    queryKey: ['benchmarkKeys'],
    queryFn: async () : Promise<BenchmarkKey[]> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/benchmark/signed-urls`);
      if (!res.ok) {
        throw new Error('Failed to fetch benchmark keys');
      }
      return res.json();
    },
    refetchOnWindowFocus: false,
  });

  return (
    <Card className="w-full h-full min-h-fit">
        <CardHeader className="gap-0 space-y-0">
            <CardTitle className="text-xl font-bold flex gap-2">
                <FileIcon className="text-primary-foliatti" size={24}/>
                <span>Documentos Subidos</span>
            </CardTitle>
            <CardDescription className="text-foreground text-base">Gestiona tus archivos de benchmark</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 h-full">
            <BenchMarksTable data={data} />
        </CardContent>
    </Card>
  )
}
