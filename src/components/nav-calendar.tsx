import {  
  SidebarMenu,  
  SidebarMenuButton,  
  SidebarMenuItem,  
} from "@/components/ui/sidebar"  
  
import { Calendar } from "./ui/calendar";  
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";  
import { CalendarIcon } from 'lucide-react';  
import { buttonVariants, Button } from "./ui/button";  
import { es } from 'date-fns/locale';  
import { format } from 'date-fns';  
import { cn } from "@/lib/utils";  
import { parseAsIsoDate, useQueryState, parseAsBoolean, useQueryStates} from 'nuqs'  
const dateParams = {  
  from: parseAsIsoDate,  
  to: parseAsIsoDate     
}  
export function NavCalendar() { 
  
  const [applyFilters, setApplyFilters] = useQueryState('apply', parseAsBoolean.withDefault(false))
  const [{ from, to }, setDates] = useQueryStates(dateParams)  
    
  return (  
    <SidebarMenu>  
      <SidebarMenuItem>  
        <Popover>  
          <PopoverTrigger asChild>  
            <SidebarMenuButton className={cn(  
              buttonVariants({ variant: "outline", size: "default" }),   
              "w-full justify-start font-normal group-data-[collapsible=icon]:!p-1.5"  
            )}>  
              <CalendarIcon className="h-4 w-4 opacity-50" />  
              {from ? (  
                <span className="group-data-[collapsible=icon]:hidden block">  
                  {format(from, 'd MMM yyyy', { locale: es })}  
                  {to ? ` - ${format(to, 'd MMM yyyy', { locale: es })}` : ''}  
                </span>  
              ) : (  
                <span className="group-data-[collapsible=icon]:hidden block">  
                  Selecciona una fecha  
                </span>  
              )}  
            </SidebarMenuButton>  
          </PopoverTrigger>  
          <PopoverContent className="z-9999 w-auto p-0" align="start">  
            <Calendar  
              mode="range"  
              numberOfMonths={2}  
              captionLayout="dropdown"  
              selected={{ from: from || undefined, to: to || undefined }}  
              onSelect={(dateRange) => {  
                console.log("daterange",dateRange)
                setDates({  
                  from: dateRange?.from || null,  
                  to: dateRange?.to || null  
                })  
              }}   
              disabled={(date) => date < new Date('1900-01-01')}  
              initialFocus  
            />  
            <div className="p-3 border-t flex gap-2">  
              <Button  
                variant="secondary"  
                onClick={() => {  
                  setDates({ from: null, to: null })  
                }}  
              >  
                Limpiar fechas  
              </Button>  

              <Button  
                variant="secondary"  
                onClick={() => {  
                  setApplyFilters(true)
                }}  
                
              >  
                Aplicar Filtro
              </Button> 

              {applyFilters && (
                <Button
                  variant="secondary"
                  onClick={() => {
                    setApplyFilters(false)
                  }}
                >
                  Cancelar
                </Button>
              )}
            </div>  
          </PopoverContent>  
        </Popover>  
      </SidebarMenuItem>  
    </SidebarMenu>  
  )  
}