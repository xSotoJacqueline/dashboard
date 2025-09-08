import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useSidebar } from "../ui/sidebar";
import { MedalIcon } from "lucide-react";
import { GeneralCard } from '../general-card';
import { getCountAllUsersByBonus } from "@/queryOptions/queryOptions-bonos";
import { useQuery } from "@tanstack/react-query";
import CardLoading from "../loading-card";
import { GeneralErrorContent } from "../general-error-content";
import { GeneralEmptyContent } from "../general-empty-content";

export function RankingBonosTable() {
  const { state } = useSidebar();

  const allUsersByBonus = useQuery(
    getCountAllUsersByBonus()
  );

      if (allUsersByBonus.isPending || allUsersByBonus.isFetching) {
          return <CardLoading className="w-full h-full animate-pulse" title={true} children={<div className='min-h-[125px] h-full bg-foreground/10 rounded-md animate-pulse' />} />
  
      }

      if (allUsersByBonus.error) {
          return (
          <GeneralCard identifier="chart1" cardContentClassName="min-h-[120px]" title="Ranking de redenciones por bono" description="Número de redenciones por bono en los últimos 28 días
  ">
              <GeneralErrorContent refetch={allUsersByBonus.refetch} />
          </GeneralCard>
          )
      }
  
      if (!allUsersByBonus.data || allUsersByBonus.data.length === 0) {
          return (    
          <GeneralCard identifier="chart1" cardContentClassName="min-h-[120px]" title="Ranking de redenciones por bono" description="Número de redenciones por bono en los últimos 28 días">
              <GeneralEmptyContent />
          </GeneralCard>
          )
      }

  return (

    <GeneralCard identifier="chart1" title="Ranking de redenciones por bono" description="Número de redenciones por bono en los últimos 28 días" Icon={MedalIcon} isLoading={allUsersByBonus.isPending} cardContentClassName="max-h-[400px] overflow-y-auto">
           <div className="w-full h-full">
              <Table>
                <TableHeader className=" ">
                  <TableRow className={`text-xs !border-b-2 border-foreground !p-0 h-fit ${state === "collapsed" ? "md:text-lg" : "text-xs lg:text-lg"}`}>
                    <TableHead className="text-start h-fit px-0">Bono</TableHead>
                    <TableHead className="text-end h-fit px-0">Redenciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="border-0">
                  <TableRow className="border-0 text-primary h-2" />

                  {allUsersByBonus.data.slice(0, 5).map((users, index) => (
                    <TableRow className="border-0 text-primary" key={index}>
                      <TableCell className="text-start px-0 !max-w-14">{users.bonus_code}</TableCell>
                      <TableCell className="text-end px-0 text-foreground">{users.total_users.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
          </div>
    </GeneralCard>

  )
}
