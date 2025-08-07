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
const MotionNumberFlow = motion.create(NumberFlow)

export default function CategoriesTab() {
  const canAnimate = useCanAnimate()

  return (
    <div  style={{containerType: "size"}}  className="w-full h-full flex flex-col gap-6">
      {/* <div className='h-fit lg:h-[35cqh] w-full grid grid-cols-2 md:grid-cols-6 gap-6'>
        <Card className="w-full flex flex-col justify-between h-full border-0 gap-6 col-span-2 md:col-span-3 lg:col-span-2 space-y-0">
            <CardHeader className="flex justify-between items-center h-fit">
                <CardTitle className="text-xl font-semibold">Casino</CardTitle>
                <MotionConfig  
                  transition={{
                    layout: canAnimate ? { duration: 0.9, bounce: 0, type: 'spring' } : { duration: 0 }
                  }}
                >
                  <motion.span
                    className={cn(
                    'inline-flex gap-1 bg-zinc-200 items-center px-[0.3em] text-lg text-foreground transition-colors duration-300'
                    )}
                    layout
                    style={{ borderRadius: 999 }}
                  >
                    <MotionNumberFlow
                      value={(Math.floor(Math.random() * 100.55) - 40)/1000}
                      className="font-medium text-sm"
                      format={{ style: 'percent', maximumFractionDigits: 2 }}
                      style={{ ['--number-flow-char-height' as string]: '0.85em', ['--number-flow-mask-height' as string]: '0.3em' }}
                      layout
                      layoutRoot
                    />
                  </motion.span>
                </MotionConfig>
            </CardHeader>
            <CardContent className="w-full h-full flex flex-col gap-0" >
              <div className="flex flex-col gap-4 justify-center items-center h-full w-full">
                  <div className="flex flex-col text-base w-full">
                    <span>Jugadores</span>
                    <Progress value={70} className='' />
                  </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex h-fulllg:items-startitems-center justify-between w-full">
                <span className="text-sm text-gray-600">Ultimos 28 días</span>
                <MotionConfig
                  transition={{
                    layout: canAnimate ? { duration: 0.9, bounce: 0, type: 'spring' } : { duration: 0 }
                  }}
                >
                    <MotionNumberFlow
                      value={(Math.floor(Math.random() * 100.55) - 40)}
                      locales="en-US"
                        className={cn(
                              (Math.floor(Math.random() * 100.55) - 40) > 0 ? 'text-green-foliatti' : 'text-red-500',
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
                  <motion.span
                    className={cn(
                    'inline-flex gap-1 bg-zinc-200 items-center px-[0.3em] text-lg text-foreground transition-colors duration-300'
                    )}
                    layout
                    style={{ borderRadius: 999 }}
                  >
                    <MotionNumberFlow
                      value={(Math.floor(Math.random() * 100.55) - 40)/1000}
                      className="font-medium text-sm"
                      format={{ style: 'percent', maximumFractionDigits: 2 }}
                      style={{ ['--number-flow-char-height' as string]: '0.85em', ['--number-flow-mask-height' as string]: '0.3em' }}
                      layout
                      layoutRoot
                    />
                  </motion.span>
                </MotionConfig>
            </CardHeader>
            <CardContent className="w-full h-full flex flex-col gap-6" >
              <div className="flex flex-col gap-4 justify-center items-center h-full w-full">
                  <div className="flex flex-col text-base w-full">
                    <span>Jugadores</span>
                    <Progress value={70} className='' />
                  </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex h-full lg:items-start items-center justify-between w-full">
                <span className="text-sm text-gray-600">Ultimos 28 días</span>
                <MotionConfig
                  transition={{
                    layout: canAnimate ? { duration: 0.9, bounce: 0, type: 'spring' } : { duration: 0 }
                  }}
                >
                    <MotionNumberFlow
                      value={(Math.floor(Math.random() * 100.55) - 40)}
                      locales="en-US"
                        className={cn(
                              (Math.floor(Math.random() * 100.55) - 40) > 0 ? 'text-green-foliatti' : 'text-red-500',
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

        <Card className="w-full flex flex-col justify-between h-full border-0 gap-6 col-span-2 md:col-span-6 lg:col-span-2 space-y-0">
            <CardHeader className="flex justify-between items-center h-fit">
                <CardTitle className="text-xl font-semibold">En Vivo</CardTitle>
                <MotionConfig  
                  transition={{
                    layout: canAnimate ? { duration: 0.9, bounce: 0, type: 'spring' } : { duration: 0 }
                  }}
                >
                  <motion.span
                    className={cn(
                    'inline-flex gap-1 bg-zinc-200 items-center px-[0.3em] text-lg text-foreground transition-colors duration-300'
                    )}
                    layout
                    style={{ borderRadius: 999 }}
                  >
                    <MotionNumberFlow
                      value={(Math.floor(Math.random() * 100.55) - 40)/1000}
                      className="font-medium text-sm"
                      format={{ style: 'percent', maximumFractionDigits: 2 }}
                      style={{ ['--number-flow-char-height' as string]: '0.85em', ['--number-flow-mask-height' as string]: '0.3em' }}
                      layout
                      layoutRoot
                    />
                  </motion.span>
                </MotionConfig>
            </CardHeader>
            <CardContent className="w-ful h-full flex flex-col gap-0" >
              <div className="flex flex-col gap-4 justify-center items-center h-full w-full">
                  <div className="flex flex-col text-base w-full">
                    <span>Jugadores</span>
                    <Progress value={70} className='' />
                  </div>
              </div>
            </CardContent>
            <CardFooter className="">
              <div className="flex h-full items-center justify-between w-full">
                <span className="text-sm text-gray-600">Ultimos 28 días</span>
                <MotionConfig
                  transition={{
                    layout: canAnimate ? { duration: 0.9, bounce: 0, type: 'spring' } : { duration: 0 }
                  }}
                >
                    <MotionNumberFlow
                      value={(Math.floor(Math.random() * 100.55) - 40)}
                      locales="en-US"
                        className={cn(
                              (Math.floor(Math.random() * 100.55) - 40) > 0 ? 'text-green-foliatti' : 'text-red-500',
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
      </div> */}

      <div className='h-full w-full'>
        <CategoriesTable/>
      </div>

    </div>
  );
}
