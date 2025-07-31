import { Calendar } from "lucide-react"
import { Pie, PieChart, ResponsiveContainer } from "recharts"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useIsMobile } from "@/hooks/use-mobile"
import { GeneralCard } from "../general-card"

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
  const isMobile = useIsMobile({MOBILE_BREAKPOINT:900})
  
  return (
    <GeneralCard cardContentClassName="pb-6" identifier="chart1" title="Días en los que más retiros se realizan" Icon={Calendar}>
      <section className="h-fit w-full flex sm:flex-row flex-col justify-center items-center sm:items-stretch sm:justify-between">
          <div className="w-full sm:w-fit h-full max-w-xs">
          <table className="w-full h-full">
            <thead>
            <tr className="text-left text-lg font-bold text-primary">
              <th className="flex pl-8 justify-center">Día</th>
              <th className="pr-2 text-right">%</th>
            </tr>
            </thead>
            <tbody>
            {chartData.map((item, index) => (
              <tr key={index} className="h-9">
                <td className="align-middle">
                  <div className="flex relative items-center gap-3 justify-center">
                    <div className="w-3 absolute left-1 h-3 rounded-full" style={{ backgroundColor: item.fill }} />
                    <span className="pl-8 text-base font-semibold">{item.day}</span>
                  </div>
                </td>
                <td className="text-sm pl-4 font-medium text-right">{item.visitors}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
        <ChartContainer config={chartConfig} className="h-[320px] w-[320px] !aspect-auto">
            <ResponsiveContainer width="100%" height="100%">                
              <PieChart>
                <ChartTooltip
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={chartData}
                  dataKey="visitors"
                  nameKey="day"
                  innerRadius={!isMobile ? 60 : 40}
                  outerRadius={!isMobile ? 160 : 100}
                />
              </PieChart>
            </ResponsiveContainer>
        </ChartContainer>
      </section>
    </GeneralCard>
  )
}
