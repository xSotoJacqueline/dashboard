import { queryOptions } from "@tanstack/react-query";

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

export function totalFTDQueryOptions() {
  return queryOptions({
    queryKey: ['firstTimeDepositAverage'],
    queryFn: async () : Promise<number> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/table-test/total-ftd`);
      if (!res.ok) {
        throw new Error('Failed to fetch first time deposit average');
      }
      return res.json();
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}

export function totalAmountFTDQueryOptions() {
  return queryOptions({
    queryKey: ['FTDAmount'],
    queryFn: async () : Promise<number> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/table-test/total-money-ftd`);
      if (!res.ok) {
        throw new Error('Failed to fetch first time deposit average');
      }
      return res.json();
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
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


export function depositsWithdrawalQuantityQueryOptions() {
  return queryOptions({
    queryKey: ['depositsWithdrawalQuantity'],
    queryFn: async () : Promise<totalTransactionsByType> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/table-test/total-transactions-quantity-by-type`);
      if (!res.ok) {
        throw new Error('Failed to fetch first time deposit average');
      }
      return res.json();
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}

export function proportionalDepositFTDQueryOptions() {
  return queryOptions({
    queryKey: ['proportionalDepositFTD'],
    queryFn: async () : Promise<proportionalDepositFTD> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/table-test/proportional-deposit-FTD-total-money`);
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

export function getTotalDepositsByStatusAndDayQueryOptions() {
  return queryOptions({
    queryKey: ['getTotalDepositsByStatusAndDay'],
    queryFn: async () : Promise<totalDepositsStatusDay> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/table-test/get-total-deposit-by-status-and-day`);
      if (!res.ok) {
        throw new Error('Failed to fetch all deposits');
      }
      return await res.json();
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


export function FTDQuantityByDayQueryOptions() {
  return queryOptions({
    queryKey: ['FTDQuantityByDay'],
    queryFn: async () : Promise<{ time: string; value: number }[]> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/table-test/total-first-depossit-by-all-days`);
      if (!res.ok) {
        throw new Error('Failed to fetch all deposits');
      }
      return await res.json();
      
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}


export function totalTransactionsByTypeQueryOptions() {
  return queryOptions({
    queryKey: ['totalTransactionsByType'],
    queryFn: async () : Promise<totalTransactionsByType> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/table-test/total-transactions-by-type`);
      if (!res.ok) {
        throw new Error('Failed to fetch first time deposit average');
      }
      return res.json();
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
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
  });
}
