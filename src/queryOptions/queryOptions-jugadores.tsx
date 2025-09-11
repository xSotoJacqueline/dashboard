import { queryOptions } from "@tanstack/react-query";
import { queryStringDefault } from "./queryOptions";
import { propertyId } from "./queryOptions-metricas";
import type { FilterStructure } from "@/lib/filter-columns";
import type { JoinOperator } from "@/types/data-table";

export type GeneralProps = {
  queryString?: string;
  applyFilters?: boolean;
}

export const xApiKey = import.meta.env.VITE_X_API_KEY || '';

export type PercentageDepositsByDayOfWeekData = {
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
  count: number;
  percentage: number;
}[];

export type TopLoosersData = {
  id: number;
  casino: string;
  bet_date: string;
  bet_date_normalized: string;
  game_type: string;
  playerId: string;
  user_name: string;
  number_of_bets: number;
  real_money_bets: number;
  real_money_wins: number;
  wins: number;
  created_at: string;
};

export function topLoosers({queryString = queryStringDefault, pageParam}: {queryString?: string, pageParam?: number}) {
  return queryOptions({
    queryKey: ['topLoosers', queryString, pageParam],
    queryFn: async () : Promise<TopLoosersData[]> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/betdata${queryString}&page=${pageParam || 1}&pageSize=10`,{headers: { 'x-api-key': xApiKey }});
      if (!res.ok) {
        //check error
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to fetch top loosers');
      }
      const data = await res.json();
      return data;
    },
    placeholderData: (previousData) => previousData,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}
export type FavoriteGame = {
        game: string; 
        count: number;
        sessions: {
          realMoneyBets: number;
          realMoneyWins: number;
          wins: number;
          numberOfBets: number;
          casino: string;
          betDate: Date | null;
        }[];
        totalRealMoneyBets: number;
        totalRealMoneyWins: number;
        totalWins: number;
        totalNumberOfBets: number;
        averageRealMoneyBets: number;
        averageRealMoneyWins: number;
        casinos: string[]
}

export type FavoriteCasino = {
  casino: string;
  count: number;
}

export type PlayerData = {
  userName: string;
  favoriteGames: FavoriteGame[];
  favoriteCasinos: FavoriteCasino[];
  totalGenerated: number;
}

export type HybridPlayersDetailsData = {
  data: {
    [userId: string]: PlayerData;
  };
  totalPlayers: number;
  totalPages: number;
  currentPage: string;
}
export function getHybridPlayersDetails({queryString = queryStringDefault, pageParam, filters, joinOperator}: {queryString?: string, pageParam?: number, filters?: FilterStructure[], joinOperator: JoinOperator}) {
  return queryOptions({
    queryKey: ['getHybridPlayersDetails', queryString, pageParam, filters, joinOperator],
    queryFn: async () : Promise<HybridPlayersDetailsData> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/betdata/get-hybrid-players-details${queryString}&page=${pageParam || 1}&pageSize=10${(filters && filters.length > 0) ? `&filters=${JSON.stringify(filters)}&joinOperator=${joinOperator}` : ''}`,{headers: { 'x-api-key': xApiKey }});
      if (!res.ok) {
        //check error
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to fetch hybrid players details');
      }
      const data = await res.json();
      return data;
    },
    placeholderData: (previousData) => previousData,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}

type Category = {
  totalPlayers: number;
  totalIncome: number;
  averageIncomePerPlayer: number;
  percentageIncomePerPlayer: {
    [playerId: string]: number;
  }[];
  percentageOfTotalPlayers: number;
  paginatedPlayers: {
    playerId: string;
    userName: string;
    income: number;
  }[];
}

type TotalPlayersGroupedByCasino = {
  data:{
    Casino: Category;
    Sport: Category;
  }
  totalPages:number;
  currentPage:number;
}


export function getTotalPlayersGroupedByCasino({queryString = queryStringDefault, pageParam}: {queryString?: string, pageParam?: number}) {
  return queryOptions({
    queryKey: ['getTotalPlayersGroupedByCasino', queryString, pageParam],
    queryFn: async () : Promise<TotalPlayersGroupedByCasino> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/betdata/get-total-players-grouped-by-casino${queryString}&page=${pageParam || 1}&pageSize=10`,{headers: { 'x-api-key': xApiKey }});
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to fetch total players grouped by casino');
      }
      const data = await res.json();
      return data;
    },
    placeholderData: (previousData) => previousData,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}

type GamePlayerInfo = {
  playerId: string;
  userName: string;
  income: number;
};

type GameCategory = {
  totalPlayers: number;
  totalIncome: number;
  averageIncomePerPlayer: number;
  paginatedPlayers: GamePlayerInfo[];
};

type CasinoGames = {
  SLOT_GAME: GameCategory;
  BACCARAT: GameCategory;
  BLACKJACK: GameCategory;
  CASINO_HOLDEM: GameCategory;
  CRASH: GameCategory;
  KENO: GameCategory;
  LOTTERY: GameCategory;
  OTHERS: GameCategory;
  POKER: GameCategory;
  RNG_TABLE_GAME: GameCategory;
  ROULETTE: GameCategory;
  SCRATCH_CARD: GameCategory;
  SHOW_PROGRAM: GameCategory;
};

type SportGames = {
  SINGLES: GameCategory;
  MULTIPLES: GameCategory;
  "Not Applicable": GameCategory;
  SYSTEMS: GameCategory;
};

export type TotalBetsGroupedByGameAndCasinoData = {
  Casino: CasinoGames;
  Sport: SportGames;
};

export function getTotalBetsGroupedByGameAndCasino({queryString = queryStringDefault}: {queryString?: string}) { 
  return queryOptions({
    queryKey: ['getTotalBetsGroupedByGameAndCasino', queryString],
    queryFn: async () : Promise<TotalBetsGroupedByGameAndCasinoData> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/betdata/get-total-bets-grouped-by-game-and-casino${queryString}`,{headers: { 'x-api-key': xApiKey }});
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to fetch total bets grouped by game and casino');
      }
      const data = await res.json();
      return data;
    },
    placeholderData: (previousData) => previousData,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}

export function getTotalPlayers({queryString = queryStringDefault}: {queryString?: string}) {
  return queryOptions({
    queryKey: ['getTotalPlayers', queryString],
    queryFn: async () : Promise<number> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/betdata/get-total-players${queryString}`,{headers: { 'x-api-key': xApiKey }});
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to fetch total players');
      }
      const data = await res.json();
      return data;
    },
    placeholderData: (previousData) => previousData,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}

export function getTotalIncome({queryString = queryStringDefault}: {queryString?: string}) {
  return queryOptions({
    queryKey: ['getTotalIncome', queryString],
    queryFn: async () : Promise<number> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/betdata/get-total-income${queryString}`,{headers: { 'x-api-key': xApiKey }});
      if (!res.ok) {
        //check error
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to fetch total income');
      }
      const data = await res.json();
      return data;
    },
    placeholderData: (previousData) => previousData,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}


type totalHybridPlayers ={
  totalHybridPlayers: number;
  hybridPlayers: {
    playerId: string;
    casinos: string[];
  }[];

}

export function getTotalHybridPlayers({queryString = queryStringDefault}: {queryString?: string}) {
  return queryOptions({
    queryKey: ['getTotalHybridPlayers', queryString],
    queryFn: async () : Promise<number> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/betdata/get-hybrid-players-by-casino${queryString}`,{headers: { 'x-api-key': xApiKey }});
      if (!res.ok) {
        //check error
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to fetch total players');
      }
      const data = await res.json() as totalHybridPlayers;
      return data.totalHybridPlayers;
    },
    placeholderData: (previousData) => previousData,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}

export function getRealTimeActivityUsers() {
  return queryOptions({
    queryKey: ['realTimeActivityUsers'],
    queryFn: async () : Promise<any> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/analytics/get-real-time-activity-users?propertyId=${propertyId}`,{headers: { 'x-api-key': xApiKey }});
      if (!res.ok) {
        //check error
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to fetch real time activity users');
      }
      const data = await res.json();
      return data;
    },
    placeholderData: (previousData) => previousData,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}

export function percentageDepositsByDayOfWeek({queryString = queryStringDefault}: {queryString?: string}) {
  return queryOptions({
    queryKey: ['percentageDepositsByDayOfWeek', queryString],
    queryFn: async () : Promise<PercentageDepositsByDayOfWeekData> => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${API_BASE_URL}/withdraw/get-withdraws-by-day-of-week-in-range${queryString}`,{headers: { 'x-api-key': xApiKey }});
      if (!res.ok) {
        //check error
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to fetch percentage deposits by day of week');
      }
      const data = await res.json();
      return data;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}

