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
