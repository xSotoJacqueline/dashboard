import { cn } from "@/lib/utils";
import { CircleXIcon } from "lucide-react";
import { type QueryObserverResult, type RefetchOptions } from "@tanstack/react-query";
import { Button } from "./ui/button";

export function GeneralErrorContent({className, refetch}: {className?: string, refetch?: (options?: RefetchOptions) => Promise<QueryObserverResult<any, Error>>}) {
    return (
        <div className={cn("w-full text-destructive bg-destructive/20 rounded-lg gap-2 justify-center flex flex-col items-center h-full min-h-[120px]", className)}>
            <CircleXIcon size={24} strokeWidth={2} />
            <span className="text-base font-medium">Error al cargar los datos</span>
            {refetch && (
                <Button variant={"secondary"} size={"sm"} className="text-foreground" onClick={() => refetch()}>Reintentar</Button>
            )}
        </div>
    );
}
