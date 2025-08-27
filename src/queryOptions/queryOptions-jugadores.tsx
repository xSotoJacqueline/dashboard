import { queryOptions } from "@tanstack/react-query";
import { queryStringDefault } from "./queryOptions";

export type GeneralProps = {
  queryString?: string;
  applyFilters?: boolean;
}

export const xApiKey = import.meta.env.VITE_X_API_KEY || '';

export type PercentageDepositsByDayOfWeekData = {
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
  count: number;
  percentage: number;
}[];

export type TopLoosersData = {
  id: number;
  casino: string;
  bet_date: string;
  bet_date_normalized: string;
  game_type: string;
  playerId: string;
  user_name: string;
  number_of_bets: number;
  real_money_bets: number;
  real_money_wins: number;
  wins: number;
  created_at: string;
};

export function topLoosers({queryString = queryStringDefault, pageParam}: {queryString?: string, pageParam?: number}) {
  return queryOptions({
    queryKey: ['topLoosers', queryString, pageParam],
    queryFn: async () : Promise<TopLoosersData[]> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/betdata${queryString}&page=${pageParam || 1}&pageSize=10`,{headers: { 'x-api-key': xApiKey }});
      if (!res.ok) {
        //check error
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to fetch top loosers');
      }
      const data = await res.json();
      return data;
    },
    placeholderData: (previousData) => previousData,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}

export function percentageDepositsByDayOfWeek({queryString = queryStringDefault}: {queryString?: string}) {
  return queryOptions({
    queryKey: ['percentageDepositsByDayOfWeek', queryString],
    queryFn: async () : Promise<PercentageDepositsByDayOfWeekData> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/withdraw/get-withdraws-by-day-of-week-in-range${queryString}`,{headers: { 'x-api-key': xApiKey }});
      if (!res.ok) {
        //check error
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to fetch percentage deposits by day of week');
      }
      const data = await res.json();
      return data;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}

