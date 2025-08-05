import { Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function PeakHoursSection() {
  return (
    <Card className="border-0">
      <CardContent className="p-4 h-full">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5" />
          <h3 className="font-semibold">Hora pico de retiros</h3>
        </div>

        <div className="text-sm text-foreground mb-2">Hora más común de retiro</div>
        <div className="text-5xl font-bold mb-2">
          2:00 <span className="text-xl">PM</span>
        </div>
        <div className="text-sm text-foreground mb-1">
          % de retiros en ese horario: <span className="text-green-600 font-medium">18.35 %</span>
        </div>
        <div className="text-sm text-foreground">Últimos 28 días</div>
      </CardContent>
    </Card>
  )
}
