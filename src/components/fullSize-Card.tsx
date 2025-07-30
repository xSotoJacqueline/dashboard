import { useEffect, useState, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { motion, AnimatePresence } from "framer-motion";
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
import { ExpandIcon } from "lucide-react"
import { Button } from "./ui/button"
import { useIsActiveStore } from "@/lib/active-full-container";
import React from "react";
import { cn } from "@/lib/utils";

type ChartLineLabelProps = {
  className?: string;
  title: string;
  description?: string;
  Icon?: LucideIcon;
  children: React.ReactNode;
  identifier?: string;
  fullScreenButton?: boolean;
  cardContentClassName?: string;
}

export function FullSizeCard({ title, description, Icon, children, identifier, className, cardContentClassName, fullScreenButton = true }: ChartLineLabelProps) {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const { setIsActive } = useIsActiveStore();

  const ref = useRef<HTMLDivElement>(null)

  ref ?? useOnClickOutside(ref, () => setActiveGame(null));
 
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
      setActiveGame(null);
      }
    };
 
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    setIsActive(activeGame !== null);
  }, [activeGame, setIsActive]);

  return (

    <>

      <AnimatePresence>
        {activeGame ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="overlay "
          />
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {activeGame ? (
          <div className="active-game fixed md:absolute ">
            <motion.div
              layoutId={`card-${identifier || title}`}
              className="inner sm:my-0 my-16 "
              style={{ borderRadius: 12 }}
			        ref={ref}
            >
              <Card className="w-full h-full border-0 pb-0 pt-2 px-2 col-span-1">
                <CardHeader className="flex flex-col items-start px-2 gap-0">
                    <motion.div layoutId={`title-header-${title}`} className="flex w-full justify-between items-center gap-2">
                        <motion.h2
                          layoutId={`title-${identifier}`}
                          className="game-title flex items-center gap-2"
                        >
                          {Icon && <Icon className="w-5 h-5 text-primary-foliatti" />}

                          <CardTitle className=" text-base md:text-xl font-bold">{title}</CardTitle>
                        </motion.h2>

                      <Button onClick={() => setActiveGame(null)} size={"icon"} variant={"ghost"} className="!p-1 h-fit w-fit -mr-1">
                        <ExpandIcon size={16} />
                      </Button>
                    </motion.div>

                    <motion.div layoutId={`description-${title}`}>
                      <CardDescription className="text-base text-foreground">
                        {description}
                      </CardDescription>
                    </motion.div>
                </CardHeader>
                <CardContent className=" h-[calc(100%-theme(spacing.24))] px-2">
                  <motion.div layoutId={`content-${title}`} className="h-full">
                    {children}
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <motion.div  layoutId={`card-${identifier || title}`} className="w-full h-full">
        <Card className={cn("w-full h-full border-0 pb-0 ", className)}>
            <CardHeader className="flex flex-col items-start gap-0">
                <motion.div layoutId={`title-header-${title}`} className="flex w-full justify-between items-center gap-2">
                    <motion.h2
                      layoutId={`title-${title}`}
                      className="game-title flex items-center gap-2"
                    >
                      {Icon && <Icon className="w-5 h-5 text-primary-foliatti" />}

                      <CardTitle className="text-xl font-bold">{title}</CardTitle>
                    </motion.h2>
                  {fullScreenButton && (
                    <Button onClick={() => setActiveGame(title)} size={"icon"} variant={"ghost"} className="!p-1 h-fit w-fit -mr-1">
                      <ExpandIcon size={16} />
                    </Button>
                  )}
                  
                </motion.div>

                <motion.div layoutId={`description-${title}`}>
                  <CardDescription className="text-base text-foreground">
                    {description}
                  </CardDescription>
                </motion.div>
            </CardHeader>
              <CardContent className={cn("h-[calc(100%-theme(spacing.24))]", cardContentClassName)}>
                <motion.div  layoutId={`content-${title}`} className="h-full">
                  {children}
                </motion.div>
              </CardContent>

        </Card>
      </motion.div>
    </>

  )
}
