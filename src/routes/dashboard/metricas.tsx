import { createFileRoute } from '@tanstack/react-router'
import { ChartLineLabel } from "@/components/metricas/lineChart"
import ErrorPage from '@/components/errorPage'
import type { GeneralSearch } from '@/types/search-types'
import { motion } from 'framer-motion'
import MetricsTopCards from '@/components/metricas/metrics-top-cards'
import { ChartLineAcquisition } from '@/components/metricas/lineChart-acquisition'
import { ChartLineDropoutRate } from '@/components/metricas/lineChart-dropout-rate'

export const Route = createFileRoute('/dashboard/metricas')({
  validateSearch: (search: Record<string, unknown>): GeneralSearch => {
    return {
      from: typeof search?.from === 'number'
        ? search.from
        : undefined,
      to: typeof search?.to === 'number'
        ? search.to
        : undefined,
    }
  },
  component: RouteComponent,
  errorComponent: ({error}) => <ErrorPage error={error.message} />,
  
})

function RouteComponent() {

  return (
    <div className={`w-full flex flex-col gap-6 rounded-lg text-black h-full py-1`}>

      <section className='w-full h-fit'>

        <MetricsTopCards />
        <motion.div layoutId="tabs-list" className='w-full h-0' />

      </section>

      <div className="h-fit grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartLineAcquisition />
        <ChartLineDropoutRate />
      </div>
      
      <div className="w-full h-full max-h-full flex gap-6">
        <ChartLineLabel identifier='chart3'  title="Customer Lifetime Value" />
      </div>
    </div>
  )}
