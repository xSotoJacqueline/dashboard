import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import {
  LoaderCircleIcon,
  type LucideIcon,
} from "lucide-react"
import React from "react";
import { cn } from "@/lib/utils";

type ChartLineLabelProps = {
  className?: string;
  classNameContainer?: string;
  title: string;
  description?: string;
  Icon?: LucideIcon;
  children: React.ReactNode;
  identifier?: string;
  cardContentClassName?: string;
  isLoading?: boolean;
  labelTimePeriod?: string;
}

export function GeneralCard({ labelTimePeriod,title, description, Icon, children, className, cardContentClassName, classNameContainer, isLoading }: ChartLineLabelProps) {

  return (
    <motion.div className={cn("w-full h-full overflow-hidden", classNameContainer)}>
      <Card className={cn("w-full h-full border-0", className)}>
          <CardHeader className="flex flex-col items-start gap-0">
              <motion.div layoutId={`title-header-${title}`} className="flex w-full justify-between items-center gap-2">
                  <motion.h2
                    layoutId={`title-${title}`}
                    className="game-title flex items-center gap-2"
                  >
                    {Icon && (isLoading ? <LoaderCircleIcon className="w-5 h-5 text-primary animate-spin"/> : <Icon className="w-5 h-5 text-primary"/>)}
                    <CardTitle className="text-xl font-bold">{title}</CardTitle>
                  </motion.h2>  
              </motion.div>

              <motion.div className="flex flex-col w-full xl:flex-row justify-between xl:items-center" layoutId={`description-${title}`}>
                {description && <CardDescription className="text-base text-foreground">
                  {description}
                </CardDescription>}
                <span className="text-sm text-muted-foreground self-start line-clamp-1">
                  {labelTimePeriod ? labelTimePeriod : "Últimos 28 días"}
                </span>
              </motion.div>

          </CardHeader>
            <CardContent className={cn("h-[calc(100%-theme(spacing.24))]", cardContentClassName)}>
              <motion.div  layoutId={`content-${title}`} className="h-full">
                {children}
              </motion.div>
              
            </CardContent>
      </Card>
    </motion.div>
  )
}
