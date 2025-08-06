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
import { parseAsTimestamp , useQueryState, parseAsBoolean, useQueryStates} from 'nuqs'  
import { ScrollArea } from "./ui/scroll-area";

const dateParams = {  
  from: parseAsTimestamp,  
  to: parseAsTimestamp      
}  
export function NavCalendar() { 
  
  const [applyFilters, setApplyFilters] = useQueryState('apply', parseAsBoolean.withDefault(false))
  const [{ from, to }, setDates] = useQueryStates(dateParams)  
    
  return (  
    <SidebarMenu>  
      <SidebarMenuItem>  
        <Popover modal={true}>  
          <PopoverTrigger asChild>  
            <SidebarMenuButton className={cn(  
              buttonVariants({ variant: applyFilters ? "default" : "outline", size: "default" }),   
              "w-full justify-start items-center flex font-normal"  
            )}>  
              <CalendarIcon className="h-4 w-4"/>  
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
          <PopoverContent className="z-9999 w-fit p-0 max-h-[390px] overflow-y-hidden" align="start">  
            <ScrollArea className="w-full h-[390px]">
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
                    setApplyFilters(false)
                  }}   
                  disabled={(date) => date < new Date('1900-01-01')}  
                  initialFocus  
                />  
                <div style={{containerType: "size"}} className="border-t p-3 h-14 flex flex-col sm:flex-row justify-between gap-3 w-full">  
                  <Button  
                    onClick={() => {  
                      setDates({ from: null, to: null })  
                      setApplyFilters(false)
                    }}  
                    variant={"secondary"}
                    className="w-full sm:w-[32%]"
                    size={"sm"}
                    disabled={!from && !to} 
                  >  
                    Limpiar fechas  
                  </Button>  

                  <Button  
                    onClick={() => {  
                      setApplyFilters(true)
                    }} 
                    variant={"secondary"}
                    className="w-full sm:w-[32%]"
                    size={"sm"}
                    disabled={!from && !to || applyFilters} 
                    
                  >  
                    Aplicar Filtro
                  </Button> 

                    <Button
                      variant={"secondary"}
                      className="w-full sm:w-[32%]"
                      onClick={() => {
                        setApplyFilters(false)
                      }}
                      size={"sm"}
                      disabled={!applyFilters}
                    >
                      Limpiar Filtro
                    </Button>
                </div>  
            </ScrollArea>
          </PopoverContent>  
        </Popover>  
      </SidebarMenuItem>  
    </SidebarMenu>  
  )  
}