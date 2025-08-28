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

type TrafficSourceEvent = {
    source: string;
    medium: string;
    eventName: string;
    activeUsers: number;
    trafficPercentage: number;
}

export function getTrafficSourcesAndEvents({queryString = queryStringDefault}: {queryString?: string}) {
  return queryOptions({
    queryKey: ['getTrafficSourcesAndEvents', queryString],
    queryFn: async () : Promise<TrafficSourceEvent[]> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/analytics/get-traffic-sources-and-events${queryString}&propertyId=${propertyId}`,{headers: { 'x-api-key': xApiKey }});

      if (!res.ok) {
        //check error
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to fetch traffic sources and events');
      }
      const data = await res.json();
      return data;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}

export function getTotalRegistrations({queryString = queryStringDefault}: {queryString?: string}) {
  return queryOptions({
    queryKey: ['getTotalRegistrations', queryString],
    queryFn: async () : Promise<number> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/analytics/get-total-registration${queryString}&propertyId=${propertyId}`,{headers: { 'x-api-key': xApiKey }});

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to fetch total registrations');
      }
      const data = await res.json();
      return data;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}
type ActiveUsersByDay = {
  date: string;
  activeUsers: number;
}
export function getActiveUsersByDay({queryString = queryStringDefault}: {queryString?: string}) {
  return queryOptions({
    queryKey: ['getActiveUsersByDay', queryString],
    queryFn: async () : Promise<ActiveUsersByDay[]> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/analytics/get-active-user-by-day${queryString}&propertyId=${propertyId}`,{headers: { 'x-api-key': xApiKey }});

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to fetch active users by day');
      }
      const data = await res.json();
      return data;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}

type RegisteredUsersByDay = {
  date: string;
  registrations: number;
}

export function getRegisteredUsersByDay({queryString = queryStringDefault}: {queryString?: string}) {
  return queryOptions({
    queryKey: ['getRegisteredUsersByDay', queryString],
    queryFn: async () : Promise<RegisteredUsersByDay[]> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/analytics/get-registered-user-per-day${queryString}&propertyId=${propertyId}`,{headers: { 'x-api-key': xApiKey }});

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to fetch registered users by day');
      }
      const data = await res.json();
      return data;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}

export function getConversionRate() {
  return queryOptions({
    queryKey: ['getConversionRate'],
    queryFn: async () : Promise<number> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/analytics/calculate-conversion-rate?propertyId=${propertyId}`,{headers: { 'x-api-key': xApiKey }});

      if (!res.ok) {
        //check error
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to fetch getConversionRate');
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

export function getAverageClicksCTRPromedio({queryString = queryStringDefault}: {queryString?: string}) {
  return queryOptions({
    queryKey: ['getAverageClicksCTRPromedio', queryString],
    queryFn: async () : Promise<number> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/analytics/get-average-clicks-ctr-promedio${queryString}&propertyId=${propertyId}`,{headers: { 'x-api-key': xApiKey }});

      if (!res.ok) {
        //check error
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to fetch average clicks CTR');
      }
      const data = await res.json();
      return data;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}

export function getTotalReachAlcance({queryString = queryStringDefault}: {queryString?: string}) {
  return queryOptions({
    queryKey: ['getTotalReachAlcance', queryString],
    queryFn: async () : Promise<number> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/analytics/get-total-reach-alcance${queryString}&propertyId=${propertyId}`,{headers: { 'x-api-key': xApiKey }});
      if (!res.ok) {
        //check error
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to fetch total reach');
      }
      const data = await res.json();
      return data;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}

type Conversiones = {
    eventName: string;
    conversions: number;
    eventOccurred: boolean;
}

export function getConversiones() {
  return queryOptions({
    queryKey: ['getConversiones'],
    queryFn: async () : Promise<number> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/analytics/get-account-creation-event-status?propertyId=${propertyId}`,{headers: { 'x-api-key': xApiKey }});
      if (!res.ok) {
        //check error
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to fetch total reach');
      }
      const data = await res.json() as Conversiones[];
      return data[0].conversions;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}

