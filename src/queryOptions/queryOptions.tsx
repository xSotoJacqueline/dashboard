import { queryOptions, keepPreviousData } from "@tanstack/react-query";
import { endOfMonth, format, subDays, subMonths } from "date-fns";

export type GeneralProps = {
  queryString?: string;
  applyFilters?: boolean;
}

export const queryStringDefault = `?startDate=${format(subDays(new Date(), 27), 'yyyy-MM-dd')}&endDate=${format(new Date(), 'yyyy-MM-dd')}`;
// 28 dias anteriores
export const queryString28DaysBefore = `?startDate=${format(subMonths(subDays(new Date(), 27), 1), 'yyyy-MM-dd')}&endDate=${format(endOfMonth(subMonths(new Date(), 1)), 'yyyy-MM-dd')}`;
export const xApiKey = import.meta.env.VITE_X_API_KEY || '';
export type totalTransactionsByType ={
    WITHDRAWAL: number;
    DEPOSIT: number;
}

export type allDeposits = {
  id: number;
  internalId: number;
  playerId: string;
  username: string;
  email: string;
  transactionType: string;
  transactionStatus: string;
  paymentProvider: string;
  amount: number;
  RemainingAmount: number;
  reference: string;
  dateTime: Date;
}

export type proportionalDepositFTD = {
  total: number;
  ftdTotal: number;
  proportion: number;
};

export type totalDepositsStatusDay = {
  PAID: {
    date: string;
    total: number;
    dailyTotal: number;
  }[],
  DECLINED: {
    date: string;
    total: number;
    dailyTotal: number;
  }[],
  // Cancelled: {
  //   date: string;
  //   total: number;
  //   dailyTotal: number;
  // }[]
}

export interface BenchmarkKey {
    page: number;
    pageSize: number;
    totalPages: number;
    total: number;
    data: {  
        id: number;
        key: string;
        name: string;
        size: string;
        url: string;
        createdAt: Date;
        updatedAt: Date;
    }[]
}

export function totalFTDQueryOptions({queryString = queryStringDefault}: {queryString?: string}) {
  return queryOptions({
    queryKey: ['firstTimeDepositAverage', queryString],
    queryFn: async () : Promise<number> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/table-test/total-ftd${queryString}`,{headers: { 'x-api-key': xApiKey }});
      if (!res.ok) {
        throw new Error('Failed to fetch first time deposit average');
      }
      const data = await res.json();
      return data;
    },

    staleTime: Infinity,
    refetchOnWindowFocus: false,

  });
}

export function globalAverageDepositQueryOptions({queryString = queryStringDefault}: {queryString?: string}) {
  return queryOptions({
    queryKey: ['globalAverageDeposit', queryString],
    queryFn: async () : Promise<number> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/table-test/get-global-average-deposit${queryString}`,{headers: { 'x-api-key': xApiKey }});
      if (!res.ok) {
        throw new Error('Failed to fetch first time deposit average');
      }
      return res.json();
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}

export function totalAmountFTDQueryOptions({queryString = queryStringDefault}: {queryString?: string}) {
  return queryOptions({
    queryKey: ['FTDAmount', queryString],
    queryFn: async () : Promise<number> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/table-test/total-money-ftd${queryString}`,{headers: { 'x-api-key': xApiKey }});
      if (!res.ok) {
        throw new Error('Failed to fetch first time deposit average');
      }
      const respuesta = await res.json()
      return respuesta;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
}

export function averageAmountDepositsQueryOptions({queryString = queryStringDefault}: {queryString?: string}) {
  return queryOptions({
    queryKey: ['averageAmountDeposits', queryString],
    queryFn: async () : Promise<number> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/table-test/average-amount${queryString}`,{headers: { 'x-api-key': xApiKey }});
      if (!res.ok) {
        throw new Error('Failed to fetch first time deposit average');
      }
      return res.json();
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}


export function depositsWithdrawalQuantityQueryOptions({queryString = queryStringDefault}: {queryString?: string}) {
  return queryOptions({
    queryKey: ['depositsWithdrawalQuantity', queryString],
    queryFn: async () : Promise<totalTransactionsByType> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/table-test/total-transactions-quantity-by-type${queryString}`,{headers: { 'x-api-key': xApiKey }});
      if (!res.ok) {
        throw new Error('Failed to fetch first time deposit average');
      }
      return res.json();
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,

  });
}

export function proportionalDepositFTDQueryOptions({queryString = queryStringDefault}: {queryString?: string}) {
  return queryOptions({
    queryKey: ['proportionalDepositFTD', queryString],
    queryFn: async () : Promise<proportionalDepositFTD> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/table-test/proportional-deposit-FTD-total-money${queryString}`,{headers: { 'x-api-key': xApiKey }});
      if (!res.ok) {
        throw new Error('Failed to fetch first time deposit average');
      }
      return res.json();
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}




export function allDepositsQueryOptions() {
  return queryOptions({
    queryKey: ['allDeposits'],
    queryFn: async () : Promise<{ time: string; value: number }[]> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/table-test/without-pagination`,{headers: { 'x-api-key': xApiKey }});
      if (!res.ok) {
        throw new Error('Failed to fetch all deposits');
      }
      //convertir data to allDeposits type a  un array  time: string;  value: number;
      const data = await res.json();
      
      // Agrupar por fecha y sumar valores
      const groupedData = data.reduce((acc: Record<string, number>, item: allDeposits) => {
        const date = new Date(item.dateTime).toISOString().split('T')[0];
        acc[date] = (acc[date] || 0) + item.amount;
        return acc;
      }, {});
      
      // Convertir a array y ordenar por fecha
      return Object.entries(groupedData)
        .map(([time, value]) => ({ time, value: value as number }))
        .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}

export function getTotalDepositsByStatusAndDayQueryOptions({queryString = queryStringDefault}: {queryString?: string}) {
  return queryOptions({
    queryKey: ['getTotalDepositsByStatusAndDay', queryString],
    queryFn: async () : Promise<totalDepositsStatusDay> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/table-test/get-total-deposit-by-status-and-day${queryString}`,{headers: { 'x-api-key': xApiKey }});
      if (!res.ok) {
        throw new Error('Failed to fetch all deposits');
      }
      const data = await res.json();
      // Verificar si data contiene almenos uno de los campos Paid, Failed o Cancelled, con al menos un elemento, si falta alguno agregarlo como un array vacío
      if (!data.PAID) {
        data.PAID = [];
      }
      if (!data.DECLINED) {
        data.DECLINED = [];
      }
      return data;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}


export function FTDMountByDayQueryOptions({queryString = queryStringDefault}: {queryString?: string}) {
  return queryOptions({
    queryKey: ['FTDMountByDay', queryString],
    queryFn: async () : Promise<{ time: string; value: number }[]> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/table-test/get-total-money-by-day${queryString}`,{headers: { 'x-api-key': xApiKey }});
      if (!res.ok) {
        throw new Error('Failed to fetch all deposits');
      }
      return await res.json();
      
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}


export function FTDQuantityByDayQueryOptions({queryString = queryStringDefault}: {queryString?: string}) {
  return queryOptions({
    queryKey: ['FTDQuantityByDay', queryString],
    queryFn: async () : Promise<{ time: string; value: number }[]> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/table-test/total-first-deposit-by-all-days${queryString}`,{headers: { 'x-api-key': xApiKey }});
      if (!res.ok) {
        throw new Error('Failed to fetch all deposits');
      }
      return await res.json();
      
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}


export function totalTransactionsByTypeQueryOptions({queryString = queryStringDefault}: {queryString?: string}) {
  return queryOptions({
    queryKey: ['totalTransactionsByType', queryString],
    queryFn: async () : Promise<totalTransactionsByType> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'; 
      const res = await fetch(`${API_BASE_URL}/table-test/total-transactions-by-type${queryString}`,{headers: { 'x-api-key': xApiKey }});
      if (!res.ok) {
        throw new Error('Failed to fetch first time deposit average');
      }
      return res.json();
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,

  });
}

export function benchmarkKeysQueryOptions({pageParam}: {pageParam?: number} = {}) {
    return queryOptions({
    queryKey: ['benchmarkKeys', pageParam],
    queryFn: async () : Promise<BenchmarkKey> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/benchmark/signed-urls?page=${pageParam || 1}`,{headers: { 'x-api-key': xApiKey }});
      if (!res.ok) {
        throw new Error('Failed to fetch benchmark keys');
      }
      return res.json();
    },
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
}
