import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type CardLoadingProps = {
    className?: string;
    icon?: boolean;
    description?: boolean
    title?: boolean;
    children?: React.ReactNode;

};

export default function CardLoading({ className, icon, description, title, children }: CardLoadingProps) {

  return (
    <Card className={cn("w-full h-full min-h-fit bg-foreground/10 p-0", className)}>
        <div className="flex flex-col h-full min-h-fit py-7 sm:py-[30px] md:py-6   lg:py-[30px]" >
            <CardHeader className="flex flex-col items-start gap-0 pb-6">
                <CardTitle className="text-xl font-bold flex gap-2 items-center">
                    {icon && <div className="animate-pulse bg-foreground/10 size-6 rounded-sm"/>}
                    {title && <div className="animate-pulse bg-foreground/10 h-4 w-52 rounded-full"/>}
                </CardTitle>
                <CardDescription>{description && <div className="animate-pulse bg-foreground/10 h-4 w-96 rounded-full"/>}</CardDescription>
            </CardHeader>
            <CardContent style={{containerType: "size"}} className="flex flex-col h-full min-h-[120px]">
                {children ? children : <div className="animate-pulse bg-foreground/10 h-[100cqh] min-h-[120px] !aspect-autow-full rounded-md"/>}
            </CardContent>
        </div>

    </Card>
  )
}
