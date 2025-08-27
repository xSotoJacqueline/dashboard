import { queryOptions } from "@tanstack/react-query";
import { queryStringDefault } from "./queryOptions";
import { propertyId } from "./queryOptions-metricas";

export type GeneralProps = {
  queryString?: string;
  applyFilters?: boolean;
}

export const xApiKey = import.meta.env.VITE_X_API_KEY || '';

export function getAverageTimeOnPage({queryString = queryStringDefault}: {queryString?: string}) {
  return queryOptions({
    queryKey: ['getAverageTimeOnPage', queryString],
    queryFn: async () : Promise<{ minutes: number; seconds: number }> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/analytics/get-average-time-on-page${queryString}&propertyId=${propertyId}`,{headers: { 'x-api-key': xApiKey }});
      if (!res.ok) {
        //check error
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to fetch average time on page');
      }
      const data = await res.json();
      return data;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}

type Campaign = {
    campaign: string;
    source: string;
    medium: string;
    activeUsers: number;
}

export function getCampaigns() {
  return queryOptions({
    queryKey: ['getCampaigns'],
    queryFn: async () : Promise<Campaign[]> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/analytics/get-campaigns?propertyId=${propertyId}&page=1&pageSize=1000&mediums=organic,cpc.`,{headers: { 'x-api-key': xApiKey }});

      if (!res.ok) {
        //check error
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to fetch campaigns');
      }
      const data = await res.json();
      return data;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}

type TrafficData = {
  date: string;
  activeUsers: number;
}

export function getTrafficPerDay({queryString = queryStringDefault}: {queryString?: string}) {
  return queryOptions({
    queryKey: ['getTrafficPerDay', queryString],
    queryFn: async () : Promise<TrafficData[]> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/analytics/get-traffic-per-day${queryString}&propertyId=${propertyId}`,{headers: { 'x-api-key': xApiKey }});

      if (!res.ok) {
        //check error
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to fetch traffic per day');
      }
      const data = await res.json();
      return data;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}
