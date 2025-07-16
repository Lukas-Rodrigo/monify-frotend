"use client"

import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import * as React from "react"
import type { DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface DateRangePickerProps extends React.ComponentProps<"div"> {
  date: DateRange
  onDateChange: (date: DateRange) => void
}

export function DateRangePicker({
  className,
  date,
  onDateChange,
}: DateRangePickerProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className="w-[300px] justify-start text-left font-normal"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd 'de' MMMM, yyyy", { locale: ptBR })} –{' '}
                  {format(date.to, "dd 'de' MMMM, yyyy", { locale: ptBR })}
                </>
              ) : (
                format(date.from, "dd 'de' MMMM, yyyy", { locale: ptBR })
              )
            ) : (
              <span>Selecione um período</span>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={date}
            onSelect={(range) => {
              if (range?.from && range.to) {
                onDateChange(range)
              }
            }}
            numberOfMonths={2}
            locale={ptBR}
            initialFocus
            defaultMonth={date.from}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
