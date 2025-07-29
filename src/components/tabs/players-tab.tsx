import { motion, MotionConfig } from 'framer-motion'
import NumberFlow, { useCanAnimate } from '@number-flow/react'
import { cn } from "@/lib/utils"
import { TrendingUp } from 'lucide-react'
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
} from "@/components/ui/card"
import { Progress } from '../ui/progress';
import { BarChartPerDayMarketing } from '../marketing/barChart-perday';

const MotionNumberFlow = motion.create(NumberFlow)
const MotionArrowUp = motion.create(TrendingUp)
export default function PlayersTab() {
    const canAnimate = useCanAnimate()

  return (
    <div  style={{containerType: "size"}}  className="w-full h-full flex flex-col gap-6">
    <div className='h-fit md:h-[65cqh] w-full grid grid-cols-1 md:grid-cols-2 gap-6'>
      <BarChartPerDayMarketing className="w-full h-full col-span-1" title="Jugadores activos diarios" description="Promedio: 1500"/>
      <BarChartPerDayMarketing className="w-full h-full col-span-1" title="Registros por días" description="Nuevos usuarios registrados" />
    </div>
    <div className='h-full md:h-[35cqh] w-full grid grid-cols-2 md:grid-cols-6 gap-6'>
      <Card className="w-full h-full border-0 gap-0 col-span-2 md:col-span-3 lg:col-span-2 space-y-0">
          <CardHeader>
              <CardTitle className="text-xl font-semibold">Retención 7 días</CardTitle>
          </CardHeader>
          <CardContent className=" @container-normal relative sm:pt-0 h-full" >
            <div className="flex flex-col gap-4 justify-between h-full w-full">
                <div className="h-fit w-full flex gap-4">
                  <NumberFlow
                    value={0.078}
                    format={{ style: 'percent',  maximumFractionDigits: 2  }}
                    className="text-4xl font-bold"
                  />
                </div>
                <div className="flex xl:flex-row  lg:items-start lg:flex-col items-center justify-between w-full">
                  <Progress value={70} className='' />
                </div>
            </div>
              
          </CardContent>
      </Card>

      <Card className="w-full h-full border-0 gap-0 col-span-2 md:col-span-3 lg:col-span-2 space-y-0">
          <CardHeader>
              <CardTitle className="text-xl font-semibold">Sesión promedio</CardTitle>
          </CardHeader>
          <CardContent className=" @container-normal flex relative sm:pt-0 h-full" >
            <div className="flex flex-col gap-4 justify-between h-full w-full">
                <div className="h-fit w-full flex gap-4">
                  <NumberFlow
                    value={22}
                    format={{ style: 'decimal' }}
                    suffix="m"
                    className="text-4xl font-bold"
                  />
                  <NumberFlow
                    value={22}
                    format={{ style: 'decimal' }}
                    suffix="s"
                    className="text-4xl font-bold"
                  />
                </div>
                <div className="flex xl:flex-row  lg:items-start items-center justify-between w-full">
                  <span className="text-sm text-gray-600">Ultimos 28 días</span>
                    <MotionConfig
                      // Disable layout animations if NumberFlow can't animate.
                      // This worked better than setting layout={canAnimate}
                      transition={{
                        layout: canAnimate ? { duration: 0.9, bounce: 0, type: 'spring' } : { duration: 0 }
                      }}
                    >
                      <motion.span
                        className={cn(
                          2 > 0 ? 'bg-green-foliatti' : 'bg-red-500',
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
                          animate={{ rotate: 2 > 0 ? 0 : -180 }}
                          initial={false}
                        />
                        <MotionNumberFlow
                          value={2}
                          className="font-medium text-sm"
                          format={{ style: 'percent', maximumFractionDigits: 2, signDisplay: 'always' }}
                          style={{ ['--number-flow-char-height' as string]: '0.85em', ['--number-flow-mask-height' as string]: '0.3em' }}
                          layout
                          layoutRoot
                        />
                      </motion.span>
                    </MotionConfig>
                
                </div>
            </div>
          </CardContent>
      </Card>

      <Card className="w-full h-full border-0 gap-0 col-span-2 md:col-span-6 lg:col-span-2 space-y-0">
          <CardHeader>
              <CardTitle className="text-xl font-semibold">Sesión promedio</CardTitle>
          </CardHeader>
          <CardContent className=" @container-normal relative sm:pt-0 h-full" >
            <div className="flex flex-col gap-4 justify-between h-full w-full">
                <div className="h-fit w-full flex gap-4">
                  <NumberFlow
                    value={0.078}
                    format={{ style: 'percent',  maximumFractionDigits: 2  }}
                    className="text-4xl font-bold"
                  />
                </div>
                <div className="flex xl:flex-row  lg:items-start items-center justify-between w-full">
                  <span className="text-sm text-gray-600">Ultimos 28 días</span>
                    <MotionConfig
                      // Disable layout animations if NumberFlow can't animate.
                      // This worked better than setting layout={canAnimate}
                      transition={{
                        layout: canAnimate ? { duration: 0.9, bounce: 0, type: 'spring' } : { duration: 0 }
                      }}
                    >
                      <motion.span
                        className={cn(
                          2 > 0 ? 'bg-green-foliatti' : 'bg-red-500',
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
                          animate={{ rotate: 2 > 0 ? 0 : -180 }}
                          initial={false}
                        />
                        <MotionNumberFlow
                          value={2}
                          className="font-medium text-sm"
                          format={{ style: 'percent', maximumFractionDigits: 2, signDisplay: 'always' }}
                          style={{ ['--number-flow-char-height' as string]: '0.85em', ['--number-flow-mask-height' as string]: '0.3em' }}
                          layout
                          layoutRoot
                        />
                      </motion.span>
                    </MotionConfig>
                </div>
            </div>
              
          </CardContent>
      </Card>
    </div>


    </div>
  );
}
