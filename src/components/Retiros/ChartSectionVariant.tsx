import { Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Pie, PieChart } from "recharts"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const daysData = [
  { day: "Lunes", percentage: "14.2%", fill: "#8B5CF6" },
  { day: "Martes", percentage: "14.2%", fill: "#A78BFA" },
  { day: "Miércoles", percentage: "14.2%", fill: "#C4B5FD" },
  { day: "Jueves", percentage: "14.2%", fill: "#DDD6FE" },
  { day: "Viernes", percentage: "14.2%", fill: "#EDE9FE" },
  { day: "Sábado", percentage: "14.2%", fill: "#F3F4F6" },
  { day: "Domingo", percentage: "14.2%", fill: "#E5E7EB" },
]

// const chartConfig = {
//   days: {
//     label: "days",
//   },
//   lunes: {
//     label: "Lunes",
//     color: "#8B5CF6",
//   },
//   martes: {
//     label: "Martes",
//     color: "#A78BFA",
//   },
//   miercoles: {
//     label: "Miércoles",
//     color: "#C4B5FD",
//   },
//   jueves: {
//     label: "Jueves",
//     color: "#DDD6FE",
//   },
//   viernes: {
//     label: "Viernes",
//     color: "#EDE9FE",
//   },
//   sabado: {
//     label: "Sábado",
//     color: "#F3F4F6",
//   },
//   domingo: {
//     label: "Domingo",
//     color: "#E5E7EB",
//   }
// } satisfies ChartConfig

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
]
const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Edge",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig


export function ChartSection() {
  return (
    <Card className="bg-gray-50 b border-0 h-full">
      <CardContent className="p-6 w-full">
        <div className="flex items-center gap-2 mb-6">
          <Calendar className="w-5 h-5 text-purple-600" />
          <h3 className="font-semibold text-lg">Días en los que más retiros se realizan</h3>
        </div>

        <div className="flex justify-between w-full">
          {/* Legend */}
          <div className="space-y-4 w-fit">
            <div className="flex items-center gap-16 text-sm font-medium">
              <span>Día</span>
              <span>%</span>
            </div>
            {daysData.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex items-center gap-3 w-24">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }} />
                  <span className="text-sm">{item.day}</span>
                </div>
                <span className="text-sm font-medium ml-8">{item.percentage}</span>
              </div>
            ))}
          </div>

          {/* Donut Chart */}
          <div className="flex justify-center">
            <ChartContainer
              config={chartConfig}
              className="mx-auto w-full h-full"
            >
              <PieChart className="w-full">
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={chartData}
                  dataKey="visitors"
                  nameKey="browser"
                  outerRadius={100}
                  innerRadius={20}
                />
              </PieChart>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
