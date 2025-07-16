"use client";

import { CategoryPercentage, getCategoriesPercentage } from "@/api/get-categories-porcentage";
import { ExpenseSummary, getExpenseSummary } from "@/api/get-summary-expenses-in-period";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import { useCategoryColors } from "@/hooks/use-category-colors";
import { formatCurrencyBR } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import { Cell, LabelList, Pie, PieChart } from "recharts";
import { PeriodFilter } from "./period-filter";


const COLORS = [
  "#005F73",
  "#0A9396", 
  "#E9C46A", 
  "#F4A261", 
  "#E76F51", 
];

interface ExpenseCategoryProps {
 dateRange: DateRange;
  onDateChange: (dr: DateRange) => void;
}

export function ExpenseCategory({dateRange, onDateChange }:ExpenseCategoryProps ) {

  const userId = 11;

  const fromParam = format(dateRange.from!, "yyyy-MM-dd");
  const toParam   = format(dateRange.to!,   "yyyy-MM-dd");

  const { data: summary } = useQuery<ExpenseSummary, Error>({
    queryKey: ["expense-summary", userId, fromParam, toParam],
    queryFn:   () => getExpenseSummary(userId, dateRange.from!, dateRange.to!),
    enabled:   Boolean(dateRange.from && dateRange.to),
  });

  const { data: categoryPercentages = [] } = useQuery<
    CategoryPercentage[],
    Error
  >({
    queryKey: ["category-percentages", userId, fromParam, toParam],
      queryFn: () => getCategoriesPercentage(userId, dateRange.from!, dateRange.to!),
      enabled:   Boolean(dateRange.from && dateRange.to),
  });


const categoryNames = Array.from(new Set(categoryPercentages.map((c) => c.categoryName))).sort();

const categoryColorMap = useCategoryColors(categoryNames);

// Config para a legenda
const chartConfig = Object.fromEntries(
  categoryPercentages.map((c) => [
    c.categoryName,
    {
      label: c.categoryName,
      color: categoryColorMap.get(c.categoryName)!,
    },
  ])
);

console.log(summary)
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 gap-3">
          <div>
          <PeriodFilter date={dateRange} onDateChange={onDateChange} />
        </div>
      </div>

      <div className="max-w-md mx-auto mb-4">
        <ChartContainer config={chartConfig} className="aspect-square max-h-[450px]">
          <PieChart>
            <Pie
              data={categoryPercentages}
              dataKey="percentage"
              nameKey="categoryName"
              innerRadius="50%"
              outerRadius="80%"
              paddingAngle={4}
            >
              {categoryPercentages.map((entry) => (
                <Cell key={entry.categoryName} fill={categoryColorMap.get(entry.categoryName) || "#e5e7eb"} />
              ))}
              <LabelList
                position="inside"
                dataKey="percentage"
                formatter={(val: number) => `${val.toFixed(1)}%`}
              />
            </Pie>

            <ChartLegend
               content={<ChartLegendContent className="text-sm"  nameKey="categoryName" />}
            />
          </PieChart>
        </ChartContainer>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-xl font-semibold">
          💰 Total gasto: {formatCurrencyBR(summary?.totalExpenseInPeriod || 0)}
        </span>
        <span className="text-sm text-muted-foreground">
          📈 Maior despesa: {formatCurrencyBR(summary?.totalCategoryExpense || 0)}
        </span>
        <span className="text-sm text-muted-foreground">
          📂 Categoria líder: {summary?.categoryName}
        </span>
      </div>
    </div>
  );
}
