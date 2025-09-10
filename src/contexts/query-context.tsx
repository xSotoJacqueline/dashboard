import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useSearch } from '@tanstack/react-router';
import { createQueryString } from '@/lib/utils';
import type { GeneralSearchWithPagination } from '@/types/search-types';

interface QueryContextType {
  queryString: string | undefined;
  labelTimePeriod: string | undefined;
  search: GeneralSearchWithPagination;
}

const QueryContext = createContext<QueryContextType | undefined>(undefined);

interface QueryProviderProps {
  children: ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  // Usamos useSearch sin especificar from ya que queremos que funcione en cualquier ruta
  const search = useSearch({ strict: false }) as GeneralSearchWithPagination;
  
  const { queryString, labelTimePeriod } = createQueryString({ 
    fromPeriod: search.from, 
    toPeriod: search.to 
  });

  const value: QueryContextType = {
    queryString,
    labelTimePeriod,
    search,
  };

  return (
    <QueryContext.Provider value={value}>
      {children}
    </QueryContext.Provider>
  );
}

export function useContextQuery(): QueryContextType {
  const context = useContext(QueryContext);
  if (context === undefined) {
    throw new Error('useQuery must be used within a QueryProvider');
  }
  return context;
}

// Hooks adicionales para acceder a valores específicos
export function useQueryString(): string | undefined {
  const { queryString } = useContextQuery();
  return queryString;
}

export function useLabelTimePeriod(): string | undefined {
  const { labelTimePeriod } = useContextQuery();
  return labelTimePeriod;
}

export function useSearchParams(): GeneralSearchWithPagination {
  const { search } = useContextQuery();
  return search;
}
