import { Card } from "@/components/ui/card";
import { subDays } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Helmet } from "react-helmet-async";
import { TotalTodayCard } from "./day-orders-amount-card";
import { ExpenseTable } from "./expense-table";
import { ExpenseCategory } from "./expenses-category-chart";
import { BiggestCurrentExpenseCard } from "./mouth-orders-amount-card";
import { MountExpenseCard } from "./mouth-revenue";


export function Dashboard() {

    const [dateRange, setDateRange] = useState<DateRange>({
    from: subDays(new Date(), 7),
    to:   new Date(),
  });



  return (
    <>
      <Helmet title="Painel" />
      
      <div>
        <h1 className="mb-3 text-3xl font-bold tracking-tighter">Dashboard</h1>

        <div className="grid grid-cols-3 gap-14">
          <MountExpenseCard />
          <BiggestCurrentExpenseCard />
          <TotalTodayCard />
          
        </div> 
        <Card className="mt-6 p-6 ">
          <div className="grid grid-cols-2 gap-10">
          <ExpenseTable dateRange={dateRange} onDateChange={setDateRange}/>
          <ExpenseCategory dateRange={dateRange}  onDateChange={setDateRange}/>
          </div>
          </Card>

      </div>
    </>
  );
}
