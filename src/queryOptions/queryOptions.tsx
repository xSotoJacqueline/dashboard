import { queryOptions, keepPreviousData } from "@tanstack/react-query";

export type GeneralProps = {
  queryString?: string;
  applyFilters?: boolean;
}

export type totalTransactionsByType ={
    Withdrawal: number;
    Deposit: number;
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
  Paid: {
    date: string;
    total: number;
    dailyTotal: number;
  }[],
  Failed: {
    date: string;
    total: number;
    dailyTotal: number;
  }[],
  Cancelled: {
    date: string;
    total: number;
    dailyTotal: number;
  }[]
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

export function totalFTDQueryOptions({queryString}: {queryString?: string}) {
  return queryOptions({
    queryKey: ['firstTimeDepositAverage', queryString],
    queryFn: async () : Promise<number> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/table-test/total-ftd?${queryString}`);
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

export function globalAverageDepositQueryOptions() {
  return queryOptions({
    queryKey: ['globalAverageDeposit'],
    queryFn: async () : Promise<number> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/table-test/get-global-average-deposit`);
      if (!res.ok) {
        throw new Error('Failed to fetch first time deposit average');
      }
      return res.json();
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}

type usersByCityTabProps = {
    city: string;
    activeUsers: string;
}


export function usersByCityQueryOptions() {
  return queryOptions({
    queryKey: ['usersByCity'],
    queryFn: async () : Promise<{ top10: usersByCityTabProps[]; all: usersByCityTabProps[] }> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/analytics/users-by-city?propertyId=294090389`);
      if (!res.ok) {
        throw new Error('Failed to fetch users by city');
      }

      // return 10 most cities with most active users
      const data = await res.json();
      const sortedData = data.sort((a: usersByCityTabProps, b: usersByCityTabProps) => {
        return parseInt(b.activeUsers) - parseInt(a.activeUsers);
      });
      return { top10: sortedData.slice(0, 10), all: sortedData };
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}


export function totalAmountFTDQueryOptions({queryString}: {queryString?: string}) {
  return queryOptions({
    queryKey: ['FTDAmount', queryString],
    queryFn: async () : Promise<number> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/table-test/total-money-ftd${queryString}`);
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

export function averageAmountDepositsQueryOptions() {
  return queryOptions({
    queryKey: ['averageAmountDeposits'],
    queryFn: async () : Promise<number> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/table-test/average-amount`);
      if (!res.ok) {
        throw new Error('Failed to fetch first time deposit average');
      }
      return res.json();
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}


export function depositsWithdrawalQuantityQueryOptions({queryString}: {queryString?: string}) {
  return queryOptions({
    queryKey: ['depositsWithdrawalQuantity', queryString],
    queryFn: async () : Promise<totalTransactionsByType> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/table-test/total-transactions-quantity-by-type${queryString}`);
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

export function proportionalDepositFTDQueryOptions({queryString}: {queryString?: string}) {
  return queryOptions({
    queryKey: ['proportionalDepositFTD', queryString],
    queryFn: async () : Promise<proportionalDepositFTD> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/table-test/proportional-deposit-FTD-total-money${queryString}`);
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
      const res = await fetch(`${API_BASE_URL}/table-test/without-pagination`);
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

export function getTotalDepositsByStatusAndDayQueryOptions({queryString}: {queryString?: string}) {
  return queryOptions({
    queryKey: ['getTotalDepositsByStatusAndDay', queryString],
    queryFn: async () : Promise<totalDepositsStatusDay> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/table-test/get-total-deposit-by-status-and-day${queryString}`);
      if (!res.ok) {
        throw new Error('Failed to fetch all deposits');
      }
      const data = await res.json();
      console.log("getTotalDepositsByStatusAndDay data", data);
      if (data.length === 0 || !data.Paid || !data.Failed || !data.Cancelled) {
        return { Paid: [], Failed: [], Cancelled: [] };
      }
      return data;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}


export function FTDMountByDayQueryOptions() {
  return queryOptions({
    queryKey: ['FTDMountByDay'],
    queryFn: async () : Promise<{ time: string; value: number }[]> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/table-test/get-total-money-by-day`);
      if (!res.ok) {
        throw new Error('Failed to fetch all deposits');
      }
      return await res.json();
      
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}


export function FTDQuantityByDayQueryOptions({queryString}: {queryString?: string}) {
  return queryOptions({
    queryKey: ['FTDQuantityByDay', queryString],
    queryFn: async () : Promise<{ time: string; value: number }[]> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/table-test/total-first-depossit-by-all-days${queryString}`);
      if (!res.ok) {
        throw new Error('Failed to fetch all deposits');
      }
      return await res.json();
      
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}


export function totalTransactionsByTypeQueryOptions({queryString}: {queryString?: string}) {
  return queryOptions({
    queryKey: ['totalTransactionsByType', queryString],
    queryFn: async () : Promise<totalTransactionsByType> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'; 
      const res = await fetch(`${API_BASE_URL}/table-test/total-transactions-by-type${queryString}`);
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
      const res = await fetch(`${API_BASE_URL}/benchmark/signed-urls?page=${pageParam || 1}`);
      if (!res.ok) {
        throw new Error('Failed to fetch benchmark keys');
      }
      return res.json();
    },
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
}
