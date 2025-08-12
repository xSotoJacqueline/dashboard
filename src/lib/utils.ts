import { clsx, type ClassValue } from "clsx"
import { format } from "date-fns/format";
import { es } from "date-fns/locale";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function createQueryString({ fromPeriod, toPeriod }: { fromPeriod?: number; toPeriod?: number }): { queryString: string | undefined; labelTimePeriod: string | undefined } {
    const from = fromPeriod ? new Date(fromPeriod) : undefined;
    const to = toPeriod ? new Date(toPeriod) : undefined;

    const startDate = from ? format(from, 'yyyy-MM-dd') : undefined;
    const endDate = to ? format(new Date(to), 'yyyy-MM-dd') : undefined;
    let labelTimePeriod = from && to ? `${format(from, 'd MMM yyyy', {locale: es})} - ${format(new Date(to), 'd MMM yyyy', {locale: es})}` : undefined;
    if(startDate === endDate) {
      labelTimePeriod = startDate ? `Fecha: ${format(new Date(startDate), 'd MMM yyyy', {locale: es})}` : undefined;
    } 

  const queryString = startDate && endDate ? `?startDate=${startDate}&endDate=${endDate}` : undefined;
  return { queryString, labelTimePeriod };
}
