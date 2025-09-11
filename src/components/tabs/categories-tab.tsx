import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Progress } from '../ui/progress';
import { CategoriesTable } from '../jugadores/categories-table';
import { motion, MotionConfig } from 'framer-motion'
import NumberFlow, { useCanAnimate } from '@number-flow/react'
import { cn } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query";
import { getTotalPlayersGroupedByCasino } from "@/queryOptions/queryOptions-jugadores";
import { LoaderCircleIcon } from "lucide-react";
import { GeneralErrorContent } from "../general-error-content";
import { GeneralEmptyContent } from "../general-empty-content";
import { useContextQuery } from "@/contexts/query-context";

const MotionNumberFlow = motion.create(NumberFlow)
type CategoryTableItem = {
  category: 'Casino' | 'Sport';
  totalPlayers: number;
  totalIncome: number;
  averageIncomePerPlayer: number;
  percentageOfTotalPlayers: number;
}

export default function CategoriesTab({pageParam}: {pageParam?: number}) {
  const canAnimate = useCanAnimate()
  const { queryString, labelTimePeriod } = useContextQuery();

  const totalPlayersGroupedByCasino = useQuery(getTotalPlayersGroupedByCasino({queryString, pageParam}));

  if (totalPlayersGroupedByCasino.isError) {
    return <GeneralErrorContent />
  }

  if ((!totalPlayersGroupedByCasino.data?.data.Casino || !totalPlayersGroupedByCasino.data?.data.Sport) && !totalPlayersGroupedByCasino.isPending) {
    return <GeneralEmptyContent  className="min-h-[35cqh]"/>
  }

  const casinoData: CategoryTableItem = totalPlayersGroupedByCasino.data ? {
    category: 'Casino',
    totalPlayers: totalPlayersGroupedByCasino.data.data.Casino.totalPlayers,
    totalIncome: totalPlayersGroupedByCasino.data.data.Casino.totalIncome,
    averageIncomePerPlayer: totalPlayersGroupedByCasino.data.data.Casino.averageIncomePerPlayer,
    percentageOfTotalPlayers: totalPlayersGroupedByCasino.data.data.Casino.percentageOfTotalPlayers,
  } : {
    category: 'Casino',
    totalPlayers: 0,
    totalIncome: 0,
    averageIncomePerPlayer: 0,
    percentageOfTotalPlayers: 0,
  };

  const sportData: CategoryTableItem = totalPlayersGroupedByCasino.data ? {
    category: 'Sport',
    totalPlayers: totalPlayersGroupedByCasino.data.data.Sport.totalPlayers,
    totalIncome: totalPlayersGroupedByCasino.data.data.Sport.totalIncome,
    averageIncomePerPlayer: totalPlayersGroupedByCasino.data.data.Sport.averageIncomePerPlayer,
    percentageOfTotalPlayers: totalPlayersGroupedByCasino.data.data.Sport.percentageOfTotalPlayers,
  } : {
    category: 'Sport',
    totalPlayers: 0,
    totalIncome: 0,
    averageIncomePerPlayer: 0,
    percentageOfTotalPlayers: 0,
  };

  return (
    <div  style={{containerType: "size"}}  className="w-full h-full min-h-fit flex flex-col gap-6">
      <div className='h-fit lg:min-h-[35cqh] w-full grid grid-cols-2 md:grid-cols-4 gap-6'>
        <Card className="w-full flex flex-col justify-between h-full border-0 gap-6 col-span-2 md:col-span-3 lg:col-span-2 space-y-0">
            <CardHeader className="flex justify-between items-center h-fit">
                <CardTitle className="text-xl font-semibold">Casino</CardTitle>
                <MotionConfig  
                  transition={{
                    layout: canAnimate ? { duration: 0.9, bounce: 0, type: 'spring' } : { duration: 0 }
                  }}
                >

                  {totalPlayersGroupedByCasino.isPending ?
                   <LoaderCircleIcon 
                      size={24}
                      strokeWidth={2} 
                      className="text-primary mt-1 animate-spin"
                    /> :   <motion.span
                    className={cn(
                    'inline-flex gap-1 bg-zinc-200 dark:bg-primary-foliatti-dark text-foreground items-center px-[0.3em] text-lg transition-colors duration-300'
                    )}
                    layout
                    style={{ borderRadius: 999 }}
                  >
                    <MotionNumberFlow
                      value={casinoData.percentageOfTotalPlayers/100}
                      className="font-medium text-sm"
                      format={{ style: 'percent', maximumFractionDigits: 2 }}
                      style={{ ['--number-flow-char-height' as string]: '0.85em', ['--number-flow-mask-height' as string]: '0.3em' }}
                      layout
                      layoutRoot
                    />
                  </motion.span>}
                
                </MotionConfig>
            </CardHeader>
            <CardContent className="w-full h-full flex flex-col gap-0" >
              <div className="flex flex-col gap-4 justify-center items-center h-full w-full">

                {totalPlayersGroupedByCasino.isError ? <GeneralErrorContent className="min-h-0" title={false} /> : (
                  <div className="flex flex-col text-base w-full">
                    <span>Jugadores</span>
                    <Progress value={(casinoData.percentageOfTotalPlayers ?? 0) } className='' />
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex h-fulllg:items-startitems-center justify-between w-full">
                <span className="text-sm text-muted-foreground">{labelTimePeriod ?? 'Ultimos 28 días'}</span>
                <MotionConfig
                  transition={{
                    layout: canAnimate ? { duration: 0.9, bounce: 0, type: 'spring' } : { duration: 0 }
                  }}
                >
                    <MotionNumberFlow
                      value={casinoData.totalIncome}
                      locales="en-US"
                        className={cn(
                              casinoData.totalIncome >= 0 ? 'text-green-foliatti' : 'text-red-500',
                              'font-medium text-sm'
                              )}
                      format={{ style: 'currency', maximumFractionDigits: 2, currency: 'USD' }}
                      style={{ ['--number-flow-char-height' as string]: '0.85em', ['--number-flow-mask-height' as string]: '0.3em' }}
                      layout
                      layoutRoot
                    />
                </MotionConfig>
              </div>
            </CardFooter>
        </Card>

        <Card className="w-full flex flex-col justify-between h-full border-0 gap-6 col-span-2 md:col-span-3 lg:col-span-2 space-y-0">
            <CardHeader className="flex justify-between items-center h-fit">
                <CardTitle className="text-xl font-semibold">Sports</CardTitle>
                <MotionConfig  
                  transition={{
                    layout: canAnimate ? { duration: 0.9, bounce: 0, type: 'spring' } : { duration: 0 }
                  }}
                >

                     {totalPlayersGroupedByCasino.isPending ?
                   <LoaderCircleIcon 
                      size={24}
                      strokeWidth={2} 
                      className="text-primary mt-1 animate-spin"
                    /> :  
                  
                  <motion.span
                    className={cn(
                    'inline-flex gap-1 bg-zinc-200 dark:bg-primary-foliatti-dark items-center px-[0.3em] text-lg text-foreground transition-colors duration-300'
                    )}
                    layout
                    style={{ borderRadius: 999 }}
                  >
                    <MotionNumberFlow
                      value={sportData.percentageOfTotalPlayers/100}
                      className="font-medium text-sm"
                      format={{ style: 'percent', maximumFractionDigits: 2 }}
                      style={{ ['--number-flow-char-height' as string]: '0.85em', ['--number-flow-mask-height' as string]: '0.3em' }}
                      layout
                      layoutRoot
                    />
                  </motion.span>}
                  
                  
                </MotionConfig>
            </CardHeader>
            <CardContent className="w-full h-full flex flex-col gap-6" >
              <div className="flex flex-col gap-4 justify-center items-center h-full w-full">
                {totalPlayersGroupedByCasino.isError ? <GeneralErrorContent className="min-h-0" title={false} /> : (
                  <div className="flex flex-col text-base w-full">
                    <span>Jugadores</span>
                    <Progress value={(casinoData.percentageOfTotalPlayers ?? 0) } className='' />
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex h-full lg:items-start items-center justify-between w-full">
                <span className="text-sm text-muted-foreground">{labelTimePeriod ?? 'Ultimos 28 días'}</span>
                <MotionConfig
                  transition={{
                    layout: canAnimate ? { duration: 0.9, bounce: 0, type: 'spring' } : { duration: 0 }
                  }}
                >
                    <MotionNumberFlow
                      value={sportData.totalIncome}
                      locales="en-US"
                        className={cn(
                              sportData.totalIncome >= 0 ? 'text-green-foliatti' : 'text-red-500',
                              'font-medium text-sm'
                              )}
                      format={{ style: 'currency', maximumFractionDigits: 2, currency: 'USD' }}
                      style={{ ['--number-flow-char-height' as string]: '0.85em', ['--number-flow-mask-height' as string]: '0.3em' }}
                      layout
                      layoutRoot
                    />
                </MotionConfig>
              </div>
            </CardFooter>
        </Card>

      </div>
      <div className='h-full max-h-[300px] min-h-fit w-full pt-2'>
        <CategoriesTable pageParam={pageParam}/>
      </div>

    </div>
  );
}
