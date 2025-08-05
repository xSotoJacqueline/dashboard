import { CartesianGrid, LabelList, Line, LineChart, ResponsiveContainer, XAxis } from "recharts"
import { useEffect, useState, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { motion, AnimatePresence } from "framer-motion";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { ExpandIcon } from "lucide-react"
import { Button } from "../ui/button"
import { useIsActiveStore } from "@/lib/active-full-container";



const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

type ChartLineLabelProps = {
  className?: string;
  title: string;
}

export function ChartLineLabelBottom({ className, title }: ChartLineLabelProps) {

    const [activeGame, setActiveGame] = useState<string | null>(null);
    // const { activeGame, setActiveGame } = useActiveGameStore();
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
            className="overlay bg-[#F7F7F7] dark:bg-[#1f1e1e] "
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {activeGame ? (
          <div className="active-game fixed md:absolute">
            <motion.div
              layoutId={`card-${title}`}
              className="inner"
              style={{ borderRadius: 12 }}
              ref={ref}
            >
            <Card className="w-full h-ful border-0 pb-0 pt-2 px-2 col-span-1">
            <CardHeader className="flex items-center justify-between px-2">
                <motion.h2
                      layoutId={`title-${title}`}
                      className="game-title"
                    >
                      <CardTitle className="text-xl font-semibold">{title}</CardTitle>
                  </motion.h2>
                <Button onClick={() => setActiveGame(null)} size={"icon"} variant={"ghost"} className="!p-1 h-fit w-fit -mr-1">
                  <ExpandIcon size={16} />
                </Button>
            </CardHeader>
            <CardContent className="h-full px-0">
                <ChartContainer config={chartConfig} className="h-[85cqh] !aspect-auto">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                        dataKey="month"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="line" />}
                        />
                        <Line
                        dataKey="desktop"
                        type="natural"
                        stroke="var(--color-lunes)"
                        strokeWidth={2}
                        dot={{
                            stroke: "var(--color-green-foliatti)",
                        }}
                        activeDot={{
                            r: 6,
                        }}
                        >
                        <LabelList
                            position="top"
                            offset={12}
                            className="fill-foreground"
                            fontSize={12}
                        />
                        </Line>
                        </LineChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>

              </Card>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <motion.div className="w-full"  layoutId={`card-${title}`}>
      <Card className={`w-full h-full border-0 col-span-1 ${className}`}>
            <CardHeader className="flex items-center justify-between ">
                  <motion.h2
                    layoutId={`title-${title}`}
                    className="game-title"
                  >
                    <CardTitle className="text-xl font-semibold">{title}</CardTitle>
                  </motion.h2>
                  <Button onClick={() => setActiveGame(title)} size={"icon"} variant={"ghost"} className="!p-1 h-fit w-fit -mr-1">
                    <ExpandIcon size={16} />
                  </Button>
            </CardHeader>
            <CardContent className="relative sm:pt-0 h-[calc(100%-theme(spacing.24))]">
              <ChartContainer config={chartConfig} className="h-[25cqh] !aspect-auto">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 20, right: 10, left: 10 }}>
                      <CartesianGrid vertical={false} />
                      <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => value.slice(0, 3)}
                      />
                      <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent indicator="line" />}
                      />
                      <Line
                      dataKey="desktop"
                      type="natural"
                      stroke="var(--color-lunes)"
                      strokeWidth={2}
                      dot={{
                          stroke: "var(--color-green-foliatti)",
                      }}
                      activeDot={{
                          r: 6,
                      }}
                      >
                      <LabelList
                          position="top"
                          offset={12}
                          className="fill-foreground"
                          fontSize={12}
                      />
                      </Line>
                    </LineChart>
                  </ResponsiveContainer>
              </ChartContainer>
            </CardContent>           
        </Card>
      </motion.div>
    </>
  )
}
