import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileIcon } from "lucide-react";
import { useSuspenseQuery } from '@tanstack/react-query';
import { BenchMarksTable } from "./table";
import { benchmarkKeysQueryOptions } from "@/queryOptions/queryOptions";
import { useSearch } from '@tanstack/react-router';


export default function CardFiles() {

  const search = useSearch({ from: '/dashboard/benchmark' });
  const page = search.page || 1;
  console.log("search", search.page);
  const {data, isPending} = useSuspenseQuery(benchmarkKeysQueryOptions({pageParam: page}));
  
  return (
    <Card className="w-full h-full min-h-fit">
        <CardHeader className="gap-0 space-y-0">
            <CardTitle className="text-xl font-bold flex gap-2">
                <FileIcon className="text-primary" size={24}/>
                <span>Documentos Subidos</span>
            </CardTitle>
            <CardDescription className="text-foreground text-base">Gestiona tus archivos de benchmark</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 h-full">
            <BenchMarksTable loading={isPending} data={data} />
        </CardContent>
    </Card>
  )
}
