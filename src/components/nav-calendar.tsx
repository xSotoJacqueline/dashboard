import {  
  SidebarMenu,  
  SidebarMenuButton,  
  SidebarMenuItem,
  useSidebar,  
} from "@/components/ui/sidebar"  
  
import { Calendar } from "./ui/calendar";  
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";  
import { CalendarIcon } from 'lucide-react';  
import { buttonVariants, Button } from "./ui/button";  
import { es } from 'date-fns/locale';  
import { format } from 'date-fns';  
import { cn } from "@/lib/utils";  
import { parseAsBoolean, parseAsTimestamp, useQueryState, useQueryStates} from 'nuqs'  
import { ScrollArea } from "./ui/scroll-area";
import { useState } from "react";

const dateParams = {  
  from: parseAsTimestamp,  
  to: parseAsTimestamp      
}  
export function NavCalendar() { 
  const {isMobile} = useSidebar()
  const [applyFilters, setApplyFilters] = useQueryState('apply', parseAsBoolean.withDefault(false))
  const [{ from, to }, setDates] = useQueryStates(dateParams)  
  const [dateSelected, setDateSelected] = useState<{ from: Date; to?: Date } | undefined>(undefined);
  
  return (  
    <SidebarMenu>  
      <SidebarMenuItem>  
        <Popover modal={true}>  
          <PopoverTrigger asChild>  
            <SidebarMenuButton
              className={cn(
              buttonVariants({
                variant: "outline",
                className: (applyFilters
                ? "!bg-primary border !border-primary hover:!text-white text-white shadow-xs hover:!bg-primary/90"
                : ""),
                size: "default"
              }),
              "w-full justify-start items-center flex font-normal transition-colors duration-300"
              )}
            >
              <CalendarIcon className="h-4 w-4" />
              {from ? (
              <span className="group-data-[collapsible=icon]:hidden block">
                {from ? format(from, 'd MMM yyyy', { locale: es }) : ''}
                {to ? ` - ${format(to, 'd MMM yyyy', { locale: es })}` : ''}
              </span>
              ) : (
              <span className="group-data-[collapsible=icon]:hidden block">
                Selecciona una fecha
              </span>
              )}
            </SidebarMenuButton>
          </PopoverTrigger>  
          <PopoverContent className="z-9999 w-fit p-0 max-h-[390px] overflow-y-hidden" align="start">  
            <ScrollArea className="w-full h-[390px]">
                <Calendar
                mode="range"
                min={1}
                max={96}
                numberOfMonths={isMobile ? 1 : 2}
                captionLayout="dropdown"
                selected={
                  dateSelected
                    ? dateSelected
                    : {
                        from: from ?? undefined,
                        to: to ?? undefined,
                      }
                }
                onSelect={(date) => {
                  date?.from ? setDateSelected(date as { from: Date; to?: Date }) : setDateSelected(undefined)
                  if (applyFilters) {
                    setApplyFilters(false);
                  }
                }} 
                disabled={(date) => date < new Date('1900-01-01')}
                initialFocus
                />
                <div style={{containerType: "size"}} className="border-t p-3 h-14 flex flex-row justify-between gap-3 w-full">  
                  <Button  
                    onClick={() => {  
                      setDates({ from: null, to: null })  
                      setDateSelected(undefined);
                      setApplyFilters(false)
                    }}  
                    variant={"secondary"}
                    className="w-full flex-1 sm:w-[49%]"
                    size={"sm"}
                    disabled={!from && !to} 
                  >  
                    Limpiar fechas  
                  </Button>  

                  <Button  
                    onClick={() => {  
                      setApplyFilters(!applyFilters)
                      if (dateSelected) {
                        setDates({ from: dateSelected.from, to: dateSelected.to });
                      } else {
                        setDates({ from: null, to: null });
                      }
                    }} 
                    variant={"secondary"}
                    className="w-full flex-1 sm:w-[49%]"
                    size={"sm"}
                    disabled={!dateSelected || applyFilters} 
                  >  
                    Aplicar filtro
                  </Button> 
                </div>  
            </ScrollArea>
          </PopoverContent>  
        </Popover>  
      </SidebarMenuItem>  
    </SidebarMenu>  
  )  
}