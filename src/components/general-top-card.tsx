import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp } from 'lucide-react'
import { motion, MotionConfig } from 'framer-motion'
import NumberFlow, { useCanAnimate } from '@number-flow/react'
import { cn } from "@/lib/utils"
import {
  type LucideIcon,
} from "lucide-react"
import CardLoading from "./loading-card"
import { GeneralErrorContent } from "./general-error-content"
import type { QueryObserverResult, RefetchOptions } from "@tanstack/react-query"

const MotionNumberFlow = motion.create(NumberFlow)
const MotionArrowUp = motion.create(TrendingUp)
export type ValueFormat = 'currency' | 'percent' | 'decimal'
export type GeneralCardTopCardProps = {
	value?: number
  title: string
  percentageValue?: number
  description?: string
  Icon: LucideIcon
  valueFormat: ValueFormat
  label?: string
  className?: string
  mainNumberClassName?: string
  isloading?: boolean
  containerClassName?: string
  isError?: boolean
  refetch?: (options?: RefetchOptions) => Promise<QueryObserverResult<any, Error>>
}

export function GeneralCardTopCard({ refetch, value = 0, Icon, title, description, label, percentageValue = 0, valueFormat, className, containerClassName, isloading, isError }: GeneralCardTopCardProps) {
  const canAnimate = useCanAnimate()
  if (isloading) {
    return (
      <CardLoading className="w-full min-h-[841.2px] max-h-[841.2px] md:min-h-[354.6px] lg:min-h-[185.3px] xl:min-h-[165.3px] md:max-h-[354.6px] lg:max-h-[185.3px] xl:max-h-[165.3px] animate-pulse" children={<p></p>} />
    )
  }


  return (
    <Card className={cn("border-0 h-full col-span-1 overflow-hidden", containerClassName)}>
      <CardContent className={cn(`flex px-4 flex-col ${isError ? "" : "justify-between"} h-full ${description ? '' : 'gap-3'}`, className)}>
        <section>
          <div className="flex justify-between items-start gap-2">
            <h2 className="text-xl font-bold min-h-14">{title}</h2>
            <Icon size={20} strokeWidth={2} className="text-primary mt-1"/>
          </div>
          <div className="">
            <span className="text-xs text-muted-foreground line-clamp-1">{description}</span>
          </div>
        </section>

        {isError ? (
             <GeneralErrorContent title={false} refetch={refetch} className="min-h-0 py-2 h-full" />
          ) : (
                    <section className="flex flex-col gap-3">
          <NumberFlow
            value={valueFormat === "percent" ? value / 100 : value}
            locales="en-US"
            format={{ style: valueFormat, currency: 'USD' }}
            className="text-4xl md:text-3xl font-bold"
          />
          <div className="flex xl:flex-row  lg:items-start lg:flex-col items-center justify-between w-full">
            <span className="text-sm text-muted-foreground">{label}</span>
              <MotionConfig
                // Disable layout animations if NumberFlow can't animate.
                // This worked better than setting layout={canAnimate}
                transition={{
                  layout: canAnimate ? { duration: 0.9, bounce: 0, type: 'spring' } : { duration: 0 }
                }}
              >
                <motion.span
                  className={cn(
                    percentageValue > 0 ? 'bg-green-foliatti' : 'bg-red-500',
                    'inline-flex gap-1 items-center px-[0.3em] text-lg text-white transition-colors duration-300'
                  )}
                  layout
                  style={{ borderRadius: 999 }}
                >
                  <MotionArrowUp
                    className="mr-0.5 size-[0.70em]"
                    absoluteStrokeWidth
                    strokeWidth={3}
                    layout // undo parent
                    transition={{
                      rotate: canAnimate ? { type: 'spring', duration: 0.5, bounce: 0 } : { duration: 0 }
                    }}
                    animate={{ rotate: percentageValue > 0 ? 0 : -180 }}
                    initial={false}
                  />
                  <MotionNumberFlow
                    value={percentageValue}
                    className="font-medium text-sm"
                    format={{ style: 'percent', maximumFractionDigits: 2, signDisplay: 'always' }}
                    style={{ ['--number-flow-char-height' as string]: '0.85em', ['--number-flow-mask-height' as string]: '0.3em' }}
                    layout
                    layoutRoot
                  />
                </motion.span>
              </MotionConfig>
          </div>
        </section>

          )}



      </CardContent>
    </Card>
  )
}
