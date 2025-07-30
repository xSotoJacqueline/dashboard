import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type CardLoadingProps = {
    className?: string;
    icon?: boolean;
    description?: boolean
    title?: boolean;

};

export default function CardLoading({ className, icon, description, title }: CardLoadingProps) {

  return (
    <Card className={cn("w-full h-full min-h-fit", className)}>
        <CardHeader className="">
            <CardTitle className="text-xl font-bold flex gap-2 items-center">
                {icon && <div className="animate-pulse bg-foreground/10 size-6 rounded-sm"/>}
                {title && <div className="animate-pulse bg-foreground/10 h-4 w-52 rounded-full"/>}
            </CardTitle>
            <CardDescription>{description && <div className="animate-pulse bg-foreground/10 h-4 w-96 rounded-full"/>}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 h-full">
         <div className="animate-pulse bg-foreground/10 h-full w-full rounded-md"/>
        </CardContent>
    </Card>
  )
}
