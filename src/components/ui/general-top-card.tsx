import * as React from "react"
import { motion, MotionConfig } from 'framer-motion'
import NumberFlow, { useCanAnimate } from '@number-flow/react'
import { TrendingUp, LoaderCircleIcon } from 'lucide-react'
import { type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { GeneralErrorContent } from "@/components/general-error-content"
import type { QueryObserverResult, RefetchOptions } from "@tanstack/react-query"
import { useContextQuery } from "@/contexts/query-context"

const MotionNumberFlow = motion.create(NumberFlow)
const MotionArrowUp = motion.create(TrendingUp)

export type ValueFormat = 'currency' | 'percent' | 'decimal'

interface TopCardContextValue {
  percentageValue?: number
  valueFormat?: ValueFormat
  isLoading?: boolean
  isError?: boolean
  refetch?: (options?: RefetchOptions) => Promise<QueryObserverResult<any, Error>>
  Icon?: LucideIcon
  iconSize?: number
  iconStrokeWidth?: number
  label?: string
  index?: number
}

const TopCardContext = React.createContext<TopCardContextValue>({})

function TopCard({ 
  className, 
  percentageValue = 0,
  valueFormat = 'currency',
  isLoading = false,
  isError = false,
  refetch,
  Icon,
  iconSize = 20,
  iconStrokeWidth = 2,
  label,
  index,
  children,
  containerClassName,
  ...props 
}: React.ComponentProps<"div"> & TopCardContextValue & { containerClassName?: string }) {
  const contextValue = {
    percentageValue,
    valueFormat,
    isLoading,
    isError,
    refetch,
    Icon,
    iconSize,
    iconStrokeWidth,
    label,
  }

  return (
    <TopCardContext.Provider value={contextValue}>
      <motion.div layoutId={`card-${index}`} className={cn("w-full h-full", containerClassName)}>
        <div
          data-slot="card"
          className={cn(
            "bg-card text-card-foreground border-0 h-full overflow-hidden rounded-xl",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </motion.div>

    </TopCardContext.Provider>
  )
}

function TopCardHeader({ className, ...props }: React.ComponentProps<"div">) {
  const { Icon, iconSize, iconStrokeWidth, isLoading } = React.useContext(TopCardContext)
  
  return (
    <div
      data-slot="card-header"
      className={cn(
        `flex justify-between  gap-2 px-4 pt-6`,
        className
      )}
    >
      <div className="flex-1">
        {props.children}
      </div>
      {Icon ? (
        <div className="flex-shrink-0">
          {isLoading ? (
            <LoaderCircleIcon 
              size={iconSize} 
              strokeWidth={iconStrokeWidth} 
              className="text-primary mt-1 animate-spin"
            />
          ) : (
            <Icon 
              size={iconSize} 
              strokeWidth={iconStrokeWidth} 
              className="text-primary mt-1"
            />
          )}
        </div>
      ) : isLoading && <LoaderCircleIcon size={iconSize} strokeWidth={iconStrokeWidth} className="text-primary mt-1 animate-spin" />}
    </div>
  )
}

function TopCardTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="card-title"
      className={cn("text-xl font-bold", className)}
      {...props}
    />
  )
}

function TopCardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-xs text-muted-foreground line-clamp-1", className)}
      {...props}
    />
  )
}

function TopCardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn("flex items-center justify-center", className)}
      {...props}
    />
  )
}

function TopCardContent({ className, ...props }: React.ComponentProps<"div">) {
  const { isError, refetch } = React.useContext(TopCardContext)
  
  return (
    <div
      data-slot="card-content"
      className={cn(
        "flex px-4 flex-col gap-3",
        isError ? "" : "justify-between",
        className
      )}
    >
      {isError ? (
        <GeneralErrorContent 
          title={false} 
          refetch={refetch} 
          className="min-h-[72px] w-full min-w-[50px] py-1 h-full" 
        />
      ) : (
        props.children
      )}
    </div>
  )
}

function TopCardFooter({ className, percentageValue, label, hasFilter, showPercentage = true, ...props }: React.ComponentProps<"div"> & { showPercentage?: boolean, percentageValue?: number, label?: string, hasFilter: boolean }) {
  const canAnimate = useCanAnimate()
  const { labelTimePeriod } = useContextQuery();
  const { isError } = React.useContext(TopCardContext)
  return (  
    <div
      data-slot="card-footer"
      className={cn(
      "flex xl:flex-row lg:items-start lg:flex-col gap-3 items-center justify-between w-full px-4 pb-6",
      className
      )}
      {...props}
    >
      {label ? (
      <span className="text-sm text-muted-foreground line-clamp-1">{label}</span>
      ) : (hasFilter && hasFilter === true) ? (
        <span className="text-sm text-muted-foreground line-clamp-1">{labelTimePeriod}</span>
      ) : (hasFilter === false) ? (
        <span className="text-sm text-muted-foreground line-clamp-1">No aplica filtro</span>
      ) : null}

      {(showPercentage && !isError) ? (
      <MotionConfig
        transition={{
        layout: canAnimate ? { duration: 0.9, bounce: 0, type: 'spring' } : { duration: 0 }
        }}
      >
        <motion.span
        className={cn(
          percentageValue && percentageValue > 0 ? 'bg-green-foliatti' : 'bg-red-500',
          'inline-flex gap-1 items-center px-[0.3em] text-lg text-white transition-colors duration-300'
        )}
        layout
        style={{ borderRadius: 999 }}
        >
        <MotionArrowUp
          className="mr-0.5 size-[0.70em]"
          absoluteStrokeWidth
          strokeWidth={3}
          layout
          transition={{
          rotate: canAnimate ? { type: 'spring', duration: 0.5, bounce: 0 } : { duration: 0 }
          }}
          animate={{ rotate: percentageValue && percentageValue >= 0 ? 0 : -180 }}
          initial={false}
        />
        <MotionNumberFlow
          value={percentageValue === 0 || !percentageValue ? 0 : percentageValue / 100}
          className="font-medium text-sm"
          format={{ style: 'percent', maximumFractionDigits: 2, signDisplay: 'always' }}
          style={{ 
          ['--number-flow-char-height' as string]: '0.85em', 
          ['--number-flow-mask-height' as string]: '0.3em' 
          }}
          layout
          layoutRoot
        />
        </motion.span>
      </MotionConfig>
      ) : null}

      {props.children}
    </div>
  )
}

function TopCardValue({ 
  value = 0,
  valueFormat = 'currency',
  className, 
  suffix = "",
}: React.ComponentProps<"div"> & { value: number, valueFormat?: ValueFormat, suffix?: string }) {
  
  return (
      <NumberFlow
        value={valueFormat === "percent" ? value / 100 : value}
        locales="en-US"
        suffix={suffix}
        format={{ style: valueFormat, currency: 'USD' }}
        className={cn("text-4xl md:text-3xl font-bold max-h-10 flex justify-start items-center mb-2", className)}
      />
  )
}

export {
  TopCard,
  TopCardHeader,
  TopCardFooter,
  TopCardTitle,
  TopCardAction,
  TopCardDescription,
  TopCardContent,
  TopCardValue,
}