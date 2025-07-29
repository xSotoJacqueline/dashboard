
import NumberFlow, { NumberFlowGroup } from '@number-flow/react'
import { Progress } from "../ui/progress";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"

export type DistributionBetsData = {
  source: string;
  totalBets: number;
  averageBet: number;
  totalAmount: number;
}

export function DistributionBetsCard({averageBet, source, totalAmount,totalBets  }: DistributionBetsData) {

  return (
    <Card className="w-full h-fit">
      <CardHeader className='flex flex-row items-center text-foreground justify-between'>
        <h2 className="text-xl font-semibold">{source}</h2>
        <section className='flex gap-4 items-center pr-[3rem]'>
          <div className='flex flex-col items-center'>
            <NumberFlow
              value={totalBets}
              locales="en-US"
              format={{ style: 'decimal' }}
              className="text-sm"
            />
            <span className="text-sm font-bold">Apuestas totales</span>
          </div>
          <div className='flex flex-col items-center'>
            <NumberFlow
              value={averageBet}
              locales="en-US"
              format={{ style: 'currency', currency: 'USD' }}
              className="text-sm"
            />
            <span className="text-sm font-bold">Promedio de apuesta</span>
          </div>
          <div className='flex flex-col items-center'>
            <NumberFlow
              value={totalAmount}
              locales="en-US"
              format={{ style: 'currency', currency: 'USD' }}
              className="text-sm"
            />
            <span className="text-sm font-bold">Monto total</span>
          </div>
        </section>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div  className="flex flex-col gap-2 w-full">
          <div className="w-full flex items-start gap-2">
              <Progress
              className="h-2 mt-1"
              value={50}
              />
              <NumberFlowGroup>
              <div
                  style={{ ['--number-flow-char-height' as string]: '0.85em'}}
                  className="flex flex-col min-w-9 items-end font-semibold -mt-1"
              >
                  <NumberFlow
                  value={totalBets}
                  locales="en-US"
                  format={{ style: 'percent' }}
                  className="text-sm text- font-bold"
                  />
              </div>
              </NumberFlowGroup>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
