
import { ChevronDown, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { buttonVariants } from "../ui/button"

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
  { id: 2, name: "rodrigoespino",
    details: {
      montoPromedio: "$100",
      numeroRetiros: "5",
      periodo: "Últimos 28 días",
    },
   },
  { id: 3, name: "gyroo",
    details: {
      montoPromedio: "$100",
      numeroRetiros: "5",
      periodo: "Últimos 28 días",
    },
   },
  { id: 4, name: "jahz32",
    details: {
      montoPromedio: "$100",
      numeroRetiros: "5",
      periodo: "Últimos 28 días",
    },
   },
  { id: 5, name: "oscar20_play",
    details: {
      montoPromedio: "$100",
      numeroRetiros: "5",
      periodo: "Últimos 28 días",
    },
   },
]

export function PlayersSection() {
  return (
    <Card className="border-0 h-full min-h-fit">
      <CardHeader className="flex gap-2">
          <User className="w-5 h-5" />
          <CardTitle className="font-semibold">Jugadores que más retiran</CardTitle>
      </CardHeader>
      <CardContent className=" h-full">

        <div className="flex flex-col gap-4 h-full">
          {playersData.map((player) => (
            <Accordion
              key={player.id}
              type="multiple"
              className="w-full"
            >
              <AccordionItem value={`item-${player.id}`}>
                <AccordionTrigger className={buttonVariants({ variant: "ghost", className: "w-full text-left flex items-center justify-between cursor-pointer"})}>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {player.id}
                    </div>
                    <span className="text-sm font-medium">{player.name}</span>
                  </div>
                </AccordionTrigger>
                {player.details && (
                  <AccordionContent className="px-9 py-2 space-y-2">
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
                  </AccordionContent>
                )}
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
