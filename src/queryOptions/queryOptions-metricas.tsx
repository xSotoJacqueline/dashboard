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

export function uniqueUsers({queryString = queryStringDefault}: {queryString?: string}) {
  return queryOptions({
    queryKey: ['uniqueUsers', queryString],
    queryFn: async () : Promise<number> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/analytics/unique-users${queryString}&propertyId=${propertyId}`,{headers: { 'x-api-key': xApiKey }});
      if (!res.ok) {
        throw new Error('Failed to fetch unique users');
      }
      const data = await res.json();
      return data;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}

type AcquisitionRateResponse = {
  rate: number;
  acquiredUsers: number;
};


export function getAverageIncome() {
  return queryOptions({
    queryKey: ['averageIncome'],
    queryFn: async () : Promise<number> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/metricas/average-income`,{headers: { 'x-api-key': xApiKey }});
      if (!res.ok) {
        throw new Error('Failed to fetch average income');
      }
      const data = await res.json();
      return data;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}

//adquisición de usuarios
export function getAcquisitionRate({queryString = queryStringDefault}: {queryString?: string}) {
  return queryOptions({
    queryKey: ['acquisitionRate', queryString],
    queryFn: async () : Promise<number> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/metricas/acquisition-rate${queryString}`,{headers: { 'x-api-key': xApiKey }});
      if (!res.ok) {
        throw new Error('Failed to fetch acquisition rate');
      }
      const data = await res.json() as AcquisitionRateResponse;
      return data.acquiredUsers;
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

type usersByCityTabProps = {
    city: string;
    activeUsers: string;
}


export function usersByCityQueryOptions() {
  return queryOptions({
    queryKey: ['usersByCity'],
    queryFn: async () : Promise<{ top10: usersByCityTabProps[]; all: usersByCityTabProps[] }> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/analytics/users-by-city?propertyId=${propertyId}`,{headers: { 'x-api-key': xApiKey }});
      if (!res.ok) {
        throw new Error('Failed to fetch users by city');
      }
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


type CustomerLifetimeValueResponse = {
  total_lifetime_value: number;
  average_lifetime_value: number;
}
export function getCustomerLifetimeValue() {
  return queryOptions({
    queryKey: ['customerLifetimeValue'],
    queryFn: async () : Promise<number> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/metricas/customer-lifetime-value`,{headers: { 'x-api-key': xApiKey }});
      if (!res.ok) {
        throw new Error('Failed to fetch customer lifetime value');
      }
      const data = await res.json() as CustomerLifetimeValueResponse;
      return data.total_lifetime_value;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}

type RetentionRateResponse = {
  rateDB: number;
  rateAnalytics: number;
}
export function getRetentionRate({queryString = queryStringDefault}: {queryString?: string}) {
  return queryOptions({
    queryKey: ['retentionRate', queryString],
    queryFn: async () : Promise<number> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/metricas/retation-rate${queryString}`,{headers: { 'x-api-key': xApiKey }});
      if (!res.ok) {
        throw new Error('Failed to fetch retention rate');
      }
      const data = await res.json() as RetentionRateResponse;
      return data.rateDB;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}
