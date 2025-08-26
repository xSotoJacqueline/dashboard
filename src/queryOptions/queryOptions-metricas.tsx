import { queryOptions } from "@tanstack/react-query";

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

export function uniqueUsers() {
  return queryOptions({
    queryKey: ['uniqueUsers'],
    queryFn: async () : Promise<number> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/analytics/unique-users?propertyId=${propertyId}`,{headers: { 'x-api-key': xApiKey }});
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

