import { BarChart3, DollarSign } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function MetricsCards() {
  return (
    <div className="grid grid-cols-3 gap-6 mb-8">
      <Card className="bg-gray-50 border-0">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-6 h-6 text-foreground" />
          </div>
          <div className="mb-2">
            <span className="text-sm text-foreground">Total de retiros</span>
          </div>
          <div className="text-5xl font-bold mb-2">420</div>
          <div className="text-sm text-foreground mb-3">Transacciones</div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-foreground">Últimos 28 días</span>
            <Badge className="bg-green-500 hover:bg-green-500 text-white text-xs px-2 py-1">+2.5</Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-50 border-0">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-6 h-6 text-gray-600" />
          </div>
          <div className="mb-2">
            <span className="text-sm text-gray-600">Promedio de retiros</span>
          </div>
          <div className="text-5xl font-bold mb-2">15</div>
          <div className="text-sm text-gray-600 mb-3">Retiros diarios promedio</div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Últimos 28 días</span>
            <Badge className="bg-green-500 hover:bg-green-500 text-white text-xs px-2 py-1">+2.5</Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-50 border-0">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="w-6 h-6 text-gray-600" />
          </div>
          <div className="mb-2">
            <span className="text-sm text-gray-600">Monto de retiros</span>
          </div>
          <div className="text-5xl font-bold mb-2">$150</div>
          <div className="text-sm text-gray-600 mb-3">Retiros diarios promedio</div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Últimos 28 días</span>
            <Badge className="bg-green-500 hover:bg-green-500 text-white text-xs px-2 py-1">+2.5</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
