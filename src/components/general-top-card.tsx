import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp } from 'lucide-react'
import { motion, MotionConfig } from 'framer-motion'
import NumberFlow, { useCanAnimate } from '@number-flow/react'
import { cn } from "@/lib/utils"
import {
  type LucideIcon,
} from "lucide-react"

const MotionNumberFlow = motion.create(NumberFlow)
const MotionArrowUp = motion.create(TrendingUp)
export type ValueFormat = 'currency' | 'percent' | 'decimal'
export type GeneralCardTopCardProps = {
	value: number
  title: string
  percentageValue: number
  description?: string
  Icon: LucideIcon
  valueFormat: ValueFormat
  label?: string
  className?: string
  mainNumberClassName?: string
}

export function GeneralCardTopCard({ value, Icon, title, description, label, percentageValue, valueFormat, className }: GeneralCardTopCardProps) {
  const canAnimate = useCanAnimate()
  return (
    <Card className="border-0 h-full col-span-1 overflow-hidden">
      <CardContent className={cn(`flex px-4 flex-col ${description ? '' : 'gap-3'}`, className)}>
        <section>
          <div className="flex justify-between items-center gap-2">
            <h2 className="text-xl font-bold line-clamp-1">{title}</h2>
            <Icon size={20} strokeWidth={2} className="text-primary"/>
          </div>
          <div className="">
            <span className="text-xs text-gray-600 line-clamp-1">{description}</span>
          </div>
        </section>

        <NumberFlow
          value={valueFormat === "percent" ? value / 100 : value}
          locales="en-US"
          format={{ style: valueFormat, currency: 'USD' }}
          className="text-5xl md:text-4xl font-bold"
        />
        {/* <div className="text-5xl font-bold mb-2">{value}</div> */}
        <div className="flex xl:flex-row  lg:items-start lg:flex-col items-center justify-between w-full">
          <span className="text-sm text-gray-600">{label}</span>
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
      </CardContent>
    </Card>
  )
}
