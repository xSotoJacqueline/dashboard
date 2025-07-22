
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from"./ui/popover";
import { CalendarIcon } from 'lucide-react';
import { buttonVariants } from "./ui/button";
import { useState } from "react";
import { es } from 'date-fns/locale';
import { format } from 'date-fns';
import { cn } from "@/lib/utils";


export function NavCalendar({}) {
    const [dateSelected, setDateSelected] = useState<{ from: Date; to?: Date } | undefined>(undefined);
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Popover>
            <PopoverTrigger asChild>
                <SidebarMenuButton className={cn(buttonVariants({ variant: "outline", size: "default" }), "w-full justify-start font-normal group-data-[collapsible=icon]:!p-1.5")}>
                    <CalendarIcon className=" h-4 w-4 opacity-50" />
                    {dateSelected?.from ? (
                    <span className="group-data-[collapsible=icon]:hidden block">{format(new Date(dateSelected.from), 'd MMM yyyy', { locale: es })}{dateSelected.to ? ` - ${format(new Date(dateSelected.to), 'd MMM yyyy', { locale: es })}` : ''}</span>
                    ) : (
                    <span className="group-data-[collapsible=icon]:hidden block">Selecciona una fecha</span>
                    )}
                </SidebarMenuButton>
            </PopoverTrigger>
            <PopoverContent className="z-9999 w-auto p-0" align="start">
                <Calendar
                mode="range"
                numberOfMonths={2}
                selected={dateSelected}
                onSelect={(date) => date?.from ? setDateSelected(date as { from: Date; to?: Date }) : setDateSelected(undefined)} 
                disabled={(date) => date < new Date('1900-01-01')}
                initialFocus
                />
            </PopoverContent>
        </Popover>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
