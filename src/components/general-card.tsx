import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import {
  type LucideIcon,
} from "lucide-react"
import React from "react";
import { cn } from "@/lib/utils";

type ChartLineLabelProps = {
  className?: string;
  title: string;
  description?: string;
  Icon?: LucideIcon;
  children: React.ReactNode;
  identifier?: string;
  cardContentClassName?: string;
}

export function GeneralCard({ title, description, Icon, children, identifier, className, cardContentClassName }: ChartLineLabelProps) {

  return (
    <motion.div  layoutId={`card-${identifier || title}`} className="w-full h-full">
      <Card className={cn("w-full h-full border-0 pb-0  px-2", className)}>
          <CardHeader className="flex flex-col items-start px-2">
              <motion.div layoutId={`title-header-${title}`} className="flex w-full justify-between items-center gap-2">
                  <motion.h2
                    layoutId={`title-${title}`}
                    className="game-title flex items-center gap-2"
                  >
                    {Icon && <Icon className="w-5 h-5 text-primary-foliatti" />}

                    <CardTitle className="text-xl font-semibold">{title}</CardTitle>
                  </motion.h2>  
              </motion.div>

              <motion.div layoutId={`description-${title}`}>
                <CardDescription >
                  {description}
                </CardDescription>
              </motion.div>
          </CardHeader>
            <CardContent className={cn("h-[calc(100%-theme(spacing.24))] px-2", cardContentClassName)}>
              <motion.div  layoutId={`content-${title}`} className="h-full">
                {children}
              </motion.div>
            </CardContent>
      </Card>
    </motion.div>
  )
}
