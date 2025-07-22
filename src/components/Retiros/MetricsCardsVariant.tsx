import { BarChart3 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowUp } from 'lucide-react'
import { motion, MotionConfig } from 'framer-motion'
import NumberFlow, { useCanAnimate } from '@number-flow/react'
import { cn } from "@/lib/utils"

const MotionNumberFlow = motion.create(NumberFlow)
const MotionArrowUp = motion.create(ArrowUp)
type Props = {
	value: number
  className?: string
}


export function MetricsCardsVariant({ value, className }: Props) {
  	const canAnimate = useCanAnimate()
  return (
    <div className={cn(className)}>
      <Card className="bg-gray-50 border-0">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-6 h-6 text-gray-600" />
          </div>
          <div className="mb-2">
            <span className="text-sm text-gray-600">Total de retiros</span>
          </div>
          <div className="text-5xl font-bold mb-2">420</div>
          <div className="text-sm text-gray-600 mb-3">Transacciones gay x2</div>
          <div className="flex items-center justify-between w-full">
            <span className="text-sm text-gray-600">Últimos 28 días</span>
            	<MotionConfig
                // Disable layout animations if NumberFlow can't animate.
                // This worked better than setting layout={canAnimate}
                transition={{
                  layout: canAnimate ? { duration: 0.9, bounce: 0, type: 'spring' } : { duration: 0 }
                }}
              >
                <motion.span
                  className={cn(
                    value > 0 ? 'bg-emerald-400' : 'bg-red-500',
                    'inline-flex items-center px-[0.3em] text-lg text-white transition-colors duration-300'
                  )}
                  layout
                  style={{ borderRadius: 999 }}
                >
                  <MotionArrowUp
                    className="mr-0.5 size-[0.75em]"
                    absoluteStrokeWidth
                    strokeWidth={3}
                    layout // undo parent
                    transition={{
                      rotate: canAnimate ? { type: 'spring', duration: 0.5, bounce: 0 } : { duration: 0 }
                    }}
                    animate={{ rotate: value > 0 ? 0 : -180 }}
                    initial={false}
                  />
                  <MotionNumberFlow
                    value={value}
                    className="font-semibold text-sm"
                    format={{ style: 'percent', maximumFractionDigits: 2 }}
                    style={{ ['--number-flow-char-height' as string]: '0.85em', ['--number-flow-mask-height' as string]: '0.3em' }}
                    layout
                    layoutRoot
                  />
                </motion.span>
              </MotionConfig>
          </div>
        </CardContent>
      </Card>

    </div>
  )
}
