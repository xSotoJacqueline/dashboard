import { queryOptions } from "@tanstack/react-query";
import { queryStringDefault } from "./queryOptions";

export type GeneralProps = {
  queryString?: string;
  applyFilters?: boolean;
}

//queryString last month ?startDate=${startDate}&endDate=${endDate}`

export const xApiKey = import.meta.env.VITE_X_API_KEY || '';

export type PercentageDepositsByDayOfWeekData = {
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
  count: number;
  percentage: number;
}[];

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


export function averageAmountWithdrawalsPerDay({queryString = queryStringDefault}: {queryString?: string}) {
  return queryOptions({
    queryKey: ['averageAmountWithdrawalsPerDay', queryString],
    queryFn: async () : Promise<number> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/withdraw/get-average-withdrawals-amount-per-day${queryString}`,{headers: { 'x-api-key': xApiKey }});
      if (!res.ok) {
        throw new Error('Failed to fetch average withdrawals per day');
      }
      const data = await res.json();
      return data;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,

  });
}

export function averageWithdrawalsPerDay({queryString = queryStringDefault}: {queryString?: string}) {
  return queryOptions({
    queryKey: ['averageWithdrawalsPerDay', queryString],
    queryFn: async () : Promise<number> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/withdraw/get-average-withdraws-per-day${queryString}`,{headers: { 'x-api-key': xApiKey }});
      if (!res.ok) {
        throw new Error('Failed to fetch average withdrawals per day');
      }
      const data = await res.json();
      return data;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,

  });
}

export type TopPlayersMostWithdrawalsData = {
  playerId: string;
  email: string;
  userName: string;
  withdrawCount: number;
  totalAmount: number;
}[];

export function TopPlayersMostWithdrawals({queryString = queryStringDefault}: {queryString?: string}) {
  return queryOptions({
    queryKey: ['TopPlayersMostWithdrawals', queryString],
    queryFn: async () : Promise<TopPlayersMostWithdrawalsData> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/withdraw/get-players-which-have-more-withdraws${queryString}`,{headers: { 'x-api-key': xApiKey }});
      if (!res.ok) {
        throw new Error('Failed to fetch total withdrawals');
      }
      const data = await res.json();
      return data;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}

export type RushHourWithdrawsData = {
  date: string;
  hour: string;
  count: number;
}[];

export type MostCommonWithdrawHourData = {
  hour: string;
  count: number;
  percentage: number;
};

    // { Ejemplo
    //     "date": "2025-07-01",
    //     "hour": "0",
    //     "count": "11"
    // },

export function mostCommonWithdrawHour({queryString = queryStringDefault}: {queryString?: string}) {
  return queryOptions({
    queryKey: ['mostCommonWithdrawHour', queryString],
    queryFn: async () : Promise<MostCommonWithdrawHourData> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/withdraw/get-rush-hour-withdraws${queryString}`,{headers: { 'x-api-key': xApiKey }});
      if (!res.ok) {
        throw new Error('Failed to fetch rush hour withdrawals');
      }
      const data: RushHourWithdrawsData = await res.json();
      
      const hourCounts = data.reduce((acc, item) => {
        const hour = item.hour;
        acc[hour] = (acc[hour] || 0) + parseInt(item.count.toString());
        return acc;
      }, {} as Record<string, number>);

      const [mostCommonHour, maxCount] = Object.entries(hourCounts).reduce(
        (max, [hour, count]) => count > max[1] ? [hour, count] : max,
        ['0', 0]
      );

      const totalWithdraws = Object.values(hourCounts).reduce((sum, count) => sum + count, 0);
      
      const percentage = totalWithdraws > 0 ? (maxCount / totalWithdraws) * 100 : 0;

      return {
        hour: mostCommonHour,
        count: maxCount,
        percentage: Math.round(percentage * 100) / 100 // Redondear a 2 decimales
      };
    },

    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}




export function totalWithdrawals({queryString = queryStringDefault}: {queryString?: string}) {
  return queryOptions({
    queryKey: ['totalWithdrawals', queryString],
    queryFn: async () : Promise<number> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/withdraw/get-total-withdrawals${queryString}`,{headers: { 'x-api-key': xApiKey }});
      if (!res.ok) {
        throw new Error('Failed to fetch total withdrawals');
      }
      const data = await res.json();
      return data;
    },

    staleTime: Infinity,
    refetchOnWindowFocus: false,

  });
}

