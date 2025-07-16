import { ExpenseSummary, getExpenseSummary } from "@/api/get-summary-expenses-in-period";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrencyBR } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { DollarSign } from "lucide-react";

export function TotalTodayCard() {

  const userId = 11;
  const today  = new Date()

  // formata para yyyy-MM-dd uma única vez
  const todayKey = format(today, "yyyy-MM-dd")
  

  const { data: summary, isLoading, error } = useQuery<ExpenseSummary, Error>({
    queryKey: ["expense-summary-today", userId, todayKey, todayKey],
    queryFn:   () => getExpenseSummary(userId, today, today),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  })
  console.log("summary", summary);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
           <CardTitle className="text-base font-semibold">Total hoje</CardTitle>
        </CardHeader>
        <CardContent>
        <span className="text-xl font-bold tracking-tighter">
          ...
        </span>
        </CardContent>
      </Card>
    );
  }

    if (error || !summary) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Total hoje</CardTitle>
        </CardHeader>
        <CardContent>
          <span className="text-sm text-red-500">Falha ao carregar dados</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold">Total hoje</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tighter">
          {formatCurrencyBR(summary?.totalExpenseInPeriod)}
        </span>
       <p className="text-sm text-muted-foreground">
          Categoria:{" "}
          <span className="text-emerald-500 dark:text-emerald-400">
            {summary.categoryName}
          </span>
        </p>
      </CardContent>
    </Card>
  );
}
