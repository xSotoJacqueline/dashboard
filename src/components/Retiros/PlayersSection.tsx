
import { useState } from "react"
import { ChevronDown, ChevronRight, User } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const playersData = [
  {
    id: 1,
    name: "xsotojacqueline",
    details: {
      montoPromedio: "$100",
      numeroRetiros: "5",
      periodo: "Últimos 28 días",
    },
  },
  { id: 2, name: "rodrigoespino" },
  { id: 3, name: "gyroo" },
  { id: 4, name: "jahz32" },
  { id: 5, name: "oscar20_play" },
]

export function PlayersSection() {
  const [expandedPlayer, setExpandedPlayer] = useState<number | null>(null)

  return (
    <Card className="bg-gray-50 border-0 h-full">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <User className="w-5 h-5" />
          <h3 className="font-semibold">Jugadores que más retiran</h3>
        </div>

        <div className="space-y-1">
          {playersData.map((player) => (
            <Collapsible
              key={player.id}
              open={expandedPlayer === player.id}
              onOpenChange={(open) => setExpandedPlayer(open ? player.id : null)}
            >
              <CollapsibleTrigger asChild>
                <div className="flex items-center justify-between p-3 hover:bg-gray-100 rounded cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {player.id}
                    </div>
                    <span className="text-sm font-medium">{player.name}</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </CollapsibleTrigger>

              {player.details && (
                <CollapsibleContent className="px-9 py-2 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Monto promedio de retiro:</span>
                    <span className="font-medium">{player.details.montoPromedio}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Número de retiros en el mes:</span>
                    <span className="font-medium">{player.details.numeroRetiros}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">{player.details.periodo}</span>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </CollapsibleContent>
              )}
            </Collapsible>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
