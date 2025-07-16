import { DateRangePicker } from "@/components/date-ranger-picker";
import { Button } from "@/components/ui/button";
import { subDays } from "date-fns";
import { X } from "lucide-react";
import { DateRange } from "react-day-picker";

interface PeriodFilterProps {
 date: DateRange;
  onDateChange: (dr: DateRange) => void;
}

export function PeriodFilter({ date, onDateChange }: PeriodFilterProps) {

  return (
    <div className="flex gap-1.5 items-center">
          <DateRangePicker
          date={date}
          onDateChange={(dr) => {
            if (dr?.from && dr.to) onDateChange(dr);
          }}
        />
        <div className="flex gap-2 mt-2 sm:mt-0">
          <Button variant="ghost" size="sm" onClick={() => onDateChange({ from: subDays(new Date(), 7), to: new Date() })}>
            7 dias
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onDateChange({ from: subDays(new Date(), 14), to: new Date() })}>
            14 dias
          </Button>
          <Button
          variant="ghost"
            size="sm"
            onClick={() => {
              const now = new Date();
              onDateChange({
                from: new Date(now.getFullYear(), now.getMonth(), 1),
                to: now,
              });
            }}
          >
            Este mês
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onDateChange({ from: subDays(new Date(), 7), to: new Date() })}>
            <X className="" />
            <span>Limpar filtros</span>
          </Button>
        </div>
    </div>
  )
}