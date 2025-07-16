"use client";

import { ExpenseSummary, getExpenseSummary } from "@/api/get-summary-expenses-in-period";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrencyBR } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { DollarSign } from "lucide-react";
import { useMemo, useRef } from "react";

export function BiggestCurrentExpenseCard() {
const userId = 11;

  const nowRef = useRef(new Date());
  const now = nowRef.current;

  const firstOfMonth = useMemo(
    () => new Date(now.getFullYear(), now.getMonth(), 1),
    [now.getFullYear(), now.getMonth()],
  );


  const monthKey = `${now.getFullYear()}-${now.getMonth() + 1}`;

const { data: summary, isLoading, error } = useQuery<ExpenseSummary, Error>({
    queryKey: ["expense-summary-current-card", userId, monthKey],
    queryFn: () => getExpenseSummary(userId, firstOfMonth, now),
    staleTime: 1000 * 60 * 5,        
    refetchOnWindowFocus: false,     
  });



  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Maior despesa</CardTitle>
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
          <CardTitle>Maior gasto</CardTitle>
          
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
        <CardTitle className="text-base font-semibold">
          Maior despesa
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tighter">
          {formatCurrencyBR(summary.totalCategoryExpense)}
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
