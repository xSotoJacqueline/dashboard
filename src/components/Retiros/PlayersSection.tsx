
import { User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { buttonVariants } from "../ui/button"
import { type TopPlayersMostWithdrawalsData } from '@/queryOptions/queryOptions-retiros'
import { GeneralErrorContent } from "../general-error-content"
import { GeneralEmptyContent } from "../general-empty-content"
import CardLoading from "../loading-card"

export function PlayersSection({ topPlayersMostWithdrawalsData, isPending, isError }: { topPlayersMostWithdrawalsData?: TopPlayersMostWithdrawalsData, isPending: boolean, isError: boolean }) {
  if (isPending) return <CardLoading className="animate-pulse min-h-[352px]" children={<p/>} />
  if (isError) return <GeneralErrorContent className="" />

  return (
    <Card className="border-0 h-full min-h-fit">
      <CardHeader className="flex gap-2">
          <User className="w-5 h-5" />
          <CardTitle className="font-semibold">Jugadores que más retiran</CardTitle>
      </CardHeader>
      <CardContent className={` h-full ${topPlayersMostWithdrawalsData && topPlayersMostWithdrawalsData.length > 0 ? 'p-2' : ''}`}>

        <div className="flex flex-col gap-4 h-full">
          {(topPlayersMostWithdrawalsData && topPlayersMostWithdrawalsData.length > 0)  ? topPlayersMostWithdrawalsData.map((player, index) => (
            <Accordion
              key={player.playerId}
              type="multiple"
              className="w-full"
            >
              <AccordionItem value={`item-${player.playerId}`}>
                <AccordionTrigger className={buttonVariants({ variant: "ghost", className: "w-full text-left flex items-center justify-between cursor-pointer"})}>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-foreground text-background rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                    <span className="text-sm font-medium">{player.userName}</span>
                  </div>
                </AccordionTrigger>
                  <AccordionContent className="py-2 px-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground">Retiros:</span>
                      <span className="font-medium">{player.withdrawCount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground">Total retirado:</span>
                      <span className="font-medium">${player.totalAmount}</span>
                    </div>
                    {/* <div className="flex justify-between items-center text-sm">
                      <span className="text-foreground">{player.details.periodo}</span>
                    </div> */}
                  </AccordionContent>
              </AccordionItem>
            </Accordion>
          )) : <GeneralEmptyContent />}
        </div>
      </CardContent>
    </Card>
  )
}
