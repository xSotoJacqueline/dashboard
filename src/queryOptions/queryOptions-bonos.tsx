import { queryOptions } from "@tanstack/react-query";
import { queryStringDefault } from "./queryOptions";

export const xApiKey = import.meta.env.VITE_X_API_KEY || '';
export const propertyId = import.meta.env.VITE_PROPERTY_ID || '';

export function totalTraffic() {
  return queryOptions({
    queryKey: ['totalTraffic'],
    queryFn: async () : Promise<number> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/analytics/total-traffic?propertyId=${propertyId}`,{headers: { 'x-api-key': xApiKey }});
      if (!res.ok) {
        throw new Error('Failed to fetch total traffic');
      }
      const data = await res.json();
      return data;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}

type TotalBetsResponse = {
  bet_free_bets: number;
  bet_free_spins: number;
  wagering_bonus_bet: number;
  total: number;
}

export function getTotalRedemptions({queryString = queryStringDefault}: {queryString?: string}) {
  return queryOptions({
    queryKey: ['totalRedemptions', queryString],
    queryFn: async () : Promise<number> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/redencion/suma-redenciones${queryString}`,{headers: { 'x-api-key': xApiKey }});
      if (!res.ok) {
        throw new Error('Failed to fetch total redemptions');
      }
      const data = await res.json() as TotalBetsResponse;
      return data.total;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}

type TotalConvertedAmountResponse = {
  sumResult: {  
    Free_Spin_Wins: number;
    Free_Bet_Net_Wins_Local: number;
    Wagering_Bonus_Wins_Local: number;
  };
  diagnosticInfo: {
    recordsInRange: number;
    queryRange: {
      startDate: string;
      endDate: string;
    };
    availableDataRange: {
      minDate: string;
      maxDate: string;
    };
  };
  totalSum: number;
}

export function getTotalConvertedAmount({queryString = queryStringDefault}: {queryString?: string}) {
  return queryOptions({
    queryKey: ['totalConvertedAmount', queryString],
    queryFn: async () : Promise<number> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/convertido/suma-por-fecha${queryString}`,{headers: { 'x-api-key': xApiKey }});
      if (!res.ok) {
        throw new Error('Failed to fetch total converted amount');
      }
      const data = await res.json() as TotalConvertedAmountResponse;
      return data.totalSum;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}

type TotalGiftedAmountResponse = {
  _sum:{
    ggr_wagering_bonus: number;
    ggr_free_spins_local: number;
    ggr_freebets_local: number;
  }
  total: number;
}

export function getTotalGiftedAmount({queryString = queryStringDefault}: {queryString?: string}) {
  return queryOptions({
    queryKey: ['totalGiftedAmount', queryString],
    queryFn: async () : Promise<number> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/monto/suma-monto-regalado${queryString}`,{headers: { 'x-api-key': xApiKey }});
      if (!res.ok) {
        throw new Error('Failed to fetch total gifted amount');
      }
      const data = await res.json() as TotalGiftedAmountResponse;
      return data.total;
    }
    ,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}


type countAllUsersByBonusResponse = {
  bonus_code: string;
  total_users: number;
}
export function getCountAllUsersByBonus() {
  return queryOptions({
    queryKey: ['countAllUsersByBonus'],
    queryFn: async () : Promise<countAllUsersByBonusResponse[]> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/bonus/count-all-users-by-bonus`,{headers: { 'x-api-key': xApiKey }});
      if (!res.ok) {
        throw new Error('Failed to fetch count all users by bonus');
      }
      const data = await res.json() as countAllUsersByBonusResponse[];
      data.sort((a, b) => b.total_users - a.total_users);
      return data;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}

type totalRedemptionsByBonusResponse = {
    id: number;
    bonus_code: string;
    day_of_bonus: string;
    day_of_bonus_normalized: string;
    free_bet_bet: number;
    free_spin_bet: number;
    wagering_bonus_bet: number;
}

export function getTotalRedemptionsByBonus() {
  return queryOptions({
    queryKey: ['totalRedemptionsByBonus'],
    queryFn: async () : Promise<totalRedemptionsByBonusResponse[]> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/bonus/redenciones-juego`,{headers: { 'x-api-key': xApiKey }});  
      if (!res.ok) {
        throw new Error('Failed to fetch total redemptions by bonus');
      }
      const data = await res.json();
      return data;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}


type DropoutRateResponse ={
  totalUsers: number;
  activeUsersAnalytics: number;
  dropoutRateDB: number;
  activeRateAnalytics: number;
}
export function getDropoutRate({queryString = queryStringDefault}: {queryString?: string}) {
  return queryOptions({
    queryKey: ['dropoutRate', queryString],
    queryFn: async () : Promise<number> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/metricas/dropout-comparison${queryString}`,{headers: { 'x-api-key': xApiKey }});
      if (!res.ok) {
        throw new Error('Failed to fetch dropout rate');
      }
      const data = await res.json() as DropoutRateResponse;
      return data.dropoutRateDB;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}
