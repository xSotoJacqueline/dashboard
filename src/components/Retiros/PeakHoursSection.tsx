import { Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { MostCommonWithdrawHourData } from '@/queryOptions/queryOptions-retiros'
import CardLoading from "../loading-card"
import { GeneralErrorContent } from "../general-error-content"
import { GeneralEmptyContent } from "../general-empty-content"
export function PeakHoursSection({ mostCommonWithdrawHourData, labelTimePeriod, isPending, isError }: { mostCommonWithdrawHourData: MostCommonWithdrawHourData | undefined, labelTimePeriod?: string, isPending: boolean, isError: boolean }) {

  if (isPending) return <CardLoading className="animate-pulse sm:max-h-[272px] lg:min-h-[272px]" children={<p/>} />
   if (isError) return <GeneralErrorContent className="sm:max-h-[272px] lg:min-h-[272px]" />
 
 
  return (
    <Card className="border-0 xl:min-h-[272px]">
      <CardContent className="h-fit xl:min-h-60 flex flex-col justify-center items-start">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5" />
              <h3 className="font-semibold">Hora pico de retiros</h3>
            </div>
        {mostCommonWithdrawHourData ?
        (
          <>
            <div className="text-sm text-foreground mb-2">Hora más común de retiro</div>
            <div className="text-5xl font-bold mb-2 flex gap-2 items-end">
                {mostCommonWithdrawHourData?.hour}:00
                <span className="text-xl">
                {mostCommonWithdrawHourData?.hour !== undefined
                  ? (Number(mostCommonWithdrawHourData.hour) >= 12 ? 'PM' : 'AM')
                  : ''}
                </span>
            </div>
            <div className="text-sm text-foreground mb-1">
              % de retiros en ese horario: <span className="text-green-600 font-medium break-keep whitespace-nowrap">{mostCommonWithdrawHourData?.percentage}%</span>
            </div>
            <div className="text-sm text-foreground mb-1">{labelTimePeriod ? labelTimePeriod : `Último mes`}</div>
          </>
        ) :
        (<GeneralEmptyContent className="lg:min-h-[0px] min-h-48 lg:max-h-[165px] h-full" />)}
      </CardContent>

    </Card>
  )
}
