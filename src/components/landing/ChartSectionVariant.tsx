import { Pie, PieChart } from "recharts"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { day: "lunes", visitors: 14.5, fill: "var(--lunes)" },
  { day: "martes", visitors: 14.5, fill: "var(--martes)" },
  { day: "miércoles", visitors: 14.5, fill: "var(--miercoles)" },
  { day: "jueves", visitors: 14.5, fill: "var(--jueves)" },
  { day: "viernes", visitors: 14.5, fill: "var(--viernes)" },
  { day: "sábado", visitors: 14.5, fill: "var(--sabado)" },
  { day: "domingo", visitors: 14.5, fill: "var(--domingo)" },
]
const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  lunes: {
    label: "lunes",
    color: "var(--lunes)",
  },
  martes: {
    label: "martes",
    color: "var(--martes)",
  },
  miercoles: {
    label: "miércoles",
    color: "var(--miercoles)",
  },
  jueves: {
    label: "jueves",
    color: "var(--jueves)",
  },
  viernes: {
    label: "viernes",
    color: "var(--viernes)",
  },
  sabado: {
    label: "sábado",
    color: "var(--sabado)",
  },
  domingo: {
    label: "domingo",
    color: "var(--domingo)",
  },
} satisfies ChartConfig


export function ChartSection() {
  
  return (
      <section className="w-fit flex flex-col gap-3 justify-center items-center">
        <ChartContainer config={chartConfig} className="h-[160px] w-[160px] !aspect-auto">
              <PieChart>
                <ChartTooltip
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                className="opacity-80"
                  isAnimationActive={false}
                  data={chartData}
                  dataKey="visitors"
                  nameKey="day"
                  innerRadius={30}
                  outerRadius={80}
                />
              </PieChart>
        </ChartContainer>


            {chartData.map((item) => (
              <div key={item.day} className="flex items-center w-full justify-between  space-y-1">
                <div className="flex items-center gap-2 pt-1">
                   <div className="w-3 h-3 rounded-full border-foreground/10 border" style={{ backgroundColor: item.fill }} />
                   <span className="text-xs font-semibold">{item.day}</span>
                </div>
                <span className="text-xs font-semibold">{item.visitors}%</span>
              </div>
              ))}
       
      </section>
  )
}
