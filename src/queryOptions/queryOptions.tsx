import { queryOptions } from "@tanstack/react-query";

export type totalTransactionsByType ={
    Withdrawal: number;
    Deposit: number;
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
  });
}
