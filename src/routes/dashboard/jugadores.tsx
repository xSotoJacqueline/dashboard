import { createFileRoute, useSearch } from '@tanstack/react-router'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/animated-tabs";
import TopUsersTab from "@/components/tabs/top-users-tab"
import SpecificGamesTab from "@/components/tabs/specific-games-tab";
import HybridUsersTab from "@/components/tabs/hybrid-users-tab";
import CategoriesTab from "@/components/tabs/categories-tab";
import ErrorPage from '@/components/errorPage';
import type { GeneralSearchWithPagination } from '@/types/search-types';
import { createQueryString } from '@/lib/utils';
import PlayersTopCards from '@/components/jugadores/players-top-cards';

export const Route = createFileRoute('/dashboard/jugadores')({
  validateSearch: (search: Record<string, unknown>): GeneralSearchWithPagination => {
    return {
      from: typeof search?.from === 'number'
        ? search.from
        : undefined,
      to: typeof search?.to === 'number'
        ? search.to
        : undefined,
      page: Number(search?.page ?? 1),
    }
  },
  component: RouteComponent,
  errorComponent: ({error}) => <ErrorPage error={error.message} />,
})

function RouteComponent() {

  const search = useSearch({ from: '/dashboard/jugadores' });

  const page = search.page || 1;
    
  const { queryString, labelTimePeriod } = createQueryString({ fromPeriod: search.from, toPeriod: search.to });

  return (
    <div className="w-full flex flex-col gap-6 rounded-lg text-black h-full py-1">
      <PlayersTopCards queryString={queryString} labelTimePeriod={labelTimePeriod} />

       <Tabs defaultValue="top-users" className="w-full h-full">
          <ScrollArea className="whitespace-nowrap">
            <TabsList className="w-full">
                <TabsTrigger value="top-users">Top usuarios</TabsTrigger>
                {/* <TabsTrigger value="users-by-city">Usuarios por ciudad</TabsTrigger> */}
                <TabsTrigger value="categories">Categorías</TabsTrigger>
                <TabsTrigger value="specific-games">Juegos específicos</TabsTrigger>
                <TabsTrigger value="hybrid-players">Usuarios híbridos</TabsTrigger>
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

          <TabsContent  className="w-full h-full" value="top-users">
            <TopUsersTab queryString={queryString} pageParam={page} />
          </TabsContent>
          <TabsContent className="w-full h-full" value="specific-games">
            <SpecificGamesTab />
          </TabsContent>
          <TabsContent className="w-full h-full" value="categories">
            <CategoriesTab />
          </TabsContent>
          <TabsContent className="w-full h-full" value="hybrid-players">
            <HybridUsersTab queryString={queryString} pageParam={page} />
          </TabsContent>
        </Tabs>
    </div>
  )}
