import { createFileRoute } from '@tanstack/react-router'
import { RankingBonosTable } from '@/components/bonos/ranking-table'
import { BonusPerClientChart } from '@/components/bonos/bonosPerClientChart'
import { EarningsClientBonosChart } from '@/components/bonos/earningsClientBonosChart'
import ErrorPage from '@/components/errorPage'
import type { GeneralSearch } from '@/types/search-types'
import { motion } from 'framer-motion'
import BonosTopCards from '@/components/bonos/bonos-top-cards'

export const Route = createFileRoute('/dashboard/bonos')({
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
        <BonosTopCards/>
        <motion.div layoutId="tabs-list" className='w-full' />
      </section>
      <div className="h-fit grid grid-cols-1 md:grid-cols-2 gap-6">
        <RankingBonosTable />
        <BonusPerClientChart />
      </div>
      
      <div className="w-full h-full max-h-full flex gap-6">
        <EarningsClientBonosChart />
      </div>
    </div>
  )}
